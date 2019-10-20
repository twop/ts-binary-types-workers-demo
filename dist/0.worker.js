!(function(e) {
  self.webpackChunk = function(t, r) {
    for (var o in r) e[o] = r[o];
    for (; t.length; ) n[t.pop()] = 1;
  };
  var t = {},
    n = { 0: 1 },
    r = {};
  var o = {
    2: function() {
      return {
        "./index.js": {
          __wbindgen_string_new: function(e, n) {
            return t[1].exports.__wbindgen_string_new(e, n);
          },
          __widl_f_log_1_: function(e) {
            return t[1].exports.__widl_f_log_1_(e);
          },
          __wbindgen_object_drop_ref: function(e) {
            return t[1].exports.__wbindgen_object_drop_ref(e);
          },
          __wbindgen_memory: function() {
            return t[1].exports.__wbindgen_memory();
          },
          __wbg_buffer_cdcb54e9871fd20a: function(e) {
            return t[1].exports.__wbg_buffer_cdcb54e9871fd20a(e);
          },
          __wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a: function(e, n, r) {
            return t[1].exports.__wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a(
              e,
              n,
              r
            );
          },
          __wbindgen_throw: function(e, n) {
            return t[1].exports.__wbindgen_throw(e, n);
          }
        }
      };
    }
  };
  function s(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, s), (r.l = !0), r.exports;
  }
  (s.e = function(e) {
    var t = [];
    return (
      t.push(
        Promise.resolve().then(function() {
          n[e] || importScripts(s.p + "" + ({}[e] || e) + ".worker.js");
        })
      ),
      ({ 1: [2] }[e] || []).forEach(function(e) {
        var n = r[e];
        if (n) t.push(n);
        else {
          var a,
            c = o[e](),
            u = fetch(
              s.p + "" + { 2: "5e35e5f14292879fc89f" }[e] + ".module.wasm"
            );
          if (
            c instanceof Promise &&
            "function" == typeof WebAssembly.compileStreaming
          )
            a = Promise.all([WebAssembly.compileStreaming(u), c]).then(function(
              e
            ) {
              return WebAssembly.instantiate(e[0], e[1]);
            });
          else if ("function" == typeof WebAssembly.instantiateStreaming)
            a = WebAssembly.instantiateStreaming(u, c);
          else {
            a = u
              .then(function(e) {
                return e.arrayBuffer();
              })
              .then(function(e) {
                return WebAssembly.instantiate(e, c);
              });
          }
          t.push(
            (r[e] = a.then(function(t) {
              return (s.w[e] = (t.instance || t).exports);
            }))
          );
        }
      }),
      Promise.all(t)
    );
  }),
    (s.m = e),
    (s.c = t),
    (s.d = function(e, t, n) {
      s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (s.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (s.t = function(e, t) {
      if ((1 & t && (e = s(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (s.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          s.d(
            n,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (s.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return s.d(t, "a", t), t;
    }),
    (s.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (s.p = ""),
    (s.w = {}),
    s((s.s = 0));
})([
  function(e, t, n) {
    "use strict";
    n.r(t);
    const r = new Uint32Array(2),
      o = new Uint16Array(r.buffer),
      s = new Uint8Array(r.buffer),
      a = new Float32Array(r.buffer),
      c = new Float64Array(r.buffer),
      u = new Int32Array(r.buffer),
      i = (e, t) => {
        const { arr: n, pos: r } = e;
        if (n.length - r > t) return e;
        const o = Math.max(2 * n.length, n.length + t),
          s = new Uint8Array(o);
        return s.set(n, 0), { arr: s, pos: r };
      },
      l = (e, t) => {
        const { arr: n, pos: r } = e;
        return (n[r] = t), (e.pos += 1), e;
      },
      f = (e, t) => l(i(e, 1), t),
      b = (e, t) => l(l(l(l(i(e, 4), t), t >> 8), t >> 16), t >> 24),
      p = (e, t) => b(b(i(e, 8), t), 0),
      _ = new TextEncoder(),
      d =
        "encodeInto" in _
          ? (e, t, n) => _.encodeInto(e, new Uint8Array(t.buffer, n)).written
          : (e, t, n) => {
              const r = _.encode(e);
              return t.set(r, n), r.length;
            },
      g = e => e.arr[e.pos++],
      w = g,
      y = e => (
        (s[0] = w(e)), (s[1] = w(e)), (s[2] = w(e)), (s[3] = w(e)), r[0]
      ),
      m = e => {
        const t = y(e);
        return (e.pos += 4), t;
      },
      h = new TextDecoder(),
      v = Symbol("bindesc"),
      U = (e, t, n, r, o) => (
        (o[v] = Object.assign(r, { read: e, write: t, tag: n })), o
      );
    var j;
    !(function(e) {
      (e.Bool = "Bool"),
        (e.Str = "Str"),
        (e.U32 = "U32"),
        (e.F32 = "F32"),
        (e.F64 = "F64"),
        (e.U16 = "U16"),
        (e.I32 = "I32"),
        (e.U8 = "U8"),
        (e.Enum = "Enum"),
        (e.Struct = "Struct"),
        (e.Tuple = "Tuple"),
        (e.Union = "Union"),
        (e.Optional = "Optional"),
        (e.Nullable = "Nullable"),
        (e.Vec = "Vec");
    })(j || (j = {}));
    const A = U(e => 1 === w(e), (e, t) => f(e, t ? 1 : 0), j.Bool, {}, {}),
      S =
        (U(y, b, j.U32, {}, {}),
        U(g, f, j.U8, {}, {}),
        U(
          e => ((s[0] = w(e)), (s[1] = w(e)), o[0]),
          (e, t) => l(l(i(e, 2), t), t >> 8),
          j.U16,
          {},
          {}
        ),
        U(
          e => (
            (s[0] = w(e)), (s[1] = w(e)), (s[2] = w(e)), (s[3] = w(e)), a[0]
          ),
          (e, t) => ((a[0] = t), b(i(e, 4), r[0])),
          j.F32,
          {},
          {}
        ),
        U(
          e => {
            for (let t = 0; t < 8; t++) s[t] = w(e);
            return c[0];
          },
          (e, t) => ((c[0] = t), b(b(i(e, 8), r[0]), r[1])),
          j.F64,
          {},
          {}
        )),
      O = U(
        e => ((s[0] = w(e)), (s[1] = w(e)), (s[2] = w(e)), (s[3] = w(e)), u[0]),
        (e, t) => ((u[0] = t), b(i(e, 4), r[0])),
        j.I32,
        {},
        {}
      ),
      x = e => {
        const { read: t, write: n } = e[v];
        return U(
          (e => t => (1 === w(t) ? e(t) : void 0))(t),
          (e => (t, n) => (void 0 === n ? f(t, 0) : e(f(t, 1), n)))(n),
          j.Optional,
          { type: e },
          {}
        );
      },
      k = U(
        e => {
          const t = m(e),
            n = h.decode(new Uint8Array(e.arr.buffer, e.pos, t));
          return (e.pos += t), n;
        },
        (e, t) => {
          e = i(e, 3 * t.length + 8);
          const n = d(t, e.arr, e.pos + 8);
          return ((e = p(e, n)).pos += n), e;
        },
        j.Str,
        {},
        {}
      ),
      M = e => U(T(e), P(e), j.Struct, { fields: e }, {}),
      P = e => F(void 0, 0, Object.keys(e), e),
      F = (e, t, n, r) => {
        if (t >= n.length) return e || ((e, t) => e);
        const o = n[t],
          s = r[o][v].write;
        return F(
          e ? (t, n) => s(e(t, n), n[o]) : (e, t) => s(e, t[o]),
          t + 1,
          n,
          r
        );
      },
      T = e => {
        const t = Object.keys(e),
          n = t.map(t => e[t][v].read);
        return function(e) {
          const r = {};
          for (let o = 0; o < t.length; o++) r[t[o]] = n[o](e);
          return r;
        };
      };
    const E = e => {
        const t = {};
        return (
          Object.keys(e).forEach((n, r) => {
            const o = e[n];
            if (null === o) t[n] = (e, t) => b(e, r);
            else {
              const e = o[v].write;
              t[n] = (t, n) => e(b(t, r), n);
            }
          }),
          (e, { tag: n, val: r }) => t[n](e, r)
        );
      },
      I = e => {
        const t = Object.keys(e),
          n = t.map(t => {
            const n = e[t];
            return n && n[v].read;
          }),
          r = t.map(t => {
            return e[t] ? null : { tag: t, val: void 0 };
          });
        return e => {
          const o = y(e),
            s = n[o],
            a = t[o];
          return s ? { tag: a, val: s(e) } : r[o];
        };
      },
      W = e =>
        Object.keys(e).reduce((t, n) => {
          const r = e[n];
          return (
            (t[n] =
              null === r ? { tag: n, val: void 0 } : e => ({ tag: n, val: e })),
            t
          );
        }, {}),
      B = e => {
        const { read: t, write: n } = e[v];
        return U(
          (e => t => {
            const n = m(t),
              r = new Array();
            for (let o = 0; o < n; o++) r.push(e(t));
            return r;
          })(t),
          (e => (t, n) => n.reduce(e, p(t, n.length)))(n),
          j.Vec,
          { type: e },
          {}
        );
      },
      N = (function(...e) {
        let t;
        const n = e,
          r = n.map(e => e[v].write),
          o = n.map(e => e[v].read);
        let s, a;
        switch (n.length) {
          case 2: {
            t = (e, t) => [e, t];
            const [e, n] = r;
            s = (t, [r, o]) => n(e(t, r), o);
            const [c, u] = o;
            a = e => t(c(e), u(e));
            break;
          }
          case 3: {
            t = (e, t, n) => [e, t, n];
            const [e, n, c] = r;
            s = (t, [r, o, s]) => c(n(e(t, r), o), s);
            const [u, i, l] = o;
            a = e => t(u(e), i(e), l(e));
            break;
          }
          default:
            (t = (...e) => e),
              (s = (e, t) => t.reduce((e, t, n) => r[n](e, t), e)),
              (a = e => o.map(t => t(e)));
        }
        return U(a, s, j.Tuple, { components: n }, t);
      })(A, O),
      V = M({ bool: A, i32vec: B(O) }),
      J = (e => U(I(e), E(e), j.Union, { variants: e }, W(e)))({
        unit: null,
        val: V
      }),
      C = B(
        M({ str: x(k), f64: x(S), tuple: x(N), union: x(J), struct: x(V) })
      );
    const D = C[v].write,
      q = C[v].read;
    const z = globalThis;
    n.e(1)
      .then(n.bind(null, 1))
      .then(({ Echo: e }) => {
        const t = e.new();
        (z.onmessage = ({ data: e }) => {
          const n = e;
          switch (n.tag) {
            case "structural":
              postMessage(n);
              break;
            case "json":
              const e = JSON.parse(n.val),
                r = { tag: "json", val: JSON.stringify(e) };
              postMessage(r);
              break;
            case "binary": {
              const e = new Uint8Array(n.val),
                t = ((e, t) => {
                  const { arr: n } = D({ arr: t, pos: 0 }, e);
                  return n;
                })(
                  (e => {
                    return q({ arr: e, pos: 0 });
                  })(e),
                  e
                ).buffer;
              postMessage(t, [t]);
              break;
            }
            case "binary_for_wasm": {
              let e = new Uint8Array(n.val);
              t.allocate_space(e.length).set(e);
              const r = t.handle_message();
              e.length < r && (e = new Uint8Array(r)),
                e.set(t.view_memory()),
                postMessage(e.buffer, [e.buffer]);
              break;
            }
          }
        }),
          postMessage("ready");
      })
      .catch(console.error);
  }
]);
