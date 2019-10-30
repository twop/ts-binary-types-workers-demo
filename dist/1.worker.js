self["webpackChunk"]([1],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main_js", function() { return main_js; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Echo", function() { return Echo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_string_new", function() { return __wbindgen_string_new; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__widl_f_log_1_", function() { return __widl_f_log_1_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return __wbindgen_object_drop_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_memory", function() { return __wbindgen_memory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_buffer_cdcb54e9871fd20a", function() { return __wbg_buffer_cdcb54e9871fd20a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a", function() { return __wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return __wbindgen_throw; });
/* harmony import */ var _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


/**
*/
function main_js() {
    _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* main_js */ "f"]();
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "g"].buffer) {
        cachegetUint8Memory = new Uint8Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "g"].buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
*/
class Echo {

    static __wrap(ptr) {
        const obj = Object.create(Echo.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_echo_free */ "a"](ptr);
    }
    /**
    * @returns {Echo}
    */
    static new() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* echo_new */ "e"]();
        return Echo.__wrap(ret);
    }
    /**
    * @param {number} size
    * @returns {any}
    */
    allocate_space(size) {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* echo_allocate_space */ "c"](this.ptr, size);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    handle_message() {
        const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* echo_handle_message */ "d"](this.ptr);
        return takeObject(ret);
    }
}

const __wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm(arg0, arg1);
    return addHeapObject(ret);
};

const __widl_f_log_1_ = function(arg0) {
    console.log(getObject(arg0));
};

const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

const __wbindgen_memory = function() {
    const ret = _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "g"];
    return addHeapObject(ret);
};

const __wbg_buffer_cdcb54e9871fd20a = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

const __wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm(arg0, arg1));
};

_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_start */ "b"]();



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(1);


// exec wasm module
wasmExports["h"]()

/***/ })
]);