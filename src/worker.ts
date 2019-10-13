import {
  writePacket,
  readPacket,
  WorkerMsg,
  Packet
  // printExecTime
} from "./messages";

const self = (globalThis as unknown) as DedicatedWorkerGlobalScope;

self.onmessage = ({ data }) => {
  const msg: WorkerMsg = data;
  switch (msg.tag) {
    case "structural":
      postMessage(msg);
      break;
    case "json":
      const parsed: Packet = JSON.parse(msg.val);
      const toSendBack: WorkerMsg = {
        tag: "json",
        val: JSON.stringify(parsed)
      };
      postMessage(toSendBack);
      break;
    case "binary": {
      const arr = new Uint8Array(msg.val);
      // const start = performance.now();
      const toSend = writePacket(readPacket(arr), arr).buffer;
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
