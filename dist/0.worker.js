/******/ (function(modules) { // webpackBootstrap
/******/ 	self["webpackChunk"] = function webpackChunkCallback(chunkIds, moreModules) {
/******/ 		for(var moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		while(chunkIds.length)
/******/ 			installedChunks[chunkIds.pop()] = 1;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "1" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 1
/******/ 	};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		2: function() {
/******/ 			return {
/******/ 				"./index.js": {
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules[1].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_log_1_": function(p0i32) {
/******/ 						return installedModules[1].exports["__widl_f_log_1_"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules[1].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_memory": function() {
/******/ 						return installedModules[1].exports["__wbindgen_memory"]();
/******/ 					},
/******/ 					"__wbg_buffer_cdcb54e9871fd20a": function(p0i32) {
/******/ 						return installedModules[1].exports["__wbg_buffer_cdcb54e9871fd20a"](p0i32);
/******/ 					},
/******/ 					"__wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules[1].exports["__wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules[1].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/ 		promises.push(Promise.resolve().then(function() {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				importScripts(__webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".worker.js");
/******/ 			}
/******/ 		}));
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"1":[2]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"2":"de97848928eaaa0c01ab"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ts-binary/dist-web/index.js
// note that all of them look at the same memory (same 4 bytes)
const au32 = new Uint32Array(2);
const au16 = new Uint16Array(au32.buffer);
const au8 = new Uint8Array(au32.buffer);
const af32 = new Float32Array(au32.buffer);
const af64 = new Float64Array(au32.buffer);
const ai32 = new Int32Array(au32.buffer);
const reserve = (sink, numberOfBytes) => {
    const { arr, pos } = sink;
    if (arr.length - pos > numberOfBytes)
        return sink;
    const newLen = Math.max(arr.length * 2, arr.length + numberOfBytes);
    const newArr = new Uint8Array(newLen);
    newArr.set(arr, 0);
    return { arr: newArr, pos };
};
// write a byte without any checks
const wb = (sink, byte) => {
    const { arr, pos } = sink;
    arr[pos] = byte;
    sink.pos += 1;
    return sink;
};
const write_u8 = (sink, val) => wb(reserve(sink, 1), val);
const write_u32 = (sink, val) => wb(wb(wb(wb(reserve(sink, 4), val), val >> 8), val >> 16), val >> 24);
const write_u16 = (sink, val) => wb(wb(reserve(sink, 2), val), val >> 8);
const write_u64 = (sink, val) => write_u32(write_u32(reserve(sink, 8), val), 0);
const write_f32 = (sink, val) => {
    af32[0] = val; // just translate the bytes from float to u32
    return write_u32(reserve(sink, 4), au32[0]);
};
const write_f64 = (sink, val) => {
    af64[0] = val; // just translate the bytes from float64 to u32
    return write_u32(write_u32(reserve(sink, 8), au32[0]), au32[1]);
};
const write_i32 = (sink, val) => {
    ai32[0] = val; // just translate the bytes from i32 to u32
    return write_u32(reserve(sink, 4), au32[0]);
};
const encoder = new TextEncoder();
const encodeStrInto = 'encodeInto' in encoder
    ? (str, arr, pos) => encoder.encodeInto(str, new Uint8Array(arr.buffer, pos)).written
    : (str, arr, pos) => {
        const bytes = encoder.encode(str);
        arr.set(bytes, pos);
        return bytes.length;
    };
const write_str = (sink, val) => {
    // reserve 8 bytes for the u64 len
    sink = reserve(sink, val.length * 3 + 8);
    const bytesWritten = encodeStrInto(val, sink.arr, sink.pos + 8);
    sink = write_u64(sink, bytesWritten);
    sink.pos += bytesWritten;
    return sink;
};
const write_bool = (sink, val) => write_u8(sink, val ? 1 : 0);
const seq_writer = (serEl) => (sink, seq) => seq.reduce(serEl, write_u64(sink, seq.length));
const opt_writer = (serEl) => (sink, val) => val === undefined ? write_u8(sink, 0) : serEl(write_u8(sink, 1), val);
// -------- Deserialization ----------
const read_u8 = sink => sink.arr[sink.pos++];
// read 1 byte into a number + move pos in sink by 1
const rb = read_u8;
const read_u32 = sink => {
    au8[0] = rb(sink);
    au8[1] = rb(sink);
    au8[2] = rb(sink);
    au8[3] = rb(sink);
    return au32[0];
};
const read_u16 = sink => {
    au8[0] = rb(sink);
    au8[1] = rb(sink);
    return au16[0];
};
const read_u64 = sink => {
    // we don't support numbers more than u32 (yet)
    const val = read_u32(sink);
    sink.pos += 4;
    return val;
};
const read_f32 = sink => {
    au8[0] = rb(sink);
    au8[1] = rb(sink);
    au8[2] = rb(sink);
    au8[3] = rb(sink);
    return af32[0];
};
const read_f64 = sink => {
    for (let i = 0; i < 8; i++)
        au8[i] = rb(sink);
    return af64[0];
};
const read_i32 = sink => {
    au8[0] = rb(sink);
    au8[1] = rb(sink);
    au8[2] = rb(sink);
    au8[3] = rb(sink);
    return ai32[0];
};
const read_bool = sink => rb(sink) === 1;
const opt_reader = (readEl) => sink => rb(sink) === 1 ? readEl(sink) : undefined;
const seq_reader = (readEl) => sink => {
    const count = read_u64(sink);
    // Note it doesn't make sense to set capacity here
    // because it will mess up shapes
    const res = new Array();
    for (let i = 0; i < count; i++) {
        res.push(readEl(sink));
    }
    return res;
};
const decoder = new TextDecoder();
const read_str = sink => {
    const len = read_u64(sink);
    const str = decoder.decode(new Uint8Array(sink.arr.buffer, sink.pos, len));
    sink.pos += len;
    return str;
};


//# sourceMappingURL=index.js.map

// CONCATENATED MODULE: ./ts/generated/messages.gen.ser.ts

const writeOptStr = opt_writer(write_str);
const writeOptF64 = opt_writer(write_f64);
const writeBoolI32 = (sink, val) => write_i32(write_bool(sink, val[0]), val[1]);
const writeOptBoolI32 = opt_writer(writeBoolI32);
const writeVecI32 = seq_writer(write_i32);
const writeNestedPayload = (sink, { bool, i32vec }) => writeVecI32(write_bool(sink, bool), i32vec);
const writeVariantPayload = (sink, val) => {
    switch (val.tag) {
        case "unit":
            return write_u32(sink, 0);
        case "val":
            return writeNestedPayload(write_u32(sink, 1), val.value);
    }
};
const writeOptVariantPayload = opt_writer(writeVariantPayload);
const writeOptNestedPayload = opt_writer(writeNestedPayload);
const writePayload = (sink, { str, f64, tuple, union, structField }) => writeOptNestedPayload(writeOptVariantPayload(writeOptBoolI32(writeOptF64(writeOptStr(sink, str), f64), tuple), union), structField);
const writeVecPayload = seq_writer(writePayload);
const writePacket = writeVecPayload;

// CONCATENATED MODULE: ./ts/generated/messages.gen.ts
const Packet = (val) => val;
var VariantPayload;
(function (VariantPayload) {
    VariantPayload.unit = { tag: "unit" };
    VariantPayload.val = (value) => ({
        tag: "val",
        value
    });
})(VariantPayload || (VariantPayload = {}));
const BoolI32 = (p0, p1) => [p0, p1];

// CONCATENATED MODULE: ./ts/generated/messages.gen.deser.ts


const readOptStr = opt_reader(read_str);
const readOptF64 = opt_reader(read_f64);
const readBoolI32 = (sink) => BoolI32(read_bool(sink), read_i32(sink));
const readOptBoolI32 = opt_reader(readBoolI32);
const readVecI32 = seq_reader(read_i32);
const readNestedPayload = (sink) => {
    const bool = read_bool(sink);
    const i32vec = readVecI32(sink);
    return { bool, i32vec };
};
const readVariantPayload = (sink) => {
    switch (read_u32(sink)) {
        case 0:
            return VariantPayload.unit;
        case 1:
            return VariantPayload.val(readNestedPayload(sink));
    }
    throw new Error("bad variant index for VariantPayload");
};
const readOptVariantPayload = opt_reader(readVariantPayload);
const readOptNestedPayload = opt_reader(readNestedPayload);
const readPayload = (sink) => {
    const str = readOptStr(sink);
    const f64 = readOptF64(sink);
    const tuple = readOptBoolI32(sink);
    const union = readOptVariantPayload(sink);
    const structField = readOptNestedPayload(sink);
    return { str, f64, tuple, union, structField };
};
const readVecPayload = seq_reader(readPayload);
const readPacket = (sink) => Packet(readVecPayload(sink));

// CONCATENATED MODULE: ./node_modules/ts-loader!./ts/worker.ts


const worker_self = globalThis;
__webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, 1))
    .then(({ Echo }) => {
    const wasmEcho = Echo.new();
    worker_self.onmessage = ({ data }) => {
        const msg = data;
        switch (msg.tag) {
            case "structural":
                postMessage(msg);
                break;
            case "json":
                const parsed = JSON.parse(msg.val);
                const toSendBack = {
                    tag: "json",
                    val: JSON.stringify(parsed)
                };
                postMessage(toSendBack);
                break;
            case "binary": {
                const arr = new Uint8Array(msg.val);
                // const start = performance.now();
                const toSend = writePacket({ arr, pos: 0 }, readPacket({ arr, pos: 0 })).arr.buffer;
                // const delta = performance.now() - start;
                postMessage(toSend, [toSend]);
                // printExecTime("worker", delta);
                break;
            }
            case "binary_for_wasm": {
                let arr = new Uint8Array(msg.val);
                const wasmMemView = wasmEcho.allocate_space(arr.length);
                wasmMemView.set(arr);
                const responseView = wasmEcho.handle_message();
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


/***/ })
/******/ ]);