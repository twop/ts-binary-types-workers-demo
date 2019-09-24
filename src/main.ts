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

const measureJson = (messages: Msg[]) => {
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

const measureBinary = (messages: Msg[]) => {
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

type AppState = {
  options: GenMsgOptions;
  msgCount: number;
};

const Action = Union({
  ChangeOptions: of<GenMsgOptions>(),
  ChangeMsgCount: of<number>()
});

const { ChangeOptions, ChangeMsgCount } = Action;

type Action = typeof Action.T;

const reducer = (state: AppState, action: Action) =>
  Action.match<AppState>(action, {
    ChangeOptions: options => ({ ...state, options }),
    ChangeMsgCount: msgCount => ({ ...state, msgCount })
  });

function renderLoop(state: AppState) {
  render(
    app(state, action => renderLoop(reducer(state, action))),
    document.body
  );
}

// Define a template
const app = (
  { options, msgCount }: AppState,
  dispatch: (action: Action) => void
) => {
  const lazyMessages = (() => {
    let msgs: Msg[] | undefined = undefined;

    return () => {
      if (msgs) return msgs;

      msgs = generateMessages(msgCount, options);
      return msgs;
    };
  })();

  return html`
    <p>binary types demo</p>
    ${([
      "f64",
      "str",
      "tuple",
      "struct",
      "union"
    ] as (keyof GenMsgOptions)[]).map(opt =>
      generationOption(options, opt, dispatch)
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
        @click=${() =>
          measureJson(lazyMessages()).then(delta =>
            printExecTime("structured cloning", delta)
          )}
      >
        measure json
      </button>
    </p>
    <p>
      <button
        @click=${() =>
          measureBinary(lazyMessages()).then(delta =>
            printExecTime("binary cloning", delta)
          )}
      >
        measure binary
      </button>
    </p>
    <p>
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

function generateMessages(count: number, options: GenMsgOptions) {
  return Array.from({ length: count }, () => genMessage(400, options));
}

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

renderLoop({
  msgCount: 100,
  options: { f64: true }
});
