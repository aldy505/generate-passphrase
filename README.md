# Generate Passphrase

[![npm](https://img.shields.io/npm/v/generate-passphrase?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/generate-passphrase?style=flat-square) ![npm](https://img.shields.io/npm/dm/generate-passphrase?style=flat-square)](https://www.npmjs.com/package/generate-passphrase) [![Codecov](https://img.shields.io/codecov/c/github/aldy505/generate-passphrase?style=flat-square)](https://codecov.io/gh/aldy505/generate-passphrase) [![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/generate-passphrase/master?style=flat-square)](https://github.com/aldy505/generate-passphrase/actions) [![CodeFactor](https://www.codefactor.io/repository/github/aldy505/generate-passphrase/badge)](https://www.codefactor.io/repository/github/aldy505/generate-passphrase) [![GitHub](https://img.shields.io/github/license/aldy505/generate-passphrase?style=flat-square)](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)

> ✨Zero dependency module for generating passphrase.

* 🚀 Simple passphrase generator with simple config
* ✨ ESM support
* 🔑 Cryptographically secure
* 📕 Built-in Typescript typings
* 🎊 Supports Node.js 10 and higher

The code is close to node [generate-password](https://github.com/brendanashworth/generate-password) repo. But this is for a passphrase, with English language.

ProtonMail has a [decent article](https://protonmail.com/blog/protonmail-com-blog-password-vs-passphrase/) explaining about password vs passphrase. 

Is this secure? Yes. I don't use `Math.floor`, I used the `crypto` module.

Why is this repo heavy? I'm using [sindresorhus' word-list repo](https://github.com/sindresorhus/word-list) for fetching the English word list. If you have a better idea/workaround for this, feel free to open up an issue and file a PR! I'll gladly accept any feedbacks.

## Installation
```bash
$ npm install generate-passphrase
# or
$ yarn add generate-passphrase
# or basically any package manager you like.
```

## How to use this? 

```js
import { generate, generateMultiple } from 'generate-passphrase'
// or
const { generate, generateMultiple } = require('generate-passphrase')

const passphrase = generate();
// 'provoke-goddesshoods-26-staghorns'
const anotherPassphrase = generate({ length: 3, separator: '.', titlecase: true }) 
// see available options below

const multiplePassphrase = generateMultiple(3)
// ['pinocytotically-loricated-prithee-hypnotizer', 'sambaing-phenotypically-singlesticks-239', ... ]
const anotherMultiplePassphrase = generateMultiple(10, { length: 2, uppercase: true, numbers: false })
```

I know some of us need to generate it fast just for the sake of it, you can add `fast` as a parameter. (It defaults to false). Please bear in mind, this would make the returning random passphrase **not cryptographically secure**

```js
const fast = generate({ fast: true })
// cultivars-strigose-avisements-58

const extraFast = generateMultiple(5, { fast: true })
// ['extrorsal-169-resultlessness-168', 'postmodern-kolkhozniki-skulkers-99', ... ]
```

## Options

| Key | Type | Default |
| --- | --- | --- |
| length | `integer` | `4` |
| separator | `string` | `'-'` |
| numbers | `boolean` | `true` |
| uppercase | `boolean` | `false` |
| titlecase | `boolean` | `false` |
| pattern | `string` | `null` |
| fast | `boolean` | `false` |

A few things to note:
 * Uppercase is more prioritized than titlecase. So if you have both options set to `true`, it will be words full of uppercase.
 * Pattern option is more prioritized than length, because you've set the passphrase pattern, hence the module is using the length from your pattern.

## Benchmark a.k.a How slow is this?

~~**TL;DR:** It's slow.~~ On v1.1.0, I managed to get the algorithm runs a lot faster. There is also an additional `fast` option if you're just aiming for the speed.

I'm using:
* Asus ROG GL553VE
* Windows 10 Home 64-bit (10.0 Build 18363)
* Intel Core i7-7700HQ @ 2.80GHz, 8 CPUs
* 16 GB RAM

Benchmark for single passphrase/password:

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase | 117,546 | ±2.32% | 385 |
| generate-passphrase (`fast` enabled) | 653,668 | ±1.07% | 444 |
| generate-password | 434,495 | ±1.49% | 332 |
| niceware | 207,719 | ±5.79% | 232 | 
| randomatic | 8,026 | ±2.23% | 319 |

Benchmark for multiple passphrase/password (`generateMultiple` function):

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase | 12,338 | ±1.80% | 407 |
| generate-passphrase (`fast` enabled) | 64,124 | ±1.51% | 441 |
| generate-password | 43,775 | ±2.15% | 317 |

## Contributing

Yes please.

## License

[MIT](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)
