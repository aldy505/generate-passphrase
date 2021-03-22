"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("crypto"),t=require("fs"),r=require("path");function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=n(e),s=n(t),u=n(r);
/**
 * @module generate-passphrase
 * @author Reinaldy Rafli <hi@reinaldyrafli.com>
 * @license MIT
 */
let l,a;function p(){return(void 0===a||a>=l.length)&&(l=o.default.randomBytes(256),a=0),a+=1,l[a]}function i(e){let t=p();for(;void 0===t||t>=256-256%e;)t=p();return t%e}function c(){const e=s.default.readFileSync(u.default.resolve(__dirname,"words.txt"),"utf8").split("\n");return e[o.default.randomInt(0,e.length)]}
/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 */function f(e={}){const t={length:4,separator:"-",numbers:!0,uppercase:!1,titlecase:!1,pattern:null,...e};if(t.length<=0)throw new Error("Length should be 1 or bigger. It should not be zero or lower.");const r=[];let n;n=t.pattern?t.pattern.toUpperCase():function(e,t){const r=t?"NWW":"WWW";let n="";for(let t=0;t<e;t+=1)n+=r[i(2)];return n}(t.length,t.numbers);const o=n.split("");for(let e=0;e<o.length;e+=1)if("N"===o[e])r.push(p());else{if("W"!==o[e])throw new Error("Unknown pattern found. Use N or W instead.");{const e=c();t.uppercase?r.push(e.toUpperCase()):t.titlecase?r.push(e.replace(/\w\S*/g,(e=>e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()))):r.push(e)}}return r.join(t.separator)}
/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {generateOptions} options - The options
 * @returns {Array<string>} - Array of passphrases
 */exports.generate=f,exports.generateMultiple=function(e,t={}){const r=[];for(let n=0;n<e;n+=1)r[n]=f(t);return r};
