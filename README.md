# Generate Passphrase

[![Codecov](https://img.shields.io/codecov/c/github/aldy505/generate-passphrase?style=flat-square)](https://codecov.io/gh/aldy505/generate-passphrase) [![GitHub branch checks state](https://img.shields.io/github/checks-status/aldy505/generate-passphrase/master?style=flat-square)](https://github.com/aldy505/generate-passphrase/actions) [![GitHub](https://img.shields.io/github/license/aldy505/generate-passphrase?style=flat-square)](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)

<!-- ![npm](https://img.shields.io/npm/v/generate-passphrase?style=flat-square) ![npm](https://img.shields.io/npm/dm/generate-passphrase?style=flat-square) -->

> ✨Zero dependency module for generating passphrase.

It's working. But still it's a work in progress.

The code is close to node [generate-password](https://github.com/brendanashworth/generate-password) repo. But this is for a passphrase, with English language.

ProtonMail has a [decent article](https://protonmail.com/blog/protonmail-com-blog-password-vs-passphrase/) explaining about password vs passphrase. 

Is this secure? Yes. I don't use `Math.floor`, I used the `crypto` module.

## How to use this? 

```js
import { generate, generateMultiple } from 'path/to/this/module' // Not on NPM yet
// or
const passphrase = require('path/to/this/module')

const passphrase = generate();
const anotherPassphrase = generate({ length: 3, separator: '.', titlecase: true }) // see available options below

const multiplePassphrase = generateMultiple(3)
const anotherMultiplePassphrase = generateMultiple(10, { length: 2, uppercase: true, numbers: false })

```

## Options

| Key | Type | Default |
| --- | --- | --- |
| length | integer | 4 |
| separator | string | '-' |
| numbers | boolean | true |
| uppercase | boolean | false |
| titlecase | boolean | false |
| pattern | string | '' (empty string) |

## Contributing

Yes please.

## License

[MIT](https://github.com/aldy505/generate-passphrase/blob/master/LICENSE)