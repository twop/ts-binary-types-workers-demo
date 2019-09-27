import {
  genMessage,
  Msg,
  writeMessage,
  readMessage,
  WorkerMsg,
  printExecTime,
  GenMsgOptions,
  genPayload
} from "./messages";

import { Union, of } from "ts-union";

import { html, render } from "lit-html";
import { guard } from "lit-html/directives/guard";

const worker = new Worker("./worker.js");

const measureJson = (messages: Msg[]): Promise<number> => {
  const stopGC: any[] = [];

  const sendMsgObj = (msg: Msg) =>
    worker.postMessage({ tag: "json", val: msg } as WorkerMsg);

  return new Promise<number>(resolve => {
    let i = 0;
    const received = new Array<Msg>();
    stopGC.push(received);
    const start = performance.now();
    worker.onmessage = function onMsgListener({ data }) {
      const msg: Msg = data;
      // console.log("!!", JSON.stringify(msg).length);
      received.push(msg);
      i++;
      if (i < messages.length) {
        sendMsgObj(messages[i]);
      } else {
        worker.removeEventListener("message", onMsgListener);
        resolve(performance.now() - start);
      }
    };
    sendMsgObj(messages[0]);
  });
};

const measureBinary = (messages: Msg[]): Promise<number> => {
  const stopGC: any[] = [];

  const sendMsgBin = (msg: Msg, arr: Uint8Array) => {
    const toSend = writeMessage(msg, arr).buffer;
    const workerMsg: WorkerMsg = { tag: "msg_arr", val: toSend };
    worker.postMessage(workerMsg, [toSend]);
  };

  return new Promise<number>(resolve => {
    let i = 0;
    const received = new Array<Msg>(messages.length);
    stopGC.push(received);

    const start = performance.now();

    // let ping_time = start;
    // let pong_time = start;

    worker.onmessage = function msgListener({ data }) {
      const buffer: ArrayBuffer = data;

      const arr = new Uint8Array(buffer);
      const msg = readMessage(arr);
      // pong_time = performance.now() - ping_time;
      //printExecTime("ping-pong", pong_time);
      // console.log("got arr.len", arr.byteLength);
      received[i] = msg;
      i++;
      if (i < messages.length) {
        sendMsgBin(messages[i], arr);
        // ping_time = performance.now();
      } else {
        worker.removeEventListener("message", msgListener);

        resolve(performance.now() - start);
      }
    };

    sendMsgBin(messages[0], new Uint8Array(1024));
  });
};

const BenchmarkResult = Union({
  NotStarted: of(null),
  InProgress: of(null),
  Finished: of<BenchType, number>()
});

const { InProgress, NotStarted, Finished } = BenchmarkResult;
type BenchmarkResult = typeof BenchmarkResult.T;

type State = {
  options: GenMsgOptions;
  msgCount: number;
  result: BenchmarkResult;
  messages?: Msg[];
};

const enum BenchType {
  Binary = "Binary",
  StructuralCloning = "StructuralCloning"
}

const Effect = Union({
  RunBenchmark: of<Msg[], BenchType>(),
  GenerateMessages: of<BenchType, GenMsgOptions, number>()
});

type Effect = typeof Effect.T;

const Action = Union({
  ChangeOptions: of<GenMsgOptions>(),
  ChangeMsgCount: of<number>(),
  Start: of<BenchType>(),
  SetMessages: of<BenchType, Msg[]>(),
  Finish: of<BenchType, number>()
});

const { ChangeOptions, ChangeMsgCount, Start, SetMessages, Finish } = Action;

type Action = typeof Action.T;

const update = (state: State, action: Action) =>
  Action.match<[State, Effect?]>(action, {
    ChangeOptions: options => [{ ...state, options, messages: undefined }],
    ChangeMsgCount: msgCount => [{ ...state, msgCount, messages: undefined }],
    Start: type => {
      const { messages, options, msgCount } = state;
      return [
        { ...state, result: InProgress },
        messages
          ? Effect.RunBenchmark(messages, type)
          : Effect.GenerateMessages(type, options, msgCount)
      ];
    },
    SetMessages: (typeToRun, messages) => [
      { ...state, messages },
      Effect.RunBenchmark(messages, typeToRun)
    ],
    Finish: (type, duration) => [{ ...state, result: Finished(type, duration) }]
  });

const allOptionsKeys: (keyof GenMsgOptions)[] = [
  "f64",
  "str",
  "tuple",
  "struct",
  "union"
];

const app = (
  { options, msgCount, result }: State,
  dispatch: (action: Action) => void
) => {
  return html`
    <p>binary types demo</p>
    ${guard([options], () =>
      allOptionsKeys.map(opt => generationOption(options, opt, dispatch))
    )}

    <p>
      <div class="">
        <p>message count = ${msgCount}</p>
        <input type="range" min="10" max="1000" value=${msgCount} step="1" @change=${(ev: {
    target: { valueAsNumber: number };
  }) => dispatch(ChangeMsgCount(ev.target.valueAsNumber))}/>
      </div>
    </p>
    <p>
      <button
        @click=${() => dispatch(Start(BenchType.StructuralCloning))}
      >
        measure json
      </button>
    </p>
    <p>
      <button
        @click=${() => dispatch(Start(BenchType.Binary))}
      >
        measure binary
      </button>
    </p>
    <p>
    <p style="margin-left: 10px">
      Result:
      <p>
        ${guard([result], () =>
          BenchmarkResult.match(result, {
            InProgress: () =>
              html`
                <div>Running...</div>
              `,
            NotStarted: () =>
              html`
                <div>Press a button to start</div>
              `,
            Finished: (type, duration) =>
              html`
                <div>${type} took: ${duration}ms</div>
              `
          })
        )}
      </p>
    </p>
    <p>Payload example:</p>
      ${guard(
        [options],
        () =>
          html`
            <pre>${JSON.stringify(genPayload(options), null, 2)}</pre>
          `
      )}
    </p>
  `;
};

function generationOption<K extends keyof GenMsgOptions>(
  options: GenMsgOptions,
  name: K,
  dispatch: (action: Action) => void
) {
  const opt = options[name] || false;
  return html`
  <p>
    <input type="checkbox" ?checked=${opt} @click=${() =>
    dispatch(ChangeOptions({ ...options, [name]: !opt }))}>
      ${name}
    </input>
  </p>`;
}

const runEffect = (effect: Effect, dispatch: (action: Action) => void) => {
  Effect.match(effect, {
    RunBenchmark: (messages, type) => {
      if (messages)
        (type === BenchType.Binary
          ? measureBinary(messages)
          : measureJson(messages)
        ).then(duration => {
          printExecTime(type, duration);
          return dispatch(Finish(type, duration));
        });
    },
    GenerateMessages: (typeToRunNext, options, msgCount) =>
      dispatch(
        SetMessages(
          typeToRunNext,
          Array.from({ length: msgCount }, () => genMessage(400, options))
        )
      )
  });
};

const renderApp = (state: State, dispatch: (action: Action) => void) =>
  render(app(state, dispatch), document.body);

const startApp = (initial: State) => {
  let state = initial;

  function dispatch(action: Action) {
    const [newState, effect] = update(state, action);
    state = newState;
    if (effect) runEffect(effect, dispatch);
    renderApp(newState, dispatch);
  }

  renderApp(state, dispatch);
};

startApp({
  msgCount: 100,
  options: { f64: true },
  result: NotStarted
});
