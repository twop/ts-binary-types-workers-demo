!function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";const r=new Uint32Array(2),s=new Uint16Array(r.buffer),i=new Uint8Array(r.buffer),o=new Float32Array(r.buffer),a=new Float64Array(r.buffer),c=new Int32Array(r.buffer),u=(t,e)=>{const{arr:n,pos:r}=t;if(n.length-r>e)return t;const s=Math.max(2*n.length,n.length+e),i=new Uint8Array(s);return i.set(n,0),{arr:i,pos:r}},l=(t,e)=>{const{arr:n,pos:r}=t;return n[r]=e,t.pos+=1,t},d=(t,e)=>l(u(t,1),e),h=(t,e)=>l(l(l(l(u(t,4),e),e>>8),e>>16),e>>24),p=(t,e)=>h(h(u(t,8),e),0),f=new TextEncoder,m="encodeInto"in f?(t,e,n)=>f.encodeInto(t,new Uint8Array(e.buffer,n)).written:(t,e,n)=>{const r=f.encode(t);return e.set(r,n),r.length},g=t=>t.arr[t.pos++],b=g,v=t=>(i[0]=b(t),i[1]=b(t),i[2]=b(t),i[3]=b(t),r[0]),_=t=>{const e=v(t);return t.pos+=4,e},y=new TextDecoder;n.d(e,"a",(function(){return j})),n.d(e,"b",(function(){return N})),n.d(e,"c",(function(){return A})),n.d(e,"d",(function(){return S})),n.d(e,"e",(function(){return k})),n.d(e,"f",(function(){return V})),n.d(e,"g",(function(){return C})),n.d(e,"h",(function(){return $})),n.d(e,"i",(function(){return I})),n.d(e,"j",(function(){return x}));const x=Symbol("bindesc"),w=(t,e,n,r,s)=>(s[x]=Object.assign(r,{read:t,write:e,tag:n}),s);var O;!function(t){t.Bool="Bool",t.Str="Str",t.U32="U32",t.F32="F32",t.F64="F64",t.U16="U16",t.I32="I32",t.U8="U8",t.Enum="Enum",t.Struct="Struct",t.Tuple="Tuple",t.Union="Union",t.Optional="Optional",t.Nullable="Nullable",t.Vec="Vec"}(O||(O={}));const j=w(t=>1===b(t),(t,e)=>d(t,e?1:0),O.Bool,{},{}),N=(w(v,h,O.U32,{},{}),w(g,d,O.U8,{},{}),w(t=>(i[0]=b(t),i[1]=b(t),s[0]),(t,e)=>l(l(u(t,2),e),e>>8),O.U16,{},{}),w(t=>(i[0]=b(t),i[1]=b(t),i[2]=b(t),i[3]=b(t),o[0]),(t,e)=>(o[0]=e,h(u(t,4),r[0])),O.F32,{},{}),w(t=>{for(let e=0;e<8;e++)i[e]=b(t);return a[0]},(t,e)=>(a[0]=e,h(h(u(t,8),r[0]),r[1])),O.F64,{},{})),A=w(t=>(i[0]=b(t),i[1]=b(t),i[2]=b(t),i[3]=b(t),c[0]),(t,e)=>(c[0]=e,h(u(t,4),r[0])),O.I32,{},{}),S=t=>{const{read:e,write:n}=t[x];return w((t=>e=>1===b(e)?t(e):void 0)(e),(t=>(e,n)=>void 0===n?d(e,0):t(d(e,1),n))(n),O.Optional,{type:t},{})},k=w(t=>{const e=_(t),n=y.decode(new Uint8Array(t.arr.buffer,t.pos,e));return t.pos+=e,n},(t,e)=>{t=u(t,3*e.length+8);const n=m(e,t.arr,t.pos+8);return(t=p(t,n)).pos+=n,t},O.Str,{},{}),V=t=>w(T(t),M(t),O.Struct,{fields:t},{}),M=t=>E(void 0,0,Object.keys(t),t),E=(t,e,n,r)=>{if(e>=n.length)return t||((t,e)=>t);const s=n[e],i=r[s][x].write;return E(t?(e,n)=>i(t(e,n),n[s]):(t,e)=>i(t,e[s]),e+1,n,r)},T=t=>{const e=Object.keys(t),n=e.map(e=>t[e][x].read);return function(t){const r={};for(let s=0;s<e.length;s++)r[e[s]]=n[s](t);return r}};function C(...t){let e;const n=t,r=n.map(t=>t[x].write),s=n.map(t=>t[x].read);let i,o;switch(n.length){case 2:{e=(t,e)=>[t,e];const[t,n]=r;i=(e,[r,s])=>n(t(e,r),s);const[a,c]=s;o=t=>e(a(t),c(t));break}case 3:{e=(t,e,n)=>[t,e,n];const[t,n,a]=r;i=(e,[r,s,i])=>a(n(t(e,r),s),i);const[c,u,l]=s;o=t=>e(c(t),u(t),l(t));break}default:e=(...t)=>t,i=(t,e)=>e.reduce((t,e,n)=>r[n](t,e),t),o=t=>s.map(e=>e(t))}return w(o,i,O.Tuple,{components:n},e)}const $=t=>w(U(t),P(t),O.Union,{variants:t},F(t)),P=t=>{const e={};return Object.keys(t).forEach((n,r)=>{const s=t[n];if(null===s)e[n]=(t,e)=>h(t,r);else{const t=s[x].write;e[n]=(e,n)=>t(h(e,r),n)}}),(t,{tag:n,val:r})=>e[n](t,r)},U=t=>{const e=Object.keys(t),n=e.map(e=>{const n=t[e];return n&&n[x].read}),r=e.map(e=>{return t[e]?null:{tag:e,val:void 0}});return t=>{const s=v(t),i=n[s],o=e[s];return i?{tag:o,val:i(t)}:r[s]}},F=t=>Object.keys(t).reduce((e,n)=>{const r=t[n];return e[n]=null===r?{tag:n,val:void 0}:t=>({tag:n,val:t}),e},{}),I=t=>{const{read:e,write:n}=t[x];return w((t=>e=>{const n=_(e),r=new Array;for(let s=0;s<n;s++)r.push(t(e));return r})(e),(t=>(e,n)=>n.reduce(t,p(e,n.length)))(n),O.Vec,{type:t},{})}},function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return s}));const r=t=>t,s=t=>{const e="function"==typeof t?t(void 0):t;return Object.assign({if:u(e),match:o},a(e,"function"==typeof t))},i=(t,e)=>{const n=e[h(t)];return n?n(...p(t)):e.default&&e.default(t)},o=(t,e)=>e?i(t,e):e=>i(e,t),a=(t,e)=>{const n={};for(const r in t)n[r]=c(r,t,e);return n},c=(t,e,n)=>{const r=e[t];if(null===r){const e=Object.freeze(d(t,[]));return n?()=>e:e}if(void 0!==r){const e=d(t,[r]);return()=>e}return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return d(t,n)}},u=t=>{const e={};for(const n in t)e[n]=l(n);return e},l=t=>(e,n,r)=>h(e)===t?n(...p(e)):r&&r(e),d=(t,e)=>({k:t,p:e}),h=t=>t.k,p=t=>t.p},function(t,e,n){"use strict";
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
 */const r=new WeakMap,s=t=>(...e)=>{const n=t(...e);return r.set(n,!0),n},i=t=>"function"==typeof t&&r.has(t),o=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,a=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},c={},u={},l=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${l}--\x3e`,h=new RegExp(`${l}|${d}`),p="$lit$";class f{constructor(t,e){this.parts=[],this.element=e;const n=[],r=[],s=document.createTreeWalker(e.content,133,null,!1);let i=0,o=-1,a=0;const{strings:c,values:{length:u}}=t;for(;a<u;){const t=s.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let r=0;for(let t=0;t<n;t++)m(e[t].name,p)&&r++;for(;r-- >0;){const e=c[a],n=v.exec(e)[2],r=n.toLowerCase()+p,s=t.getAttribute(r);t.removeAttribute(r);const i=s.split(h);this.parts.push({type:"attribute",index:o,name:n,strings:i}),a+=i.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(l)>=0){const r=t.parentNode,s=e.split(h),i=s.length-1;for(let e=0;e<i;e++){let n,i=s[e];if(""===i)n=b();else{const t=v.exec(i);null!==t&&m(t[2],p)&&(i=i.slice(0,t.index)+t[1]+t[2].slice(0,-p.length)+t[3]),n=document.createTextNode(i)}r.insertBefore(n,t),this.parts.push({type:"node",index:++o})}""===s[i]?(r.insertBefore(b(),t),n.push(t)):t.data=s[i],a+=i}}else if(8===t.nodeType)if(t.data===l){const e=t.parentNode;null!==t.previousSibling&&o!==i||(o++,e.insertBefore(b(),t)),i=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(n.push(t),o--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(l,e+1));)this.parts.push({type:"node",index:-1}),a++}}else s.currentNode=r.pop()}for(const t of n)t.parentNode.removeChild(t)}}const m=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},g=t=>-1!==t.index,b=()=>document.createComment(""),v=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class _{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,i=0,a=0,c=r.nextNode();for(;i<n.length;)if(s=n[i],g(s)){for(;a<s.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=e.pop(),c=r.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,s.name,s.strings,this.options));i++}else this.__parts.push(void 0),i++;return o&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */const y=` ${l} `;class x{constructor(t,e,n,r){this.strings=t,this.values=e,this.type=n,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let r=0;r<t;r++){const t=this.strings[r],s=t.lastIndexOf("\x3c!--");n=(s>-1||n)&&-1===t.indexOf("--\x3e",s+1);const i=v.exec(t);e+=null===i?t+(n?y:d):t.substr(0,i.index)+i[1]+i[2]+p+i[3]+l}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
const w=t=>null===t||!("object"==typeof t||"function"==typeof t),O=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class j{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let r=0;r<e;r++){n+=t[r];const e=this.parts[r];if(void 0!==e){const t=e.value;if(w(t)||!O(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===c||w(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=c,t(this)}this.value!==c&&this.committer.commit()}}class A{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(b()),this.endNode=t.appendChild(b())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=b()),t.__insert(this.endNode=b())}insertAfterPart(t){t.__insert(this.startNode=b()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=c,t(this)}const t=this.__pendingValue;t!==c&&(w(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):O(t)?this.__commitIterable(t):t===u?(this.value=u,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof _&&this.value.template===e)this.value.update(t.values);else{const n=new _(e,t.processor,this.options),r=n._clone();n.update(t.values),this.__commitNode(r),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,r=0;for(const s of t)void 0===(n=e[r])&&(n=new A(this.options),e.push(n),0===r?n.appendIntoPart(this):n.insertAfterPart(e[r-1])),n.setValue(s),n.commit(),r++;r<e.length&&(e.length=r,this.clear(n&&n.endNode))}clear(t=this.startNode){a(this.startNode.parentNode,t.nextSibling,this.endNode)}}class S{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=c,t(this)}if(this.__pendingValue===c)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=c}}class k extends j{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new V(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class V extends N{}let M=!1;try{const t={get capture(){return M=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class E{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=c,t(this)}if(this.__pendingValue===c)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=T(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=c}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const T=t=>t&&(M?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
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
 */const C=new class{handleAttributeExpressions(t,e,n,r){const s=e[0];if("."===s){return new k(t,e.slice(1),n).parts}return"@"===s?[new E(t,e.slice(1),r.eventContext)]:"?"===s?[new S(t,e.slice(1),n)]:new j(t,e,n).parts}handleTextExpression(t){return new A(t)}};
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
 */function $(t){let e=P.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},P.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const r=t.strings.join(l);return void 0===(n=e.keyString.get(r))&&(n=new f(t,t.getTemplateElement()),e.keyString.set(r,n)),e.stringsArray.set(t.strings,n),n}const P=new Map,U=new WeakMap,F=(t,e,n)=>{let r=U.get(e);void 0===r&&(a(e,e.firstChild),U.set(e,r=new A(Object.assign({templateFactory:$},n))),r.appendInto(e)),r.setValue(t),r.commit()};
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
 */n.d(e,"b",(function(){return I})),n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return F})),
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
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const I=(t,...e)=>new x(t,e,"html",C)},function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return m})),n.d(e,"b",(function(){return g})),n.d(e,"f",(function(){return v})),n.d(e,"e",(function(){return y})),n.d(e,"d",(function(){return w}));var r=n(0);const s=Object(r.g)(r.a,r.c),i=Object(r.f)({bool:r.a,i32vec:Object(r.i)(r.c)}),o=()=>({bool:x(),i32vec:h(5,d)}),a=Object(r.h)({unit:null,val:i}),c=Object(r.f)({str:Object(r.d)(r.e),f64:Object(r.d)(r.b),tuple:Object(r.d)(s),union:Object(r.d)(a),struct:Object(r.d)(i)}),u=Object(r.i)(c),l=()=>1e6*Math.random(),d=()=>Math.floor(1e6*Math.random()*(Math.random()>.5?1:-1)),h=(t,e)=>Array.from({length:t},e),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";function f(t){let e="";for(let n=0;n<t;n++)e+=p.charAt(Math.floor(Math.random()*p.length));return e}const m=({str:t,f64:e,tuple:n,union:r,struct:i})=>({str:t?f(100):void 0,f64:e?l():void 0,tuple:n?s(x(),d()):void 0,struct:i?o():void 0,union:r?Math.random()<.5?a.unit:a.val(o()):void 0}),g=(t,e)=>h(t,()=>m(e)),b=u[r.j].write,v=(t,e)=>{const{arr:n}=b({arr:e,pos:0},t);return n},_=u[r.j].read,y=t=>{return _({arr:t,pos:0})};function x(){return Math.random()>.5}const w=(t,e)=>console.info(t+" took: %dms",e)},function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(2);
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
 */const s=new WeakMap,i=Object(r.a)((t,e)=>n=>{const r=s.get(n);if(Array.isArray(t)){if(Array.isArray(r)&&r.length===t.length&&t.every((t,e)=>t===r[e]))return}else if(r===t&&(void 0!==t||s.has(n)))return;n.setValue(e()),s.set(n,Array.isArray(t)?Array.from(t):t)})},function(t,e,n){"use strict";function r(t,e){var n,s;if(t===e)return!0;if(t&&e&&(n=t.constructor)===e.constructor){if(n===Date)return t.getTime()===e.getTime();if(n===RegExp)return t.toString()===e.toString();if(n===Array&&(s=t.length)===e.length){for(;s--&&r(t[s],e[s]););return-1===s}if(n===Object){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(s in t)if(!(s in e&&r(t[s],e[s])))return!1;return!0}}return t!=t&&e!=e}n.d(e,"a",(function(){return r}))},function(t,e,n){"use strict";n.r(e),function(t){var e=n(3),r=n(5),s=n(1),i=n(2),o=n(4),a=n(0);r.a;const c=new Worker(t,{}),u=(t,e)=>n=>new Promise(r=>{let s=0;const i=new Array(n.length),o=performance.now();c.onmessage=function a({data:u}){const l=t(u);i[s]=l,++s<n.length?e(n[s],u):(c.removeEventListener("message",a),r(performance.now()-o))},e(n[0])}),l=t=>u(t=>Object(e.e)(new Uint8Array(t)),(n,r=new ArrayBuffer(2e5))=>{const s=Object(e.f)(n,new Uint8Array(r)).buffer,i={tag:t,val:s};c.postMessage(i,[s])}),d=u(t=>t.val,t=>{const e={tag:"structural",val:t};c.postMessage(e)}),h=u(t=>JSON.parse(t.val),t=>{const e={tag:"json",val:JSON.stringify(t)};c.postMessage(e)}),p=Object(s.a)({NotStarted:Object(s.b)(null),InProgress:Object(s.b)(null),Finished:Object(s.b)()}),{InProgress:f,NotStarted:m,Finished:g}=p,b=Object(s.a)({RunBenchmark:Object(s.b)(),GenerateMessages:Object(s.b)()}),v=Object(s.a)({ChangeOptions:Object(s.b)(),ChangeMsgCount:Object(s.b)(),Start:Object(s.b)(),SetPackets:Object(s.b)(),Finish:Object(s.b)()}),{ChangeOptions:_,ChangeMsgCount:y,Start:x,SetPackets:w,Finish:O}=v,j=(t,e)=>v.match(e,{ChangeOptions:e=>[{...t,options:e,packets:void 0}],ChangeMsgCount:e=>[{...t,packetCount:e,packets:void 0}],Start:e=>{const{packets:n,options:r,packetCount:s}=t;return[{...t,result:f},n?b.RunBenchmark(n,e):b.GenerateMessages(e,r,s)]},SetPackets:(e,n)=>[{...t,packets:n},b.RunBenchmark(n,e)],Finish:(e,n)=>[{...t,result:g(e,n)}]}),N=["f64","str","tuple","struct","union"],A=({options:t,packetCount:n,result:r},s)=>i.b`
    <p>binary types demo</p>
    ${Object(o.a)([t],()=>N.map(e=>(function(t,e,n){const r=t[e]||!1;return i.b`
  <p>
    <input type="checkbox" ?checked=${r} @click=${()=>n(_({...t,[e]:!r}))}>
      ${e}
    </input>
  </p>`})(t,e,s)))}
    <p>
      <div class="">
        <p>message count = ${n}</p>
        <input type="range" min="10" max="1000" value=${n} step="1" @change=${t=>s(y(t.target.valueAsNumber))}/>
      </div>
    </p>
    <p>
      <button
        @click=${()=>s(x("StructuralCloning"))}
      >
        structural
      </button>
    </p>
    <p>
      <button
        @click=${()=>s(x("Binary"))}
      >
        binary
      </button>
    </p>
    <p>
      <button
        @click=${()=>s(x("WASM"))}
      >
        WASM
      </button>
    </p>
    <p>
      <button
        @click=${()=>s(x("JSON"))}
      >
        json
      </button>
    </p>
    <p>
    <p style="margin-left: 10px">
      Result:
      <p>
        ${Object(o.a)([r],()=>p.match(r,{InProgress:()=>i.b`
                <div>Running...</div>
              `,NotStarted:()=>i.b`
                <div>Press a button to start</div>
              `,Finished:(t,e)=>i.b`
                <div>${t} took: ${e}ms</div>
              `}))}
      </p>
    </p>
    <p>Payload example (there are ${1e3} in a packet ):</p>
      ${Object(o.a)([t],()=>{const n=Object(e.c)(t),r=S(n),s=(new TextEncoder).encode(JSON.stringify(n)).length;return i.b`
          <pre>${JSON.stringify(n,null,2)}</pre>
          <p>payload size in: binary=${r}, utf8 JSON=${s}</p>
        `})}
    </p>
  `,S=t=>e.a[a.j].write({arr:new Uint8Array(1),pos:0},t).pos;const k=(t,n)=>{b.match(t,{RunBenchmark:(t,r)=>{(()=>{switch(r){case"Binary":return l("binary")(t);case"WASM":return l("binary_for_wasm")(t);case"JSON":return h(t);case"StructuralCloning":return d(t)}})().then(t=>(Object(e.d)(r,t),n(O(r,t))))},GenerateMessages:(t,r,s)=>n(w(t,Array.from({length:s},()=>Object(e.b)(1e3,r))))})},V=(t,e)=>Object(i.c)(A(t,e),document.body);c.onmessage=function t({data:e}){"ready"===e&&(c.removeEventListener("message",t),(t=>{let e=t;V(e,(function t(n){const[r,s]=j(e,n);e=r,s&&k(s,t),V(r,t)}))})({packetCount:100,options:{f64:!0},result:m}))}}.call(this,n(7))},function(t,e,n){t.exports=n.p+"0.worker.js"}]);