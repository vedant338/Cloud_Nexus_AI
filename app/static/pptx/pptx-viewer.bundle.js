var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/jszip/dist/jszip.min.js
var require_jszip_min = __commonJS({
  "node_modules/jszip/dist/jszip.min.js"(exports, module) {
    !(function(e) {
      if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
      else if ("function" == typeof define && define.amd) define([], e);
      else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
      }
    })(function() {
      return (function s(a, o2, h2) {
        function u2(r, e2) {
          if (!o2[r]) {
            if (!a[r]) {
              var t = "function" == typeof __require && __require;
              if (!e2 && t) return t(r, true);
              if (l2) return l2(r, true);
              var n2 = new Error("Cannot find module '" + r + "'");
              throw n2.code = "MODULE_NOT_FOUND", n2;
            }
            var i2 = o2[r] = { exports: {} };
            a[r][0].call(i2.exports, function(e3) {
              var t2 = a[r][1][e3];
              return u2(t2 || e3);
            }, i2, i2.exports, s, a, o2, h2);
          }
          return o2[r].exports;
        }
        for (var l2 = "function" == typeof __require && __require, e = 0; e < h2.length; e++) u2(h2[e]);
        return u2;
      })({ 1: [function(e, t, r) {
        "use strict";
        var d2 = e("./utils"), c = e("./support"), p2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        r.encode = function(e2) {
          for (var t2, r2, n2, i2, s, a, o2, h2 = [], u2 = 0, l2 = e2.length, f2 = l2, c2 = "string" !== d2.getTypeOf(e2); u2 < e2.length; ) f2 = l2 - u2, n2 = c2 ? (t2 = e2[u2++], r2 = u2 < l2 ? e2[u2++] : 0, u2 < l2 ? e2[u2++] : 0) : (t2 = e2.charCodeAt(u2++), r2 = u2 < l2 ? e2.charCodeAt(u2++) : 0, u2 < l2 ? e2.charCodeAt(u2++) : 0), i2 = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f2 ? (15 & r2) << 2 | n2 >> 6 : 64, o2 = 2 < f2 ? 63 & n2 : 64, h2.push(p2.charAt(i2) + p2.charAt(s) + p2.charAt(a) + p2.charAt(o2));
          return h2.join("");
        }, r.decode = function(e2) {
          var t2, r2, n2, i2, s, a, o2 = 0, h2 = 0, u2 = "data:";
          if (e2.substr(0, u2.length) === u2) throw new Error("Invalid base64 input, it looks like a data url.");
          var l2, f2 = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (e2.charAt(e2.length - 1) === p2.charAt(64) && f2--, e2.charAt(e2.length - 2) === p2.charAt(64) && f2--, f2 % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (l2 = c.uint8array ? new Uint8Array(0 | f2) : new Array(0 | f2); o2 < e2.length; ) t2 = p2.indexOf(e2.charAt(o2++)) << 2 | (i2 = p2.indexOf(e2.charAt(o2++))) >> 4, r2 = (15 & i2) << 4 | (s = p2.indexOf(e2.charAt(o2++))) >> 2, n2 = (3 & s) << 6 | (a = p2.indexOf(e2.charAt(o2++))), l2[h2++] = t2, 64 !== s && (l2[h2++] = r2), 64 !== a && (l2[h2++] = n2);
          return l2;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
        "use strict";
        var n2 = e("./external"), i2 = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
        function o2(e2, t2, r2, n3, i3) {
          this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n3, this.compressedContent = i3;
        }
        o2.prototype = { getContentWorker: function() {
          var e2 = new i2(n2.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
          return e2.on("end", function() {
            if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), e2;
        }, getCompressedWorker: function() {
          return new i2(n2.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, o2.createWorkerFrom = function(e2, t2, r2) {
          return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
        }, t.exports = o2;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
        "use strict";
        var n2 = e("./stream/GenericWorker");
        r.STORE = { magic: "\0\0", compressWorker: function() {
          return new n2("STORE compression");
        }, uncompressWorker: function() {
          return new n2("STORE decompression");
        } }, r.DEFLATE = e("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
        "use strict";
        var n2 = e("./utils");
        var o2 = (function() {
          for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
            e2 = r2;
            for (var n3 = 0; n3 < 8; n3++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r2] = e2;
          }
          return t2;
        })();
        t.exports = function(e2, t2) {
          return void 0 !== e2 && e2.length ? "string" !== n2.getTypeOf(e2) ? (function(e3, t3, r2, n3) {
            var i2 = o2, s = n3 + r2;
            e3 ^= -1;
            for (var a = n3; a < s; a++) e3 = e3 >>> 8 ^ i2[255 & (e3 ^ t3[a])];
            return -1 ^ e3;
          })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r2, n3) {
            var i2 = o2, s = n3 + r2;
            e3 ^= -1;
            for (var a = n3; a < s; a++) e3 = e3 >>> 8 ^ i2[255 & (e3 ^ t3.charCodeAt(a))];
            return -1 ^ e3;
          })(0 | t2, e2, e2.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(e, t, r) {
        "use strict";
        r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
      }, {}], 6: [function(e, t, r) {
        "use strict";
        var n2 = null;
        n2 = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n2 };
      }, { lie: 37 }], 7: [function(e, t, r) {
        "use strict";
        var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i2 = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o2 = n2 ? "uint8array" : "array";
        function h2(e2, t2) {
          a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
        }
        r.magic = "\b\0", s.inherits(h2, a), h2.prototype.processChunk = function(e2) {
          this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o2, e2.data), false);
        }, h2.prototype.flush = function() {
          a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
        }, h2.prototype.cleanUp = function() {
          a.prototype.cleanUp.call(this), this._pako = null;
        }, h2.prototype._createPako = function() {
          this._pako = new i2[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
          var t2 = this;
          this._pako.onData = function(e2) {
            t2.push({ data: e2, meta: t2.meta });
          };
        }, r.compressWorker = function(e2) {
          return new h2("Deflate", e2);
        }, r.uncompressWorker = function() {
          return new h2("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
        "use strict";
        function A2(e2, t2) {
          var r2, n3 = "";
          for (r2 = 0; r2 < t2; r2++) n3 += String.fromCharCode(255 & e2), e2 >>>= 8;
          return n3;
        }
        function n2(e2, t2, r2, n3, i3, s2) {
          var a, o2, h2 = e2.file, u2 = e2.compression, l2 = s2 !== O2.utf8encode, f2 = I2.transformTo("string", s2(h2.name)), c = I2.transformTo("string", O2.utf8encode(h2.name)), d2 = h2.comment, p2 = I2.transformTo("string", s2(d2)), m2 = I2.transformTo("string", O2.utf8encode(d2)), _2 = c.length !== h2.name.length, g2 = m2.length !== d2.length, b2 = "", v2 = "", y2 = "", w2 = h2.dir, k2 = h2.date, x2 = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          t2 && !r2 || (x2.crc32 = e2.crc32, x2.compressedSize = e2.compressedSize, x2.uncompressedSize = e2.uncompressedSize);
          var S2 = 0;
          t2 && (S2 |= 8), l2 || !_2 && !g2 || (S2 |= 2048);
          var z2 = 0, C2 = 0;
          w2 && (z2 |= 16), "UNIX" === i3 ? (C2 = 798, z2 |= (function(e3, t3) {
            var r3 = e3;
            return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
          })(h2.unixPermissions, w2)) : (C2 = 20, z2 |= (function(e3) {
            return 63 & (e3 || 0);
          })(h2.dosPermissions)), a = k2.getUTCHours(), a <<= 6, a |= k2.getUTCMinutes(), a <<= 5, a |= k2.getUTCSeconds() / 2, o2 = k2.getUTCFullYear() - 1980, o2 <<= 4, o2 |= k2.getUTCMonth() + 1, o2 <<= 5, o2 |= k2.getUTCDate(), _2 && (v2 = A2(1, 1) + A2(B2(f2), 4) + c, b2 += "up" + A2(v2.length, 2) + v2), g2 && (y2 = A2(1, 1) + A2(B2(p2), 4) + m2, b2 += "uc" + A2(y2.length, 2) + y2);
          var E2 = "";
          return E2 += "\n\0", E2 += A2(S2, 2), E2 += u2.magic, E2 += A2(a, 2), E2 += A2(o2, 2), E2 += A2(x2.crc32, 4), E2 += A2(x2.compressedSize, 4), E2 += A2(x2.uncompressedSize, 4), E2 += A2(f2.length, 2), E2 += A2(b2.length, 2), { fileRecord: R2.LOCAL_FILE_HEADER + E2 + f2 + b2, dirRecord: R2.CENTRAL_FILE_HEADER + A2(C2, 2) + E2 + A2(p2.length, 2) + "\0\0\0\0" + A2(z2, 4) + A2(n3, 4) + f2 + b2 + p2 };
        }
        var I2 = e("../utils"), i2 = e("../stream/GenericWorker"), O2 = e("../utf8"), B2 = e("../crc32"), R2 = e("../signature");
        function s(e2, t2, r2, n3) {
          i2.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n3, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        I2.inherits(s, i2), s.prototype.push = function(e2) {
          var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n3 = this._sources.length;
          this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i2.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n3 - 1)) / r2 : 100 } }));
        }, s.prototype.openedSource = function(e2) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
          var t2 = this.streamFiles && !e2.file.dir;
          if (t2) {
            var r2 = n2(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: r2.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = true;
        }, s.prototype.closedSource = function(e2) {
          this.accumulate = false;
          var t2 = this.streamFiles && !e2.file.dir, r2 = n2(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: (function(e3) {
            return R2.DATA_DESCRIPTOR + A2(e3.crc32, 4) + A2(e3.compressedSize, 4) + A2(e3.uncompressedSize, 4);
          })(e2), meta: { percent: 100 } });
          else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, s.prototype.flush = function() {
          for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
          var r2 = this.bytesWritten - e2, n3 = (function(e3, t3, r3, n4, i3) {
            var s2 = I2.transformTo("string", i3(n4));
            return R2.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A2(e3, 2) + A2(e3, 2) + A2(t3, 4) + A2(r3, 4) + A2(s2.length, 2) + s2;
          })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
          this.push({ data: n3, meta: { percent: 100 } });
        }, s.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, s.prototype.registerPrevious = function(e2) {
          this._sources.push(e2);
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, s.prototype.resume = function() {
          return !!i2.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
        }, s.prototype.error = function(e2) {
          var t2 = this._sources;
          if (!i2.prototype.error.call(this, e2)) return false;
          for (var r2 = 0; r2 < t2.length; r2++) try {
            t2[r2].error(e2);
          } catch (e3) {
          }
          return true;
        }, s.prototype.lock = function() {
          i2.prototype.lock.call(this);
          for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
        }, t.exports = s;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
        "use strict";
        var u2 = e("../compressions"), n2 = e("./ZipFileWorker");
        r.generateWorker = function(e2, a, t2) {
          var o2 = new n2(a.streamFiles, t2, a.platform, a.encodeFileName), h2 = 0;
          try {
            e2.forEach(function(e3, t3) {
              h2++;
              var r2 = (function(e4, t4) {
                var r3 = e4 || t4, n4 = u2[r3];
                if (!n4) throw new Error(r3 + " is not a valid compression method !");
                return n4;
              })(t3.options.compression, a.compression), n3 = t3.options.compressionOptions || a.compressionOptions || {}, i2 = t3.dir, s = t3.date;
              t3._compressWorker(r2, n3).withStreamInfo("file", { name: e3, dir: i2, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o2);
            }), o2.entriesCount = h2;
          } catch (e3) {
            o2.error(e3);
          }
          return o2;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
        "use strict";
        function n2() {
          if (!(this instanceof n2)) return new n2();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var e2 = new n2();
            for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
            return e2;
          };
        }
        (n2.prototype = e("./object")).loadAsync = e("./load"), n2.support = e("./support"), n2.defaults = e("./defaults"), n2.version = "3.10.2", n2.loadAsync = function(e2, t2) {
          return new n2().loadAsync(e2, t2);
        }, n2.external = e("./external"), t.exports = n2;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
        "use strict";
        var u2 = e("./utils"), i2 = e("./external"), n2 = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l2 = e("./nodejsUtils");
        function f2(n3) {
          return new i2.Promise(function(e2, t2) {
            var r2 = n3.decompressed.getContentWorker().pipe(new a());
            r2.on("error", function(e3) {
              t2(e3);
            }).on("end", function() {
              r2.streamInfo.crc32 !== n3.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
            }).resume();
          });
        }
        t.exports = function(e2, o2) {
          var h2 = this;
          return o2 = u2.extend(o2 || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n2.utf8decode }), l2.isNode && l2.isStream(e2) ? i2.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u2.prepareContent("the loaded zip file", e2, true, o2.optimizedBinaryString, o2.base64).then(function(e3) {
            var t2 = new s(o2);
            return t2.load(e3), t2;
          }).then(function(e3) {
            var t2 = [i2.Promise.resolve(e3)], r2 = e3.files;
            if (o2.checkCRC32) for (var n3 = 0; n3 < r2.length; n3++) t2.push(f2(r2[n3]));
            return i2.Promise.all(t2);
          }).then(function(e3) {
            for (var t2 = e3.shift(), r2 = t2.files, n3 = 0; n3 < r2.length; n3++) {
              var i3 = r2[n3], s2 = i3.fileNameStr, a2 = u2.resolve(i3.fileNameStr);
              h2.file(a2, i3.decompressed, { binary: true, optimizedBinaryString: true, date: i3.date, dir: i3.dir, comment: i3.fileCommentStr.length ? i3.fileCommentStr : null, unixPermissions: i3.unixPermissions, dosPermissions: i3.dosPermissions, createFolders: o2.createFolders }), i3.dir || (h2.file(a2).unsafeOriginalName = s2);
            }
            return t2.zipComment.length && (h2.comment = t2.zipComment), h2;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
        "use strict";
        var n2 = e("../utils"), i2 = e("../stream/GenericWorker");
        function s(e2, t2) {
          i2.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
        }
        n2.inherits(s, i2), s.prototype._bindStream = function(e2) {
          var t2 = this;
          (this._stream = e2).pause(), e2.on("data", function(e3) {
            t2.push({ data: e3, meta: { percent: 0 } });
          }).on("error", function(e3) {
            t2.isPaused ? this.generatedError = e3 : t2.error(e3);
          }).on("end", function() {
            t2.isPaused ? t2._upstreamEnded = true : t2.end();
          });
        }, s.prototype.pause = function() {
          return !!i2.prototype.pause.call(this) && (this._stream.pause(), true);
        }, s.prototype.resume = function() {
          return !!i2.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
        }, t.exports = s;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
        "use strict";
        var i2 = e("readable-stream").Readable;
        function n2(e2, t2, r2) {
          i2.call(this, t2), this._helper = e2;
          var n3 = this;
          e2.on("data", function(e3, t3) {
            n3.push(e3) || n3._helper.pause(), r2 && r2(t3);
          }).on("error", function(e3) {
            n3.emit("error", e3);
          }).on("end", function() {
            n3.push(null);
          });
        }
        e("../utils").inherits(n2, i2), n2.prototype._read = function() {
          this._helper.resume();
        }, t.exports = n2;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
        "use strict";
        t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
          if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
          return new Buffer(e2, t2);
        }, allocBuffer: function(e2) {
          if (Buffer.alloc) return Buffer.alloc(e2);
          var t2 = new Buffer(e2);
          return t2.fill(0), t2;
        }, isBuffer: function(e2) {
          return Buffer.isBuffer(e2);
        }, isStream: function(e2) {
          return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
        } };
      }, {}], 15: [function(e, t, r) {
        "use strict";
        function s(e2, t2, r2) {
          var n3, i3 = u2.getTypeOf(t2), s2 = u2.extend(r2 || {}, f2);
          s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g2(e2)), s2.createFolders && (n3 = _2(e2)) && b2.call(this, n3, true);
          var a2 = "string" === i3 && false === s2.binary && false === s2.base64;
          r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i3 = "string");
          var o3 = null;
          o3 = t2 instanceof c || t2 instanceof l2 ? t2 : p2.isNode && p2.isStream(t2) ? new m2(e2, t2) : u2.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
          var h3 = new d2(e2, o3, s2);
          this.files[e2] = h3;
        }
        var i2 = e("./utf8"), u2 = e("./utils"), l2 = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f2 = e("./defaults"), c = e("./compressedObject"), d2 = e("./zipObject"), o2 = e("./generate"), p2 = e("./nodejsUtils"), m2 = e("./nodejs/NodejsStreamInputAdapter"), _2 = function(e2) {
          "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
          var t2 = e2.lastIndexOf("/");
          return 0 < t2 ? e2.substring(0, t2) : "";
        }, g2 = function(e2) {
          return "/" !== e2.slice(-1) && (e2 += "/"), e2;
        }, b2 = function(e2, t2) {
          return t2 = void 0 !== t2 ? t2 : f2.createFolders, e2 = g2(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
        };
        function h2(e2) {
          return "[object RegExp]" === Object.prototype.toString.call(e2);
        }
        var n2 = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(e2) {
          var t2, r2, n3;
          for (t2 in this.files) n3 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n3);
        }, filter: function(r2) {
          var n3 = [];
          return this.forEach(function(e2, t2) {
            r2(e2, t2) && n3.push(t2);
          }), n3;
        }, file: function(e2, t2, r2) {
          if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
          if (h2(e2)) {
            var n3 = e2;
            return this.filter(function(e3, t3) {
              return !t3.dir && n3.test(e3);
            });
          }
          var i3 = this.files[this.root + e2];
          return i3 && !i3.dir ? i3 : null;
        }, folder: function(r2) {
          if (!r2) return this;
          if (h2(r2)) return this.filter(function(e3, t3) {
            return t3.dir && r2.test(e3);
          });
          var e2 = this.root + r2, t2 = b2.call(this, e2), n3 = this.clone();
          return n3.root = t2.name, n3;
        }, remove: function(r2) {
          r2 = this.root + r2;
          var e2 = this.files[r2];
          if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
          else for (var t2 = this.filter(function(e3, t3) {
            return t3.name.slice(0, r2.length) === r2;
          }), n3 = 0; n3 < t2.length; n3++) delete this.files[t2[n3].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(e2) {
          var t2, r2 = {};
          try {
            if ((r2 = u2.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i2.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
            u2.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
            var n3 = r2.comment || this.comment || "";
            t2 = o2.generateWorker(this, r2, n3);
          } catch (e3) {
            (t2 = new l2("error")).error(e3);
          }
          return new a(t2, r2.type || "string", r2.mimeType);
        }, generateAsync: function(e2, t2) {
          return this.generateInternalStream(e2).accumulate(t2);
        }, generateNodeStream: function(e2, t2) {
          return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
        } };
        t.exports = n2;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
        "use strict";
        t.exports = e("stream");
      }, { stream: void 0 }], 17: [function(e, t, r) {
        "use strict";
        var n2 = e("./DataReader");
        function i2(e2) {
          n2.call(this, e2);
          for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
        }
        e("../utils").inherits(i2, n2), i2.prototype.byteAt = function(e2) {
          return this.data[this.zero + e2];
        }, i2.prototype.lastIndexOfSignature = function(e2) {
          for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n3 = e2.charCodeAt(2), i3 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n3 && this.data[s + 3] === i3) return s - this.zero;
          return -1;
        }, i2.prototype.readAndCheckSignature = function(e2) {
          var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n3 = e2.charCodeAt(2), i3 = e2.charCodeAt(3), s = this.readData(4);
          return t2 === s[0] && r2 === s[1] && n3 === s[2] && i3 === s[3];
        }, i2.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return [];
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
        "use strict";
        var n2 = e("../utils");
        function i2(e2) {
          this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
        }
        i2.prototype = { checkOffset: function(e2) {
          this.checkIndex(this.index + e2);
        }, checkIndex: function(e2) {
          if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
        }, setIndex: function(e2) {
          this.checkIndex(e2), this.index = e2;
        }, skip: function(e2) {
          this.setIndex(this.index + e2);
        }, byteAt: function() {
        }, readInt: function(e2) {
          var t2, r2 = 0;
          for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
          return this.index += e2, r2;
        }, readString: function(e2) {
          return n2.transformTo("string", this.readData(e2));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var e2 = this.readInt(4);
          return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
        } }, t.exports = i2;
      }, { "../utils": 32 }], 19: [function(e, t, r) {
        "use strict";
        var n2 = e("./Uint8ArrayReader");
        function i2(e2) {
          n2.call(this, e2);
        }
        e("../utils").inherits(i2, n2), i2.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
        "use strict";
        var n2 = e("./DataReader");
        function i2(e2) {
          n2.call(this, e2);
        }
        e("../utils").inherits(i2, n2), i2.prototype.byteAt = function(e2) {
          return this.data.charCodeAt(this.zero + e2);
        }, i2.prototype.lastIndexOfSignature = function(e2) {
          return this.data.lastIndexOf(e2) - this.zero;
        }, i2.prototype.readAndCheckSignature = function(e2) {
          return e2 === this.readData(4);
        }, i2.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
        "use strict";
        var n2 = e("./ArrayReader");
        function i2(e2) {
          n2.call(this, e2);
        }
        e("../utils").inherits(i2, n2), i2.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
          var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i2;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
        "use strict";
        var n2 = e("../utils"), i2 = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o2 = e("./NodeBufferReader"), h2 = e("./Uint8ArrayReader");
        t.exports = function(e2) {
          var t2 = n2.getTypeOf(e2);
          return n2.checkSupport(t2), "string" !== t2 || i2.uint8array ? "nodebuffer" === t2 ? new o2(e2) : i2.uint8array ? new h2(n2.transformTo("uint8array", e2)) : new s(n2.transformTo("array", e2)) : new a(e2);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
        "use strict";
        r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(e, t, r) {
        "use strict";
        var n2 = e("./GenericWorker"), i2 = e("../utils");
        function s(e2) {
          n2.call(this, "ConvertWorker to " + e2), this.destType = e2;
        }
        i2.inherits(s, n2), s.prototype.processChunk = function(e2) {
          this.push({ data: i2.transformTo(this.destType, e2.data), meta: e2.meta });
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
        "use strict";
        var n2 = e("./GenericWorker"), i2 = e("../crc32");
        function s() {
          n2.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        e("../utils").inherits(s, n2), s.prototype.processChunk = function(e2) {
          this.streamInfo.crc32 = i2(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
        }, t.exports = s;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
        "use strict";
        var n2 = e("../utils"), i2 = e("./GenericWorker");
        function s(e2) {
          i2.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
        }
        n2.inherits(s, i2), s.prototype.processChunk = function(e2) {
          if (e2) {
            var t2 = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = t2 + e2.data.length;
          }
          i2.prototype.processChunk.call(this, e2);
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
        "use strict";
        var n2 = e("../utils"), i2 = e("./GenericWorker");
        function s(e2) {
          i2.call(this, "DataWorker");
          var t2 = this;
          this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
            t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n2.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
          }, function(e3) {
            t2.error(e3);
          });
        }
        n2.inherits(s, i2), s.prototype.cleanUp = function() {
          i2.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!i2.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n2.delay(this._tickAndRepeat, [], this)), true);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n2.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return false;
          var e2 = null, t2 = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              e2 = this.data.substring(this.index, t2);
              break;
            case "uint8array":
              e2 = this.data.subarray(this.index, t2);
              break;
            case "array":
            case "nodebuffer":
              e2 = this.data.slice(this.index, t2);
          }
          return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
        "use strict";
        function n2(e2) {
          this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        n2.prototype = { push: function(e2) {
          this.emit("data", e2);
        }, end: function() {
          if (this.isFinished) return false;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = true;
          } catch (e2) {
            this.emit("error", e2);
          }
          return true;
        }, error: function(e2) {
          return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
        }, on: function(e2, t2) {
          return this._listeners[e2].push(t2), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(e2, t2) {
          if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
        }, pipe: function(e2) {
          return e2.registerPrevious(this);
        }, registerPrevious: function(e2) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return false;
          var e2 = this.isPaused = false;
          return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
        }, flush: function() {
        }, processChunk: function(e2) {
          this.push(e2);
        }, withStreamInfo: function(e2, t2) {
          return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = true, this.previous && this.previous.lock();
        }, toString: function() {
          var e2 = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + e2 : e2;
        } }, t.exports = n2;
      }, {}], 29: [function(e, t, r) {
        "use strict";
        var h2 = e("../utils"), i2 = e("./ConvertWorker"), s = e("./GenericWorker"), u2 = e("../base64"), n2 = e("../support"), a = e("../external"), o2 = null;
        if (n2.nodestream) try {
          o2 = e("../nodejs/NodejsStreamOutputAdapter");
        } catch (e2) {
        }
        function l2(e2, o3) {
          return new a.Promise(function(t2, r2) {
            var n3 = [], i3 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
            e2.on("data", function(e3, t3) {
              n3.push(e3), o3 && o3(t3);
            }).on("error", function(e3) {
              n3 = [], r2(e3);
            }).on("end", function() {
              try {
                var e3 = (function(e4, t3, r3) {
                  switch (e4) {
                    case "blob":
                      return h2.newBlob(h2.transformTo("arraybuffer", t3), r3);
                    case "base64":
                      return u2.encode(t3);
                    default:
                      return h2.transformTo(e4, t3);
                  }
                })(s2, (function(e4, t3) {
                  var r3, n4 = 0, i4 = null, s3 = 0;
                  for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                  switch (e4) {
                    case "string":
                      return t3.join("");
                    case "array":
                      return Array.prototype.concat.apply([], t3);
                    case "uint8array":
                      for (i4 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i4.set(t3[r3], n4), n4 += t3[r3].length;
                      return i4;
                    case "nodebuffer":
                      return Buffer.concat(t3);
                    default:
                      throw new Error("concat : unsupported type '" + e4 + "'");
                  }
                })(i3, n3), a2);
                t2(e3);
              } catch (e4) {
                r2(e4);
              }
              n3 = [];
            }).resume();
          });
        }
        function f2(e2, t2, r2) {
          var n3 = t2;
          switch (t2) {
            case "blob":
            case "arraybuffer":
              n3 = "uint8array";
              break;
            case "base64":
              n3 = "string";
          }
          try {
            this._internalType = n3, this._outputType = t2, this._mimeType = r2, h2.checkSupport(n3), this._worker = e2.pipe(new i2(n3)), e2.lock();
          } catch (e3) {
            this._worker = new s("error"), this._worker.error(e3);
          }
        }
        f2.prototype = { accumulate: function(e2) {
          return l2(this, e2);
        }, on: function(e2, t2) {
          var r2 = this;
          return "data" === e2 ? this._worker.on(e2, function(e3) {
            t2.call(r2, e3.data, e3.meta);
          }) : this._worker.on(e2, function() {
            h2.delay(t2, arguments, r2);
          }), this;
        }, resume: function() {
          return h2.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(e2) {
          if (h2.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
          return new o2(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
        } }, t.exports = f2;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
        "use strict";
        if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
        else {
          var n2 = new ArrayBuffer(0);
          try {
            r.blob = 0 === new Blob([n2], { type: "application/zip" }).size;
          } catch (e2) {
            try {
              var i2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              i2.append(n2), r.blob = 0 === i2.getBlob("application/zip").size;
            } catch (e3) {
              r.blob = false;
            }
          }
        }
        try {
          r.nodestream = !!e("readable-stream").Readable;
        } catch (e2) {
          r.nodestream = false;
        }
      }, { "readable-stream": 16 }], 31: [function(e, t, s) {
        "use strict";
        for (var o2 = e("./utils"), h2 = e("./support"), r = e("./nodejsUtils"), n2 = e("./stream/GenericWorker"), u2 = new Array(256), i2 = 0; i2 < 256; i2++) u2[i2] = 252 <= i2 ? 6 : 248 <= i2 ? 5 : 240 <= i2 ? 4 : 224 <= i2 ? 3 : 192 <= i2 ? 2 : 1;
        u2[254] = u2[254] = 1;
        function a() {
          n2.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function l2() {
          n2.call(this, "utf-8 encode");
        }
        s.utf8encode = function(e2) {
          return h2.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
            var t2, r2, n3, i3, s2, a2 = e3.length, o3 = 0;
            for (i3 = 0; i3 < a2; i3++) 55296 == (64512 & (r2 = e3.charCodeAt(i3))) && i3 + 1 < a2 && 56320 == (64512 & (n3 = e3.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), o3 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = h2.uint8array ? new Uint8Array(o3) : new Array(o3), i3 = s2 = 0; s2 < o3; i3++) 55296 == (64512 & (r2 = e3.charCodeAt(i3))) && i3 + 1 < a2 && 56320 == (64512 & (n3 = e3.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          })(e2);
        }, s.utf8decode = function(e2) {
          return h2.nodebuffer ? o2.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
            var t2, r2, n3, i3, s2 = e3.length, a2 = new Array(2 * s2);
            for (t2 = r2 = 0; t2 < s2; ) if ((n3 = e3[t2++]) < 128) a2[r2++] = n3;
            else if (4 < (i3 = u2[n3])) a2[r2++] = 65533, t2 += i3 - 1;
            else {
              for (n3 &= 2 === i3 ? 31 : 3 === i3 ? 15 : 7; 1 < i3 && t2 < s2; ) n3 = n3 << 6 | 63 & e3[t2++], i3--;
              1 < i3 ? a2[r2++] = 65533 : n3 < 65536 ? a2[r2++] = n3 : (n3 -= 65536, a2[r2++] = 55296 | n3 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n3);
            }
            return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o2.applyFromCharCode(a2);
          })(e2 = o2.transformTo(h2.uint8array ? "uint8array" : "array", e2));
        }, o2.inherits(a, n2), a.prototype.processChunk = function(e2) {
          var t2 = o2.transformTo(h2.uint8array ? "uint8array" : "array", e2.data);
          if (this.leftOver && this.leftOver.length) {
            if (h2.uint8array) {
              var r2 = t2;
              (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
            } else t2 = this.leftOver.concat(t2);
            this.leftOver = null;
          }
          var n3 = (function(e3, t3) {
            var r3;
            for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
            return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u2[e3[r3]] > t3 ? r3 : t3;
          })(t2), i3 = t2;
          n3 !== t2.length && (h2.uint8array ? (i3 = t2.subarray(0, n3), this.leftOver = t2.subarray(n3, t2.length)) : (i3 = t2.slice(0, n3), this.leftOver = t2.slice(n3, t2.length))), this.push({ data: s.utf8decode(i3), meta: e2.meta });
        }, a.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, s.Utf8DecodeWorker = a, o2.inherits(l2, n2), l2.prototype.processChunk = function(e2) {
          this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
        }, s.Utf8EncodeWorker = l2;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
        "use strict";
        var o2 = e("./support"), h2 = e("./base64"), r = e("./nodejsUtils"), u2 = e("./external");
        function n2(e2) {
          return e2;
        }
        function l2(e2, t2) {
          for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
          return t2;
        }
        e("setimmediate"), a.newBlob = function(t2, r2) {
          a.checkSupport("blob");
          try {
            return new Blob([t2], { type: r2 });
          } catch (e2) {
            try {
              var n3 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return n3.append(t2), n3.getBlob(r2);
            } catch (e3) {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var i2 = { stringifyByChunk: function(e2, t2, r2) {
          var n3 = [], i3 = 0, s2 = e2.length;
          if (s2 <= r2) return String.fromCharCode.apply(null, e2);
          for (; i3 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n3.push(String.fromCharCode.apply(null, e2.slice(i3, Math.min(i3 + r2, s2)))) : n3.push(String.fromCharCode.apply(null, e2.subarray(i3, Math.min(i3 + r2, s2)))), i3 += r2;
          return n3.join("");
        }, stringifyByChar: function(e2) {
          for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
          return t2;
        }, applyCanBeUsed: { uint8array: (function() {
          try {
            return o2.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
          } catch (e2) {
            return false;
          }
        })(), nodebuffer: (function() {
          try {
            return o2.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
          } catch (e2) {
            return false;
          }
        })() } };
        function s(e2) {
          var t2 = 65536, r2 = a.getTypeOf(e2), n3 = true;
          if ("uint8array" === r2 ? n3 = i2.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n3 = i2.applyCanBeUsed.nodebuffer), n3) for (; 1 < t2; ) try {
            return i2.stringifyByChunk(e2, r2, t2);
          } catch (e3) {
            t2 = Math.floor(t2 / 2);
          }
          return i2.stringifyByChar(e2);
        }
        function f2(e2, t2) {
          for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
          return t2;
        }
        a.applyFromCharCode = s;
        var c = {};
        c.string = { string: n2, array: function(e2) {
          return l2(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return c.string.uint8array(e2).buffer;
        }, uint8array: function(e2) {
          return l2(e2, new Uint8Array(e2.length));
        }, nodebuffer: function(e2) {
          return l2(e2, r.allocBuffer(e2.length));
        } }, c.array = { string: s, array: n2, arraybuffer: function(e2) {
          return new Uint8Array(e2).buffer;
        }, uint8array: function(e2) {
          return new Uint8Array(e2);
        }, nodebuffer: function(e2) {
          return r.newBufferFrom(e2);
        } }, c.arraybuffer = { string: function(e2) {
          return s(new Uint8Array(e2));
        }, array: function(e2) {
          return f2(new Uint8Array(e2), new Array(e2.byteLength));
        }, arraybuffer: n2, uint8array: function(e2) {
          return new Uint8Array(e2);
        }, nodebuffer: function(e2) {
          return r.newBufferFrom(new Uint8Array(e2));
        } }, c.uint8array = { string: s, array: function(e2) {
          return f2(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return e2.buffer;
        }, uint8array: n2, nodebuffer: function(e2) {
          return r.newBufferFrom(e2);
        } }, c.nodebuffer = { string: s, array: function(e2) {
          return f2(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return c.nodebuffer.uint8array(e2).buffer;
        }, uint8array: function(e2) {
          return f2(e2, new Uint8Array(e2.length));
        }, nodebuffer: n2 }, a.transformTo = function(e2, t2) {
          if (t2 = t2 || "", !e2) return t2;
          a.checkSupport(e2);
          var r2 = a.getTypeOf(t2);
          return c[r2][e2](t2);
        }, a.resolve = function(e2) {
          for (var t2 = e2.split("/"), r2 = [], n3 = 0; n3 < t2.length; n3++) {
            var i3 = t2[n3];
            "." === i3 || "" === i3 && 0 !== n3 && n3 !== t2.length - 1 || (".." === i3 ? r2.pop() : r2.push(i3));
          }
          return r2.join("/");
        }, a.getTypeOf = function(e2) {
          if ("string" == typeof e2) return "string";
          var t2 = Object.prototype.toString.call(e2);
          return "[object Array]" === t2 ? "array" : o2.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o2.uint8array && "[object Uint8Array]" === t2 ? "uint8array" : o2.arraybuffer && "[object ArrayBuffer]" === t2 ? "arraybuffer" : void 0;
        }, a.checkSupport = function(e2) {
          if (!o2[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
        }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
          var t2, r2, n3 = "";
          for (r2 = 0; r2 < (e2 || "").length; r2++) n3 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
          return n3;
        }, a.delay = function(e2, t2, r2) {
          setImmediate(function() {
            e2.apply(r2 || null, t2 || []);
          });
        }, a.inherits = function(e2, t2) {
          function r2() {
          }
          r2.prototype = t2.prototype, e2.prototype = new r2();
        }, a.extend = function() {
          var e2, t2, r2 = {};
          for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
          return r2;
        }, a.prepareContent = function(r2, e2, n3, i3, s2) {
          return u2.Promise.resolve(e2).then(function(n4) {
            return o2.blob && (n4 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n4))) ? void 0 !== Blob.prototype.arrayBuffer ? n4.arrayBuffer() : "undefined" != typeof FileReader ? new u2.Promise(function(t2, r3) {
              var e3 = new FileReader();
              e3.onload = function(e4) {
                t2(e4.target.result);
              }, e3.onerror = function(e4) {
                r3(e4.target.error);
              }, e3.readAsArrayBuffer(n4);
            }) : u2.Promise.reject(new Error(r2 + " is a Blob, but we have no way of reading it.")) : n4;
          }).then(function(e3) {
            var t2 = a.getTypeOf(e3);
            return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h2.decode(e3) : n3 && true !== i3 && (e3 = (function(e4) {
              return l2(e4, o2.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
            })(e3))), e3) : u2.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
        "use strict";
        var n2 = e("./reader/readerFor"), i2 = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o2 = e("./support");
        function h2(e2) {
          this.files = [], this.loadOptions = e2;
        }
        h2.prototype = { checkSignature: function(e2) {
          if (!this.reader.readAndCheckSignature(e2)) {
            this.reader.index -= 4;
            var t2 = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + i2.pretty(t2) + ", expected " + i2.pretty(e2) + ")");
          }
        }, isSignature: function(e2, t2) {
          var r2 = this.reader.index;
          this.reader.setIndex(e2);
          var n3 = this.reader.readString(4) === t2;
          return this.reader.setIndex(r2), n3;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var e2 = this.reader.readData(this.zipCommentLength), t2 = o2.uint8array ? "uint8array" : "array", r2 = i2.transformTo(t2, e2);
          this.zipComment = this.loadOptions.decodeFileName(r2);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var e2, t2, r2, n3 = this.zip64EndOfCentralSize - 44; 0 < n3; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var e2, t2;
          for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
        }, readCentralDir: function() {
          var e2;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
          if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
          if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
          this.reader.setIndex(e2);
          var t2 = e2;
          if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i2.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i2.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i2.MAX_VALUE_16BITS || this.centralDirRecords === i2.MAX_VALUE_16BITS || this.centralDirSize === i2.MAX_VALUE_32BITS || this.centralDirOffset === i2.MAX_VALUE_32BITS) {
            if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var r2 = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
          var n3 = t2 - r2;
          if (0 < n3) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n3);
          else if (n3 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n3) + " bytes.");
        }, prepareReader: function(e2) {
          this.reader = n2(e2);
        }, load: function(e2) {
          this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, t.exports = h2;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
        "use strict";
        var n2 = e("./reader/readerFor"), s = e("./utils"), i2 = e("./compressedObject"), a = e("./crc32"), o2 = e("./utf8"), h2 = e("./compressions"), u2 = e("./support");
        function l2(e2, t2) {
          this.options = e2, this.loadOptions = t2;
        }
        l2.prototype = { isEncrypted: function() {
          return 1 == (1 & this.bitFlag);
        }, useUTF8: function() {
          return 2048 == (2048 & this.bitFlag);
        }, readLocalPart: function(e2) {
          var t2, r2;
          if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if (null === (t2 = (function(e3) {
            for (var t3 in h2) if (Object.prototype.hasOwnProperty.call(h2, t3) && h2[t3].magic === e3) return h2[t3];
            return null;
          })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
          this.decompressed = new i2(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
        }, readCentralPart: function(e2) {
          this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
          var t2 = e2.readInt(2);
          if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var e2 = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var e2 = n2(this.extraFields[1].value);
            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
          }
        }, readExtraFields: function(e2) {
          var t2, r2, n3, i3 = e2.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i3; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n3 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n3 };
          e2.setIndex(i3);
        }, handleUTF8: function() {
          var e2 = u2.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = o2.utf8decode(this.fileName), this.fileCommentStr = o2.utf8decode(this.fileComment);
          else {
            var t2 = this.findExtraFieldUnicodePath();
            if (null !== t2) this.fileNameStr = t2;
            else {
              var r2 = s.transformTo(e2, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(r2);
            }
            var n3 = this.findExtraFieldUnicodeComment();
            if (null !== n3) this.fileCommentStr = n3;
            else {
              var i3 = s.transformTo(e2, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(i3);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var e2 = this.extraFields[28789];
          if (e2) {
            var t2 = n2(e2.value);
            return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o2.utf8decode(t2.readData(e2.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var e2 = this.extraFields[25461];
          if (e2) {
            var t2 = n2(e2.value);
            return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o2.utf8decode(t2.readData(e2.length - 5));
          }
          return null;
        } }, t.exports = l2;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
        "use strict";
        function n2(e2, t2, r2) {
          this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
        }
        var s = e("./stream/StreamHelper"), i2 = e("./stream/DataWorker"), a = e("./utf8"), o2 = e("./compressedObject"), h2 = e("./stream/GenericWorker");
        n2.prototype = { internalStream: function(e2) {
          var t2 = null, r2 = "string";
          try {
            if (!e2) throw new Error("No output type specified.");
            var n3 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
            "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
            var i3 = !this._dataBinary;
            i3 && !n3 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i3 && n3 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
          } catch (e3) {
            (t2 = new h2("error")).error(e3);
          }
          return new s(t2, r2, "");
        }, async: function(e2, t2) {
          return this.internalStream(e2).accumulate(t2);
        }, nodeStream: function(e2, t2) {
          return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
        }, _compressWorker: function(e2, t2) {
          if (this._data instanceof o2 && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
          var r2 = this._decompressWorker();
          return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o2.createWorkerFrom(r2, e2, t2);
        }, _decompressWorker: function() {
          return this._data instanceof o2 ? this._data.getContentWorker() : this._data instanceof h2 ? this._data : new i2(this._data);
        } };
        for (var u2 = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l2 = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, f2 = 0; f2 < u2.length; f2++) n2.prototype[u2[f2]] = l2;
        t.exports = n2;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l2, t) {
        (function(t2) {
          "use strict";
          var r, n2, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
          if (e2) {
            var i2 = 0, s = new e2(u2), a = t2.document.createTextNode("");
            s.observe(a, { characterData: true }), r = function() {
              a.data = i2 = ++i2 % 2;
            };
          } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
            var e3 = t2.document.createElement("script");
            e3.onreadystatechange = function() {
              u2(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
            }, t2.document.documentElement.appendChild(e3);
          } : function() {
            setTimeout(u2, 0);
          };
          else {
            var o2 = new t2.MessageChannel();
            o2.port1.onmessage = u2, r = function() {
              o2.port2.postMessage(0);
            };
          }
          var h2 = [];
          function u2() {
            var e3, t3;
            n2 = true;
            for (var r2 = h2.length; r2; ) {
              for (t3 = h2, h2 = [], e3 = -1; ++e3 < r2; ) t3[e3]();
              r2 = h2.length;
            }
            n2 = false;
          }
          l2.exports = function(e3) {
            1 !== h2.push(e3) || n2 || r();
          };
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}], 37: [function(e, t, r) {
        "use strict";
        var i2 = e("immediate");
        function u2() {
        }
        var l2 = {}, s = ["REJECTED"], a = ["FULFILLED"], n2 = ["PENDING"];
        function o2(e2) {
          if ("function" != typeof e2) throw new TypeError("resolver must be a function");
          this.state = n2, this.queue = [], this.outcome = void 0, e2 !== u2 && d2(this, e2);
        }
        function h2(e2, t2, r2) {
          this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
        }
        function f2(t2, r2, n3) {
          i2(function() {
            var e2;
            try {
              e2 = r2(n3);
            } catch (e3) {
              return l2.reject(t2, e3);
            }
            e2 === t2 ? l2.reject(t2, new TypeError("Cannot resolve promise with itself")) : l2.resolve(t2, e2);
          });
        }
        function c(e2) {
          var t2 = e2 && e2.then;
          if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
            t2.apply(e2, arguments);
          };
        }
        function d2(t2, e2) {
          var r2 = false;
          function n3(e3) {
            r2 || (r2 = true, l2.reject(t2, e3));
          }
          function i3(e3) {
            r2 || (r2 = true, l2.resolve(t2, e3));
          }
          var s2 = p2(function() {
            e2(i3, n3);
          });
          "error" === s2.status && n3(s2.value);
        }
        function p2(e2, t2) {
          var r2 = {};
          try {
            r2.value = e2(t2), r2.status = "success";
          } catch (e3) {
            r2.status = "error", r2.value = e3;
          }
          return r2;
        }
        (t.exports = o2).prototype.finally = function(t2) {
          if ("function" != typeof t2) return this;
          var r2 = this.constructor;
          return this.then(function(e2) {
            return r2.resolve(t2()).then(function() {
              return e2;
            });
          }, function(e2) {
            return r2.resolve(t2()).then(function() {
              throw e2;
            });
          });
        }, o2.prototype.catch = function(e2) {
          return this.then(null, e2);
        }, o2.prototype.then = function(e2, t2) {
          if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
          var r2 = new this.constructor(u2);
          this.state !== n2 ? f2(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h2(r2, e2, t2));
          return r2;
        }, h2.prototype.callFulfilled = function(e2) {
          l2.resolve(this.promise, e2);
        }, h2.prototype.otherCallFulfilled = function(e2) {
          f2(this.promise, this.onFulfilled, e2);
        }, h2.prototype.callRejected = function(e2) {
          l2.reject(this.promise, e2);
        }, h2.prototype.otherCallRejected = function(e2) {
          f2(this.promise, this.onRejected, e2);
        }, l2.resolve = function(e2, t2) {
          var r2 = p2(c, t2);
          if ("error" === r2.status) return l2.reject(e2, r2.value);
          var n3 = r2.value;
          if (n3) d2(e2, n3);
          else {
            e2.state = a, e2.outcome = t2;
            for (var i3 = -1, s2 = e2.queue.length; ++i3 < s2; ) e2.queue[i3].callFulfilled(t2);
          }
          return e2;
        }, l2.reject = function(e2, t2) {
          e2.state = s, e2.outcome = t2;
          for (var r2 = -1, n3 = e2.queue.length; ++r2 < n3; ) e2.queue[r2].callRejected(t2);
          return e2;
        }, o2.resolve = function(e2) {
          if (e2 instanceof this) return e2;
          return l2.resolve(new this(u2), e2);
        }, o2.reject = function(e2) {
          var t2 = new this(u2);
          return l2.reject(t2, e2);
        }, o2.all = function(e2) {
          var r2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
          var n3 = e2.length, i3 = false;
          if (!n3) return this.resolve([]);
          var s2 = new Array(n3), a2 = 0, t2 = -1, o3 = new this(u2);
          for (; ++t2 < n3; ) h3(e2[t2], t2);
          return o3;
          function h3(e3, t3) {
            r2.resolve(e3).then(function(e4) {
              s2[t3] = e4, ++a2 !== n3 || i3 || (i3 = true, l2.resolve(o3, s2));
            }, function(e4) {
              i3 || (i3 = true, l2.reject(o3, e4));
            });
          }
        }, o2.race = function(e2) {
          var t2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
          var r2 = e2.length, n3 = false;
          if (!r2) return this.resolve([]);
          var i3 = -1, s2 = new this(u2);
          for (; ++i3 < r2; ) a2 = e2[i3], t2.resolve(a2).then(function(e3) {
            n3 || (n3 = true, l2.resolve(s2, e3));
          }, function(e3) {
            n3 || (n3 = true, l2.reject(s2, e3));
          });
          var a2;
          return s2;
        };
      }, { immediate: 36 }], 38: [function(e, t, r) {
        "use strict";
        var n2 = {};
        (0, e("./lib/utils/common").assign)(n2, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n2;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
        "use strict";
        var a = e("./zlib/deflate"), o2 = e("./utils/common"), h2 = e("./utils/strings"), i2 = e("./zlib/messages"), s = e("./zlib/zstream"), u2 = Object.prototype.toString, l2 = 0, f2 = -1, c = 0, d2 = 8;
        function p2(e2) {
          if (!(this instanceof p2)) return new p2(e2);
          this.options = o2.assign({ level: f2, method: d2, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
          var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
          if (r2 !== l2) throw new Error(i2[r2]);
          if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
            var n3;
            if (n3 = "string" == typeof t2.dictionary ? h2.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u2.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n3)) !== l2) throw new Error(i2[r2]);
            this._dict_set = true;
          }
        }
        function n2(e2, t2) {
          var r2 = new p2(t2);
          if (r2.push(e2, true), r2.err) throw r2.msg || i2[r2.err];
          return r2.result;
        }
        p2.prototype.push = function(e2, t2) {
          var r2, n3, i3 = this.strm, s2 = this.options.chunkSize;
          if (this.ended) return false;
          n3 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i3.input = h2.string2buf(e2) : "[object ArrayBuffer]" === u2.call(e2) ? i3.input = new Uint8Array(e2) : i3.input = e2, i3.next_in = 0, i3.avail_in = i3.input.length;
          do {
            if (0 === i3.avail_out && (i3.output = new o2.Buf8(s2), i3.next_out = 0, i3.avail_out = s2), 1 !== (r2 = a.deflate(i3, n3)) && r2 !== l2) return this.onEnd(r2), !(this.ended = true);
            0 !== i3.avail_out && (0 !== i3.avail_in || 4 !== n3 && 2 !== n3) || ("string" === this.options.to ? this.onData(h2.buf2binstring(o2.shrinkBuf(i3.output, i3.next_out))) : this.onData(o2.shrinkBuf(i3.output, i3.next_out)));
          } while ((0 < i3.avail_in || 0 === i3.avail_out) && 1 !== r2);
          return 4 === n3 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l2) : 2 !== n3 || (this.onEnd(l2), !(i3.avail_out = 0));
        }, p2.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, p2.prototype.onEnd = function(e2) {
          e2 === l2 && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o2.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r.Deflate = p2, r.deflate = n2, r.deflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, n2(e2, t2);
        }, r.gzip = function(e2, t2) {
          return (t2 = t2 || {}).gzip = true, n2(e2, t2);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
        "use strict";
        var c = e("./zlib/inflate"), d2 = e("./utils/common"), p2 = e("./utils/strings"), m2 = e("./zlib/constants"), n2 = e("./zlib/messages"), i2 = e("./zlib/zstream"), s = e("./zlib/gzheader"), _2 = Object.prototype.toString;
        function a(e2) {
          if (!(this instanceof a)) return new a(e2);
          this.options = d2.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i2(), this.strm.avail_out = 0;
          var r2 = c.inflateInit2(this.strm, t2.windowBits);
          if (r2 !== m2.Z_OK) throw new Error(n2[r2]);
          this.header = new s(), c.inflateGetHeader(this.strm, this.header);
        }
        function o2(e2, t2) {
          var r2 = new a(t2);
          if (r2.push(e2, true), r2.err) throw r2.msg || n2[r2.err];
          return r2.result;
        }
        a.prototype.push = function(e2, t2) {
          var r2, n3, i3, s2, a2, o3, h2 = this.strm, u2 = this.options.chunkSize, l2 = this.options.dictionary, f2 = false;
          if (this.ended) return false;
          n3 = t2 === ~~t2 ? t2 : true === t2 ? m2.Z_FINISH : m2.Z_NO_FLUSH, "string" == typeof e2 ? h2.input = p2.binstring2buf(e2) : "[object ArrayBuffer]" === _2.call(e2) ? h2.input = new Uint8Array(e2) : h2.input = e2, h2.next_in = 0, h2.avail_in = h2.input.length;
          do {
            if (0 === h2.avail_out && (h2.output = new d2.Buf8(u2), h2.next_out = 0, h2.avail_out = u2), (r2 = c.inflate(h2, m2.Z_NO_FLUSH)) === m2.Z_NEED_DICT && l2 && (o3 = "string" == typeof l2 ? p2.string2buf(l2) : "[object ArrayBuffer]" === _2.call(l2) ? new Uint8Array(l2) : l2, r2 = c.inflateSetDictionary(this.strm, o3)), r2 === m2.Z_BUF_ERROR && true === f2 && (r2 = m2.Z_OK, f2 = false), r2 !== m2.Z_STREAM_END && r2 !== m2.Z_OK) return this.onEnd(r2), !(this.ended = true);
            h2.next_out && (0 !== h2.avail_out && r2 !== m2.Z_STREAM_END && (0 !== h2.avail_in || n3 !== m2.Z_FINISH && n3 !== m2.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i3 = p2.utf8border(h2.output, h2.next_out), s2 = h2.next_out - i3, a2 = p2.buf2string(h2.output, i3), h2.next_out = s2, h2.avail_out = u2 - s2, s2 && d2.arraySet(h2.output, h2.output, i3, s2, 0), this.onData(a2)) : this.onData(d2.shrinkBuf(h2.output, h2.next_out)))), 0 === h2.avail_in && 0 === h2.avail_out && (f2 = true);
          } while ((0 < h2.avail_in || 0 === h2.avail_out) && r2 !== m2.Z_STREAM_END);
          return r2 === m2.Z_STREAM_END && (n3 = m2.Z_FINISH), n3 === m2.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m2.Z_OK) : n3 !== m2.Z_SYNC_FLUSH || (this.onEnd(m2.Z_OK), !(h2.avail_out = 0));
        }, a.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, a.prototype.onEnd = function(e2) {
          e2 === m2.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d2.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r.Inflate = a, r.inflate = o2, r.inflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, o2(e2, t2);
        }, r.ungzip = o2;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
        "use strict";
        var n2 = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        r.assign = function(e2) {
          for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
            var r2 = t2.shift();
            if (r2) {
              if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
              for (var n3 in r2) r2.hasOwnProperty(n3) && (e2[n3] = r2[n3]);
            }
          }
          return e2;
        }, r.shrinkBuf = function(e2, t2) {
          return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
        };
        var i2 = { arraySet: function(e2, t2, r2, n3, i3) {
          if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n3), i3);
          else for (var s2 = 0; s2 < n3; s2++) e2[i3 + s2] = t2[r2 + s2];
        }, flattenChunks: function(e2) {
          var t2, r2, n3, i3, s2, a;
          for (t2 = n3 = 0, r2 = e2.length; t2 < r2; t2++) n3 += e2[t2].length;
          for (a = new Uint8Array(n3), t2 = i3 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i3), i3 += s2.length;
          return a;
        } }, s = { arraySet: function(e2, t2, r2, n3, i3) {
          for (var s2 = 0; s2 < n3; s2++) e2[i3 + s2] = t2[r2 + s2];
        }, flattenChunks: function(e2) {
          return [].concat.apply([], e2);
        } };
        r.setTyped = function(e2) {
          e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i2)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
        }, r.setTyped(n2);
      }, {}], 42: [function(e, t, r) {
        "use strict";
        var h2 = e("./common"), i2 = true, s = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch (e2) {
          i2 = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (e2) {
          s = false;
        }
        for (var u2 = new h2.Buf8(256), n2 = 0; n2 < 256; n2++) u2[n2] = 252 <= n2 ? 6 : 248 <= n2 ? 5 : 240 <= n2 ? 4 : 224 <= n2 ? 3 : 192 <= n2 ? 2 : 1;
        function l2(e2, t2) {
          if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i2)) return String.fromCharCode.apply(null, h2.shrinkBuf(e2, t2));
          for (var r2 = "", n3 = 0; n3 < t2; n3++) r2 += String.fromCharCode(e2[n3]);
          return r2;
        }
        u2[254] = u2[254] = 1, r.string2buf = function(e2) {
          var t2, r2, n3, i3, s2, a = e2.length, o2 = 0;
          for (i3 = 0; i3 < a; i3++) 55296 == (64512 & (r2 = e2.charCodeAt(i3))) && i3 + 1 < a && 56320 == (64512 & (n3 = e2.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (t2 = new h2.Buf8(o2), i3 = s2 = 0; s2 < o2; i3++) 55296 == (64512 & (r2 = e2.charCodeAt(i3))) && i3 + 1 < a && 56320 == (64512 & (n3 = e2.charCodeAt(i3 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n3 - 56320), i3++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
          return t2;
        }, r.buf2binstring = function(e2) {
          return l2(e2, e2.length);
        }, r.binstring2buf = function(e2) {
          for (var t2 = new h2.Buf8(e2.length), r2 = 0, n3 = t2.length; r2 < n3; r2++) t2[r2] = e2.charCodeAt(r2);
          return t2;
        }, r.buf2string = function(e2, t2) {
          var r2, n3, i3, s2, a = t2 || e2.length, o2 = new Array(2 * a);
          for (r2 = n3 = 0; r2 < a; ) if ((i3 = e2[r2++]) < 128) o2[n3++] = i3;
          else if (4 < (s2 = u2[i3])) o2[n3++] = 65533, r2 += s2 - 1;
          else {
            for (i3 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i3 = i3 << 6 | 63 & e2[r2++], s2--;
            1 < s2 ? o2[n3++] = 65533 : i3 < 65536 ? o2[n3++] = i3 : (i3 -= 65536, o2[n3++] = 55296 | i3 >> 10 & 1023, o2[n3++] = 56320 | 1023 & i3);
          }
          return l2(o2, n3);
        }, r.utf8border = function(e2, t2) {
          var r2;
          for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
          return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u2[e2[r2]] > t2 ? r2 : t2;
        };
      }, { "./common": 41 }], 43: [function(e, t, r) {
        "use strict";
        t.exports = function(e2, t2, r2, n2) {
          for (var i2 = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
            for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i2 = i2 + t2[n2++] | 0) | 0, --a; ) ;
            i2 %= 65521, s %= 65521;
          }
          return i2 | s << 16 | 0;
        };
      }, {}], 44: [function(e, t, r) {
        "use strict";
        t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(e, t, r) {
        "use strict";
        var o2 = (function() {
          for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
            e2 = r2;
            for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r2] = e2;
          }
          return t2;
        })();
        t.exports = function(e2, t2, r2, n2) {
          var i2 = o2, s = n2 + r2;
          e2 ^= -1;
          for (var a = n2; a < s; a++) e2 = e2 >>> 8 ^ i2[255 & (e2 ^ t2[a])];
          return -1 ^ e2;
        };
      }, {}], 46: [function(e, t, r) {
        "use strict";
        var h2, c = e("../utils/common"), u2 = e("./trees"), d2 = e("./adler32"), p2 = e("./crc32"), n2 = e("./messages"), l2 = 0, f2 = 4, m2 = 0, _2 = -2, g2 = -1, b2 = 4, i2 = 2, v2 = 8, y2 = 9, s = 286, a = 30, o2 = 19, w2 = 2 * s + 1, k2 = 15, x2 = 3, S2 = 258, z2 = S2 + x2 + 1, C2 = 42, E2 = 113, A2 = 1, I2 = 2, O2 = 3, B2 = 4;
        function R2(e2, t2) {
          return e2.msg = n2[t2], t2;
        }
        function T2(e2) {
          return (e2 << 1) - (4 < e2 ? 9 : 0);
        }
        function D2(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        function F2(e2) {
          var t2 = e2.state, r2 = t2.pending;
          r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
        }
        function N2(e2, t2) {
          u2._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F2(e2.strm);
        }
        function U2(e2, t2) {
          e2.pending_buf[e2.pending++] = t2;
        }
        function P2(e2, t2) {
          e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
        }
        function L2(e2, t2) {
          var r2, n3, i3 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o3 = e2.nice_match, h3 = e2.strstart > e2.w_size - z2 ? e2.strstart - (e2.w_size - z2) : 0, u3 = e2.window, l3 = e2.w_mask, f3 = e2.prev, c2 = e2.strstart + S2, d3 = u3[s2 + a2 - 1], p3 = u3[s2 + a2];
          e2.prev_length >= e2.good_match && (i3 >>= 2), o3 > e2.lookahead && (o3 = e2.lookahead);
          do {
            if (u3[(r2 = t2) + a2] === p3 && u3[r2 + a2 - 1] === d3 && u3[r2] === u3[s2] && u3[++r2] === u3[s2 + 1]) {
              s2 += 2, r2++;
              do {
              } while (u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && u3[++s2] === u3[++r2] && s2 < c2);
              if (n3 = S2 - (c2 - s2), s2 = c2 - S2, a2 < n3) {
                if (e2.match_start = t2, o3 <= (a2 = n3)) break;
                d3 = u3[s2 + a2 - 1], p3 = u3[s2 + a2];
              }
            }
          } while ((t2 = f3[t2 & l3]) > h3 && 0 != --i3);
          return a2 <= e2.lookahead ? a2 : e2.lookahead;
        }
        function j2(e2) {
          var t2, r2, n3, i3, s2, a2, o3, h3, u3, l3, f3 = e2.w_size;
          do {
            if (i3 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f3 + (f3 - z2)) {
              for (c.arraySet(e2.window, e2.window, f3, f3, 0), e2.match_start -= f3, e2.strstart -= f3, e2.block_start -= f3, t2 = r2 = e2.hash_size; n3 = e2.head[--t2], e2.head[t2] = f3 <= n3 ? n3 - f3 : 0, --r2; ) ;
              for (t2 = r2 = f3; n3 = e2.prev[--t2], e2.prev[t2] = f3 <= n3 ? n3 - f3 : 0, --r2; ) ;
              i3 += f3;
            }
            if (0 === e2.strm.avail_in) break;
            if (a2 = e2.strm, o3 = e2.window, h3 = e2.strstart + e2.lookahead, u3 = i3, l3 = void 0, l3 = a2.avail_in, u3 < l3 && (l3 = u3), r2 = 0 === l3 ? 0 : (a2.avail_in -= l3, c.arraySet(o3, a2.input, a2.next_in, l3, h3), 1 === a2.state.wrap ? a2.adler = d2(a2.adler, o3, l3, h3) : 2 === a2.state.wrap && (a2.adler = p2(a2.adler, o3, l3, h3)), a2.next_in += l3, a2.total_in += l3, l3), e2.lookahead += r2, e2.lookahead + e2.insert >= x2) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x2 - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x2)); ) ;
          } while (e2.lookahead < z2 && 0 !== e2.strm.avail_in);
        }
        function Z2(e2, t2) {
          for (var r2, n3; ; ) {
            if (e2.lookahead < z2) {
              if (j2(e2), e2.lookahead < z2 && t2 === l2) return A2;
              if (0 === e2.lookahead) break;
            }
            if (r2 = 0, e2.lookahead >= x2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z2 && (e2.match_length = L2(e2, r2)), e2.match_length >= x2) if (n3 = u2._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x2), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x2) {
              for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
              e2.strstart++;
            } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
            else n3 = u2._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
            if (n3 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
          }
          return e2.insert = e2.strstart < x2 - 1 ? e2.strstart : x2 - 1, t2 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : e2.last_lit && (N2(e2, false), 0 === e2.strm.avail_out) ? A2 : I2;
        }
        function W2(e2, t2) {
          for (var r2, n3, i3; ; ) {
            if (e2.lookahead < z2) {
              if (j2(e2), e2.lookahead < z2 && t2 === l2) return A2;
              if (0 === e2.lookahead) break;
            }
            if (r2 = 0, e2.lookahead >= x2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x2 - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z2 && (e2.match_length = L2(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x2 && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x2 - 1)), e2.prev_length >= x2 && e2.match_length <= e2.prev_length) {
              for (i3 = e2.strstart + e2.lookahead - x2, n3 = u2._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x2), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i3 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
              if (e2.match_available = 0, e2.match_length = x2 - 1, e2.strstart++, n3 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
            } else if (e2.match_available) {
              if ((n3 = u2._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N2(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A2;
            } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
          }
          return e2.match_available && (n3 = u2._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x2 - 1 ? e2.strstart : x2 - 1, t2 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : e2.last_lit && (N2(e2, false), 0 === e2.strm.avail_out) ? A2 : I2;
        }
        function M2(e2, t2, r2, n3, i3) {
          this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n3, this.func = i3;
        }
        function H2() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v2, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w2), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o2 + 1)), D2(this.dyn_ltree), D2(this.dyn_dtree), D2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k2 + 1), this.heap = new c.Buf16(2 * s + 1), D2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function G2(e2) {
          var t2;
          return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i2, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C2 : E2, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l2, u2._tr_init(t2), m2) : R2(e2, _2);
        }
        function K2(e2) {
          var t2 = G2(e2);
          return t2 === m2 && (function(e3) {
            e3.window_size = 2 * e3.w_size, D2(e3.head), e3.max_lazy_match = h2[e3.level].max_lazy, e3.good_match = h2[e3.level].good_length, e3.nice_match = h2[e3.level].nice_length, e3.max_chain_length = h2[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x2 - 1, e3.match_available = 0, e3.ins_h = 0;
          })(e2.state), t2;
        }
        function Y2(e2, t2, r2, n3, i3, s2) {
          if (!e2) return _2;
          var a2 = 1;
          if (t2 === g2 && (t2 = 6), n3 < 0 ? (a2 = 0, n3 = -n3) : 15 < n3 && (a2 = 2, n3 -= 16), i3 < 1 || y2 < i3 || r2 !== v2 || n3 < 8 || 15 < n3 || t2 < 0 || 9 < t2 || s2 < 0 || b2 < s2) return R2(e2, _2);
          8 === n3 && (n3 = 9);
          var o3 = new H2();
          return (e2.state = o3).strm = e2, o3.wrap = a2, o3.gzhead = null, o3.w_bits = n3, o3.w_size = 1 << o3.w_bits, o3.w_mask = o3.w_size - 1, o3.hash_bits = i3 + 7, o3.hash_size = 1 << o3.hash_bits, o3.hash_mask = o3.hash_size - 1, o3.hash_shift = ~~((o3.hash_bits + x2 - 1) / x2), o3.window = new c.Buf8(2 * o3.w_size), o3.head = new c.Buf16(o3.hash_size), o3.prev = new c.Buf16(o3.w_size), o3.lit_bufsize = 1 << i3 + 6, o3.pending_buf_size = 4 * o3.lit_bufsize, o3.pending_buf = new c.Buf8(o3.pending_buf_size), o3.d_buf = 1 * o3.lit_bufsize, o3.l_buf = 3 * o3.lit_bufsize, o3.level = t2, o3.strategy = s2, o3.method = r2, K2(e2);
        }
        h2 = [new M2(0, 0, 0, 0, function(e2, t2) {
          var r2 = 65535;
          for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
            if (e2.lookahead <= 1) {
              if (j2(e2), 0 === e2.lookahead && t2 === l2) return A2;
              if (0 === e2.lookahead) break;
            }
            e2.strstart += e2.lookahead, e2.lookahead = 0;
            var n3 = e2.block_start + r2;
            if ((0 === e2.strstart || e2.strstart >= n3) && (e2.lookahead = e2.strstart - n3, e2.strstart = n3, N2(e2, false), 0 === e2.strm.avail_out)) return A2;
            if (e2.strstart - e2.block_start >= e2.w_size - z2 && (N2(e2, false), 0 === e2.strm.avail_out)) return A2;
          }
          return e2.insert = 0, t2 === f2 ? (N2(e2, true), 0 === e2.strm.avail_out ? O2 : B2) : (e2.strstart > e2.block_start && (N2(e2, false), e2.strm.avail_out), A2);
        }), new M2(4, 4, 8, 4, Z2), new M2(4, 5, 16, 8, Z2), new M2(4, 6, 32, 32, Z2), new M2(4, 4, 16, 16, W2), new M2(8, 16, 32, 32, W2), new M2(8, 16, 128, 128, W2), new M2(8, 32, 128, 256, W2), new M2(32, 128, 258, 1024, W2), new M2(32, 258, 258, 4096, W2)], r.deflateInit = function(e2, t2) {
          return Y2(e2, t2, v2, 15, 8, 0);
        }, r.deflateInit2 = Y2, r.deflateReset = K2, r.deflateResetKeep = G2, r.deflateSetHeader = function(e2, t2) {
          return e2 && e2.state ? 2 !== e2.state.wrap ? _2 : (e2.state.gzhead = t2, m2) : _2;
        }, r.deflate = function(e2, t2) {
          var r2, n3, i3, s2;
          if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R2(e2, _2) : _2;
          if (n3 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n3.status && t2 !== f2) return R2(e2, 0 === e2.avail_out ? -5 : _2);
          if (n3.strm = e2, r2 = n3.last_flush, n3.last_flush = t2, n3.status === C2) if (2 === n3.wrap) e2.adler = 0, U2(n3, 31), U2(n3, 139), U2(n3, 8), n3.gzhead ? (U2(n3, (n3.gzhead.text ? 1 : 0) + (n3.gzhead.hcrc ? 2 : 0) + (n3.gzhead.extra ? 4 : 0) + (n3.gzhead.name ? 8 : 0) + (n3.gzhead.comment ? 16 : 0)), U2(n3, 255 & n3.gzhead.time), U2(n3, n3.gzhead.time >> 8 & 255), U2(n3, n3.gzhead.time >> 16 & 255), U2(n3, n3.gzhead.time >> 24 & 255), U2(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U2(n3, 255 & n3.gzhead.os), n3.gzhead.extra && n3.gzhead.extra.length && (U2(n3, 255 & n3.gzhead.extra.length), U2(n3, n3.gzhead.extra.length >> 8 & 255)), n3.gzhead.hcrc && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending, 0)), n3.gzindex = 0, n3.status = 69) : (U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 0), U2(n3, 9 === n3.level ? 2 : 2 <= n3.strategy || n3.level < 2 ? 4 : 0), U2(n3, 3), n3.status = E2);
          else {
            var a2 = v2 + (n3.w_bits - 8 << 4) << 8;
            a2 |= (2 <= n3.strategy || n3.level < 2 ? 0 : n3.level < 6 ? 1 : 6 === n3.level ? 2 : 3) << 6, 0 !== n3.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n3.status = E2, P2(n3, a2), 0 !== n3.strstart && (P2(n3, e2.adler >>> 16), P2(n3, 65535 & e2.adler)), e2.adler = 1;
          }
          if (69 === n3.status) if (n3.gzhead.extra) {
            for (i3 = n3.pending; n3.gzindex < (65535 & n3.gzhead.extra.length) && (n3.pending !== n3.pending_buf_size || (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending !== n3.pending_buf_size)); ) U2(n3, 255 & n3.gzhead.extra[n3.gzindex]), n3.gzindex++;
            n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), n3.gzindex === n3.gzhead.extra.length && (n3.gzindex = 0, n3.status = 73);
          } else n3.status = 73;
          if (73 === n3.status) if (n3.gzhead.name) {
            i3 = n3.pending;
            do {
              if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending === n3.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n3.gzindex < n3.gzhead.name.length ? 255 & n3.gzhead.name.charCodeAt(n3.gzindex++) : 0, U2(n3, s2);
            } while (0 !== s2);
            n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), 0 === s2 && (n3.gzindex = 0, n3.status = 91);
          } else n3.status = 91;
          if (91 === n3.status) if (n3.gzhead.comment) {
            i3 = n3.pending;
            do {
              if (n3.pending === n3.pending_buf_size && (n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), F2(e2), i3 = n3.pending, n3.pending === n3.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n3.gzindex < n3.gzhead.comment.length ? 255 & n3.gzhead.comment.charCodeAt(n3.gzindex++) : 0, U2(n3, s2);
            } while (0 !== s2);
            n3.gzhead.hcrc && n3.pending > i3 && (e2.adler = p2(e2.adler, n3.pending_buf, n3.pending - i3, i3)), 0 === s2 && (n3.status = 103);
          } else n3.status = 103;
          if (103 === n3.status && (n3.gzhead.hcrc ? (n3.pending + 2 > n3.pending_buf_size && F2(e2), n3.pending + 2 <= n3.pending_buf_size && (U2(n3, 255 & e2.adler), U2(n3, e2.adler >> 8 & 255), e2.adler = 0, n3.status = E2)) : n3.status = E2), 0 !== n3.pending) {
            if (F2(e2), 0 === e2.avail_out) return n3.last_flush = -1, m2;
          } else if (0 === e2.avail_in && T2(t2) <= T2(r2) && t2 !== f2) return R2(e2, -5);
          if (666 === n3.status && 0 !== e2.avail_in) return R2(e2, -5);
          if (0 !== e2.avail_in || 0 !== n3.lookahead || t2 !== l2 && 666 !== n3.status) {
            var o3 = 2 === n3.strategy ? (function(e3, t3) {
              for (var r3; ; ) {
                if (0 === e3.lookahead && (j2(e3), 0 === e3.lookahead)) {
                  if (t3 === l2) return A2;
                  break;
                }
                if (e3.match_length = 0, r3 = u2._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N2(e3, false), 0 === e3.strm.avail_out)) return A2;
              }
              return e3.insert = 0, t3 === f2 ? (N2(e3, true), 0 === e3.strm.avail_out ? O2 : B2) : e3.last_lit && (N2(e3, false), 0 === e3.strm.avail_out) ? A2 : I2;
            })(n3, t2) : 3 === n3.strategy ? (function(e3, t3) {
              for (var r3, n4, i4, s3, a3 = e3.window; ; ) {
                if (e3.lookahead <= S2) {
                  if (j2(e3), e3.lookahead <= S2 && t3 === l2) return A2;
                  if (0 === e3.lookahead) break;
                }
                if (e3.match_length = 0, e3.lookahead >= x2 && 0 < e3.strstart && (n4 = a3[i4 = e3.strstart - 1]) === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4]) {
                  s3 = e3.strstart + S2;
                  do {
                  } while (n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && n4 === a3[++i4] && i4 < s3);
                  e3.match_length = S2 - (s3 - i4), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                }
                if (e3.match_length >= x2 ? (r3 = u2._tr_tally(e3, 1, e3.match_length - x2), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u2._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N2(e3, false), 0 === e3.strm.avail_out)) return A2;
              }
              return e3.insert = 0, t3 === f2 ? (N2(e3, true), 0 === e3.strm.avail_out ? O2 : B2) : e3.last_lit && (N2(e3, false), 0 === e3.strm.avail_out) ? A2 : I2;
            })(n3, t2) : h2[n3.level].func(n3, t2);
            if (o3 !== O2 && o3 !== B2 || (n3.status = 666), o3 === A2 || o3 === O2) return 0 === e2.avail_out && (n3.last_flush = -1), m2;
            if (o3 === I2 && (1 === t2 ? u2._tr_align(n3) : 5 !== t2 && (u2._tr_stored_block(n3, 0, 0, false), 3 === t2 && (D2(n3.head), 0 === n3.lookahead && (n3.strstart = 0, n3.block_start = 0, n3.insert = 0))), F2(e2), 0 === e2.avail_out)) return n3.last_flush = -1, m2;
          }
          return t2 !== f2 ? m2 : n3.wrap <= 0 ? 1 : (2 === n3.wrap ? (U2(n3, 255 & e2.adler), U2(n3, e2.adler >> 8 & 255), U2(n3, e2.adler >> 16 & 255), U2(n3, e2.adler >> 24 & 255), U2(n3, 255 & e2.total_in), U2(n3, e2.total_in >> 8 & 255), U2(n3, e2.total_in >> 16 & 255), U2(n3, e2.total_in >> 24 & 255)) : (P2(n3, e2.adler >>> 16), P2(n3, 65535 & e2.adler)), F2(e2), 0 < n3.wrap && (n3.wrap = -n3.wrap), 0 !== n3.pending ? m2 : 1);
        }, r.deflateEnd = function(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state.status) !== C2 && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E2 && 666 !== t2 ? R2(e2, _2) : (e2.state = null, t2 === E2 ? R2(e2, -3) : m2) : _2;
        }, r.deflateSetDictionary = function(e2, t2) {
          var r2, n3, i3, s2, a2, o3, h3, u3, l3 = t2.length;
          if (!e2 || !e2.state) return _2;
          if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C2 || r2.lookahead) return _2;
          for (1 === s2 && (e2.adler = d2(e2.adler, t2, l3, 0)), r2.wrap = 0, l3 >= r2.w_size && (0 === s2 && (D2(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u3 = new c.Buf8(r2.w_size), c.arraySet(u3, t2, l3 - r2.w_size, r2.w_size, 0), t2 = u3, l3 = r2.w_size), a2 = e2.avail_in, o3 = e2.next_in, h3 = e2.input, e2.avail_in = l3, e2.next_in = 0, e2.input = t2, j2(r2); r2.lookahead >= x2; ) {
            for (n3 = r2.strstart, i3 = r2.lookahead - (x2 - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n3 + x2 - 1]) & r2.hash_mask, r2.prev[n3 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n3, n3++, --i3; ) ;
            r2.strstart = n3, r2.lookahead = x2 - 1, j2(r2);
          }
          return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x2 - 1, r2.match_available = 0, e2.next_in = o3, e2.input = h3, e2.avail_in = a2, r2.wrap = s2, m2;
        }, r.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, {}], 48: [function(e, t, r) {
        "use strict";
        t.exports = function(e2, t2) {
          var r2, n2, i2, s, a, o2, h2, u2, l2, f2, c, d2, p2, m2, _2, g2, b2, v2, y2, w2, k2, x2, S2, z2, C2;
          r2 = e2.state, n2 = e2.next_in, z2 = e2.input, i2 = n2 + (e2.avail_in - 5), s = e2.next_out, C2 = e2.output, a = s - (t2 - e2.avail_out), o2 = s + (e2.avail_out - 257), h2 = r2.dmax, u2 = r2.wsize, l2 = r2.whave, f2 = r2.wnext, c = r2.window, d2 = r2.hold, p2 = r2.bits, m2 = r2.lencode, _2 = r2.distcode, g2 = (1 << r2.lenbits) - 1, b2 = (1 << r2.distbits) - 1;
          e: do {
            p2 < 15 && (d2 += z2[n2++] << p2, p2 += 8, d2 += z2[n2++] << p2, p2 += 8), v2 = m2[d2 & g2];
            t: for (; ; ) {
              if (d2 >>>= y2 = v2 >>> 24, p2 -= y2, 0 === (y2 = v2 >>> 16 & 255)) C2[s++] = 65535 & v2;
              else {
                if (!(16 & y2)) {
                  if (0 == (64 & y2)) {
                    v2 = m2[(65535 & v2) + (d2 & (1 << y2) - 1)];
                    continue t;
                  }
                  if (32 & y2) {
                    r2.mode = 12;
                    break e;
                  }
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break e;
                }
                w2 = 65535 & v2, (y2 &= 15) && (p2 < y2 && (d2 += z2[n2++] << p2, p2 += 8), w2 += d2 & (1 << y2) - 1, d2 >>>= y2, p2 -= y2), p2 < 15 && (d2 += z2[n2++] << p2, p2 += 8, d2 += z2[n2++] << p2, p2 += 8), v2 = _2[d2 & b2];
                r: for (; ; ) {
                  if (d2 >>>= y2 = v2 >>> 24, p2 -= y2, !(16 & (y2 = v2 >>> 16 & 255))) {
                    if (0 == (64 & y2)) {
                      v2 = _2[(65535 & v2) + (d2 & (1 << y2) - 1)];
                      continue r;
                    }
                    e2.msg = "invalid distance code", r2.mode = 30;
                    break e;
                  }
                  if (k2 = 65535 & v2, p2 < (y2 &= 15) && (d2 += z2[n2++] << p2, (p2 += 8) < y2 && (d2 += z2[n2++] << p2, p2 += 8)), h2 < (k2 += d2 & (1 << y2) - 1)) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break e;
                  }
                  if (d2 >>>= y2, p2 -= y2, (y2 = s - a) < k2) {
                    if (l2 < (y2 = k2 - y2) && r2.sane) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (S2 = c, (x2 = 0) === f2) {
                      if (x2 += u2 - y2, y2 < w2) {
                        for (w2 -= y2; C2[s++] = c[x2++], --y2; ) ;
                        x2 = s - k2, S2 = C2;
                      }
                    } else if (f2 < y2) {
                      if (x2 += u2 + f2 - y2, (y2 -= f2) < w2) {
                        for (w2 -= y2; C2[s++] = c[x2++], --y2; ) ;
                        if (x2 = 0, f2 < w2) {
                          for (w2 -= y2 = f2; C2[s++] = c[x2++], --y2; ) ;
                          x2 = s - k2, S2 = C2;
                        }
                      }
                    } else if (x2 += f2 - y2, y2 < w2) {
                      for (w2 -= y2; C2[s++] = c[x2++], --y2; ) ;
                      x2 = s - k2, S2 = C2;
                    }
                    for (; 2 < w2; ) C2[s++] = S2[x2++], C2[s++] = S2[x2++], C2[s++] = S2[x2++], w2 -= 3;
                    w2 && (C2[s++] = S2[x2++], 1 < w2 && (C2[s++] = S2[x2++]));
                  } else {
                    for (x2 = s - k2; C2[s++] = C2[x2++], C2[s++] = C2[x2++], C2[s++] = C2[x2++], 2 < (w2 -= 3); ) ;
                    w2 && (C2[s++] = C2[x2++], 1 < w2 && (C2[s++] = C2[x2++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (n2 < i2 && s < o2);
          n2 -= w2 = p2 >> 3, d2 &= (1 << (p2 -= w2 << 3)) - 1, e2.next_in = n2, e2.next_out = s, e2.avail_in = n2 < i2 ? i2 - n2 + 5 : 5 - (n2 - i2), e2.avail_out = s < o2 ? o2 - s + 257 : 257 - (s - o2), r2.hold = d2, r2.bits = p2;
        };
      }, {}], 49: [function(e, t, r) {
        "use strict";
        var I2 = e("../utils/common"), O2 = e("./adler32"), B2 = e("./crc32"), R2 = e("./inffast"), T2 = e("./inftrees"), D2 = 1, F2 = 2, N2 = 0, U2 = -2, P2 = 1, n2 = 852, i2 = 592;
        function L2(e2) {
          return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
        }
        function s() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I2.Buf16(320), this.work = new I2.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function a(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P2, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I2.Buf32(n2), t2.distcode = t2.distdyn = new I2.Buf32(i2), t2.sane = 1, t2.back = -1, N2) : U2;
        }
        function o2(e2) {
          var t2;
          return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U2;
        }
        function h2(e2, t2) {
          var r2, n3;
          return e2 && e2.state ? (n3 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U2 : (null !== n3.window && n3.wbits !== t2 && (n3.window = null), n3.wrap = r2, n3.wbits = t2, o2(e2))) : U2;
        }
        function u2(e2, t2) {
          var r2, n3;
          return e2 ? (n3 = new s(), (e2.state = n3).window = null, (r2 = h2(e2, t2)) !== N2 && (e2.state = null), r2) : U2;
        }
        var l2, f2, c = true;
        function j2(e2) {
          if (c) {
            var t2;
            for (l2 = new I2.Buf32(512), f2 = new I2.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
            for (; t2 < 256; ) e2.lens[t2++] = 9;
            for (; t2 < 280; ) e2.lens[t2++] = 7;
            for (; t2 < 288; ) e2.lens[t2++] = 8;
            for (T2(D2, e2.lens, 0, 288, l2, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
            T2(F2, e2.lens, 0, 32, f2, 0, e2.work, { bits: 5 }), c = false;
          }
          e2.lencode = l2, e2.lenbits = 9, e2.distcode = f2, e2.distbits = 5;
        }
        function Z2(e2, t2, r2, n3) {
          var i3, s2 = e2.state;
          return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I2.Buf8(s2.wsize)), n3 >= s2.wsize ? (I2.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n3 < (i3 = s2.wsize - s2.wnext) && (i3 = n3), I2.arraySet(s2.window, t2, r2 - n3, i3, s2.wnext), (n3 -= i3) ? (I2.arraySet(s2.window, t2, r2 - n3, n3, 0), s2.wnext = n3, s2.whave = s2.wsize) : (s2.wnext += i3, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i3))), 0;
        }
        r.inflateReset = o2, r.inflateReset2 = h2, r.inflateResetKeep = a, r.inflateInit = function(e2) {
          return u2(e2, 15);
        }, r.inflateInit2 = u2, r.inflate = function(e2, t2) {
          var r2, n3, i3, s2, a2, o3, h3, u3, l3, f3, c2, d2, p2, m2, _2, g2, b2, v2, y2, w2, k2, x2, S2, z2, C2 = 0, E2 = new I2.Buf8(4), A2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U2;
          12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i3 = e2.output, h3 = e2.avail_out, s2 = e2.next_in, n3 = e2.input, o3 = e2.avail_in, u3 = r2.hold, l3 = r2.bits, f3 = o3, c2 = h3, x2 = N2;
          e: for (; ; ) switch (r2.mode) {
            case P2:
              if (0 === r2.wrap) {
                r2.mode = 13;
                break;
              }
              for (; l3 < 16; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              if (2 & r2.wrap && 35615 === u3) {
                E2[r2.check = 0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0), l3 = u3 = 0, r2.mode = 2;
                break;
              }
              if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u3) << 8) + (u3 >> 8)) % 31) {
                e2.msg = "incorrect header check", r2.mode = 30;
                break;
              }
              if (8 != (15 & u3)) {
                e2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (l3 -= 4, k2 = 8 + (15 & (u3 >>>= 4)), 0 === r2.wbits) r2.wbits = k2;
              else if (k2 > r2.wbits) {
                e2.msg = "invalid window size", r2.mode = 30;
                break;
              }
              r2.dmax = 1 << k2, e2.adler = r2.check = 1, r2.mode = 512 & u3 ? 10 : 12, l3 = u3 = 0;
              break;
            case 2:
              for (; l3 < 16; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              if (r2.flags = u3, 8 != (255 & r2.flags)) {
                e2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (57344 & r2.flags) {
                e2.msg = "unknown header flags set", r2.mode = 30;
                break;
              }
              r2.head && (r2.head.text = u3 >> 8 & 1), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0)), l3 = u3 = 0, r2.mode = 3;
            case 3:
              for (; l3 < 32; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              r2.head && (r2.head.time = u3), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, E2[2] = u3 >>> 16 & 255, E2[3] = u3 >>> 24 & 255, r2.check = B2(r2.check, E2, 4, 0)), l3 = u3 = 0, r2.mode = 4;
            case 4:
              for (; l3 < 16; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              r2.head && (r2.head.xflags = 255 & u3, r2.head.os = u3 >> 8), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0)), l3 = u3 = 0, r2.mode = 5;
            case 5:
              if (1024 & r2.flags) {
                for (; l3 < 16; ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                r2.length = u3, r2.head && (r2.head.extra_len = u3), 512 & r2.flags && (E2[0] = 255 & u3, E2[1] = u3 >>> 8 & 255, r2.check = B2(r2.check, E2, 2, 0)), l3 = u3 = 0;
              } else r2.head && (r2.head.extra = null);
              r2.mode = 6;
            case 6:
              if (1024 & r2.flags && (o3 < (d2 = r2.length) && (d2 = o3), d2 && (r2.head && (k2 = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I2.arraySet(r2.head.extra, n3, s2, d2, k2)), 512 & r2.flags && (r2.check = B2(r2.check, n3, d2, s2)), o3 -= d2, s2 += d2, r2.length -= d2), r2.length)) break e;
              r2.length = 0, r2.mode = 7;
            case 7:
              if (2048 & r2.flags) {
                if (0 === o3) break e;
                for (d2 = 0; k2 = n3[s2 + d2++], r2.head && k2 && r2.length < 65536 && (r2.head.name += String.fromCharCode(k2)), k2 && d2 < o3; ) ;
                if (512 & r2.flags && (r2.check = B2(r2.check, n3, d2, s2)), o3 -= d2, s2 += d2, k2) break e;
              } else r2.head && (r2.head.name = null);
              r2.length = 0, r2.mode = 8;
            case 8:
              if (4096 & r2.flags) {
                if (0 === o3) break e;
                for (d2 = 0; k2 = n3[s2 + d2++], r2.head && k2 && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k2)), k2 && d2 < o3; ) ;
                if (512 & r2.flags && (r2.check = B2(r2.check, n3, d2, s2)), o3 -= d2, s2 += d2, k2) break e;
              } else r2.head && (r2.head.comment = null);
              r2.mode = 9;
            case 9:
              if (512 & r2.flags) {
                for (; l3 < 16; ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                if (u3 !== (65535 & r2.check)) {
                  e2.msg = "header crc mismatch", r2.mode = 30;
                  break;
                }
                l3 = u3 = 0;
              }
              r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
              break;
            case 10:
              for (; l3 < 32; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              e2.adler = r2.check = L2(u3), l3 = u3 = 0, r2.mode = 11;
            case 11:
              if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h3, e2.next_in = s2, e2.avail_in = o3, r2.hold = u3, r2.bits = l3, 2;
              e2.adler = r2.check = 1, r2.mode = 12;
            case 12:
              if (5 === t2 || 6 === t2) break e;
            case 13:
              if (r2.last) {
                u3 >>>= 7 & l3, l3 -= 7 & l3, r2.mode = 27;
                break;
              }
              for (; l3 < 3; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              switch (r2.last = 1 & u3, l3 -= 1, 3 & (u3 >>>= 1)) {
                case 0:
                  r2.mode = 14;
                  break;
                case 1:
                  if (j2(r2), r2.mode = 20, 6 !== t2) break;
                  u3 >>>= 2, l3 -= 2;
                  break e;
                case 2:
                  r2.mode = 17;
                  break;
                case 3:
                  e2.msg = "invalid block type", r2.mode = 30;
              }
              u3 >>>= 2, l3 -= 2;
              break;
            case 14:
              for (u3 >>>= 7 & l3, l3 -= 7 & l3; l3 < 32; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              if ((65535 & u3) != (u3 >>> 16 ^ 65535)) {
                e2.msg = "invalid stored block lengths", r2.mode = 30;
                break;
              }
              if (r2.length = 65535 & u3, l3 = u3 = 0, r2.mode = 15, 6 === t2) break e;
            case 15:
              r2.mode = 16;
            case 16:
              if (d2 = r2.length) {
                if (o3 < d2 && (d2 = o3), h3 < d2 && (d2 = h3), 0 === d2) break e;
                I2.arraySet(i3, n3, s2, d2, a2), o3 -= d2, s2 += d2, h3 -= d2, a2 += d2, r2.length -= d2;
                break;
              }
              r2.mode = 12;
              break;
            case 17:
              for (; l3 < 14; ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              if (r2.nlen = 257 + (31 & u3), u3 >>>= 5, l3 -= 5, r2.ndist = 1 + (31 & u3), u3 >>>= 5, l3 -= 5, r2.ncode = 4 + (15 & u3), u3 >>>= 4, l3 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                e2.msg = "too many length or distance symbols", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 18;
            case 18:
              for (; r2.have < r2.ncode; ) {
                for (; l3 < 3; ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                r2.lens[A2[r2.have++]] = 7 & u3, u3 >>>= 3, l3 -= 3;
              }
              for (; r2.have < 19; ) r2.lens[A2[r2.have++]] = 0;
              if (r2.lencode = r2.lendyn, r2.lenbits = 7, S2 = { bits: r2.lenbits }, x2 = T2(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S2), r2.lenbits = S2.bits, x2) {
                e2.msg = "invalid code lengths set", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 19;
            case 19:
              for (; r2.have < r2.nlen + r2.ndist; ) {
                for (; g2 = (C2 = r2.lencode[u3 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b2 = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                if (b2 < 16) u3 >>>= _2, l3 -= _2, r2.lens[r2.have++] = b2;
                else {
                  if (16 === b2) {
                    for (z2 = _2 + 2; l3 < z2; ) {
                      if (0 === o3) break e;
                      o3--, u3 += n3[s2++] << l3, l3 += 8;
                    }
                    if (u3 >>>= _2, l3 -= _2, 0 === r2.have) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    k2 = r2.lens[r2.have - 1], d2 = 3 + (3 & u3), u3 >>>= 2, l3 -= 2;
                  } else if (17 === b2) {
                    for (z2 = _2 + 3; l3 < z2; ) {
                      if (0 === o3) break e;
                      o3--, u3 += n3[s2++] << l3, l3 += 8;
                    }
                    l3 -= _2, k2 = 0, d2 = 3 + (7 & (u3 >>>= _2)), u3 >>>= 3, l3 -= 3;
                  } else {
                    for (z2 = _2 + 7; l3 < z2; ) {
                      if (0 === o3) break e;
                      o3--, u3 += n3[s2++] << l3, l3 += 8;
                    }
                    l3 -= _2, k2 = 0, d2 = 11 + (127 & (u3 >>>= _2)), u3 >>>= 7, l3 -= 7;
                  }
                  if (r2.have + d2 > r2.nlen + r2.ndist) {
                    e2.msg = "invalid bit length repeat", r2.mode = 30;
                    break;
                  }
                  for (; d2--; ) r2.lens[r2.have++] = k2;
                }
              }
              if (30 === r2.mode) break;
              if (0 === r2.lens[256]) {
                e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                break;
              }
              if (r2.lenbits = 9, S2 = { bits: r2.lenbits }, x2 = T2(D2, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S2), r2.lenbits = S2.bits, x2) {
                e2.msg = "invalid literal/lengths set", r2.mode = 30;
                break;
              }
              if (r2.distbits = 6, r2.distcode = r2.distdyn, S2 = { bits: r2.distbits }, x2 = T2(F2, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S2), r2.distbits = S2.bits, x2) {
                e2.msg = "invalid distances set", r2.mode = 30;
                break;
              }
              if (r2.mode = 20, 6 === t2) break e;
            case 20:
              r2.mode = 21;
            case 21:
              if (6 <= o3 && 258 <= h3) {
                e2.next_out = a2, e2.avail_out = h3, e2.next_in = s2, e2.avail_in = o3, r2.hold = u3, r2.bits = l3, R2(e2, c2), a2 = e2.next_out, i3 = e2.output, h3 = e2.avail_out, s2 = e2.next_in, n3 = e2.input, o3 = e2.avail_in, u3 = r2.hold, l3 = r2.bits, 12 === r2.mode && (r2.back = -1);
                break;
              }
              for (r2.back = 0; g2 = (C2 = r2.lencode[u3 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b2 = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              if (g2 && 0 == (240 & g2)) {
                for (v2 = _2, y2 = g2, w2 = b2; g2 = (C2 = r2.lencode[w2 + ((u3 & (1 << v2 + y2) - 1) >> v2)]) >>> 16 & 255, b2 = 65535 & C2, !(v2 + (_2 = C2 >>> 24) <= l3); ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                u3 >>>= v2, l3 -= v2, r2.back += v2;
              }
              if (u3 >>>= _2, l3 -= _2, r2.back += _2, r2.length = b2, 0 === g2) {
                r2.mode = 26;
                break;
              }
              if (32 & g2) {
                r2.back = -1, r2.mode = 12;
                break;
              }
              if (64 & g2) {
                e2.msg = "invalid literal/length code", r2.mode = 30;
                break;
              }
              r2.extra = 15 & g2, r2.mode = 22;
            case 22:
              if (r2.extra) {
                for (z2 = r2.extra; l3 < z2; ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                r2.length += u3 & (1 << r2.extra) - 1, u3 >>>= r2.extra, l3 -= r2.extra, r2.back += r2.extra;
              }
              r2.was = r2.length, r2.mode = 23;
            case 23:
              for (; g2 = (C2 = r2.distcode[u3 & (1 << r2.distbits) - 1]) >>> 16 & 255, b2 = 65535 & C2, !((_2 = C2 >>> 24) <= l3); ) {
                if (0 === o3) break e;
                o3--, u3 += n3[s2++] << l3, l3 += 8;
              }
              if (0 == (240 & g2)) {
                for (v2 = _2, y2 = g2, w2 = b2; g2 = (C2 = r2.distcode[w2 + ((u3 & (1 << v2 + y2) - 1) >> v2)]) >>> 16 & 255, b2 = 65535 & C2, !(v2 + (_2 = C2 >>> 24) <= l3); ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                u3 >>>= v2, l3 -= v2, r2.back += v2;
              }
              if (u3 >>>= _2, l3 -= _2, r2.back += _2, 64 & g2) {
                e2.msg = "invalid distance code", r2.mode = 30;
                break;
              }
              r2.offset = b2, r2.extra = 15 & g2, r2.mode = 24;
            case 24:
              if (r2.extra) {
                for (z2 = r2.extra; l3 < z2; ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                r2.offset += u3 & (1 << r2.extra) - 1, u3 >>>= r2.extra, l3 -= r2.extra, r2.back += r2.extra;
              }
              if (r2.offset > r2.dmax) {
                e2.msg = "invalid distance too far back", r2.mode = 30;
                break;
              }
              r2.mode = 25;
            case 25:
              if (0 === h3) break e;
              if (d2 = c2 - h3, r2.offset > d2) {
                if ((d2 = r2.offset - d2) > r2.whave && r2.sane) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                p2 = d2 > r2.wnext ? (d2 -= r2.wnext, r2.wsize - d2) : r2.wnext - d2, d2 > r2.length && (d2 = r2.length), m2 = r2.window;
              } else m2 = i3, p2 = a2 - r2.offset, d2 = r2.length;
              for (h3 < d2 && (d2 = h3), h3 -= d2, r2.length -= d2; i3[a2++] = m2[p2++], --d2; ) ;
              0 === r2.length && (r2.mode = 21);
              break;
            case 26:
              if (0 === h3) break e;
              i3[a2++] = r2.length, h3--, r2.mode = 21;
              break;
            case 27:
              if (r2.wrap) {
                for (; l3 < 32; ) {
                  if (0 === o3) break e;
                  o3--, u3 |= n3[s2++] << l3, l3 += 8;
                }
                if (c2 -= h3, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B2(r2.check, i3, c2, a2 - c2) : O2(r2.check, i3, c2, a2 - c2)), c2 = h3, (r2.flags ? u3 : L2(u3)) !== r2.check) {
                  e2.msg = "incorrect data check", r2.mode = 30;
                  break;
                }
                l3 = u3 = 0;
              }
              r2.mode = 28;
            case 28:
              if (r2.wrap && r2.flags) {
                for (; l3 < 32; ) {
                  if (0 === o3) break e;
                  o3--, u3 += n3[s2++] << l3, l3 += 8;
                }
                if (u3 !== (4294967295 & r2.total)) {
                  e2.msg = "incorrect length check", r2.mode = 30;
                  break;
                }
                l3 = u3 = 0;
              }
              r2.mode = 29;
            case 29:
              x2 = 1;
              break e;
            case 30:
              x2 = -3;
              break e;
            case 31:
              return -4;
            case 32:
            default:
              return U2;
          }
          return e2.next_out = a2, e2.avail_out = h3, e2.next_in = s2, e2.avail_in = o3, r2.hold = u3, r2.bits = l3, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z2(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f3 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f3, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B2(r2.check, i3, c2, e2.next_out - c2) : O2(r2.check, i3, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f3 && 0 === c2 || 4 === t2) && x2 === N2 && (x2 = -5), x2);
        }, r.inflateEnd = function(e2) {
          if (!e2 || !e2.state) return U2;
          var t2 = e2.state;
          return t2.window && (t2.window = null), e2.state = null, N2;
        }, r.inflateGetHeader = function(e2, t2) {
          var r2;
          return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U2 : ((r2.head = t2).done = false, N2) : U2;
        }, r.inflateSetDictionary = function(e2, t2) {
          var r2, n3 = t2.length;
          return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U2 : 11 === r2.mode && O2(1, t2, n3, 0) !== r2.check ? -3 : Z2(e2, t2, n3, n3) ? (r2.mode = 31, -4) : (r2.havedict = 1, N2) : U2;
        }, r.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
        "use strict";
        var D2 = e("../utils/common"), F2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N2 = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U2 = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P2 = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(e2, t2, r2, n2, i2, s, a, o2) {
          var h2, u2, l2, f2, c, d2, p2, m2, _2, g2 = o2.bits, b2 = 0, v2 = 0, y2 = 0, w2 = 0, k2 = 0, x2 = 0, S2 = 0, z2 = 0, C2 = 0, E2 = 0, A2 = null, I2 = 0, O2 = new D2.Buf16(16), B2 = new D2.Buf16(16), R2 = null, T2 = 0;
          for (b2 = 0; b2 <= 15; b2++) O2[b2] = 0;
          for (v2 = 0; v2 < n2; v2++) O2[t2[r2 + v2]]++;
          for (k2 = g2, w2 = 15; 1 <= w2 && 0 === O2[w2]; w2--) ;
          if (w2 < k2 && (k2 = w2), 0 === w2) return i2[s++] = 20971520, i2[s++] = 20971520, o2.bits = 1, 0;
          for (y2 = 1; y2 < w2 && 0 === O2[y2]; y2++) ;
          for (k2 < y2 && (k2 = y2), b2 = z2 = 1; b2 <= 15; b2++) if (z2 <<= 1, (z2 -= O2[b2]) < 0) return -1;
          if (0 < z2 && (0 === e2 || 1 !== w2)) return -1;
          for (B2[1] = 0, b2 = 1; b2 < 15; b2++) B2[b2 + 1] = B2[b2] + O2[b2];
          for (v2 = 0; v2 < n2; v2++) 0 !== t2[r2 + v2] && (a[B2[t2[r2 + v2]]++] = v2);
          if (d2 = 0 === e2 ? (A2 = R2 = a, 19) : 1 === e2 ? (A2 = F2, I2 -= 257, R2 = N2, T2 -= 257, 256) : (A2 = U2, R2 = P2, -1), b2 = y2, c = s, S2 = v2 = E2 = 0, l2 = -1, f2 = (C2 = 1 << (x2 = k2)) - 1, 1 === e2 && 852 < C2 || 2 === e2 && 592 < C2) return 1;
          for (; ; ) {
            for (p2 = b2 - S2, _2 = a[v2] < d2 ? (m2 = 0, a[v2]) : a[v2] > d2 ? (m2 = R2[T2 + a[v2]], A2[I2 + a[v2]]) : (m2 = 96, 0), h2 = 1 << b2 - S2, y2 = u2 = 1 << x2; i2[c + (E2 >> S2) + (u2 -= h2)] = p2 << 24 | m2 << 16 | _2 | 0, 0 !== u2; ) ;
            for (h2 = 1 << b2 - 1; E2 & h2; ) h2 >>= 1;
            if (0 !== h2 ? (E2 &= h2 - 1, E2 += h2) : E2 = 0, v2++, 0 == --O2[b2]) {
              if (b2 === w2) break;
              b2 = t2[r2 + a[v2]];
            }
            if (k2 < b2 && (E2 & f2) !== l2) {
              for (0 === S2 && (S2 = k2), c += y2, z2 = 1 << (x2 = b2 - S2); x2 + S2 < w2 && !((z2 -= O2[x2 + S2]) <= 0); ) x2++, z2 <<= 1;
              if (C2 += 1 << x2, 1 === e2 && 852 < C2 || 2 === e2 && 592 < C2) return 1;
              i2[l2 = E2 & f2] = k2 << 24 | x2 << 16 | c - s | 0;
            }
          }
          return 0 !== E2 && (i2[c + E2] = b2 - S2 << 24 | 64 << 16 | 0), o2.bits = k2, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(e, t, r) {
        "use strict";
        t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(e, t, r) {
        "use strict";
        var i2 = e("../utils/common"), o2 = 0, h2 = 1;
        function n2(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        var s = 0, a = 29, u2 = 256, l2 = u2 + 1 + a, f2 = 30, c = 19, _2 = 2 * l2 + 1, g2 = 15, d2 = 16, p2 = 7, m2 = 256, b2 = 16, v2 = 17, y2 = 18, w2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k2 = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z2 = new Array(2 * (l2 + 2));
        n2(z2);
        var C2 = new Array(2 * f2);
        n2(C2);
        var E2 = new Array(512);
        n2(E2);
        var A2 = new Array(256);
        n2(A2);
        var I2 = new Array(a);
        n2(I2);
        var O2, B2, R2, T2 = new Array(f2);
        function D2(e2, t2, r2, n3, i3) {
          this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n3, this.max_length = i3, this.has_stree = e2 && e2.length;
        }
        function F2(e2, t2) {
          this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
        }
        function N2(e2) {
          return e2 < 256 ? E2[e2] : E2[256 + (e2 >>> 7)];
        }
        function U2(e2, t2) {
          e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
        }
        function P2(e2, t2, r2) {
          e2.bi_valid > d2 - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U2(e2, e2.bi_buf), e2.bi_buf = t2 >> d2 - e2.bi_valid, e2.bi_valid += r2 - d2) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
        }
        function L2(e2, t2, r2) {
          P2(e2, r2[2 * t2], r2[2 * t2 + 1]);
        }
        function j2(e2, t2) {
          for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
          return r2 >>> 1;
        }
        function Z2(e2, t2, r2) {
          var n3, i3, s2 = new Array(g2 + 1), a2 = 0;
          for (n3 = 1; n3 <= g2; n3++) s2[n3] = a2 = a2 + r2[n3 - 1] << 1;
          for (i3 = 0; i3 <= t2; i3++) {
            var o3 = e2[2 * i3 + 1];
            0 !== o3 && (e2[2 * i3] = j2(s2[o3]++, o3));
          }
        }
        function W2(e2) {
          var t2;
          for (t2 = 0; t2 < l2; t2++) e2.dyn_ltree[2 * t2] = 0;
          for (t2 = 0; t2 < f2; t2++) e2.dyn_dtree[2 * t2] = 0;
          for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
          e2.dyn_ltree[2 * m2] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
        }
        function M2(e2) {
          8 < e2.bi_valid ? U2(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
        }
        function H2(e2, t2, r2, n3) {
          var i3 = 2 * t2, s2 = 2 * r2;
          return e2[i3] < e2[s2] || e2[i3] === e2[s2] && n3[t2] <= n3[r2];
        }
        function G2(e2, t2, r2) {
          for (var n3 = e2.heap[r2], i3 = r2 << 1; i3 <= e2.heap_len && (i3 < e2.heap_len && H2(t2, e2.heap[i3 + 1], e2.heap[i3], e2.depth) && i3++, !H2(t2, n3, e2.heap[i3], e2.depth)); ) e2.heap[r2] = e2.heap[i3], r2 = i3, i3 <<= 1;
          e2.heap[r2] = n3;
        }
        function K2(e2, t2, r2) {
          var n3, i3, s2, a2, o3 = 0;
          if (0 !== e2.last_lit) for (; n3 = e2.pending_buf[e2.d_buf + 2 * o3] << 8 | e2.pending_buf[e2.d_buf + 2 * o3 + 1], i3 = e2.pending_buf[e2.l_buf + o3], o3++, 0 === n3 ? L2(e2, i3, t2) : (L2(e2, (s2 = A2[i3]) + u2 + 1, t2), 0 !== (a2 = w2[s2]) && P2(e2, i3 -= I2[s2], a2), L2(e2, s2 = N2(--n3), r2), 0 !== (a2 = k2[s2]) && P2(e2, n3 -= T2[s2], a2)), o3 < e2.last_lit; ) ;
          L2(e2, m2, t2);
        }
        function Y2(e2, t2) {
          var r2, n3, i3, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o3 = t2.stat_desc.has_stree, h3 = t2.stat_desc.elems, u3 = -1;
          for (e2.heap_len = 0, e2.heap_max = _2, r2 = 0; r2 < h3; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u3 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
          for (; e2.heap_len < 2; ) s2[2 * (i3 = e2.heap[++e2.heap_len] = u3 < 2 ? ++u3 : 0)] = 1, e2.depth[i3] = 0, e2.opt_len--, o3 && (e2.static_len -= a2[2 * i3 + 1]);
          for (t2.max_code = u3, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G2(e2, s2, r2);
          for (i3 = h3; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G2(e2, s2, 1), n3 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n3, s2[2 * i3] = s2[2 * r2] + s2[2 * n3], e2.depth[i3] = (e2.depth[r2] >= e2.depth[n3] ? e2.depth[r2] : e2.depth[n3]) + 1, s2[2 * r2 + 1] = s2[2 * n3 + 1] = i3, e2.heap[1] = i3++, G2(e2, s2, 1), 2 <= e2.heap_len; ) ;
          e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
            var r3, n4, i4, s3, a3, o4, h4 = t3.dyn_tree, u4 = t3.max_code, l3 = t3.stat_desc.static_tree, f3 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d3 = t3.stat_desc.extra_base, p3 = t3.stat_desc.max_length, m3 = 0;
            for (s3 = 0; s3 <= g2; s3++) e3.bl_count[s3] = 0;
            for (h4[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _2; r3++) p3 < (s3 = h4[2 * h4[2 * (n4 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p3, m3++), h4[2 * n4 + 1] = s3, u4 < n4 || (e3.bl_count[s3]++, a3 = 0, d3 <= n4 && (a3 = c2[n4 - d3]), o4 = h4[2 * n4], e3.opt_len += o4 * (s3 + a3), f3 && (e3.static_len += o4 * (l3[2 * n4 + 1] + a3)));
            if (0 !== m3) {
              do {
                for (s3 = p3 - 1; 0 === e3.bl_count[s3]; ) s3--;
                e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p3]--, m3 -= 2;
              } while (0 < m3);
              for (s3 = p3; 0 !== s3; s3--) for (n4 = e3.bl_count[s3]; 0 !== n4; ) u4 < (i4 = e3.heap[--r3]) || (h4[2 * i4 + 1] !== s3 && (e3.opt_len += (s3 - h4[2 * i4 + 1]) * h4[2 * i4], h4[2 * i4 + 1] = s3), n4--);
            }
          })(e2, t2), Z2(s2, u3, e2.bl_count);
        }
        function X2(e2, t2, r2) {
          var n3, i3, s2 = -1, a2 = t2[1], o3 = 0, h3 = 7, u3 = 4;
          for (0 === a2 && (h3 = 138, u3 = 3), t2[2 * (r2 + 1) + 1] = 65535, n3 = 0; n3 <= r2; n3++) i3 = a2, a2 = t2[2 * (n3 + 1) + 1], ++o3 < h3 && i3 === a2 || (o3 < u3 ? e2.bl_tree[2 * i3] += o3 : 0 !== i3 ? (i3 !== s2 && e2.bl_tree[2 * i3]++, e2.bl_tree[2 * b2]++) : o3 <= 10 ? e2.bl_tree[2 * v2]++ : e2.bl_tree[2 * y2]++, s2 = i3, u3 = (o3 = 0) === a2 ? (h3 = 138, 3) : i3 === a2 ? (h3 = 6, 3) : (h3 = 7, 4));
        }
        function V2(e2, t2, r2) {
          var n3, i3, s2 = -1, a2 = t2[1], o3 = 0, h3 = 7, u3 = 4;
          for (0 === a2 && (h3 = 138, u3 = 3), n3 = 0; n3 <= r2; n3++) if (i3 = a2, a2 = t2[2 * (n3 + 1) + 1], !(++o3 < h3 && i3 === a2)) {
            if (o3 < u3) for (; L2(e2, i3, e2.bl_tree), 0 != --o3; ) ;
            else 0 !== i3 ? (i3 !== s2 && (L2(e2, i3, e2.bl_tree), o3--), L2(e2, b2, e2.bl_tree), P2(e2, o3 - 3, 2)) : o3 <= 10 ? (L2(e2, v2, e2.bl_tree), P2(e2, o3 - 3, 3)) : (L2(e2, y2, e2.bl_tree), P2(e2, o3 - 11, 7));
            s2 = i3, u3 = (o3 = 0) === a2 ? (h3 = 138, 3) : i3 === a2 ? (h3 = 6, 3) : (h3 = 7, 4);
          }
        }
        n2(T2);
        var q2 = false;
        function J2(e2, t2, r2, n3) {
          P2(e2, (s << 1) + (n3 ? 1 : 0), 3), (function(e3, t3, r3, n4) {
            M2(e3), n4 && (U2(e3, r3), U2(e3, ~r3)), i2.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
          })(e2, t2, r2, true);
        }
        r._tr_init = function(e2) {
          q2 || ((function() {
            var e3, t2, r2, n3, i3, s2 = new Array(g2 + 1);
            for (n3 = r2 = 0; n3 < a - 1; n3++) for (I2[n3] = r2, e3 = 0; e3 < 1 << w2[n3]; e3++) A2[r2++] = n3;
            for (A2[r2 - 1] = n3, n3 = i3 = 0; n3 < 16; n3++) for (T2[n3] = i3, e3 = 0; e3 < 1 << k2[n3]; e3++) E2[i3++] = n3;
            for (i3 >>= 7; n3 < f2; n3++) for (T2[n3] = i3 << 7, e3 = 0; e3 < 1 << k2[n3] - 7; e3++) E2[256 + i3++] = n3;
            for (t2 = 0; t2 <= g2; t2++) s2[t2] = 0;
            for (e3 = 0; e3 <= 143; ) z2[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (; e3 <= 255; ) z2[2 * e3 + 1] = 9, e3++, s2[9]++;
            for (; e3 <= 279; ) z2[2 * e3 + 1] = 7, e3++, s2[7]++;
            for (; e3 <= 287; ) z2[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (Z2(z2, l2 + 1, s2), e3 = 0; e3 < f2; e3++) C2[2 * e3 + 1] = 5, C2[2 * e3] = j2(e3, 5);
            O2 = new D2(z2, w2, u2 + 1, l2, g2), B2 = new D2(C2, k2, 0, f2, g2), R2 = new D2(new Array(0), x2, 0, c, p2);
          })(), q2 = true), e2.l_desc = new F2(e2.dyn_ltree, O2), e2.d_desc = new F2(e2.dyn_dtree, B2), e2.bl_desc = new F2(e2.bl_tree, R2), e2.bi_buf = 0, e2.bi_valid = 0, W2(e2);
        }, r._tr_stored_block = J2, r._tr_flush_block = function(e2, t2, r2, n3) {
          var i3, s2, a2 = 0;
          0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
            var t3, r3 = 4093624447;
            for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o2;
            if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h2;
            for (t3 = 32; t3 < u2; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h2;
            return o2;
          })(e2)), Y2(e2, e2.l_desc), Y2(e2, e2.d_desc), a2 = (function(e3) {
            var t3;
            for (X2(e3, e3.dyn_ltree, e3.l_desc.max_code), X2(e3, e3.dyn_dtree, e3.d_desc.max_code), Y2(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S2[t3] + 1]; t3--) ;
            return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
          })(e2), i3 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i3 && (i3 = s2)) : i3 = s2 = r2 + 5, r2 + 4 <= i3 && -1 !== t2 ? J2(e2, t2, r2, n3) : 4 === e2.strategy || s2 === i3 ? (P2(e2, 2 + (n3 ? 1 : 0), 3), K2(e2, z2, C2)) : (P2(e2, 4 + (n3 ? 1 : 0), 3), (function(e3, t3, r3, n4) {
            var i4;
            for (P2(e3, t3 - 257, 5), P2(e3, r3 - 1, 5), P2(e3, n4 - 4, 4), i4 = 0; i4 < n4; i4++) P2(e3, e3.bl_tree[2 * S2[i4] + 1], 3);
            V2(e3, e3.dyn_ltree, t3 - 1), V2(e3, e3.dyn_dtree, r3 - 1);
          })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K2(e2, e2.dyn_ltree, e2.dyn_dtree)), W2(e2), n3 && M2(e2);
        }, r._tr_tally = function(e2, t2, r2) {
          return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A2[r2] + u2 + 1)]++, e2.dyn_dtree[2 * N2(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
        }, r._tr_align = function(e2) {
          P2(e2, 2, 3), L2(e2, m2, z2), (function(e3) {
            16 === e3.bi_valid ? (U2(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
          })(e2);
        };
      }, { "../utils/common": 41 }], 53: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(e, t, r) {
        (function(e2) {
          !(function(r2, n2) {
            "use strict";
            if (!r2.setImmediate) {
              var i2, s, t2, a, o2 = 1, h2 = {}, u2 = false, l2 = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
              e3 = e3 && e3.setTimeout ? e3 : r2, i2 = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                process.nextTick(function() {
                  c(e4);
                });
              } : (function() {
                if (r2.postMessage && !r2.importScripts) {
                  var e4 = true, t3 = r2.onmessage;
                  return r2.onmessage = function() {
                    e4 = false;
                  }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                }
              })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d2, false) : r2.attachEvent("onmessage", d2), function(e4) {
                r2.postMessage(a + e4, "*");
              }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                c(e4.data);
              }, function(e4) {
                t2.port2.postMessage(e4);
              }) : l2 && "onreadystatechange" in l2.createElement("script") ? (s = l2.documentElement, function(e4) {
                var t3 = l2.createElement("script");
                t3.onreadystatechange = function() {
                  c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                }, s.appendChild(t3);
              }) : function(e4) {
                setTimeout(c, 0, e4);
              }, e3.setImmediate = function(e4) {
                "function" != typeof e4 && (e4 = new Function("" + e4));
                for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                var n3 = { callback: e4, args: t3 };
                return h2[o2] = n3, i2(o2), o2++;
              }, e3.clearImmediate = f2;
            }
            function f2(e4) {
              delete h2[e4];
            }
            function c(e4) {
              if (u2) setTimeout(c, 0, e4);
              else {
                var t3 = h2[e4];
                if (t3) {
                  u2 = true;
                  try {
                    !(function(e5) {
                      var t4 = e5.callback, r3 = e5.args;
                      switch (r3.length) {
                        case 0:
                          t4();
                          break;
                        case 1:
                          t4(r3[0]);
                          break;
                        case 2:
                          t4(r3[0], r3[1]);
                          break;
                        case 3:
                          t4(r3[0], r3[1], r3[2]);
                          break;
                        default:
                          t4.apply(n2, r3);
                      }
                    })(t3);
                  } finally {
                    f2(e4), u2 = false;
                  }
                }
              }
            }
            function d2(e4) {
              e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
            }
          })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}] }, {}, [10])(10);
    });
  }
});

// node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "node_modules/lodash/lodash.js"(exports, module) {
    (function() {
      var undefined2;
      var VERSION = "4.18.1";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`", INVALID_TEMPL_IMPORTS_ERROR_TEXT = "Invalid `imports` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = (function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      })();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n2, iteratee) {
        var index = -1, result = Array(n2);
        while (++index < n2) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = (function runInContext2(context) {
        context = context == null ? root : _2.defaults(root.Object(), context, _2.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = (function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        })();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = (function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        })();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ (function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        })();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n2) {
          return shuffleSelf(copyArray(array), baseClamp(n2, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n2) {
          var length = array.length;
          if (!length) {
            return;
          }
          n2 += n2 < 0 ? length : 0;
          return isIndex(n2, length) ? array[n2] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n2) {
          var result2 = "";
          if (!string || n2 < 1 || n2 > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n2 % 2) {
              result2 += string;
            }
            n2 = nativeFloor(n2 / 2);
            if (n2) {
              string += string;
            }
          } while (n2);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n2) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n2, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            return true;
          }
          while (++index < length) {
            var key = toKey(path[index]);
            if (key === "__proto__" && !hasOwnProperty.call(object, "__proto__")) {
              return false;
            }
            if ((key === "constructor" || key === "prototype") && index < length - 1) {
              return false;
            }
          }
          var obj = parent(object, path);
          return obj == null || delete obj[toKey(last(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n2, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
          return baseSlice(array, n2 < 0 ? 0 : n2, length);
        }
        function dropRight(array, n2, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
          n2 = length - n2;
          return baseSlice(array, 0, n2 < 0 ? 0 : n2);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            baseAssignValue(result2, pair[0], pair[1]);
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n2) {
          return array && array.length ? baseNth(array, toInteger(n2)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n2, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
          return baseSlice(array, 0, n2 < 0 ? 0 : n2);
        }
        function takeRight(array, n2, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n2 = guard || n2 === undefined2 ? 1 : toInteger(n2);
          n2 = length - n2;
          return baseSlice(array, n2 < 0 ? 0 : n2, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n2, guard) {
          if (guard ? isIterateeCall(collection, n2, guard) : n2 === undefined2) {
            n2 = 1;
          } else {
            n2 = toInteger(n2);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n2);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n2, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n2 = toInteger(n2);
          return function() {
            if (--n2 < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n2, guard) {
          n2 = guard ? undefined2 : n2;
          n2 = func && n2 == null ? func.length : n2;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n2);
        }
        function before(n2, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n2 = toInteger(n2);
          return function() {
            if (--n2 > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n2 <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n2, guard) {
          if (guard ? isIterateeCall(string, n2, guard) : n2 === undefined2) {
            n2 = 1;
          } else {
            n2 = toInteger(n2);
          }
          return baseRepeat(toString(string), n2);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          arrayEach(importsKeys, function(key) {
            if (reForbiddenIdentifierChars.test(key)) {
              throw new Error2(INVALID_TEMPL_IMPORTS_ERROR_TEXT);
            }
          });
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n2) {
          n2 = toInteger(n2);
          return baseRest(function(args) {
            return baseNth(args, n2);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n2, iteratee2) {
          n2 = toInteger(n2);
          if (n2 < 1 || n2 > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n2, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n2 -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n2) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, (function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        })(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n2) {
            n2 = n2 === undefined2 ? 1 : nativeMax(toInteger(n2), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n2, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n2, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n2) {
            return this.reverse()[methodName](n2).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      });
      var _2 = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _2;
        define(function() {
          return _2;
        });
      } else if (freeModule) {
        (freeModule.exports = _2)._ = _2;
        freeExports._ = _2;
      } else {
        root._ = _2;
      }
    }).call(exports);
  }
});

// node_modules/tslib/tslib.es6.mjs
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3) if (Object.prototype.hasOwnProperty.call(b3, p2)) d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s = arguments[i2];
      for (var p2 in s) if (Object.prototype.hasOwnProperty.call(s, p2)) t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y2, t, g2 = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g2.next = verb(0), g2["throw"] = verb(1), g2["return"] = verb(2), typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2) throw new TypeError("Generator is already executing.");
    while (g2 && (g2 = 0, op[0] && (_2 = 0)), _2) try {
      if (f2 = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done) return t;
      if (y2 = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _2.label++;
          return { value: op[1], done: false };
        case 5:
          _2.label++;
          y2 = op[1];
          op = [0];
          continue;
        case 7:
          op = _2.ops.pop();
          _2.trys.pop();
          continue;
        default:
          if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _2 = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _2.label = op[1];
            break;
          }
          if (op[0] === 6 && _2.label < t[1]) {
            _2.label = t[1];
            t = op;
            break;
          }
          if (t && _2.label < t[2]) {
            _2.label = t[2];
            _2.ops.push(op);
            break;
          }
          if (t[2]) _2.ops.pop();
          _2.trys.pop();
          continue;
      }
      op = body.call(thisArg, _2);
    } catch (e) {
      op = [6, e];
      y2 = 0;
    } finally {
      f2 = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
    if (ar || !(i2 in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
      ar[i2] = from[i2];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/pptx-preview/dist/pptx-preview.es.js
var import_jszip = __toESM(require_jszip_min());
var import_lodash = __toESM(require_lodash());

// node_modules/uuid/dist/stringify.js
var byteToHex = [];
for (let i2 = 0; i2 < 256; ++i2) {
  byteToHex.push((i2 + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/rng.js
var rnds8 = new Uint8Array(16);
function rng() {
  return crypto.getRandomValues(rnds8);
}

// node_modules/uuid/dist/v4.js
function v4(options, buf, offset) {
  if (!buf && !options && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return _v4(options, buf, offset);
}
function _v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i2 = 0; i2 < 16; ++i2) {
      buf[offset + i2] = rnds[i2];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// node_modules/pptx-preview/dist/pptx-preview.es.js
function l(t) {
  return t / 12700;
}
function p(t) {
  return t / 100;
}
function d(t) {
  return t / 6e4;
}
function h(t) {
  return t / 1e5;
}
function u(t) {
  var e = Math.ceil(t / 26), r = (t % 26 || 26) - 1 + 65;
  return String.fromCharCode(r).repeat(e);
}
var f = (function() {
  function t(t2, e) {
    this.uuid = v4_default(), this.offset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.rotate = 0, this.order = 0, this.flipV = false, this.flipH = false, this.source = t2, this.ctx = e;
    var r = (0, import_lodash.get)(t2, ["p:nvSpPr", "p:nvPr"]);
    if (r) {
      var s = (0, import_lodash.get)(r, "p:ph");
      s && s.attrs && (this.idx = s.attrs.idx, this.type = s.attrs.type), (0, import_lodash.get)(r, ["attrs", "userDrawn"]) && (this.userDrawn = "1" === (0, import_lodash.get)(r, ["attrs", "userDrawn"]));
    }
    if (this.order = (0, import_lodash.get)(t2, "attrs.order", 0), this.source["p:spPr"]) {
      var a = this.getXfrm();
      a && (this.offset = { x: Math.round(l(parseInt(a["a:off"].attrs.x))), y: Math.round(l(parseInt(a["a:off"].attrs.y))) }, this.extend = { w: Math.round(l(parseInt(a["a:ext"].attrs.cx))), h: Math.round(l(parseInt(a["a:ext"].attrs.cy))) }, this.rotate = d(parseInt((0, import_lodash.get)(a, "attrs.rot", 0))), this.flipV = "1" === (0, import_lodash.get)(a, "attrs.flipV"), this.flipH = "1" === (0, import_lodash.get)(a, "attrs.flipH"));
    }
  }
  return Object.defineProperty(t.prototype, "theme", { get: function() {
    return (this.ctx.sliderMaster || this.ctx).theme;
  }, enumerable: false, configurable: true }), t.prototype.getColorThemeName = function(t2) {
    return this.ctx.getColorThemeName(t2);
  }, t.prototype.getXfrm = function() {
    var t2 = this.source["p:spPr"]["a:xfrm"];
    return t2 || (this.idx ? t2 = this.ctx.getNodeInheritAttrsByIdx(this.idx, ["p:spPr", "a:xfrm"]) : this.type && (t2 = this.ctx.getNodeInheritAttrsByType(this.type, ["p:spPr", "a:xfrm"]))), t2;
  }, t;
})();
var y = (function(e) {
  function r(t, r2, s, a) {
    var n2 = e.call(this, r2, a) || this;
    n2.userDrawn = true, n2.pptx = s, n2.path = t;
    var i2 = (0, import_lodash.get)(n2.source, ["p:blipFill", "a:srcRect"]);
    return i2 && (n2.clip = {}, i2.attrs.b && (n2.clip.b = parseInt(i2.attrs.b) / 1e5), i2.attrs.t && (n2.clip.t = parseInt(i2.attrs.t) / 1e5), i2.attrs.l && (n2.clip.l = parseInt(i2.attrs.l) / 1e5), i2.attrs.r && (n2.clip.r = parseInt(i2.attrs.r) / 1e5)), n2;
  }
  return __extends(r, e), Object.defineProperty(r.prototype, "base64", { get: function() {
    return this.pptx.getMedia(this.path);
  }, enumerable: false, configurable: true }), r;
})(f);
function m(t, e, r) {
  var s = { type: "solidFill" };
  if (t["a:srgbClr"]) s.color = "#" + t["a:srgbClr"].attrs.val;
  else if (t["a:schemeClr"]) {
    var a = t["a:schemeClr"].attrs.val;
    r && (a = r.getColorThemeName(a)), s.color = e.getColor(a);
  } else t["a:sysClr"] && (s.color = "#" + t["a:sysClr"].attrs.lastClr);
  var n2 = t["a:srgbClr"] || t["a:schemeClr"] || t["a:sysClr"], i2 = (0, import_lodash.get)(n2, ["a:alpha", "attrs", "val"], 1e5);
  s.alpha = i2 / 1e5;
  var c = (0, import_lodash.get)(n2, ["a:shade", "attrs", "val"]);
  c && (s.shade = c / 1e5);
  var l2 = (0, import_lodash.get)(n2, ["a:lumMod", "attrs", "val"]);
  l2 && (s.lumMod = l2 / 1e5);
  var p2 = (0, import_lodash.get)(n2, ["a:lumOff", "attrs", "val"]);
  return p2 && (s.lumOff = p2 / 1e5), s;
}
function b(t) {
  return t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function v(t) {
  return t < 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055;
}
function g(t) {
  if (!t || "none" === t.type) return "";
  if ("solidFill" === t.type && /^#[\da-fA-F]{3,6}$/.test(t.color)) {
    var e = parseInt(t.color.substr(1, 2), 16), r = parseInt(t.color.substr(3, 2), 16), s = parseInt(t.color.substr(5, 2), 16);
    if (t.shade) {
      var a = (function(t2, e2) {
        var r2 = t2[0], s2 = t2[1], a2 = t2[2], n3 = b(r2 / 255) * e2, o2 = b(s2 / 255) * e2, i2 = b(a2 / 255) * e2;
        return [Math.round(255 * v(n3)), Math.round(255 * v(o2)), Math.round(255 * v(i2))];
      })([e, r, s], t.shade);
      e = a[0], r = a[1], s = a[2];
    }
    var n2 = t.alpha;
    return "rgba(".concat(e, ",").concat(r, ",").concat(s, ",").concat(n2, ")");
  }
}
var x = (function() {
  function t(t2, e) {
    this.props = {}, this.inheritProps = {}, this.source = t2, this.node = e, this._getInheritBodyProps(), this._parseBodyProps(), this._parseLstStyle(), this._parseText();
  }
  return t.prototype._getInheritBodyProps = function() {
    var t2, e = this.node.ctx, r = this.node.type, s = this.node.idx;
    if (r || s) switch (e.slideType) {
      case "slideMaster":
        break;
      case "slideLayout":
        (t2 = r ? e.slideMaster.getNodeByType(r) : e.slideMaster.getNodeByIdx(s)) && (this.inheritProps = (0, import_lodash.get)(t2, ["textBody", "props"]) || {});
        break;
      case "slide":
        (t2 = r ? e.slideLayout.slideMaster.getNodeByType(r) : e.slideLayout.slideMaster.getNodeByIdx(s)) && Object.assign(this.inheritProps, (0, import_lodash.get)(t2, ["textBody", "props"]) || {}), (t2 = r ? e.slideLayout.getNodeByType(r) : e.slideLayout.getNodeByIdx(s)) && Object.assign(this.inheritProps, (0, import_lodash.get)(t2, ["textBody", "props"]) || {});
    }
  }, t.prototype._parseBodyProps = function() {
    var t2 = this, e = (0, import_lodash.get)(this.source, ["a:bodyPr", "attrs"]) || {};
    Object.keys(e).forEach((function(r2) {
      switch (r2) {
        case "anchor":
          t2.props.anchor = e[r2];
          break;
        case "rtlCol":
          t2.props.rtlCol = "1" === e[r2];
          break;
        case "lIns":
        case "rIns":
        case "tIns":
        case "bIns":
          t2.props[r2] = l(parseInt(e[r2]));
          break;
        case "order":
          break;
        default:
          t2.props[r2] = e[r2];
      }
    }));
    var r = (0, import_lodash.get)(this.source, ["a:bodyPr", "a:normAutofit", "attrs"]);
    if (r) {
      this.props.normAutofit = {};
      var s = r.fontScale;
      s && (this.props.normAutofit.fontScale = h(parseInt(s)));
      var a = r.lnSpcReduction;
      a && (this.props.normAutofit.lnSpcReduction = h(parseInt(a)));
    }
  }, t.prototype._parseLstStyle = function() {
    var t2 = this, e = {}, r = (0, import_lodash.get)(this.source, "a:lstStyle") || {};
    Object.keys(r).forEach((function(s) {
      if (s.startsWith("a:") && s.endsWith("pPr")) {
        var a = s.substr(2, s.length - 5);
        e[a] = { props: t2._formatPPr(r[s]) };
        var n2 = (0, import_lodash.get)(r[s], ["a:defRPr"]);
        e[a].defRPr = t2._formatRPr(n2);
      }
    })), this.lstStyle = e;
  }, t.prototype._parseText = function() {
    var t2 = this, e = (0, import_lodash.get)(this.source, ["a:p"]) || [];
    Array.isArray(e) || (e = [e]), this.paragraphs = e.map((function(e2) {
      return t2._parseParagraph(e2);
    }));
  }, t.prototype._parseParagraph = function(t2) {
    var r = this, s = { props: {}, inheritProps: {}, inheritRProps: {}, endParaRProps: {}, rows: [] }, a = (0, import_lodash.get)(t2, ["a:pPr"]) || {};
    s.props = this._formatPPr(a);
    var n2 = (0, import_lodash.get)(t2, ["a:endParaRPr"]);
    s.endParaRProps = this._formatRPr(n2);
    var i2 = (0, import_lodash.get)(t2, ["a:r"]) || [];
    Array.isArray(i2) || (i2 = [i2]);
    var c = (0, import_lodash.get)(t2, ["a:br"]) || [];
    return Array.isArray(c) || (c = [c]), (i2 = i2.concat(c.map((function(t3) {
      return __assign({ isBr: true }, t3);
    })))).sort((function(t3, e) {
      return (0, import_lodash.get)(t3, ["attrs", "order"]) - (0, import_lodash.get)(e, ["attrs", "order"]);
    })), s.rows = i2.map((function(t3) {
      return r._parseRow(t3);
    })), s.inheritProps = this._getInheritPProps(s.props.level), s.inheritRProps = this._getInheritRProps(s.props.level), s;
  }, t.prototype._getInheritPProps = function(t2) {
    void 0 === t2 && (t2 = "0");
    var e, r = {}, s = this.node.ctx, a = this.node.type, n2 = this.node.idx;
    switch (s.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(r, (0, import_lodash.get)(s.defaultTextStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}) : Object.assign(r, (0, import_lodash.get)(s, ["textStyles", "otherStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(r, (0, import_lodash.get)(s.slideMaster.defaultTextStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}) : Object.assign(r, (0, import_lodash.get)(s.slideMaster, ["textStyles", "otherStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}), (a || n2) && (e = a ? s.slideMaster.getNodeByType(a) : s.slideMaster.getNodeByIdx(n2)) && Object.assign(r, (0, import_lodash.get)(e, ["textBody", "lstStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {});
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(r, (0, import_lodash.get)(s.slideLayout.slideMaster.defaultTextStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}) : Object.assign(r, (0, import_lodash.get)(s.slideLayout.slideMaster, ["textStyles", "otherStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}), (a || n2) && (["subTitle", "ctrTitle", "title"].includes(a) && Object.assign(r, (0, import_lodash.get)(s.slideLayout.slideMaster, ["textStyles", "titleStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}), (e = a ? s.slideLayout.slideMaster.getNodeByType(a) : s.slideLayout.slideMaster.getNodeByIdx(n2)) && Object.assign(r, (0, import_lodash.get)(e, ["textBody", "lstStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}), (e = a ? s.slideLayout.getNodeByType(a) : s.slideLayout.getNodeByIdx(n2)) && Object.assign(r, (0, import_lodash.get)(e, ["textBody", "lstStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "props"]) || {}));
    }
    return r;
  }, t.prototype._getInheritRProps = function(t2) {
    void 0 === t2 && (t2 = "0");
    var e, r = {}, s = this.node.ctx, a = this.node.type, n2 = this.node.idx;
    switch (s.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(r, (0, import_lodash.get)(s.defaultTextStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}) : Object.assign(r, (0, import_lodash.get)(s, ["textStyles", "otherStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(r, (0, import_lodash.get)(s.slideMaster.defaultTextStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}) : Object.assign(r, (0, import_lodash.get)(s.slideMaster, ["textStyles", "otherStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}), (a || n2) && (e = a ? s.slideMaster.getNodeByType(a) : s.slideMaster.getNodeByIdx(n2)) && (r = (0, import_lodash.get)(e, ["textBody", "lstStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {});
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(r, (0, import_lodash.get)(s.slideLayout.slideMaster.defaultTextStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}) : Object.assign(r, (0, import_lodash.get)(s.slideLayout.slideMaster, ["textStyles", "otherStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}), (a || n2) && (["subTitle", "ctrTitle", "title"].includes(a) && Object.assign(r, (0, import_lodash.get)(s.slideLayout.slideMaster, ["textStyles", "titleStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}), (e = a ? s.slideLayout.slideMaster.getNodeByType(a) : s.slideLayout.slideMaster.getNodeByIdx(n2)) && Object.assign(r, (0, import_lodash.get)(e, ["textBody", "lstStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}), (e = a ? s.slideLayout.getNodeByType(a) : s.slideLayout.getNodeByIdx(n2)) && Object.assign(r, (0, import_lodash.get)(e, ["textBody", "lstStyle", "lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) || {}));
    }
    var i2 = (0, import_lodash.get)(this.node.source, ["p:style", "a:fontRef"]);
    return (0, import_lodash.get)(i2, "a:schemeClr") && (r.color = m(i2, this.node.theme, this.node)), (0, import_lodash.get)(this.lstStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"]) && Object.assign(r, (0, import_lodash.get)(this.lstStyle, ["lvl".concat(t2 ? +t2 + 1 : 1), "defRPr"])), r;
  }, t.prototype._formatPPr = function(t2) {
    var e = {}, r = (0, import_lodash.get)(t2, "attrs") || {};
    return Object.keys(r).forEach((function(t3) {
      switch (t3) {
        case "algn":
          e.align = r[t3];
          break;
        case "marL":
          e.marginLeft = l(parseInt(r[t3]));
          break;
        case "indent":
          e.indent = l(parseInt(r[t3]));
          break;
        case "lvl":
          e.level = r[t3];
      }
    })), (0, import_lodash.get)(t2, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (e.lineHeight = parseInt(t2["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), (0, import_lodash.get)(t2, ["a:buAutoNum", "attrs", "type"]) && (e.buAutoNum = t2["a:buAutoNum"].attrs.type), (0, import_lodash.get)(t2, ["a:buChar", "attrs", "char"]) && (e.buChar = t2["a:buChar"].attrs.char), (0, import_lodash.get)(t2, ["a:spcBef", "a:spcPts", "attrs", "val"]) && (e.spaceBefore = p(parseInt(t2["a:spcBef"]["a:spcPts"].attrs.val))), (0, import_lodash.get)(t2, ["a:spcAft", "a:spcPts", "attrs", "val"]) && (e.spaceAfter = p(parseInt(t2["a:spcAft"]["a:spcPts"].attrs.val))), e;
  }, t.prototype._parseRow = function(t2) {
    if (t2.isBr) return { isBr: true };
    var e = { props: {}, text: "" }, r = (0, import_lodash.get)(t2, ["a:rPr"]) || {};
    return e.props = this._formatRPr(r), e.text = (0, import_lodash.get)(t2, "a:t") || "", e;
  }, t.prototype._formatRPr = function(t2) {
    var e = {}, r = (0, import_lodash.get)(t2, "attrs") || {};
    Object.keys(r).forEach((function(t3) {
      switch (t3) {
        case "sz":
          e.size = parseInt(r[t3]) / 100;
          break;
        case "b":
          e.bold = "1" === r[t3];
          break;
        case "i":
          e.italic = "1" === r[t3];
          break;
        case "u":
          e.underline = r[t3];
          break;
        case "strike":
          e.strike = r[t3];
          break;
        case "order":
        case "dirty":
          break;
        default:
          e[t3] = r[t3];
      }
    }));
    var s = (0, import_lodash.get)(t2, "a:solidFill");
    s && (e.color = m(s, this.node.theme, this.node));
    var a = (0, import_lodash.get)(t2, "a:highlight");
    return a && (e.background = m(a, this.node.theme, this.node)), e;
  }, t;
})();
var w = (function(r) {
  function s(t, e, s2) {
    var a = r.call(this, t, s2) || this;
    return a.border = {}, a.prstGeom = {}, a.isTextBox = false, a.pptx = e, a.shape = (0, import_lodash.get)(t, ["p:spPr", "a:prstGeom", "attrs", "prst"]), a._parIsTextBox(), a._parsePrstGeom(), a._parseBackground(), a._parseBorder(), a._parseTxt(), a;
  }
  return __extends(s, r), s.prototype._parIsTextBox = function() {
    this.isTextBox = "1" === (0, import_lodash.get)(this.source, ["p:nvSpPr", "p:cNvSpPr", "attrs", "txBox"]);
  }, s.prototype._parsePrstGeom = function() {
    var t = (0, import_lodash.get)(this.source, ["p:spPr", "a:prstGeom"]), e = (0, import_lodash.get)(t, ["a:avLst", "a:gd"]);
    e && (Array.isArray(e) || (e = [e]), this.prstGeom.gd = e.map((function(t2) {
      return { name: t2.attrs.name, fmla: h(parseInt(t2.attrs.fmla.split(" ")[1])) };
    })));
  }, s.prototype._parseBackground = function() {
    if (!(0, import_lodash.get)(this.source, ["p:spPr", "a:noFill"])) {
      var t = (0, import_lodash.get)(this.source, ["p:spPr", "a:solidFill"]);
      if (t) this.background = m(t, this.theme, this);
      else if (!(0, import_lodash.get)(this.source, ["p:spPr", "a:gradFill"])) {
        var e = (0, import_lodash.get)(this.source, ["p:style", "a:fillRef"]);
        e && (this.background = m(e, this.theme, this));
      }
    }
  }, s.prototype._parseBorder = function() {
    var t = (0, import_lodash.get)(this.source, ["p:style", "a:lnRef"]);
    if (t) {
      var r2 = parseInt(t.attrs.idx), a = this.theme.getLineStyle(r2);
      this.border = __assign(__assign({}, a), this.border), this.border.color && this.border.color.color || (this.border.color = m(t, this.theme, this));
    }
    var n2 = (0, import_lodash.get)(this.source, ["p:spPr", "a:ln"]);
    if (n2) {
      if ((0, import_lodash.get)(n2, "a:noFill")) return;
      (0, import_lodash.get)(n2, "attrs.w") && (this.border.width = l(parseInt((0, import_lodash.get)(n2, "attrs.w"))));
      var c = (0, import_lodash.get)(n2, "a:solidFill");
      c && (this.border.color = m(c, this.theme, this));
      var p2 = (0, import_lodash.get)(n2, "a:prstDash");
      if (p2 && (this.border.type = p2.attrs.val), (0, import_lodash.get)(n2, ["a:miter"]) && (this.border.lineJoin = "miter"), (0, import_lodash.get)(n2, ["a:bevel"]) && (this.border.lineJoin = "bevel"), (0, import_lodash.get)(n2, ["a:round"]) && (this.border.lineJoin = "round"), (0, import_lodash.get)(n2, ["a:miter", "attrs", "lim"]) && (this.border.miterLim = l(parseInt((0, import_lodash.get)(n2, ["a:miter", "attrs", "lim"])))), (0, import_lodash.get)(n2, ["a:headEnd"])) {
        var d2 = (0, import_lodash.get)(n2, ["a:headEnd", "attrs"]);
        this.border.headEnd = { type: d2.type, len: d2.len, w: d2.w };
      }
      if ((0, import_lodash.get)(n2, ["a:tailEnd"])) {
        var h2 = (0, import_lodash.get)(n2, ["a:tailEnd", "attrs"]);
        this.border.tailEnd = { type: h2.type, len: h2.len, w: h2.w };
      }
      Object.assign(this.border, (0, import_lodash.omit)((0, import_lodash.get)(n2, "attrs") || {}, ["w", "order"]));
    }
    this.border.color && this.border.color.color && !this.border.width && (this.border.width = s.defaultBorderWidth);
  }, s.prototype._parseTxt = function() {
    this.textBody = new x((0, import_lodash.get)(this.source, ["p:txBody"]), this);
  }, s.defaultBorderWidth = 0.75, s;
})(f);
var P = (function() {
  function t(t2, e, r) {
    if (this.offset = { x: 0, y: 0 }, this.chOffset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.chExtend = { w: 0, h: 0 }, this.rotate = 0, this.nodes = [], this.flipV = false, this.flipH = false, this.order = (0, import_lodash.get)(t2, ["attrs", "order"]), this.pptx = e, this.ctx = r, this.source = t2, this.source["p:grpSpPr"]) {
      var s = (0, import_lodash.get)(this.source, ["p:grpSpPr", "a:xfrm"]);
      s && (this.offset = { x: Math.round(l(parseInt(s["a:off"].attrs.x))), y: Math.round(l(parseInt(s["a:off"].attrs.y))) }, this.chOffset = { x: Math.round(l(parseInt(s["a:chOff"].attrs.x))), y: Math.round(l(parseInt(s["a:chOff"].attrs.y))) }, this.extend = { w: Math.round(l(parseInt(s["a:ext"].attrs.cx))), h: Math.round(l(parseInt(s["a:ext"].attrs.cy))) }, this.chExtend = { w: Math.round(l(parseInt(s["a:chExt"].attrs.cx))), h: Math.round(l(parseInt(s["a:chExt"].attrs.cy))) }, this.rotate = d(parseInt((0, import_lodash.get)(s, "attrs.rot", 0))), this.flipV = "1" === (0, import_lodash.get)(s, "attrs.flipV"), this.flipH = "1" === (0, import_lodash.get)(s, "attrs.flipH"));
    }
    this._parseNodes();
  }
  return t.prototype._parseNodes = function() {
    var e = this.source;
    for (var r in e) switch (r) {
      case "p:sp":
        for (var s = Array.isArray(e[r]) ? e[r] : [e[r]], a = 0; a < s.length; a++) {
          var n2 = s[a];
          this.nodes.push(new w(n2, this.pptx, this.ctx));
        }
        break;
      case "p:pic":
        var o2 = Array.isArray(e[r]) ? e[r] : [e[r]];
        for (a = 0; a < o2.length; a++) {
          var i2 = o2[a], c = i2["p:blipFill"]["a:blip"].attrs["r:embed"], l2 = this.ctx.rels[c].target, p2 = new y(l2, i2, this.pptx, this.ctx);
          this.nodes.push(p2);
        }
        break;
      case "p:cxnSp":
        var d2 = Array.isArray(e[r]) ? e[r] : [e[r]];
        for (a = 0; a < d2.length; a++) {
          n2 = d2[a];
          this.nodes.push(new w(n2, this.pptx, this.ctx));
        }
        break;
      case "p:grpSp":
        var h2 = Array.isArray(e[r]) ? e[r] : [e[r]];
        for (a = 0; a < h2.length; a++) {
          var u2 = h2[a];
          this.nodes.push(new t(u2, this.pptx, this.ctx));
        }
    }
  }, t;
})();
var A = 1;
function k(t) {
  var e = "<".charCodeAt(0), r = ">".charCodeAt(0), s = "-".charCodeAt(0), a = "/".charCodeAt(0), n2 = "!".charCodeAt(0), o2 = "'".charCodeAt(0), i2 = '"'.charCodeAt(0), c = "?".charCodeAt(0), l2 = "\r\n	>/= ", p2 = 0;
  return A = 1, S((function d2() {
    for (var h2 = []; t[p2]; ) {
      if (t.charCodeAt(p2) == e) {
        if (t.charCodeAt(p2 + 1) === a) return p2 = t.indexOf(">", p2), h2;
        if (t.charCodeAt(p2 + 1) === n2) {
          if (t.charCodeAt(p2 + 2) == s) {
            for (; t.charCodeAt(p2) !== r || t.charCodeAt(p2 - 1) != s || t.charCodeAt(p2 - 2) != s || -1 == p2; ) p2 = t.indexOf(">", p2 + 1);
            -1 === p2 && (p2 = t.length);
          } else for (p2 += 2; t.charCodeAt(p2) !== r; p2++) ;
          p2++;
          continue;
        }
        if (t.charCodeAt(p2 + 1) === c) {
          p2 = t.indexOf(">", p2), p2++;
          continue;
        }
        for (var u2 = ++p2; -1 === l2.indexOf(t[p2]); p2++) ;
        for (var f2 = t.slice(u2, p2), y2 = false, m2 = {}; t.charCodeAt(p2) !== r; p2++) {
          var b2 = t.charCodeAt(p2);
          if (b2 > 64 && b2 < 91 || b2 > 96 && b2 < 123) {
            for (u2 = p2; -1 === l2.indexOf(t[p2]); p2++) ;
            for (var v2 = t.slice(u2, p2), g2 = t.charCodeAt(p2); g2 !== o2 && g2 !== i2; ) p2++, g2 = t.charCodeAt(p2);
            var x2 = t[p2], w2 = ++p2;
            p2 = t.indexOf(x2, w2);
            var P2 = t.slice(w2, p2);
            y2 || (m2 = {}, y2 = true), m2[v2] = P2;
          }
        }
        var A2 = [];
        t.charCodeAt(p2 - 1) !== a && (p2++, A2 = d2()), h2.push({ children: A2, tagName: f2, attrs: m2 });
      } else {
        var k2 = p2;
        -2 === (p2 = t.indexOf("<", p2) - 1) && (p2 = t.length);
        var S2 = t.slice(k2, p2 + 1);
        S2.length > 0 && h2.push(S2);
      }
      p2++;
    }
    return h2;
  })());
}
function S(t) {
  var e = {};
  if (void 0 === t) return {};
  if (1 === t.length && "string" == typeof t[0]) return t[0];
  for (var r in t.forEach((function(t2) {
    if (e[t2.tagName] || (e[t2.tagName] = []), "object" == typeof t2) {
      var r2 = S(t2.children);
      "object" == typeof r2 && (t2.attrs && (r2.attrs = t2.attrs), void 0 === r2.attrs ? r2.attrs = { order: A } : r2.attrs.order = A), A++, e[t2.tagName].push(r2);
    }
  })), e) 1 == e[r].length && (e[r] = e[r][0]);
  return e;
}
var C = (function() {
  function t(t2, e, r) {
    this.slideType = "slide", this.rels = {}, this.background = { type: "none" }, this.nodes = [], this.name = t2, this.source = e, this.pptx = r;
  }
  return Object.defineProperty(t.prototype, "index", { get: function() {
    if (!this.name) return 0;
    var t2 = this.name.match(/(\d+)/);
    return t2 ? parseInt(t2[0]) : 1;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "slideMaster", { get: function() {
    return this.slideLayout && this.slideLayout.slideMaster;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "theme", { get: function() {
    return this.slideMaster.theme;
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "_relsPath", { get: function() {
    return this.name.replace("slides/slide", "slides/_rels/slide") + ".rels";
  }, enumerable: false, configurable: true }), t.prototype.load = function() {
    return __awaiter(this, void 0, void 0, (function() {
      return __generator(this, (function(t2) {
        switch (t2.label) {
          case 0:
            return [4, this._loadRels()];
          case 1:
            return t2.sent(), this._loadBackground(), [4, this._loadNodes()];
          case 2:
            return t2.sent(), [2];
        }
      }));
    }));
  }, t.prototype._loadRels = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a = this;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            return e = k, [4, this.pptx.getXmlByPath(this._relsPath)];
          case 1:
            return t2 = e.apply(void 0, [s.sent()]), r = (0, import_lodash.get)(t2, ["Relationships", "Relationship"]) || [], Array.isArray(r) || (r = [r]), r.forEach((function(t3) {
              switch ((0, import_lodash.get)(t3, ["attrs", "Type"])) {
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout":
                  var e2 = t3.attrs.Target.replace("../", "ppt/");
                  a.slideLayout = a.pptx.getSlideLayout(e2);
                  break;
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
                  a.rels[t3.attrs.Id] = { type: t3.attrs.Type.replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""), target: t3.attrs.Target.replace("../", "ppt/") };
              }
            })), [2];
        }
      }));
    }));
  }, t.prototype._loadBackground = function() {
    var t2 = (0, import_lodash.get)(this.source, ["p:sld", "p:cSld", "p:bg", "p:bgPr"]);
    t2 && t2["a:solidFill"] && (this.background = m(t2["a:solidFill"], this.theme, this));
  }, t.prototype._loadNodes = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a, n2, i2, c, l2, p2, d2, h2, u2, f2;
      return __generator(this, (function(s) {
        for (e in t2 = (0, import_lodash.get)(this.source, ["p:sld", "p:cSld", "p:spTree"])) switch (e) {
          case "p:sp":
            for (r = Array.isArray(t2[e]) ? t2[e] : [t2[e]], u2 = 0; u2 < r.length; u2++) d2 = r[u2], this.nodes.push(new w(d2, this.pptx, this));
            break;
          case "p:pic":
            for (a = Array.isArray(t2[e]) ? t2[e] : [t2[e]], u2 = 0; u2 < a.length; u2++) n2 = a[u2], i2 = n2["p:blipFill"]["a:blip"].attrs["r:embed"], c = this.rels[i2].target, l2 = new y(c, n2, this.pptx, this), this.nodes.push(l2);
            break;
          case "p:cxnSp":
            for (p2 = Array.isArray(t2[e]) ? t2[e] : [t2[e]], u2 = 0; u2 < p2.length; u2++) d2 = p2[u2], this.nodes.push(new w(d2, this.pptx, this));
            break;
          case "p:graphicFrame":
            break;
          case "p:grpSp":
            for (h2 = Array.isArray(t2[e]) ? t2[e] : [t2[e]], u2 = 0; u2 < h2.length; u2++) f2 = h2[u2], this.nodes.push(new P(f2, this.pptx, this));
        }
        return [2];
      }));
    }));
  }, t.prototype.getColorThemeName = function(t2) {
    return this.slideLayout.getColorThemeName(t2);
  }, t.prototype.getNodeInheritAttrsByType = function(t2, e) {
    var r = this.slideLayout.getNodeByType(t2), s = (0, import_lodash.get)(r.source, e);
    return s || this.slideLayout.getNodeInheritAttrsByType(t2, e);
  }, t.prototype.getNodeInheritAttrsByIdx = function(t2, e) {
    var r = this.slideLayout.getNodeByIdx(t2), s = (0, import_lodash.get)(r.source, e);
    return s || this.slideLayout.getNodeInheritAttrsByIdx(t2, e);
  }, t;
})();
var L = (function() {
  function t(t2, e, r) {
    this.slideType = "slideLayout", this.rels = {}, this.background = { type: "none" }, this.nodes = [], this.name = t2, this.source = e, this.pptx = r;
  }
  return Object.defineProperty(t.prototype, "_relsPath", { get: function() {
    return this.name.replace("slideLayouts/slideLayout", "slideLayouts/_rels/slideLayout") + ".rels";
  }, enumerable: false, configurable: true }), Object.defineProperty(t.prototype, "theme", { get: function() {
    return this.slideMaster.theme;
  }, enumerable: false, configurable: true }), t.prototype.load = function() {
    return __awaiter(this, void 0, void 0, (function() {
      return __generator(this, (function(t2) {
        switch (t2.label) {
          case 0:
            return [4, this._loadRels()];
          case 1:
            return t2.sent(), [4, this._loadBackground()];
          case 2:
            return t2.sent(), [4, this._loadNodes()];
          case 3:
            return t2.sent(), [2];
        }
      }));
    }));
  }, t.prototype._loadRels = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a = this;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            return e = k, [4, this.pptx.getXmlByPath(this._relsPath)];
          case 1:
            return t2 = e.apply(void 0, [s.sent()]), r = (0, import_lodash.get)(t2, ["Relationships", "Relationship"]) || [], Array.isArray(r) || (r = [r]), r.forEach((function(t3) {
              switch ((0, import_lodash.get)(t3, ["attrs", "Type"])) {
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster":
                  var e2 = t3.attrs.Target.replace("../", "ppt/");
                  a.slideMaster = a.pptx.getSlideMaster(e2);
                  break;
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
                  a.rels[t3.attrs.Id] = { type: t3.attrs.Type.replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""), target: t3.attrs.Target.replace("../", "ppt/") };
              }
            })), [2];
        }
      }));
    }));
  }, t.prototype._loadBackground = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2;
      return __generator(this, (function(e) {
        return (t2 = (0, import_lodash.get)(this.source, ["p:sldLayout", "p:cSld", "p:bg", "p:bgPr"])) && t2["a:solidFill"] && (this.background = m(t2["a:solidFill"], this.theme)), [2];
      }));
    }));
  }, t.prototype._loadNodes = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a, n2, i2, c, l2, p2, d2;
      return __generator(this, (function(s) {
        for (e in t2 = (0, import_lodash.get)(this.source, ["p:sldLayout", "p:cSld", "p:spTree"])) switch (e) {
          case "p:sp":
            for (r = Array.isArray(t2[e]) ? t2[e] : [t2[e]], i2 = 0; i2 < r.length; i2++) a = r[i2], this.nodes.push(new w(a, this.pptx, this));
            break;
          case "p:pic":
            for (n2 = Array.isArray(t2[e]) ? t2[e] : [t2[e]], i2 = 0; i2 < n2.length; i2++) c = n2[i2], l2 = c["p:blipFill"]["a:blip"].attrs["r:embed"], p2 = this.rels[l2].target, d2 = new y(p2, c, this.pptx, this), this.nodes.push(d2);
        }
        return [2];
      }));
    }));
  }, t.prototype.getColorThemeName = function(t2) {
    return this.slideMaster.getColorThemeName(t2);
  }, t.prototype.getNodeByType = function(t2) {
    return this.nodes.find((function(e) {
      return e.type === t2;
    }));
  }, t.prototype.getNodeByIdx = function(t2) {
    return this.nodes.find((function(e) {
      return e.idx === t2;
    }));
  }, t.prototype.getNodeInheritAttrsByType = function(t2, e) {
    var r = this.slideMaster.getNodeByType(t2);
    return r && (0, import_lodash.get)(r.source, e);
  }, t.prototype.getNodeInheritAttrsByIdx = function(t2, e) {
    var r = this.slideMaster.getNodeByIdx(t2);
    return r && (0, import_lodash.get)(r.source, e);
  }, t;
})();
function M(t) {
  var e = {}, r = (0, import_lodash.get)(t, "attrs") || {};
  return Object.keys(r).forEach((function(t2) {
    switch (t2) {
      case "algn":
        e.align = r[t2];
        break;
      case "marL":
        e.marginLeft = l(parseInt(r[t2]));
        break;
      case "indent":
        e.indent = l(parseInt(r[t2]));
        break;
      case "lvl":
        e.level = r[t2];
    }
  })), (0, import_lodash.get)(t, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (e.lineHeight = parseInt(t["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), e;
}
function _(t, e, r) {
  var s = {}, a = (0, import_lodash.get)(t, "attrs") || {};
  Object.keys(a).forEach((function(t2) {
    switch (t2) {
      case "sz":
        s.size = parseInt(a[t2]) / 100;
        break;
      case "b":
        s.bold = "1" === a[t2];
        break;
      case "i":
        s.italic = "1" === a[t2];
        break;
      case "u":
        s.underline = a[t2];
        break;
      case "strike":
        s.strike = a[t2];
        break;
      case "order":
      case "dirty":
        break;
      default:
        s[t2] = a[t2];
    }
  }));
  var n2 = (0, import_lodash.get)(t, "a:solidFill");
  return n2 && (s.color = m(n2, e, r)), s;
}
var N = (function() {
  function t(t2, e, r) {
    this.slideType = "slideMaster", this.rels = {}, this.background = { type: "none" }, this.textStyles = { titleStyle: {}, bodyStyle: {}, otherStyle: {} }, this.defaultTextStyle = {}, this.nodes = [], this.name = t2, this.source = e, this.pptx = r, this.load();
  }
  return Object.defineProperty(t.prototype, "_relsPath", { get: function() {
    return this.name.replace("slideMasters/slideMaster", "slideMasters/_rels/slideMaster") + ".rels";
  }, enumerable: false, configurable: true }), t.prototype.load = function() {
    return __awaiter(this, void 0, void 0, (function() {
      return __generator(this, (function(t2) {
        switch (t2.label) {
          case 0:
            return [4, this._parseRels()];
          case 1:
            return t2.sent(), this._parseColorMap(), this._parseBackground(), this._parseTextStyles(), this._parseDefaultTextStyle(), this._loadNodes(), [2];
        }
      }));
    }));
  }, t.prototype._parseRels = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a = this;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            return e = k, [4, this.pptx.getXmlByPath(this._relsPath)];
          case 1:
            return t2 = e.apply(void 0, [s.sent()]), r = (0, import_lodash.get)(t2, ["Relationships", "Relationship"]) || [], Array.isArray(r) || (r = [r]), r.forEach((function(t3) {
              switch ((0, import_lodash.get)(t3, ["attrs", "Type"])) {
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme":
                  var e2 = t3.attrs.Target.replace("../", "ppt/");
                  a.theme = a.pptx.getTheme(e2);
                  break;
                case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
                  a.rels[t3.attrs.Id] = { type: t3.attrs.Type.replace("http://schemas.openxmlformats.org/officeDocument/2006/relationships/", ""), target: t3.attrs.Target.replace("../", "ppt/") };
              }
            })), [2];
        }
      }));
    }));
  }, t.prototype._parseColorMap = function() {
    this.colorMap = (0, import_lodash.omit)((0, import_lodash.get)(this.source, ["p:sldMaster", "p:clrMap", "attrs"]) || {}, ["order"]);
  }, t.prototype.getColorThemeName = function(t2) {
    return this.colorMap[t2] || t2;
  }, t.prototype._parseBackground = function() {
    var t2 = (0, import_lodash.get)(this.source, ["p:sldMaster", "p:cSld", "p:bg", "p:bgPr"]), e = (0, import_lodash.get)(this.source, ["p:sldMaster", "p:cSld", "p:bg", "p:bgRef"]);
    t2 && t2["a:solidFill"] ? this.background = m(t2["a:solidFill"], this.theme, this) : e && (this.background = m(e, this.theme, this));
  }, t.prototype._parseDefaultTextStyle = function() {
    var t2 = this, e = this.pptx.defaultTextStyleSource;
    Object.keys(e).forEach((function(r) {
      if (r.startsWith("a:") && r.endsWith("pPr")) {
        var s = r.substr(2, r.length - 5), a = (0, import_lodash.get)(e[r], ["a:defRPr"]);
        t2.defaultTextStyle[s] = { props: M(e[r]), defRPr: _(a, t2.theme, t2) };
      }
    }));
  }, t.prototype._parseTextStyles = function() {
    var t2 = this, e = (0, import_lodash.get)(this.source, ["p:sldMaster", "p:txStyles"]);
    ["titleStyle", "bodyStyle", "otherStyle"].forEach((function(r) {
      var s = t2.textStyles[r], a = (0, import_lodash.get)(e, "p:".concat(r)) || {};
      Object.keys(a).forEach((function(e2) {
        if (e2.startsWith("a:") && e2.endsWith("pPr")) {
          var r2 = e2.substr(2, e2.length - 5);
          s[r2] = {}, s[r2].props = M(a[e2]);
          var n2 = (0, import_lodash.get)(a[e2], ["a:defRPr"]);
          s[r2].defRPr = _(n2, t2.theme, t2);
        }
      }));
    }));
  }, t.prototype._loadNodes = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a, n2, i2, c, l2, p2, d2;
      return __generator(this, (function(s) {
        for (e in t2 = (0, import_lodash.get)(this.source, ["p:sldMaster", "p:cSld", "p:spTree"])) switch (e) {
          case "p:sp":
            for (r = Array.isArray(t2[e]) ? t2[e] : [t2[e]], i2 = 0; i2 < r.length; i2++) a = r[i2], this.nodes.push(new w(a, this.pptx, this));
            break;
          case "p:pic":
            for (n2 = Array.isArray(t2[e]) ? t2[e] : [t2[e]], i2 = 0; i2 < n2.length; i2++) c = n2[i2], l2 = c["p:blipFill"]["a:blip"].attrs["r:embed"], p2 = this.rels[l2].target, d2 = new y(p2, c, this.pptx, this), this.nodes.push(d2);
        }
        return [2];
      }));
    }));
  }, t.prototype.getNodeByType = function(t2) {
    return this.nodes.find((function(e) {
      return e.type === t2;
    }));
  }, t.prototype.getNodeByIdx = function(t2) {
    return this.nodes.find((function(e) {
      return e.idx === t2;
    }));
  }, t.prototype.getNodeInheritAttrsByType = function(t2, e) {
  }, t.prototype.getNodeInheritAttrsByIdx = function(t2, e) {
  }, t;
})();
var I = (function() {
  function t(t2, e, r) {
    this.clrScheme = {}, this.borderScheme = [], this.name = t2, this.source = e, this.pptx = r, this._parseClrScheme(), this._parseLineStyleLst();
  }
  return t.prototype._parseClrScheme = function() {
    var t2 = (0, import_lodash.get)(this.source, ["a:theme", "a:themeElements", "a:clrScheme"]);
    for (var e in t2) if (e.startsWith("a:")) {
      var r = e.substring(2), s = (0, import_lodash.get)(t2[e], ["a:sysClr", "attrs", "lastClr"]) || (0, import_lodash.get)(t2[e], ["a:srgbClr", "attrs", "val"]);
      this.clrScheme[r] = "#" + s;
    }
  }, t.prototype._parseLineStyleLst = function() {
    var t2 = this, e = (0, import_lodash.get)(this.source, ["a:theme", "a:themeElements", "a:fmtScheme", "a:lnStyleLst", "a:ln"]);
    this.borderScheme = e.map((function(e2) {
      var r = { color: {} };
      return (0, import_lodash.get)(e2, ["attrs", "w"]) && (r.width = l(parseInt((0, import_lodash.get)(e2, ["attrs", "w"])))), (0, import_lodash.get)(e2, ["attrs", "algn"]) && (r.algn = (0, import_lodash.get)(e2, ["attrs", "algn"])), (0, import_lodash.get)(e2, ["attrs", "cap"]) && (r.cap = (0, import_lodash.get)(e2, ["attrs", "cap"])), (0, import_lodash.get)(e2, ["attrs", "cmpd"]) && (r.cmpd = (0, import_lodash.get)(e2, ["attrs", "cmpd"])), (0, import_lodash.get)(e2, ["a:miter", "attrs", "lim"]) && (r.miterLim = l(parseInt((0, import_lodash.get)(e2, ["a:miter", "attrs", "lim"])))), (0, import_lodash.get)(e2, ["a:prstDash", "attrs", "val"]) && (r.type = (0, import_lodash.get)(e2, ["a:prstDash", "attrs", "val"])), (0, import_lodash.get)(e2, ["a:solidFill"]) && (r.color = m((0, import_lodash.get)(e2, ["a:solidFill"]), t2)), r;
    }));
  }, t.prototype.getColor = function(t2) {
    if ("phClr" !== t2) return this.clrScheme[t2] || this.defaultColor;
  }, t.prototype.getLineStyle = function(t2) {
    return this.borderScheme[t2 - 1];
  }, t;
})();
var T = (function() {
  function t() {
    this.slides = [], this.slideLayouts = [], this.slideMaster = [], this.themes = [], this.medias = {};
  }
  return t.prototype.load = function(t2) {
    return __awaiter(this, void 0, void 0, (function() {
      var e, r;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            return e = new import_jszip.default(), r = this, [4, e.loadAsync(t2)];
          case 1:
            return r._zipContents = s.sent(), [4, this._loadThumbnail()];
          case 2:
            return s.sent(), [4, this._loadMedia()];
          case 3:
            return s.sent(), [4, this._loadPresentation()];
          case 4:
            return s.sent(), [4, this._loadContentTypes()];
          case 5:
            return s.sent(), [2];
        }
      }));
    }));
  }, t.prototype._loadThumbnail = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e;
      return __generator(this, (function(r) {
        switch (r.label) {
          case 0:
            return r.trys.push([0, 3, , 4]), this._zipContents.files["docProps/thumbnail.jpeg"] ? [4, this._zipContents.files["docProps/thumbnail.jpeg"].async("base64")] : [3, 2];
          case 1:
            t2 = r.sent(), this.thumbnail = "data:image/jpeg;base64," + t2, r.label = 2;
          case 2:
            return [3, 4];
          case 3:
            return e = r.sent(), console.log("\u83B7\u53D6PPTX\u7F29\u7565\u56FE\u5931\u8D25", e), [3, 4];
          case 4:
            return [2];
        }
      }));
    }));
  }, t.prototype._loadPresentation = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            return s.trys.push([0, 2, , 3]), [4, this._zipContents.files["ppt/presentation.xml"].async("text")];
          case 1:
            return t2 = s.sent(), e = k(t2), r = e["p:presentation"]["p:sldSz"].attrs, this.width = l(parseInt(r.cx)), this.height = l(parseInt(r.cy)), this.defaultTextStyleSource = (0, import_lodash.get)(e, ["p:presentation", "p:defaultTextStyle"]), [3, 3];
          case 2:
            return a = s.sent(), console.log("\u83B7\u53D6PPTX\u5C3A\u5BF8\u5931\u8D25", a), [3, 3];
          case 3:
            return [2];
        }
      }));
    }));
  }, t.prototype._loadContentTypes = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a, n2, o2, i2, c, l2, p2, d2, h2, u2, f2, y2, m2, b2, v2, g2, x2;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            return s.trys.push([0, 20, , 21]), e = k, [4, this._zipContents.files["[Content_Types].xml"].async("text")];
          case 1:
            if (t2 = e.apply(void 0, [s.sent()]), r = t2.Types.Override, !(a = r.filter((function(t3) {
              return "application/vnd.openxmlformats-officedocument.theme+xml" === t3.attrs.ContentType;
            })))) return [3, 5];
            n2 = 0, o2 = a, s.label = 2;
          case 2:
            return n2 < o2.length ? (i2 = o2[n2], m2 = i2.attrs.PartName.substr(1), c = k, [4, this._zipContents.files[m2].async("text")]) : [3, 5];
          case 3:
            b2 = c.apply(void 0, [s.sent()]), this.themes.push(new I(m2, b2, this)), s.label = 4;
          case 4:
            return n2++, [3, 2];
          case 5:
            l2 = r.filter((function(t3) {
              return "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml" === t3.attrs.ContentType;
            })), y2 = 0, s.label = 6;
          case 6:
            return y2 < l2.length ? (m2 = l2[y2].attrs.PartName.substr(1), p2 = k, [4, this._zipContents.files[m2].async("text")]) : [3, 9];
          case 7:
            b2 = p2.apply(void 0, [s.sent()]), this.slideMaster.push(new N(m2, b2, this)), s.label = 8;
          case 8:
            return y2++, [3, 6];
          case 9:
            d2 = r.filter((function(t3) {
              return "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml" === t3.attrs.ContentType;
            })), y2 = 0, s.label = 10;
          case 10:
            return y2 < d2.length ? (m2 = d2[y2].attrs.PartName.substr(1), h2 = k, [4, this._zipContents.files[m2].async("text")]) : [3, 14];
          case 11:
            return b2 = h2.apply(void 0, [s.sent()]), [4, (u2 = new L(m2, b2, this)).load()];
          case 12:
            s.sent(), this.slideLayouts.push(u2), s.label = 13;
          case 13:
            return y2++, [3, 10];
          case 14:
            f2 = r.filter((function(t3) {
              return "application/vnd.openxmlformats-officedocument.presentationml.slide+xml" === t3.attrs.ContentType;
            })), y2 = 0, s.label = 15;
          case 15:
            return y2 < f2.length ? (m2 = f2[y2].attrs.PartName.substr(1), v2 = k, [4, this._zipContents.files[m2].async("text")]) : [3, 19];
          case 16:
            return b2 = v2.apply(void 0, [s.sent()]), [4, (g2 = new C(m2, b2, this)).load()];
          case 17:
            s.sent(), this.slides.push(g2), s.label = 18;
          case 18:
            return y2++, [3, 15];
          case 19:
            return [3, 21];
          case 20:
            return x2 = s.sent(), console.log("Content Type\u83B7\u53D6\u5931\u8D25", x2), [3, 21];
          case 21:
            return [2];
        }
      }));
    }));
  }, t.prototype._loadMedia = function() {
    return __awaiter(this, void 0, void 0, (function() {
      var t2, e, r, a, n2, o2, i2 = this;
      return __generator(this, (function(s) {
        switch (s.label) {
          case 0:
            t2 = Object.keys(this._zipContents.files).filter((function(t3) {
              return t3.startsWith("ppt/media/image");
            })).map((function(t3) {
              return i2._zipContents.files[t3];
            })), e = 0, r = t2, s.label = 1;
          case 1:
            return e < r.length ? (a = r[e], n2 = (function(t3) {
              var e2;
              switch (t3) {
                case "jpg":
                case "jpeg":
                  e2 = "image/jpeg";
                  break;
                case "png":
                  e2 = "image/png";
                  break;
                case "gif":
                  e2 = "image/gif";
                  break;
                case "emf":
                  e2 = "image/x-emf";
                  break;
                case "wmf":
                  e2 = "image/x-wmf";
                  break;
                default:
                  e2 = "image/*";
              }
              return e2;
            })((c = a.name).substr(2 + (~-c.lastIndexOf(".") >>> 0))), [4, a.async("base64")]) : [3, 4];
          case 2:
            o2 = s.sent(), this.medias[a.name] = "data:".concat(n2, ";base64,").concat(o2), s.label = 3;
          case 3:
            return e++, [3, 1];
          case 4:
            return [2];
        }
        var c;
      }));
    }));
  }, t.prototype.getXmlByPath = function(t2) {
    return __awaiter(this, void 0, void 0, (function() {
      return __generator(this, (function(e) {
        switch (e.label) {
          case 0:
            if (!this._zipContents.files[t2]) throw new Error("\u6587\u4EF6\u4E0D\u5B58\u5728");
            return [4, this._zipContents.files[t2].async("text")];
          case 1:
            return [2, e.sent()];
        }
      }));
    }));
  }, t.prototype.getSlideLayout = function(t2) {
    return this.slideLayouts.find((function(e) {
      return e.name === t2;
    }));
  }, t.prototype.getSlideMaster = function(t2) {
    return this.slideMaster.find((function(e) {
      return e.name === t2;
    }));
  }, t.prototype.getTheme = function(t2) {
    return this.themes.find((function(e) {
      return e.name === t2;
    }));
  }, t.prototype.getMedia = function(t2) {
    return this.medias[t2];
  }, t;
})();
function B(t) {
  var e, r, s, a, n2 = t.extend, o2 = t.offset, i2 = t.clip, c = t.base64, l2 = document.createElement("div");
  l2.style.setProperty("position", "absolute"), l2.style.setProperty("left", o2.x + "px"), l2.style.setProperty("top", o2.y + "px"), l2.style.setProperty("width", n2.w + "px"), l2.style.setProperty("height", n2.h + "px"), l2.style.setProperty("overflow", "hidden"), i2 ? (e = n2.w / (1 - (void 0 === i2.l ? 0 : i2.l) - (void 0 === i2.r ? 0 : i2.r)), r = n2.h / (1 - (void 0 === i2.t ? 0 : i2.t) - (void 0 === i2.b ? 0 : i2.b)), s = -1 * e * (void 0 === i2.l ? 0 : i2.l), a = -1 * r * (void 0 === i2.t ? 0 : i2.t)) : (e = n2.w, r = n2.h, s = 0);
  var p2 = document.createElement("img");
  return p2.src = c, p2.width = e, p2.height = r, p2.style.setProperty("position", "absolute"), p2.style.setProperty("left", s + "px"), p2.style.setProperty("top", a + "px"), l2.append(p2), l2;
}
function j(t, r, s) {
  var a, n2 = t.props, o2 = t.text, i2 = __assign(__assign({}, r), n2), c = document.createElement("span");
  c.textContent = o2, i2.size && ((null === (a = null == s ? void 0 : s.normAutofit) || void 0 === a ? void 0 : a.fontScale) ? c.style.fontSize = i2.size * s.normAutofit.fontScale + "px" : c.style.fontSize = i2.size + "px");
  var l2 = g(i2.color);
  return l2 && (c.style.color = l2), i2.bold && (c.style.fontWeight = "bold"), i2.italic && (c.style.fontStyle = "italic"), i2.underline && (c.style.textDecoration = "underline"), i2.background && (c.style.backgroundColor = g(i2.background)), c;
}
function E(t, e, r) {
  var s = document.createElement("span"), a = t.firstElementChild;
  switch (s.style.fontSize = a.style.fontSize, s.style.color = a.style.color, s.style.fontWeight = a.style.fontWeight, s.style.fontStyle = a.style.fontStyle, s.style.marginRight = "10px", e.buAutoNum) {
    case "arabicPeriod":
    default:
      s.textContent = r + ".";
      break;
    case "circleNumDbPlain":
      s.textContent = ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246A", "\u246B", "\u246C", "\u246D", "\u246E", "\u246F", "\u2470", "\u2471", "\u2472", "\u2473"][r - 1] || r + "";
      break;
    case "romanUcPeriod":
      s.textContent = (function(t2) {
        var e2 = [{ value: 1e3, numeral: "M" }, { value: 900, numeral: "CM" }, { value: 500, numeral: "D" }, { value: 400, numeral: "CD" }, { value: 100, numeral: "C" }, { value: 90, numeral: "XC" }, { value: 50, numeral: "L" }, { value: 40, numeral: "XL" }, { value: 10, numeral: "X" }, { value: 9, numeral: "IX" }, { value: 5, numeral: "V" }, { value: 4, numeral: "IV" }, { value: 1, numeral: "I" }];
        if ("number" != typeof t2 || t2 < 1 || t2 > 3999) throw new Error("Input must be a number between 1 and 3999.");
        for (var r2 = "", s2 = 0; s2 < e2.length; s2++) for (; t2 >= e2[s2].value; ) r2 += e2[s2].numeral, t2 -= e2[s2].value;
        return r2;
      })(r) + ".";
      break;
    case "alphaUcPeriod":
      s.textContent = u(r) + ".";
      break;
    case "alphaLcPeriod":
      s.textContent = u(r).toLowerCase() + ".";
      break;
    case "alphaLcParenR":
      s.textContent = u(r).toLowerCase() + ")";
      break;
    case "ea1JpnChsDbPeriod":
      s.textContent = (function(t2) {
        var e2 = ["\u3007", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D"];
        if (!Number.isInteger(t2) || t2 < 0) return "";
        for (var r2 = "", s2 = t2.toString(), a2 = 0; a2 < s2.length; a2++) r2 += e2[parseInt(s2[a2], 10)];
        return r2;
      })(r) + ".";
  }
  t.prepend(s);
}
function O(t, r, s) {
  var a, n2, o2, i2;
  void 0 === r && (r = 0), void 0 === s && (s = {});
  var c = t.inheritProps, l2 = t.inheritRProps, p2 = t.props, d2 = t.rows, h2 = __assign(__assign({}, c), p2), u2 = document.createElement("div"), f2 = s.isFirst ? 0 : h2.spaceBefore || 0, y2 = s.isLast ? 0 : h2.spaceAfter || 0;
  u2.style.margin = "0px", u2.style.padding = "".concat(f2, "px 0px ").concat(y2, "px 0px");
  var m2 = document.createElement("p");
  m2.style.margin = "0px", m2.style.padding = "0px", m2.style.wordBreak = "break-word";
  m2.style.textAlign = h2.align && { ctr: "center", l: "left", r: "right", dist: "justify" }[h2.align] || "center", "dist" === h2.align && (m2.style.textAlignLast = "justify");
  var b2 = h2.hasOwnProperty("lineHeight") ? 1.2 * h2.lineHeight : 1.2;
  if ((null === (n2 = null === (a = s.bodyProps) || void 0 === a ? void 0 : a.normAutofit) || void 0 === n2 ? void 0 : n2.lnSpcReduction) && (b2 *= 1 - (null === (i2 = null === (o2 = s.bodyProps) || void 0 === o2 ? void 0 : o2.normAutofit) || void 0 === i2 ? void 0 : i2.lnSpcReduction)), m2.style.lineHeight = b2 + "", d2.length) {
    for (var v2 = 0, g2 = d2; v2 < g2.length; v2++) {
      var x2 = g2[v2];
      m2.appendChild(j(x2, l2, s.bodyProps));
    }
    h2.buAutoNum ? E(m2, h2, r) : h2.buChar && (function(t2, e) {
      var r2 = document.createElement("span"), s2 = t2.firstElementChild;
      r2.style.color = s2.style.color, r2.style.fontSize = s2.style.fontSize, r2.textContent = { n: "\u25A0", l: "\u25CF", u: "\u25C6", p: "\u25A1", "\xFC": "\u2714", "\xD8": "\u27A2", "\u2022": "\u2022" }[e.buChar] || "\u25A0", r2.style.marginRight = "10px", t2.prepend(r2);
    })(m2, h2), m2.style.paddingLeft = (h2.marginLeft || 0) + (h2.indent || 0) + "px";
  } else {
    var w2 = document.createElement("span");
    w2.innerHTML = "&nbsp;", w2.style.fontSize = l2.size + "px", m2.appendChild(w2);
  }
  return u2.appendChild(m2), u2;
}
var R = "http://www.w3.org/2000/svg";
function D(t, e) {
  var r = 0;
  switch (t) {
    case "sm":
      r = 1 * e;
      break;
    case "med":
      r = 1.5 * e;
      break;
    case "lg":
      r = 2.5 * e;
  }
  return Math.max(r, 2);
}
function z(t, e, r, s) {
  void 0 === s && (s = false);
  var a = t.border, n2 = void 0 === a ? {} : a, o2 = t.uuid, i2 = n2.headEnd, c = n2.width, l2 = n2.color, p2 = n2.tailEnd, d2 = s ? i2 : p2, h2 = d2.len, u2 = void 0 === h2 ? "med" : h2, f2 = d2.w, y2 = void 0 === f2 ? "med" : f2, m2 = D(u2, c), b2 = D(y2, c), v2 = document.createElementNS(R, "defs"), x2 = document.createElementNS(R, "marker"), w2 = "marker-".concat(o2, "-").concat(s ? "start" : "end");
  x2.setAttribute("id", w2), x2.setAttribute("viewBox", "0 0 ".concat(2 * m2, " ").concat(2 * b2)), x2.setAttribute("refX", m2 + "px"), x2.setAttribute("refY", b2 + "px"), x2.setAttribute("markerWidth", 2 * m2 + "px"), x2.setAttribute("markerHeight", 2 * b2 + "px"), x2.setAttribute("orient", "auto"), x2.setAttribute("markerUnits", "userSpaceOnUse");
  var P2 = document.createElementNS(R, "ellipse");
  P2.setAttribute("cx", m2 + "px"), P2.setAttribute("cy", b2 + "px"), P2.setAttribute("rx", m2 + "px"), P2.setAttribute("ry", b2 + "px"), P2.setAttribute("fill", g(l2) || "transparent"), x2.appendChild(P2), v2.appendChild(x2), e.appendChild(v2), r.setAttribute(s ? "marker-start" : "marker-end", "url(#".concat(w2, ")"));
}
function F(t, e, r, s) {
  void 0 === s && (s = false);
  var a = t.border, n2 = void 0 === a ? {} : a, o2 = t.uuid, i2 = n2.headEnd, c = n2.width, l2 = n2.color, p2 = n2.tailEnd, d2 = s ? i2 : p2, h2 = d2.len, u2 = void 0 === h2 ? "med" : h2, f2 = d2.w, y2 = void 0 === f2 ? "med" : f2, m2 = D(u2, c), b2 = D(y2, c), v2 = document.createElementNS(R, "defs"), x2 = document.createElementNS(R, "marker"), w2 = "marker-".concat(o2, "-").concat(s ? "start" : "end");
  x2.setAttribute("id", w2), x2.setAttribute("viewBox", "0 0 ".concat(2 * m2, " ").concat(2 * b2)), x2.setAttribute("refX", (s ? 0.9 * m2 : 1.1 * m2) + "px"), x2.setAttribute("refY", b2 + "px"), x2.setAttribute("markerWidth", 2 * m2 + "px"), x2.setAttribute("markerHeight", 2 * b2 + "px"), x2.setAttribute("orient", "auto"), x2.setAttribute("markerUnits", "userSpaceOnUse");
  var P2 = document.createElementNS(R, "path"), A2 = s ? ["M ".concat(2 * m2, ",0"), "L 0,".concat(b2), "L ".concat(2 * m2, ",").concat(2 * b2), "Z"].join(" ") : ["M 0,0", "L ".concat(2 * m2, ",").concat(b2), "L 0,".concat(2 * b2), "Z"].join(" ");
  P2.setAttribute("d", A2), P2.setAttribute("fill", g(l2) || "transparent"), x2.appendChild(P2), v2.appendChild(x2), e.appendChild(v2), r.setAttribute(s ? "marker-start" : "marker-end", "url(#".concat(w2, ")"));
}
function H(t, e, r, s) {
  void 0 === s && (s = false);
  var a = t.border, n2 = void 0 === a ? {} : a, o2 = t.uuid, i2 = n2.headEnd, c = n2.width, l2 = n2.color, p2 = n2.tailEnd, d2 = s ? i2 : p2, h2 = d2.len, u2 = void 0 === h2 ? "med" : h2, f2 = d2.w, y2 = void 0 === f2 ? "med" : f2, m2 = D(u2, c), b2 = D(y2, c), v2 = document.createElementNS(R, "defs"), x2 = document.createElementNS(R, "marker"), w2 = "marker-".concat(o2, "-").concat(s ? "start" : "end");
  x2.setAttribute("id", w2), x2.setAttribute("viewBox", "0 0 ".concat(2 * m2, " ").concat(2 * b2)), x2.setAttribute("refX", m2 + "px"), x2.setAttribute("refY", b2 + "px"), x2.setAttribute("markerWidth", 2 * m2 + "px"), x2.setAttribute("markerHeight", 2 * b2 + "px"), x2.setAttribute("orient", "auto"), x2.setAttribute("markerUnits", "userSpaceOnUse");
  var P2 = document.createElementNS(R, "path"), A2 = ["M 0,".concat(b2), "L ".concat(m2, ",0"), "L ".concat(2 * m2, ",").concat(b2), "L ".concat(m2, ",").concat(2 * b2), "Z"].join(" ");
  P2.setAttribute("d", A2), P2.setAttribute("fill", g(l2) || "transparent"), x2.appendChild(P2), v2.appendChild(x2), e.appendChild(v2), r.setAttribute(s ? "marker-start" : "marker-end", "url(#".concat(w2, ")"));
}
function W(t, e, r, s) {
  void 0 === s && (s = false);
  var a = t.border, n2 = void 0 === a ? {} : a, o2 = t.uuid, i2 = n2.headEnd, c = n2.width, l2 = n2.color, p2 = n2.tailEnd, d2 = s ? i2 : p2, h2 = d2.len, u2 = void 0 === h2 ? "med" : h2, f2 = d2.w, y2 = void 0 === f2 ? "med" : f2, m2 = D(u2, c), b2 = D(y2, c), v2 = document.createElementNS(R, "defs"), x2 = document.createElementNS(R, "marker"), w2 = "marker-".concat(o2, "-").concat(s ? "start" : "end");
  x2.setAttribute("id", w2), x2.setAttribute("viewBox", "0 0 ".concat(2 * m2 + 2 * c, " ").concat(2 * b2 + 2 * c));
  var P2 = s ? "lg" === y2 ? 2 * c : 3 * c : "lg" === y2 ? 2 * m2 : 2 * m2 - c;
  x2.setAttribute("refX", P2 + "px"), x2.setAttribute("refY", b2 + c + "px"), x2.setAttribute("markerWidth", 2 * m2 + "px"), x2.setAttribute("markerHeight", 2 * b2 + "px"), x2.setAttribute("orient", "auto"), x2.setAttribute("markerUnits", "userSpaceOnUse");
  var A2 = document.createElementNS(R, "path"), k2 = s ? ["M ".concat(2 * m2 + c, ", ").concat(c), "L ".concat(c, ",").concat(b2 + c), "L ".concat(2 * m2 + c, ",").concat(2 * b2 + c)].join(" ") : ["M ".concat(c, ", ").concat(c), "L ".concat(2 * m2 + c, ",").concat(b2 + c), "L ".concat(c, ",").concat(2 * b2 + c)].join(" ");
  A2.setAttribute("d", k2), A2.setAttribute("stroke-width", c + "px"), A2.setAttribute("stroke", g(l2) || "transparent"), A2.setAttribute("fill", "transparent"), A2.setAttribute("stroke-linecap", "round"), A2.setAttribute("stroke-linejoin", "miter"), A2.style.overflow = "visible", x2.appendChild(A2), v2.appendChild(x2), e.appendChild(v2), r.setAttribute(s ? "marker-start" : "marker-end", "url(#".concat(w2, ")"));
}
function X(t, e, r, s) {
  void 0 === s && (s = false);
  var a = t.border, n2 = void 0 === a ? {} : a, o2 = t.uuid, i2 = n2.headEnd, c = n2.width, l2 = n2.color, p2 = n2.tailEnd, d2 = s ? i2 : p2, h2 = d2.len, u2 = void 0 === h2 ? "med" : h2, f2 = d2.w, y2 = void 0 === f2 ? "med" : f2, m2 = D(u2, c), b2 = D(y2, c), v2 = document.createElementNS(R, "defs"), x2 = document.createElementNS(R, "marker"), w2 = "marker-".concat(o2, "-").concat(s ? "start" : "end");
  x2.setAttribute("id", w2), x2.setAttribute("viewBox", "0 0 ".concat(2 * m2, " ").concat(2 * b2));
  var P2 = s ? "sm" === y2 ? 1.5 * c : 2 * c : "sm" === y2 ? 2 * m2 - 1.5 * c : 2 * m2 - 2 * c;
  x2.setAttribute("refX", P2 + "px"), x2.setAttribute("refY", b2 + "px"), x2.setAttribute("markerWidth", 2 * m2 + "px"), x2.setAttribute("markerHeight", 2 * b2 + "px"), x2.setAttribute("orient", "auto"), x2.setAttribute("markerUnits", "userSpaceOnUse");
  var A2 = document.createElementNS(R, "path"), k2 = s ? ["M 0, ".concat(b2), "L ".concat(2 * m2, ",0"), "L ".concat(m2, ",").concat(b2), "L ".concat(2 * m2, ",").concat(2 * b2), "Z"].join(" ") : ["M 0,0", "L ".concat(2 * m2, ",").concat(b2), "L 0,".concat(2 * b2), "L ".concat(m2, ",").concat(b2), "Z"].join(" ");
  A2.setAttribute("d", k2), A2.setAttribute("fill", g(l2) || "transparent"), A2.style.overflow = "visible", x2.appendChild(A2), v2.appendChild(x2), e.appendChild(v2), r.setAttribute(s ? "marker-start" : "marker-end", "url(#".concat(w2, ")"));
}
function U(t, e, r) {
  var s = t.border, a = void 0 === s ? {} : s;
  t.extend;
  var n2 = a.headEnd, o2 = a.tailEnd;
  if (n2 && "none" !== n2.type) switch (n2.type) {
    case "triangle":
      F(t, e, r, true);
      break;
    case "oval":
      z(t, e, r, true);
      break;
    case "diamond":
      H(t, e, r, true);
      break;
    case "arrow":
      W(t, e, r, true);
      break;
    case "stealth":
      X(t, e, r, true);
  }
  if (o2 && "none" !== o2.type) switch (o2.type) {
    case "triangle":
      F(t, e, r, false);
      break;
    case "oval":
      z(t, e, r, false);
      break;
    case "diamond":
      H(t, e, r, false);
      break;
    case "arrow":
      W(t, e, r, false);
      break;
    case "stealth":
      X(t, e, r, false);
  }
}
var Q = "http://www.w3.org/2000/svg";
function V(t) {
  var e = t.extend;
  return 0.16667 * Math.min(e.w, e.h);
}
function Y(t, e, r) {
  void 0 === r && (r = 0);
  var s = e.extend, a = e.prstGeom, n2 = ((null == a ? void 0 : a.gd) || []).find((function(e2) {
    return e2.name === t;
  }));
  return n2 ? Math.min(s.w, s.h) * n2.fmla : r;
}
function Z(t, e, r) {
  void 0 === r && (r = 0);
  var s = e.extend, a = e.prstGeom, n2 = ((null == a ? void 0 : a.gd) || []).find((function(e2) {
    return e2.name === t;
  }));
  return n2 ? Math.max(s.w, s.h) * n2.fmla : r;
}
function G(t) {
  var e = t.extend, r = document.createElementNS(Q, "rect");
  return r.setAttribute("x", "0"), r.setAttribute("y", "0"), r.setAttribute("width", e.w + "px"), r.setAttribute("height", e.h + "px"), r;
}
function J(t) {
  var r = t.extend, s = t.offset, a = t.border, n2 = t.background, o2 = t.rotate, i2 = t.flipH, c = t.flipV, l2 = document.createElement("div"), p2 = s.x, d2 = s.y;
  l2.className = "shape-wrapper shape-".concat(t.shape), l2.style.setProperty("position", "absolute"), l2.style.setProperty("width", (r.w || 1) + "px"), l2.style.setProperty("height", (r.h || 1) + "px"), l2.style.setProperty("left", p2 + "px"), l2.style.setProperty("top", d2 + "px");
  var h2, u2 = document.createElementNS(Q, "svg");
  u2.style.setProperty("position", "absolute"), u2.setAttribute("width", "100%"), u2.setAttribute("height", "100%"), u2.style.setProperty("left", "0"), u2.style.setProperty("top", "0"), u2.style.overflow = "visible";
  var f2 = { left: 0, top: 0, right: 0, bottom: 0, w: r.w, h: r.h }, y2 = true;
  switch (t.shape) {
    case "flowChartProcess":
    case "rect":
      h2 = G(t);
      break;
    case "snip1Rect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "polygon"), s2 = Y("adj", t2, V(t2)), a2 = ["0,0", "".concat(e.w - s2, ",0"), "".concat(e.w, ",").concat(s2), "".concat(e.w, ",").concat(e.h), "0,".concat(e.h)].join(" ");
        return r2.setAttribute("points", a2), r2;
      })(t);
      break;
    case "snip2SameRect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "polygon"), s2 = Y("adj1", t2, V(t2)), a2 = Y("adj2", t2, 0), n3 = [[s2, 0], [e.w - s2, 0], [e.w, s2], [e.w, e.h - a2], [e.w - a2, e.h], [a2, e.h], [0, e.h - a2], [0, s2]].map((function(t3) {
          return "".concat(t3[0], ",").concat(t3[1]);
        })).join(" ");
        return r2.setAttribute("points", n3), r2;
      })(t);
      break;
    case "snip2DiagRect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "polygon"), s2 = Y("adj1", t2, 0), a2 = Y("adj2", t2, V(t2)), n3 = [[s2, 0], [e.w - a2, 0], [e.w, a2], [e.w, e.h - s2], [e.w - s2, e.h], [a2, e.h], [0, e.h - a2], [0, s2]].map((function(t3) {
          return "".concat(t3[0], ",").concat(t3[1]);
        })).join(" ");
        return r2.setAttribute("points", n3), r2;
      })(t);
      break;
    case "snipRoundRect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = Y("adj1", t2, V(t2)), a2 = Y("adj2", t2, V(t2)), n3 = ["M ".concat(s2, ",0"), "L ".concat(e.w - a2, ",0"), "L ".concat(e.w, ",").concat(a2), "L ".concat(e.w, ",").concat(e.h), "L 0,".concat(e.h), "L 0,".concat(s2), "Q 0,0 ".concat(s2, ",0"), "Z"].join(" ");
        return r2.setAttribute("d", n3), r2;
      })(t);
      break;
    case "roundRect":
      h2 = (function(t2) {
        var e = G(t2), r2 = Y("adj", t2, V(t2));
        return e.setAttribute("rx", r2 + "px"), e.setAttribute("ry", r2 + "px"), e;
      })(t);
      break;
    case "round1Rect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = Y("adj", t2, V(t2)), a2 = ["M 0,0", "L ".concat(e.w - s2, ",0"), "Q ".concat(e.w, ",0 ").concat(e.w, ",").concat(s2), "L ".concat(e.w, ",").concat(e.h), "L 0,".concat(e.h), "Z"].join(" ");
        return r2.setAttribute("d", a2), r2;
      })(t);
      break;
    case "round2SameRect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = Y("adj1", t2, V(t2)), a2 = Y("adj2", t2, 0), n3 = ["M ".concat(s2, ",0"), "L ".concat(e.w - s2, ",0"), "Q ".concat(e.w, ",0 ").concat(e.w, ",").concat(s2), "L ".concat(e.w, ",").concat(e.h - a2), "Q ".concat(e.w, ",").concat(e.h, " ").concat(e.w - a2, ",").concat(e.h), "L ".concat(a2, ",").concat(e.h), "Q 0,".concat(e.h, " 0,").concat(e.h - a2), "L 0,".concat(s2), "Q 0,0 ".concat(s2, ",0"), "Z"].join(" ");
        return r2.setAttribute("d", n3), r2;
      })(t);
      break;
    case "round2DiagRect":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = Y("adj1", t2, V(t2)), a2 = Y("adj2", t2, 0), n3 = ["M ".concat(s2, ",0"), "L ".concat(e.w - a2, ",0"), "Q ".concat(e.w, ",0 ").concat(e.w, ",").concat(a2), "L ".concat(e.w, ",").concat(e.h - s2), "Q ".concat(e.w, ",").concat(e.h, " ").concat(e.w - s2, ",").concat(e.h), "L ".concat(a2, ",").concat(e.h), "Q 0,".concat(e.h, " 0,").concat(e.h - a2), "L 0,".concat(s2), "Q 0,0 ".concat(s2, ",0"), "Z"].join(" ");
        return r2.setAttribute("d", n3), r2;
      })(t);
      break;
    case "triangle":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "polygon"), s2 = ["".concat(e.w / 2, ",0"), "0,".concat(e.h), "".concat(e.w, ",").concat(e.h)].join(" ");
        return r2.setAttribute("points", s2), r2;
      })(t);
      break;
    case "rtTriangle":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "polygon"), s2 = ["0,".concat(e.h), "0,0", "".concat(e.w, ",").concat(e.h)].join(" ");
        return r2.setAttribute("points", s2), r2;
      })(t);
      break;
    case "ellipse":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "ellipse"), s2 = e.w / 2, a2 = e.h / 2, n3 = s2, o3 = a2;
        return r2.setAttribute("cx", s2 + "px"), r2.setAttribute("cy", a2 + "px"), r2.setAttribute("rx", n3 + "px"), r2.setAttribute("ry", o3 + "px"), r2;
      })(t);
      break;
    case "line":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = ["M 0,0", "L ".concat(e.w, ",").concat(e.h)].join(" ");
        return r2.setAttribute("d", s2), r2;
      })(t), U(t, u2, h2), y2 = false;
      break;
    case "straightConnector1":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = ["M 0,0", "L ".concat(e.w, ",").concat(e.h)].join(" ");
        return r2.setAttribute("d", s2), r2;
      })(t), U(t, u2, h2), y2 = false;
      break;
    case "bentConnector3":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = Z("adj1", t2, 0.5 * Math.max(e.w, e.h)), a2 = ["M 0,0", "L ".concat(s2, ",0"), "L ".concat(s2, ",").concat(e.h), "L ".concat(e.w, ",").concat(e.h)].join(" ");
        return r2.setAttribute("d", a2), r2;
      })(t), U(t, u2, h2), y2 = false;
      break;
    case "curvedConnector3":
      h2 = (function(t2) {
        var e = t2.extend, r2 = document.createElementNS(Q, "path"), s2 = Z("adj1", t2, 0.5 * Math.max(e.w, e.h)), a2 = ["M0,0", "Q".concat(s2, ",0 ").concat(s2, ",").concat(e.h / 2), "T".concat(e.w, ",").concat(e.h)].join(" ");
        return r2.setAttribute("d", a2), r2;
      })(t), U(t, u2, h2), y2 = false;
  }
  if (h2) {
    y2 ? h2.setAttribute("fill", g(n2) || "transparent") : h2.setAttribute("fill", "transparent"), a.width ? (h2.setAttribute("stroke-width", a.width + "px"), h2.setAttribute("stroke", g(a.color) || "transparent")) : h2.setAttribute("stroke-width", "0"), h2.setAttribute("stroke-dasharray", (function(t2) {
      return t2 && "solid" !== t2.type ? ({ sysDot: [1, 1], sysDash: [3, 1], dash: [4, 3], dashDot: [4, 3, 1, 3], lgDash: [8, 3], lgDashDot: [8, 3, 1, 3], lgDashDotDot: [8, 3, 1, 3, 1, 3] }[t2.type] || []).map((function(e) {
        return e * t2.width;
      })).join(",") : "";
    })(a));
    h2.setAttribute("stroke-linecap", a.cap && { sq: "square", rnd: "round", flat: "butt" }[a.cap] || "square"), h2.setAttribute("stroke-linejoin", a.lineJoin || "round"), "miter" === a.lineJoin && h2.setAttribute("stroke-miterlimit", a.miterLim + ""), u2.appendChild(h2);
  }
  var m2 = [];
  i2 && m2.push("scaleX(-1)"), c && m2.push("scaleY(-1)"), u2.style.setProperty("transform", m2.join(" ")), l2.appendChild(u2);
  var b2 = (function(t2, r2, s2) {
    var a2;
    void 0 === s2 && (s2 = false);
    var n3 = t2.inheritProps, o3 = t2.props, i3 = t2.paragraphs;
    if (!i3 || 0 === i3.length) return null;
    var c2 = __assign(__assign({}, n3), o3), l3 = document.createElement("div");
    switch (l3.className = "text-wrapper", l3.style.boxSizing = "border-box", l3.style.position = "absolute", l3.style.left = r2.left + "px", "eaVert" === c2.vert ? (l3.style.writingMode = "vertical-rl", l3.style.height = r2.h + "px") : l3.style.width = r2.w + "px", c2.anchor) {
      case "b":
        l3.style.bottom = r2.bottom + "px";
        break;
      case "t":
        l3.style.top = r2.top + "px";
        break;
      case "ctr":
        l3.style.top = r2.top + r2.h / 2 + "px", l3.style.transform = "translateY(-50%)";
        break;
      default:
        s2 ? l3.style.top = r2.top + "px" : (l3.style.top = r2.top + r2.h / 2 + "px", l3.style.transform = "translateY(-50%)");
    }
    var p3 = [c2.hasOwnProperty("tIns") ? c2.tIns + "px" : "4px", c2.hasOwnProperty("rIns") ? c2.rIns + "px" : "7px", c2.hasOwnProperty("bIns") ? c2.bIns + "px" : "4px", c2.hasOwnProperty("lIns") ? c2.lIns + "px" : "7px"];
    l3.style.padding = p3.join(" ");
    for (var d3 = {}, h3 = 0, u3 = function(t3) {
      var r3 = __assign(__assign({}, t3.inheritProps), t3.props), s3 = void 0;
      if (r3.buAutoNum) {
        var n4 = r3.level ? +r3.level : 0;
        d3[n4] || (d3[n4] = 0), (null === (a2 = t3.rows) || void 0 === a2 ? void 0 : a2.length) && d3[n4]++, Object.keys(d3).forEach((function(t4) {
          +t4 > n4 && (d3[t4] = 0);
        })), s3 = O(t3, d3[n4], { isFirst: 0 === h3, isLast: i3.length - 1 === h3, bodyProps: c2 });
      } else s3 = O(t3, 0, { isFirst: 0 === h3, isLast: i3.length - 1 === h3, bodyProps: c2 });
      l3.appendChild(s3), h3++;
    }, f3 = 0, y3 = i3; f3 < y3.length; f3++) u3(y3[f3]);
    return l3;
  })(t.textBody, f2, t.isTextBox);
  return b2 && l2.appendChild(b2), o2 && l2.style.setProperty("transform", "rotate(".concat(o2, "deg)")), l2;
}
function q(t) {
  var e = document.createElement("div"), r = t.extend;
  t.chExtend;
  var s = t.offset, a = t.chOffset, n2 = t.flipV, o2 = t.flipH, i2 = t.rotate, c = s.x, l2 = s.y, p2 = r.w, d2 = r.h;
  e.className = "group", e.style.position = "absolute", e.style.left = c + "px", e.style.top = l2 + "px", e.style.width = p2 + "px", e.style.height = d2 + "px";
  var h2 = [];
  o2 && h2.push("scaleX(-1)"), n2 && h2.push("scaleY(-1)"), i2 && h2.push("rotate(".concat(i2, "deg)")), e.style.transformOrigin = "center center", e.style.transform = h2.join(" ");
  for (var u2 = 0; u2 < t.nodes.length; u2++) {
    var f2 = t.nodes[u2], m2 = void 0;
    f2 instanceof y ? m2 = B(f2) : f2 instanceof w ? m2 = J(f2) : f2 instanceof P && (m2 = q(f2)), m2.style.left = parseInt(m2.style.left) - a.x + "px", m2.style.top = parseInt(m2.style.top) - a.y + "px", e.appendChild(m2);
  }
  return e;
}
var $ = (function() {
  function t(t2, e, r) {
    this.scale = 1, this.wrapper = t2, this.pptx = e, this.options = r, this._calcScaleAndRenderPort();
  }
  return t.prototype._calcScaleAndRenderPort = function() {
    var t2 = this.options.viewPort.width / this.pptx.width, e = this.options.viewPort.height / this.pptx.height;
    if (this.scale = Math.min(t2, e), t2 < e) {
      var r = this.options.viewPort.width, s = this.pptx.height * this.scale;
      this.renderPort = { width: r, height: s, left: 0, top: (this.options.viewPort.height - s) / 2 };
    } else {
      r = this.pptx.width * this.scale, s = this.options.viewPort.height;
      this.renderPort = { width: r, height: s, left: (this.options.viewPort.width - r) / 2, top: 0 };
    }
  }, t.prototype.renderSlide = function(t2) {
    var e = this.pptx.slides[t2], r = document.createElement("div");
    r.classList.add("pptx-preview-slide-wrapper"), r.style.setProperty("width", this.renderPort.width + "px"), r.style.setProperty("height", this.renderPort.height + "px"), r.style.setProperty("position", "relative"), r.style.margin = "0 auto 10px", r.style.setProperty("background", "#fff"), r.style.setProperty("overflow", "hidden"), this._renderBackground(e, r), this._renderSlideMaster(e.slideMaster, r), this._renderSlideLayout(e.slideLayout, r), this._renderSlide(e, r), this.wrapper.append(r);
  }, t.prototype._renderSlideMaster = function(t2, e) {
    var r = document.createElement("div");
    r.classList.add("slide-master-wrapper"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "0"), r.style.setProperty("top", "0"), r.style.setProperty("width", "100%"), r.style.setProperty("height", "100%");
    var s = __spreadArray([], t2.nodes, true).filter((function(t3) {
      return t3.userDrawn;
    }));
    s.sort((function(t3, e2) {
      return t3.order > e2.order ? 1 : -1;
    }));
    for (var n2 = 0; n2 < s.length; n2++) {
      var o2 = this._renderNode(s[n2]);
      o2 && r.append(o2);
    }
    e.append(r);
  }, t.prototype._renderSlideLayout = function(t2, e) {
    var r = document.createElement("div");
    r.classList.add("slide-layout-wrapper"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "0"), r.style.setProperty("top", "0"), r.style.setProperty("width", "100%"), r.style.setProperty("height", "100%");
    var s = __spreadArray([], t2.nodes, true).filter((function(t3) {
      return t3.userDrawn;
    }));
    s.sort((function(t3, e2) {
      return t3.order > e2.order ? 1 : -1;
    }));
    for (var n2 = 0; n2 < s.length; n2++) {
      var o2 = this._renderNode(s[n2]);
      o2 && r.append(o2);
    }
    e.append(r);
  }, t.prototype._renderSlide = function(t2, e) {
    var r = document.createElement("div");
    r.classList.add("slide-wrapper"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "0"), r.style.setProperty("top", "0"), r.style.setProperty("width", this.pptx.width + "px"), r.style.setProperty("height", this.pptx.height + "px"), r.style.setProperty("transform", "scale(".concat(this.scale, ")")), r.style.setProperty("transform-origin", "0 0");
    var s = __spreadArray([], t2.nodes, true);
    s.sort((function(t3, e2) {
      return t3.order > e2.order ? 1 : -1;
    }));
    for (var n2 = 0; n2 < s.length; n2++) {
      var o2 = this._renderNode(s[n2]);
      o2 && r.append(o2);
    }
    e.append(r);
  }, t.prototype._renderNode = function(t2) {
    return t2 instanceof y ? B(t2) : t2 instanceof w ? J(t2) : t2 instanceof P ? q(t2) : void 0;
  }, t.prototype._renderBackground = function(t2, e) {
    var r = document.createElement("div");
    r.classList.add("slide-background"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "0"), r.style.setProperty("top", "0"), r.style.setProperty("width", "100%"), r.style.setProperty("height", "100%");
    var s = g(t2.background) || g(t2.slideLayout.background) || g(t2.slideMaster.background);
    s ? r.style.setProperty("background", s) : r.style.setProperty("background", "#fff"), e.append(r);
  }, t;
})();
var K = (function() {
  function t(t2, e) {
    this.dom = t2, this.options = e, this._renderWrapper();
  }
  return t.prototype._renderWrapper = function() {
    var t2 = document.createElement("div");
    t2.classList.add("pptx-preview-wrapper"), t2.style.setProperty("background", "#000"), t2.style.setProperty("width", this.options.width + "px"), this.options.height && t2.style.setProperty("height", this.options.height + "px"), t2.style.setProperty("position", "relative"), this.options.height && t2.style.setProperty("overflow-y", "auto"), this.dom.append(t2), this.wrapper = t2;
  }, t.prototype.preview = function(t2) {
    var e = this;
    return new Promise((function(r, s) {
      e.wrapper.innerHTML = "";
      var a = new T();
      a.load(t2).then((function() {
        console.log("pptx \u5B9E\u4F8B", a), console.log("slide1", a.slides[0]);
        var t3 = new $(e.wrapper, a, { viewPort: { width: e.options.width, height: e.options.height } });
        console.log("htmlRender", t3);
        for (var r2 = 0; r2 < a.slides.length; r2++) t3.renderSlide(r2);
      }));
    }));
  }, t;
})();
function tt(t, e) {
  return new K(t, e);
}
export {
  tt as init
};
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.2 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
