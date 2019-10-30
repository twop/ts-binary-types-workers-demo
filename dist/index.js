/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return opt_reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return opt_writer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return read_bool; });
/* unused harmony export read_f32 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return read_f64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return read_i32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return read_str; });
/* unused harmony export read_u16 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return read_u32; });
/* unused harmony export read_u64 */
/* unused harmony export read_u8 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return seq_reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return seq_writer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return write_bool; });
/* unused harmony export write_f32 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return write_f64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return write_i32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return write_str; });
/* unused harmony export write_u16 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return write_u32; });
/* unused harmony export write_u64 */
/* unused harmony export write_u8 */
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return of; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Union; });
const of = val => val;
const Union = recOrFunc => {
  const record = typeof recOrFunc === 'function' ? recOrFunc(undefined) : recOrFunc; // tslint:disable-next-line:prefer-object-spread

  return Object.assign({
    if: createUnpack(record),
    match
  }, createConstructors(record, typeof recOrFunc === 'function'));
};

const evalMatch = (val, cases) => {
  // first elem is always the key
  const handler = cases[getKey(val)];
  return handler ? handler(...getParams(val)) : cases.default && cases.default(val);
}; // const f = (n: number, n2: number) => n + n2;
// const f2 = f.call(undefined, [1]);


const match = (a, b) => b ? evalMatch(a, b) : val => evalMatch(val, a);

const createConstructors = (rec, isGeneric) => {
  const result = {}; // tslint:disable-next-line: forin

  for (const key in rec) {
    result[key] = createCtor(key, rec, isGeneric);
  }

  return result;
};

const createCtor = (key, rec, isGeneric) => {
  const val = rec[key]; // it means that it was constructed with of(null)

  if (val === null) {
    const frozenVal = Object.freeze(makeVal(key, []));
    return isGeneric ? () => frozenVal : frozenVal;
  } // tslint:disable-next-line:no-if-statement


  if (val !== undefined) {
    const res = makeVal(key, [val]);
    return () => res;
  }

  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return makeVal(key, args);
  };
};

const createUnpack = rec => {
  const result = {}; // tslint:disable-next-line:forin

  for (const key in rec) {
    result[key] = createUnpackFunc(key);
  }

  return result;
};

const createUnpackFunc = key => (val, f, els) => getKey(val) === key ? f(...getParams(val)) : els && els(val);

const makeVal = (k, p) => ({
  k,
  p
});

const getKey = val => val.k;

