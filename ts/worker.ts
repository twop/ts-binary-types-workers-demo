import { WorkerMsg } from "./messages";
import { writePacket } from "./generated/messages.gen.ser";
import { readPacket } from "./generated/messages.gen.deser";
import { Packet } from "./generated/messages.gen";

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
          const toSend = writePacket(
            { arr, pos: 0 },
            readPacket({ arr, pos: 0 })
          ).arr.buffer;
          // const delta = performance.now() - start;
          postMessage(toSend, [toSend]);

          // printExecTime("worker", delta);
          break;
        }
        case "binary_for_wasm": {
          let arr = new Uint8Array(msg.val);
          const wasmMemView: Uint8Array = wasmEcho.allocate_space(arr.length);
          wasmMemView.set(arr);
          const responseView: Uint8Array = wasmEcho.handle_message();
          if (arr.length < responseView.length) {
            arr = new Uint8Array(responseView.length);
          }
          arr.set(responseView);
          postMessage(arr.buffer, [arr.buffer]);
          break;
        }
      }
    };

    postMessage("ready");
  })
  .catch(console.error);
