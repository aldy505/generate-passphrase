import t from"crypto";import e from"fs";import r from"path";
/**
 * @module generate-passphrase
 * @author Reinaldy Rafli <hi@reinaldyrafli.com>
 * @license MIT
 */let n,o;function s(){return(void 0===o||o>=n.length)&&(n=t.randomBytes(256),o=0),o+=1,n[o]}function p(t){let e=s();for(;void 0===e||e>=256-256%t;)e=s();return e%t}function l(){const n=e.readFileSync(r.resolve(__dirname,"words.txt"),"utf8").split("\n");return n[t.randomInt(0,n.length)]}
/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 */function u(t={}){const e={length:4,separator:"-",numbers:!0,uppercase:!1,titlecase:!1,pattern:null,...t};if(e.length<=0)throw new Error("Length should be 1 or bigger. It should not be zero or lower.");const r=[];let n;n=e.pattern?e.pattern.toUpperCase():function(t,e){const r=e?"NWW":"WWW";let n="";for(let e=0;e<t;e+=1)n+=r[p(2)];return n}(e.length,e.numbers);const o=n.split("");for(let t=0;t<o.length;t+=1)if("N"===o[t])r.push(s());else{if("W"!==o[t])throw new Error("Unknown pattern found. Use N or W instead.");{const t=l();e.uppercase?r.push(t.toUpperCase()):e.titlecase?r.push(t.replace(/\w\S*/g,(t=>t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()))):r.push(t)}}return r.join(e.separator)}
/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {generateOptions} options - The options
 * @returns {Array<string>} - Array of passphrases
 */function a(t,e={}){const r=[];for(let n=0;n<t;n+=1)r[n]=u(e);return r}export{u as generate,a as generateMultiple};