const getParams = val => val.p;




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/lit-html/lib/directive.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive_directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/dom.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = window.customElements !== undefined &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/part.js
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template-instance.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class template_instance_TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari dooes not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template-result.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class template_result_TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment poisition.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceeding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceeding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class template_result_SVGTemplateResult extends template_result_TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/parts.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // tslint:disable-next-line:no-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attibute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new parts_AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class parts_AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class parts_NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof template_result_TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof template_instance_TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new template_instance_TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new parts_NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class parts_BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // tslint:disable-next-line:no-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends parts_AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the thrid
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
try {
    const options = {
        get capture() {
            eventOptionsSupported = true;
            return false;
        }
    };
    // tslint:disable-next-line:no-any
    window.addEventListener('test', options, options);
    // tslint:disable-next-line:no-any
    window.removeEventListener('test', options, options);
}
catch (_e) {
}
class parts_EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/default-template-processor.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class default_template_processor_DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new parts_EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new parts_BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new parts_NodePart(options);
    }
}
const defaultTemplateProcessor = new default_template_processor_DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/template-factory.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lib/render.js
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const render_parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = render_parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        render_parts.set(container, part = new parts_NodePart(Object.assign({ templateFactory: templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map
// CONCATENATED MODULE: ./node_modules/lit-html/lit-html.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lit_html_html; });
/* unused harmony export svg */
/* unused concated harmony import DefaultTemplateProcessor */
/* unused concated harmony import defaultTemplateProcessor */
/* concated harmony reexport directive */__webpack_require__.d(__webpack_exports__, "a", function() { return directive_directive; });
/* unused concated harmony import isDirective */
/* unused concated harmony import removeNodes */
/* unused concated harmony import reparentNodes */
/* unused concated harmony import noChange */
/* unused concated harmony import nothing */
/* unused concated harmony import AttributeCommitter */
/* unused concated harmony import AttributePart */
/* unused concated harmony import BooleanAttributePart */
/* unused concated harmony import EventPart */
/* unused concated harmony import isIterable */
/* unused concated harmony import isPrimitive */
/* unused concated harmony import NodePart */
/* unused concated harmony import PropertyCommitter */
/* unused concated harmony import PropertyPart */
/* unused concated harmony import parts */
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "c", function() { return render; });
/* unused concated harmony import templateCaches */
/* unused concated harmony import templateFactory */
/* unused concated harmony import TemplateInstance */
/* unused concated harmony import SVGTemplateResult */
/* unused concated harmony import TemplateResult */
/* unused concated harmony import createMarker */
/* unused concated harmony import isTemplatePartActive */
/* unused concated harmony import Template */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const lit_html_html = (strings, ...values) => new template_result_TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new template_result_SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);
//# sourceMappingURL=lit-html.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Packet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VariantPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoolI32; });
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return guard; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const previousValues = new WeakMap();
/**
 * Prevents re-render of a template function until a single value or an array of
 * values changes.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([user.id, company.id], () => html`...`)}
 *   </div>
 * ```
 *
 * In this case, the template only renders if either `user.id` or `company.id`
 * changes.
 *
 * guard() is useful with immutable data patterns, by preventing expensive work
 * until data updates.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}
 *   </div>
 * ```
 *
 * In this case, items are mapped over only when the array reference changes.
 *
 * @param value the value to check before re-rendering
 * @param f the template function
 */
const guard = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__[/* directive */ "a"])((value, f) => (part) => {
    const previousValue = previousValues.get(part);
    if (Array.isArray(value)) {
        // Dirty-check arrays by item
        if (Array.isArray(previousValue) &&
            previousValue.length === value.length &&
            value.every((v, i) => v === previousValue[i])) {
            return;
        }
    }
    else if (previousValue === value &&
        (value !== undefined || previousValues.has(part))) {
        // Dirty-check non-arrays by identity
        return;
    }
    part.setValue(f());
    // Copy the value if it's an array so that if it's mutated we don't forget
    // what the previous values were.
    previousValues.set(part, Array.isArray(value) ? Array.from(value) : value);
});
//# sourceMappingURL=guard.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return genPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return genPacket; });
/* harmony import */ var _generated_messages_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

const genNestedPayload = () => ({
    bool: genBool(),
    i32vec: genVec(5, genI32)
});
const genVariantPayload = () => {
    const seed = Math.random();
    return seed < 0.5
        ? _generated_messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* VariantPayload */ "c"].unit
        : _generated_messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* VariantPayload */ "c"].val(genNestedPayload());
};
const genF64 = () => Math.random() * 1000000;
const genI32 = () => Math.floor(Math.random() * 1000000 * (Math.random() > 0.5 ? 1 : -1));
const genVec = (length, f) => Array.from({ length }, f);
const possibleLetters = "выфвпｪｺｻｪ ｷｼｪｩｪ ｺｪｹ ｻｼ ｴｮｨｱаывпцукжд比诶艾娜诶艾伊吾艾比诶艾娜诶艾伊吾asdsasadfasdfdsfsdafлчмДЛОДЛТДЛОЖЖЩШЛДЙТЦУЗЧЖСДЛ12389050-5435";
// const possibleLetters =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function randomStr(length) {
    let text = "";
    for (let i = 0; i < length; i++)
        text += possibleLetters.charAt(Math.floor(Math.random() * possibleLetters.length));
    return text;
}
const genPayload = ({ str, f64, tuple, union, struct }) => ({
    str: str ? randomStr(100) : undefined,
    f64: f64 ? genF64() : undefined,
    tuple: tuple ? Object(_generated_messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* BoolI32 */ "a"])(genBool(), genI32()) : undefined,
    structField: struct ? genNestedPayload() : undefined,
    union: union ? genVariantPayload() : undefined
});
const genPacket = (vecSize, options) => Object(_generated_messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* Packet */ "b"])(genVec(vecSize, () => genPayload(options)));
// export const writePacket = (msg: Packet, arr: Uint8Array): Uint8Array => {
//   const { arr: res } = writeP({ arr, pos: 0 }, msg);
//   //   console.log("$$", pos);
//   return res;
// };
// const read = Packet[bindesc].read;
// export const readPacket = (arr: Uint8Array): Packet => {
//   const sink: Sink = { arr, pos: 0 };
//   const res = read(sink);
//   // console.log(`read ${sink.pos} bytes`);
//   return res;
// };
function genBool() {
    return Math.random() > 0.5;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export writeBoolI32 */
/* unused harmony export writeNestedPayload */
/* unused harmony export writeVariantPayload */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return writePayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return writePacket; });
/* harmony import */ var ts_binary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

