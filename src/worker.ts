import {
  writeMessage,
  readMessage,
  WorkerMsg
  // printExecTime
} from "./messages";

const self = (globalThis as unknown) as DedicatedWorkerGlobalScope;

self.onmessage = ({ data }) => {
  const msg: WorkerMsg = data;
  switch (msg.tag) {
    case "json":
      postMessage(msg);
      break;
    case "msg_arr": {
      const arr = new Uint8Array(msg.val);
      // const start = performance.now();
      const toSend = writeMessage(readMessage(arr), arr).buffer;
      // const delta = performance.now() - start;
      postMessage(toSend, [toSend]);

      // printExecTime("worker", delta);
    }
  }
};

// import { expose } from "comlink";
// import { API } from "./api";

// class APIImpl implements API {
//   add(a: number, b: number) {
//     return a + b;
//   }
// }

// expose(APIImpl);
