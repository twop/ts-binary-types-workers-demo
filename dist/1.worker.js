self.webpackChunk(
  [1],
  [
    ,
    function(n, t, r) {
      "use strict";
      r.r(t),
        r.d(t, "main_js", function() {
          return u;
        }),
        r.d(t, "Echo", function() {
          return l;
        }),
        r.d(t, "__wbindgen_string_new", function() {
          return w;
        }),
        r.d(t, "__widl_f_log_1_", function() {
          return b;
        }),
        r.d(t, "__wbindgen_object_drop_ref", function() {
          return h;
        }),
        r.d(t, "__wbindgen_memory", function() {
          return g;
        }),
        r.d(t, "__wbg_buffer_cdcb54e9871fd20a", function() {
          return p;
        }),
        r.d(t, "__wbg_newwithbyteoffsetandlength_eaca81bb9f532a5a", function() {
          return y;
        }),
        r.d(t, "__wbindgen_throw", function() {
          return m;
        });
      var e = r(2);
      function u() {
        e.g();
      }
      const o = new Array(32);
      function c(n) {
        return o[n];
      }
      o.fill(void 0), o.push(void 0, null, !0, !1);
      let i = o.length;
      function f(n) {
        const t = c(n);
        return (
          (function(n) {
            n < 36 || ((o[n] = i), (i = n));
          })(n),
          t
        );
      }
      let _ = new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }),
        s = null;
      function a(n, t) {
        return _.decode(
          ((null !== s && s.buffer === e.h.buffer) ||
            (s = new Uint8Array(e.h.buffer)),
          s).subarray(n, n + t)
        );
      }
      function d(n) {
        i === o.length && o.push(o.length + 1);
        const t = i;
        return (i = o[t]), (o[t] = n), t;
      }
      class l {
        static __wrap(n) {
          const t = Object.create(l.prototype);
          return (t.ptr = n), t;
        }
        free() {
          const n = this.ptr;
          (this.ptr = 0), e.a(n);
        }
        static new() {
          const n = e.e();
          return l.__wrap(n);
        }
        allocate_space(n) {
          return f(e.c(this.ptr, n));
        }
        handle_message() {
          return e.d(this.ptr) >>> 0;
        }
        view_memory() {
          return f(e.f(this.ptr));
        }
      }
      const w = function(n, t) {
          return d(a(n, t));
        },
        b = function(n) {
          console.log(c(n));
        },
        h = function(n) {
          f(n);
        },
        g = function() {
          return d(e.h);
        },
        p = function(n) {
          return d(c(n).buffer);
        },
        y = function(n, t, r) {
          return d(new Uint8Array(c(n), t >>> 0, r >>> 0));
        },
        m = function(n, t) {
          throw new Error(a(n, t));
        };
      e.b();
    },
    function(n, t, r) {
      "use strict";
      var e = r.w[n.i];
      n.exports = e;
      r(1);
      e.i();
    }
  ]
);