const writeOptStr = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* opt_writer */ "b"])(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_str */ "m"]);
const writeOptF64 = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* opt_writer */ "b"])(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_f64 */ "k"]);
const writeBoolI32 = (sink, val) => Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_i32 */ "l"])(Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_bool */ "j"])(sink, val[0]), val[1]);
const writeOptBoolI32 = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* opt_writer */ "b"])(writeBoolI32);
const writeVecI32 = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* seq_writer */ "i"])(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_i32 */ "l"]);
const writeNestedPayload = (sink, { bool, i32vec }) => writeVecI32(Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_bool */ "j"])(sink, bool), i32vec);
const writeVariantPayload = (sink, val) => {
    switch (val.tag) {
        case "unit":
            return Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_u32 */ "n"])(sink, 0);
        case "val":
            return writeNestedPayload(Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* write_u32 */ "n"])(sink, 1), val.value);
    }
};
const writeOptVariantPayload = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* opt_writer */ "b"])(writeVariantPayload);
const writeOptNestedPayload = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* opt_writer */ "b"])(writeNestedPayload);
const writePayload = (sink, { str, f64, tuple, union, structField }) => writeOptNestedPayload(writeOptVariantPayload(writeOptBoolI32(writeOptF64(writeOptStr(sink, str), f64), tuple), union), structField);
const writeVecPayload = Object(ts_binary__WEBPACK_IMPORTED_MODULE_0__[/* seq_writer */ "i"])(writePayload);
const writePacket = writeVecPayload;


/***/ }),
/* 7 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dequal; });
function dequal(foo, bar) {
	var ctor, len;
	if (foo === bar) return true;
	if (foo && bar && (ctor=foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();
		if (ctor === Array && (len=foo.length) === bar.length) {
			while (len-- && dequal(foo[len], bar[len]));
			return len === -1;
		}
		if (ctor === Object) {
			if (Object.keys(foo).length !== Object.keys(bar).length) return false;
			for (len in foo) if (!(len in bar) || !dequal(foo[len], bar[len])) return false;
			return true;
		}
	}
	return foo !== foo && bar !== bar;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export readBoolI32 */
/* unused harmony export readNestedPayload */
/* unused harmony export readVariantPayload */
/* unused harmony export readPayload */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return readPacket; });
/* harmony import */ var _messages_gen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var ts_binary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


const readOptStr = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* opt_reader */ "a"])(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_str */ "f"]);
const readOptF64 = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* opt_reader */ "a"])(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_f64 */ "d"]);
const readBoolI32 = (sink) => Object(_messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* BoolI32 */ "a"])(Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_bool */ "c"])(sink), Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_i32 */ "e"])(sink));
const readOptBoolI32 = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* opt_reader */ "a"])(readBoolI32);
const readVecI32 = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* seq_reader */ "h"])(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_i32 */ "e"]);
const readNestedPayload = (sink) => {
    const bool = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_bool */ "c"])(sink);
    const i32vec = readVecI32(sink);
    return { bool, i32vec };
};
const readVariantPayload = (sink) => {
    switch (Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* read_u32 */ "g"])(sink)) {
        case 0:
            return _messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* VariantPayload */ "c"].unit;
        case 1:
            return _messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* VariantPayload */ "c"].val(readNestedPayload(sink));
    }
    throw new Error("bad variant index for VariantPayload");
};
const readOptVariantPayload = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* opt_reader */ "a"])(readVariantPayload);
const readOptNestedPayload = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* opt_reader */ "a"])(readNestedPayload);
const readPayload = (sink) => {
    const str = readOptStr(sink);
    const f64 = readOptF64(sink);
    const tuple = readOptBoolI32(sink);
    const union = readOptVariantPayload(sink);
    const structField = readOptNestedPayload(sink);
    return { str, f64, tuple, union, structField };
};
const readVecPayload = Object(ts_binary__WEBPACK_IMPORTED_MODULE_1__[/* seq_reader */ "h"])(readPayload);
const readPacket = (sink) => Object(_messages_gen__WEBPACK_IMPORTED_MODULE_0__[/* Packet */ "b"])(readVecPayload(sink));


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__webpack__worker__0) {/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var dequal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var ts_union__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var lit_html_directives_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _generated_messages_gen_deser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _generated_messages_gen_ser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);


