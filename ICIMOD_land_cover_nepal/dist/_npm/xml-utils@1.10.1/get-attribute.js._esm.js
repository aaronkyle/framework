/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/xml-utils@1.10.1/get-attribute.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t={exports:{}};function e(t,e,o){const l=o&&o.debug||!1;l&&console.log("[xml-utils] getting "+e+" in "+t);const n="object"==typeof t?t.outer:t,s=n.slice(0,n.indexOf(">")+1),c=['"',"'"];for(let t=0;t<c.length;t++){const o=c[t],n=e+"\\="+o+"([^"+o+"]*)"+o;l&&console.log("[xml-utils] pattern:",n);const r=new RegExp(n).exec(s);if(l&&console.log("[xml-utils] match:",r),r)return r[1]}}t.exports=e,t.exports.default=e;var o=t.exports;export{o as default};
