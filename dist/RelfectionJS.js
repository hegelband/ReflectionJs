!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ReflectionJS=e():t.ReflectionJS=e()}(self,(()=>{return t={237:(t,e,r)=>{const s=r(981),n=r(817),o=r(617),i=r(157),c=r(799);t.exports.getArgumentDefaultValue=s,t.exports.getClassConstructorArgsNames=o,t.exports.getFunctionArgsNames=i,t.exports.parseType=c,t.exports.getBaseClass=n},981:(t,e,r)=>{const s=r(182),n=r(799);class o extends Error{constructor(t){super(`Argument 'arg' of getArgumentDefaultValue(arg) has invalid type - ${t}. Argument type must be a string.`)}}class i extends Error{constructor(){super("Argument 'arg' is an empty string.")}}t.exports=function(t){const e=n(t);if("string"!==e)throw new o(e);if(""===t)throw new i;const r=t.split("=");return{name:r[0].trim(),value:r.length>1?s(r[1].trim()):void 0}}},817:(t,e,r)=>{const s=r(799);class n extends Error{constructor(t){super(`Argument 'cls' of getBaseClass(cls) has invalid type - ${t}. Argument type must be a class or a function.`)}}t.exports=t=>{const e=s(t);if("class"!==e&&"function"!==e)throw new n(e);return"class"===e?t.prototype.__proto__.constructor:t.prototype}},617:(t,e,r)=>{const{findCloseBraceIndex:s,splitArgsStrByCommas:n}=r(157),o=r(799);class i extends Error{constructor(){super("DI object has no one constructor. Need one or more.")}}class c extends Error{constructor(t){super(`Argument cls with invalid type - ${t}. Argument value type must be a class.`)}}t.exports=t=>{const e=o(t);if("class"!==e)throw new c(e);const r=t.toString(),l=r.indexOf("constructor",0);if(-1===l)throw new i;const u=r.indexOf("(",l);let a=s(r,u);const p=r.slice(u+1,a);return{startPosition:l,args:n(p).map((t=>t.trim())).filter((t=>""!==t))}}},157:(t,e,r)=>{const s=r(799);class n extends Error{constructor(t){super(`Argument func with invalid type - ${t}. Argument value type must be a function.`)}}const o=(t,e)=>{const r=t.indexOf("(",e);let s=t.indexOf(")",r);const n=e=>t.split("").slice(r,e).map(((t,e)=>({char:t,index:e}))).filter((t=>"("===t.char)).length;let o=n(s),i=0;for(;o>1;)i++,s=t.indexOf(")",s+1),o=n(s)-i;return s},i=t=>{const e=t.split("").map(((t,e)=>({char:t,index:e}))).filter((t=>","===t.char));let r=0;return e.filter((e=>{const s=t.slice(r,e.index).split("").filter((t=>"("===t)).length,n=t.slice(r,e.index).split("").filter((t=>")"===t)).length,o=t.slice(r,e.index).split("").filter((t=>"{"===t)).length,i=t.slice(r,e.index).split("").filter((t=>"}"===t)).length;return s===n&&o===i&&(r=e.index,!0)})).map((t=>t.index))},c=t=>{const e=[-1,...i(t),null];return e.slice(1).map(((r,s)=>null===r?t.slice(e[s]+1):t.slice(e[s]+1,r)))};t.exports=t=>{const e=s(t);if("function"!==e&&"function class"!==e)throw new n(e);const r=t.toString(),i=r.indexOf("(",0),l=o(r,i),u=r.indexOf("=");let a;return a=-1!==u&&(-1===i||u<i)?r.slice(0,u):i+1===l?"":r.slice(i+1,l),{startPosition:-1===i?0:i,args:c(a).map((t=>t.trim())).filter((t=>""!==t))}},t.exports.findCloseBraceIndex=o,t.exports.splitArgsStrByCommas=c},182:(t,e,r)=>{const s=r(799);class n extends Error{constructor(t,e){super(`getStringifiedEntityName argument type is invalid (${t} - ${e}). 'entityStr' must be a string.`)}}class o extends Error{constructor(){super("getStringifiedEntityName argument is an empty string.")}}t.exports=t=>{const e=s(t);if("string"!==e)throw new n(t,e);if(""===t)throw new o;if(t.includes("WEBPACK_IMPORTED_MODULE")){const e=t.indexOf("_")+1,r=t.indexOf("_",e+1);return t.slice(e,r)}return t}},799:t=>{t.exports=function(t){const e=typeof t;if("function"!==e)return"object"===e&&null===t?"null":e;const r=t.toString();return r.startsWith("class")?"class":r.includes("_classCallCheck")?"function class":"function"}}},e={},function r(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,r),o.exports}(237);var t,e}));
//# sourceMappingURL=RelfectionJS.js.map