dequal__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"];
// import module from "../crate/Cargo.toml";
// module.run();





const worker = new Worker(__webpack__worker__0, {  });
const stopGC = [];
const measureWith = (read, send) => (packets) => {
    return new Promise(resolve => {
        let i = 0;
        const received = new Array(packets.length);
        stopGC.push(received);
        let start = 0;
        const roundTrips = [];
        worker.onmessage = function msgListener({ data }) {
            const packet = read(data);
            roundTrips.push(performance.now() - start);
            received[i] = packet;
            // if (!dequal(packet, packets[i])) {
            //   console.log("not equal", packet, packets[i]);
            // }
            i++;
            if (i < packets.length) {
                start = performance.now();
                send(packets[i], data);
            }
            else {
                worker.removeEventListener("message", msgListener);
                resolve(roundTrips);
            }
        };
        start = performance.now();
        send(packets[0]);
    });
};
const PACKET_LENGTH = 1000;
const measureBinary = (tag) => measureWith(buffer => Object(_generated_messages_gen_deser__WEBPACK_IMPORTED_MODULE_5__[/* readPacket */ "a"])({ arr: new Uint8Array(buffer), pos: 0 }), (msg, receivedData = new ArrayBuffer(PACKET_LENGTH * 200)) => {
    const toSend = Object(_generated_messages_gen_ser__WEBPACK_IMPORTED_MODULE_6__[/* writePacket */ "a"])({ arr: new Uint8Array(receivedData), pos: 0 }, msg).arr.buffer;
    const workerMsg = { tag, val: toSend };
    worker.postMessage(workerMsg, [toSend]);
});
const measureStructuralCloning = measureWith(m => m.val, msg => {
    const workerMsg = { tag: "structural", val: msg };
    worker.postMessage(workerMsg);
});
const measureJson = measureWith(m => JSON.parse(m.val), msg => {
    const workerMsg = { tag: "json", val: JSON.stringify(msg) };
    worker.postMessage(workerMsg);
});
const BenchmarkResult = Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* Union */ "a"])({
    NotStarted: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(null),
    InProgress: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(null),
    Finished: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])()
});
const { InProgress, NotStarted, Finished } = BenchmarkResult;
const Effect = Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* Union */ "a"])({
    RunBenchmarks: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(),
    GenerateMessages: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])()
});
const TAKE_PERCENT_FASTEST = 0.2;
const Action = Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* Union */ "a"])({
    ChangeOptions: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(),
    ChangeMsgCount: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(),
    Start: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(null),
    SetPackets: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])(),
    Finish: Object(ts_union__WEBPACK_IMPORTED_MODULE_2__[/* of */ "b"])()
});
const { ChangeOptions, ChangeMsgCount, Start, SetPackets, Finish } = Action;
const update = (state, action) => Action.match(action, {
    ChangeOptions: options => [{ ...state, options, packets: undefined }],
    ChangeMsgCount: packetCount => [
        { ...state, packetCount, packets: undefined }
    ],
    Start: () => {
        const { packets: messages, options, packetCount } = state;
        return [
            { ...state, result: InProgress },
            messages
                ? Effect.RunBenchmarks(messages)
                : Effect.GenerateMessages(options, packetCount)
        ];
    },
    SetPackets: messages => [
        { ...state, packets: messages },
        Effect.RunBenchmarks(messages)
    ],
    Finish: (type, duration) => [
        {
            ...state,
            result: BenchmarkResult.match(state.result, {
                Finished: results => Finished([...results, [type, duration]]),
                default: () => Finished([[type, duration]])
            })
        }
    ]
});
const allOptionsKeys = [
    "f64",
    "str",
    "tuple",
    "struct",
    "union"
];
const app = ({ options, packetCount: msgCount, result }, dispatch) => {
    return lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
    <h3>Binary encoding demo (<a href=" https://github.com/twop/ts-binary-types-workers-demo">repo</a>)</h3>
    ${Object(lit_html_directives_guard__WEBPACK_IMPORTED_MODULE_4__[/* guard */ "a"])([options], () => allOptionsKeys.map(opt => generationOption(options, opt, dispatch)))}
    <p>
      <div class="">
        <p>message count = ${msgCount}</p>
        <input type="range" min="10" max="1000" value=${msgCount} step="1" @change=${(ev) => dispatch(ChangeMsgCount(ev.target.valueAsNumber))}/>
      </div>
    </p>
    <p>
      <button
        @click=${() => dispatch(Start)}
      >
        Start benchmark
      </button>
    </p>
   
  
    <p style="margin-left: 10px">
      Result:
      <p>
        ${Object(lit_html_directives_guard__WEBPACK_IMPORTED_MODULE_4__[/* guard */ "a"])([result], () => BenchmarkResult.match(result, {
        InProgress: () => lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
                <div>Running...</div>
              `,
        NotStarted: () => lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
                <div>Press a button to start</div>
              `,
        Finished: results => lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
              <div>
                Note: "fastest" is a sum of ${TAKE_PERCENT_FASTEST * 100}%
                fastest round trips
                ${results.map(([type, { total, fastest }]) => lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
                    <p>
                      ${type} total: ${total}ms, fastest: ${fastest}
                    </p>
                  `)}
              </div>
            `
    }))}
      </p>
    </p>
    <p>Payload example (there are ${PACKET_LENGTH} in a packet ):</p>
      ${Object(lit_html_directives_guard__WEBPACK_IMPORTED_MODULE_4__[/* guard */ "a"])([options], () => {
        const testPayload = Object(_messages__WEBPACK_IMPORTED_MODULE_0__[/* genPayload */ "b"])(options);
        const binSize = estimateBinarySize(testPayload);
        const jsonSize = new TextEncoder().encode(JSON.stringify(testPayload))
            .length;
        return lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
          <pre>${JSON.stringify(testPayload, null, 2)}</pre>
          <p>payload size in: binary=${binSize}, utf8 JSON=${jsonSize}</p>
        `;
    })}
    </p>
  `;
};
const estimateBinarySize = (testPayload) => Object(_generated_messages_gen_ser__WEBPACK_IMPORTED_MODULE_6__[/* writePayload */ "b"])({ arr: new Uint8Array(1), pos: 0 }, testPayload).pos;
function generationOption(options, name, dispatch) {
    const opt = options[name] || false;
    return lit_html__WEBPACK_IMPORTED_MODULE_3__[/* html */ "b"] `
  <p>
    <input type="checkbox" ?checked=${opt} @click=${() => dispatch(ChangeOptions({ ...options, [name]: !opt }))}>
      ${name}
    </input>
  </p>`;
}
const benchmarks = [
    ["Binary" /* Binary */, measureBinary("binary")],
    ["WASM" /* WASM */, measureBinary("binary_for_wasm")],
    ["StructuralCloning" /* StructuralCloning */, measureStructuralCloning],
    ["JSON" /* JSON */, measureJson]
];
const runEffect = (effect, dispatch) => {
    Effect.match(effect, {
        RunBenchmarks: packets => {
            benchmarks.reduce(async (prevBench, [type, runBench]) => {
                await prevBench;
                performance.mark(type);
                const roundTrips = await runBench(packets);
                const sum = (s, trip) => s + trip;
                const total = roundTrips.reduce(sum);
                const fastest = roundTrips
                    .sort((a, b) => a - b)
                    .slice(0, roundTrips.length / 3)
                    .reduce(sum);
                // console.log("~~round trips fastest", type, fastestTripsTime);
                console.info(`${type} full=${total}ms", fastest=${fastest}`);
                dispatch(Finish(type, { fastest, total }));
            }, Promise.resolve());
        },
        GenerateMessages: (options, msgCount) => {
            const packets = Array.from({ length: msgCount }, () => Object(_messages__WEBPACK_IMPORTED_MODULE_0__[/* genPacket */ "a"])(PACKET_LENGTH, options));
            stopGC.push(packets);
            return dispatch(SetPackets(packets));
        }
    });
};
const renderApp = (state, dispatch) => Object(lit_html__WEBPACK_IMPORTED_MODULE_3__[/* render */ "c"])(app(state, dispatch), document.body);
const startApp = (initial) => {
    let state = initial;
    function dispatch(action) {
        const [newState, effect] = update(state, action);
        state = newState;
        if (effect)
            runEffect(effect, dispatch);
        renderApp(newState, dispatch);
    }
    renderApp(state, dispatch);
};
worker.onmessage = function onWorkerReady({ data }) {
    if (data !== "ready") {
        return;
    }
    worker.removeEventListener("message", onWorkerReady);
    startApp({
        packetCount: 100,
        options: { f64: true, struct: true },
        result: NotStarted
    });
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0.worker.js"

/***/ })
/******/ ]);