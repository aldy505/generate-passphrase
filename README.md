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

## Options

| Key | Type | Default |
| --- | --- | --- |
| length | `integer` | `4` |
| separator | `string` | `'-'` |
| numbers | `boolean` | `true` |
| uppercase | `boolean` | `false` |
| titlecase | `boolean` | `false` |
| pattern | `string` | `null` |

A few things to note:
 * Uppercase is more prioritized than titlecase. So if you have both options set to `true`, it will be words full of uppercase.
 * Pattern option is more prioritized than length, because you've set the passphrase pattern, hence the module is using the length from your pattern.

## Benchmark a.k.a How slow is this?

**TL;DR:** It's slow.

I'm using:
* Asus ROG GL553VE
* Windows 10 Home 64-bit (10.0 Build 18363)
* Intel Core i7-7700HQ @ 2.80GHz, 8 CPUs
* 16 GB RAM

Benchmark for single passphrase/password:

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase | 14.12 | ±4.22% | 253 |
| generate-password | 551,350 | ±3.77% | 287 |
| niceware | 333,076 | ±2.59% | 317 | 
| randomatic | 10,740 | ±2.04% | 312 |

Benchmark for multiple passphrase/password (`generateMultiple` function):

| Module | Ops/sec | Accuracy | Runs sampled |
| --- | --- | --- | --- |
| generate-passphrase | 1.28 | ±2.40% | 209 |
| generate-password | 47,050 | ±2.25% | 319 |

**Explaination why this module is so slow:**

Both this module and `niceware` uses a file that contains lots of English words. But `niceware`'s file only weigh at 767 KB with 65544 lines of code, compared to this module weigh at 2.76 MB with 274411 lines of code. Is it more unpredictable? Yes, because it has more words.

## Contributing

Yes please.

## License

[MIT](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)
