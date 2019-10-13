import {
  genPacket,
  Packet,
  writePacket,
  readPacket,
  WorkerMsg,
  printExecTime,
  GenPayloadOptions,
  genPayload,
  WorkerStructuralMsg,
  WorkerJsonMsg,
  Payload
} from "./messages";
import dequal from "dequal";
dequal;

import { Union, of } from "ts-union";

import { html, render } from "lit-html";
import { guard } from "lit-html/directives/guard";
import { bindesc } from "ts-binary-types";

const worker = new Worker("./worker.js");

const measureWith = <T>(
  read: (d: T) => Packet,
  send: (packet: Packet, receivedData?: T) => void
) => (packets: Packet[]): Promise<number> => {
  return new Promise<number>(resolve => {
    let i = 0;
    const received = new Array<Packet>(packets.length);
    const start = performance.now();

    worker.onmessage = function msgListener({ data }) {
      const msg = read(data);
      received[i] = msg;
      // if (!dequal(msg, messages[i])) {
      //   console.log("not equal", msg, messages[i]);
      // }

      i++;
      if (i < packets.length) {
        send(packets[i], data);
      } else {
        worker.removeEventListener("message", msgListener);
        resolve(performance.now() - start);
      }
    };
    send(packets[0]);
  });
};

const measureBinary = measureWith<ArrayBuffer>(
  buffer => readPacket(new Uint8Array(buffer)),
  (msg, receivedData = new ArrayBuffer(2024)) => {
    const toSend = writePacket(msg, new Uint8Array(receivedData)).buffer;
    const workerMsg: WorkerMsg = { tag: "binary", val: toSend };
    worker.postMessage(workerMsg, [toSend]);
  }
);

const measureStructuralCloning = measureWith<WorkerStructuralMsg>(
  m => m.val,
  msg => {
    const workerMsg: WorkerMsg = { tag: "structural", val: msg };
    worker.postMessage(workerMsg);
  }
);

const measureJson = measureWith<WorkerJsonMsg>(
  m => JSON.parse(m.val),
  msg => {
    const workerMsg: WorkerMsg = { tag: "json", val: JSON.stringify(msg) };
    worker.postMessage(workerMsg);
  }
);

const BenchmarkResult = Union({
  NotStarted: of(null),
  InProgress: of(null),
  Finished: of<BenchType, number>()
});

const { InProgress, NotStarted, Finished } = BenchmarkResult;
type BenchmarkResult = typeof BenchmarkResult.T;

type State = {
  options: GenPayloadOptions;
  packetCount: number;
  result: BenchmarkResult;
  packets?: Packet[];
};

const enum BenchType {
  Binary = "Binary",
  StructuralCloning = "StructuralCloning",
  JSON = "JSON"
}

const Effect = Union({
  RunBenchmark: of<Packet[], BenchType>(),
  GenerateMessages: of<BenchType, GenPayloadOptions, number>()
});

type Effect = typeof Effect.T;

const Action = Union({
  ChangeOptions: of<GenPayloadOptions>(),
  ChangeMsgCount: of<number>(),
  Start: of<BenchType>(),
  SetPackets: of<BenchType, Packet[]>(),
  Finish: of<BenchType, number>()
});

const { ChangeOptions, ChangeMsgCount, Start, SetPackets, Finish } = Action;

type Action = typeof Action.T;

const update = (state: State, action: Action) =>
  Action.match<[State, Effect?]>(action, {
    ChangeOptions: options => [{ ...state, options, packets: undefined }],
    ChangeMsgCount: packetCount => [
      { ...state, packetCount, packets: undefined }
    ],
    Start: type => {
      const { packets: messages, options, packetCount } = state;
      return [
        { ...state, result: InProgress },
        messages
          ? Effect.RunBenchmark(messages, type)
          : Effect.GenerateMessages(type, options, packetCount)
      ];
    },
    SetPackets: (typeToRun, messages) => [
      { ...state, packets: messages },
      Effect.RunBenchmark(messages, typeToRun)
    ],
    Finish: (type, duration) => [{ ...state, result: Finished(type, duration) }]
  });

const allOptionsKeys: (keyof GenPayloadOptions)[] = [
  "f64",
  "str",
  "tuple",
  "struct",
  "union"
];

const PACKET_LENGTH = 400;

const app = (
  { options, packetCount: msgCount, result }: State,
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
        structural
      </button>
    </p>
    <p>
      <button
        @click=${() => dispatch(Start(BenchType.Binary))}
      >
        binary
      </button>
    </p>
    <p>
      <button
        @click=${() => dispatch(Start(BenchType.JSON))}
      >
        json
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
    <p>Payload example (there are ${PACKET_LENGTH} in a packet ):</p>
      ${guard([options], () => {
        const testPayload = genPayload(options);
        const { pos } = Payload[bindesc].write(
          { arr: new Uint8Array(1), pos: 0 },
          testPayload
        );

        const jsonSize = new TextEncoder().encode(JSON.stringify(testPayload))
          .length;

        return html`
          <pre>${JSON.stringify(testPayload, null, 2)}</pre>
          <p>payload size in: binary=${pos}, utf8 JSON=${jsonSize}</p>
        `;
      })}
    </p>
  `;
};

function generationOption<K extends keyof GenPayloadOptions>(
  options: GenPayloadOptions,
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
      const benchmarkPromise = (() => {
        switch (type) {
          case BenchType.Binary:
            return measureBinary(messages);
          case BenchType.JSON:
            return measureJson(messages);
          case BenchType.StructuralCloning:
            return measureStructuralCloning(messages);
        }
      })();

      benchmarkPromise.then(duration => {
        printExecTime(type, duration);
        return dispatch(Finish(type, duration));
      });
    },
    GenerateMessages: (typeToRunNext, options, msgCount) =>
      dispatch(
        SetPackets(
          typeToRunNext,
          Array.from({ length: msgCount }, () =>
            genPacket(PACKET_LENGTH, options)
          )
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
  packetCount: 100,
  options: { f64: true },
  result: NotStarted
});
