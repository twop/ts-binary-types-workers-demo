import {
  genMessage,
  Msg,
  writeMessage,
  readMessage,
  WorkerMsg,
  printExecTime,
  GenMsgOptions
} from "./messages";

import { html, render } from "lit-html";

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
};

function renderLoop(state: AppState) {
  const COUNT = 100;

  const messages = Array.from({ length: COUNT }, () =>
    genMessage(400, state.options)
  );

  render(app(state, newState => renderLoop(newState), messages), document.body);
}

// Define a template
const app = (
  { options }: AppState,
  setState: (newState: AppState) => void,
  messages: Msg[]
) => {
  return html`
    <p>binary types demo</p>
    ${([
      "f64",
      "str",
      "tuple",
      "struct",
      "union"
    ] as (keyof GenMsgOptions)[]).map(opt =>
      generationOption(options, opt, setState)
    )}

    <p>
      <button
        @click=${() =>
          measureJson(messages).then(delta =>
            printExecTime("structured cloning", delta)
          )}
      >
        measure json
      </button>
    </p>
    <p>
      <button
        @click=${() =>
          measureBinary(messages).then(delta =>
            printExecTime("binary cloning", delta)
          )}
      >
        measure binary
      </button>
    </p>
  `;
};

function generationOption<K extends keyof GenMsgOptions>(
  options: GenMsgOptions,
  name: K,
  setState: (newState: AppState) => void
) {
  const opt = options[name] || false;
  return html`
  <p>
    <input type="checkbox" ?checked=${opt} @click=${() =>
    setState({ options: { ...options, [name]: !opt } })}>
      ${name}
    </input>
  </p>`;
}

renderLoop({ options: { f64: true } });
