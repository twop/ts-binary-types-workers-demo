sendToRust(JSON.stringify({ data: "hello from js" }));
// -------
sendToRust(new Uint8Array([0, 1, 2, 3]));
// -------
const hotel = { star: 3, breakfast: true };
const encoded = new Uint8Array([/*star*/ 3, /*breakfast*/ 1]);

// also we can decode it back
const decoded = { star: encoded[0], breakfast: encoded[1] === 1 };
// -------

const user = { name: "Simon", age: 33 };
const encodedName = new TextEncoder("utf-8").encode("Simon");
// [ 83, 105, 109, 111, 110 ]

const encodedUser = [
  5,
  0,
  0,
  0,
  0,
  0,
  0, // encodedName.length as u64
  83,
  105,
  109,
  111,
  110, // "Simon"
  33,
  0,
  0,
  0 // 33 as u32
];
//--------

// send in js using ts-rust-bridge library for encoding
sendToRust(encodeUser({ name: "Simon", age: 33 }));

//--------
// copied from lib.dom.d.ts

// function postMessage(message: any, transfer: Transferable[]): void;
// type Transferable = ArrayBuffer | MessagePort | ImageBitmap;
//--------

const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });
WebAssembly.instantiateStreaming(fetch("some.wasm"), {
  js: { mem: memory }
}).then(({ instance }) => {
  console.log(instance);
});

WebAssembly.instantiate();

// but it also can be accessed by JavaScript!
const memoryView = new Uint8Array(memory.buffer);

//---------

const payload = {
  str: "some random string",
  f64: 544501.0378817371,
  tuple: [true, -39590],
  struct: {
    bool: true,
    i32vec: [-859965, 345717, -37999, -902347, -737603]
  }
  // plus a couple more
};

const message = new Array(1000).fill(payload);
//---------
// Structural Cloning
postMessage(message);

// JSON.stringify
postMessage(JSON.stringify(message));

// ts-rust-bridge
const data: Uint8Array = encodeIntoBinary(messages);
postMessage(data.buffer, [data.buffer]);

// WASM
const wasmMemView: Uint8Array = wasm.allocate_space(msg.length);
wasmMemView.set(msg); // copy msg content into wasm memory
const result: Uint8Array = wasm.handle_message();
//---------

postMessage;
