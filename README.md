# Generate Passphrase

> Zero dependency module for generating passphrase.

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