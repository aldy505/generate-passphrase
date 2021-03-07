# Generate Passphrase

[![npm (tag)](https://img.shields.io/npm/v/generate-passphrase/next?style=flat-square)](https://www.npmjs.com/package/generate-passphrase) [![npm](https://img.shields.io/npm/dm/generate-passphrase?style=flat-square)](https://www.npmjs.com/package/generate-passphrase) [![Codecov](https://img.shields.io/codecov/c/github/aldy505/generate-passphrase?style=flat-square)](https://codecov.io/gh/aldy505/generate-passphrase) [![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/generate-passphrase/master?style=flat-square)](https://github.com/aldy505/generate-passphrase/actions) [![GitHub](https://img.shields.io/github/license/aldy505/generate-passphrase?style=flat-square)](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)



> ✨Zero dependency module for generating passphrase.

It's working. But still it's a work in progress.

The code is close to node [generate-password](https://github.com/brendanashworth/generate-password) repo. But this is for a passphrase, with English language.

ProtonMail has a [decent article](https://protonmail.com/blog/protonmail-com-blog-password-vs-passphrase/) explaining about password vs passphrase. 

Is this secure? Yes. I don't use `Math.floor`, I used the `crypto` module.
## Installation
```bash
$ npm install generate-passphrase@next
# or
$ yarn add generate-passphrase@next
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
// ['pinocytotically-loricated-prithee-hypnotizer', 'sambaing-phenotypically-singlesticks-239', ... ]
// see available options below

const multiplePassphrase = generateMultiple(3)
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
| pattern | `string` | `''` (empty string) |

## Contributing

Yes please.

## License

[MIT](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)