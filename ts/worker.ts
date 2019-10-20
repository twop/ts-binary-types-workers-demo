import { writePacket, readPacket, WorkerMsg, Packet } from "./messages";

const self = (globalThis as unknown) as DedicatedWorkerGlobalScope;

import("../pkg/index")
  .then(({ Echo }) => {
    const wasmEcho = Echo.new();

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
          break;
        }
        case "binary_for_wasm": {
          let arr = new Uint8Array(msg.val);

          const wasmMemView: Uint8Array = wasmEcho.allocate_space(arr.length);
          wasmMemView.set(arr);
          const responseLen = wasmEcho.handle_message();
          if (arr.length < responseLen) {
            arr = new Uint8Array(responseLen);
          }
          arr.set(wasmEcho.view_memory());
          postMessage(arr.buffer, [arr.buffer]);
          break;
        }
      }
    };

    postMessage("ready");
  })
  .catch(console.error);
