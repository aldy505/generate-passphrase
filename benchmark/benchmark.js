/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const Benchmark = require('benchmark');

const niceware = require('niceware');
const generatePassword = require('generate-password');
const randomatic = require('randomatic');
const generatePassphrase = require('../build/index.cjs');

const suite = new Benchmark.Suite();

suite
  .add('generate-passphrase single item', () => generatePassphrase.generate(), { minSamples: 200, maxTime: 15 })
  .add('generate-passphrase multiple items', () => generatePassphrase.generateMultiple(10), { minSamples: 200, maxTime: 15 })
  .add('generate-password single item', () => generatePassword.generate({ length: 40 }), { minSamples: 100, maxTime: 15 })
  .add('generate-password multiple items', () => generatePassword.generateMultiple(10, { length: 40 }), { minSamples: 100, maxTime: 15 })
  .add('niceware single item', () => niceware.generatePassphrase(8), { minSamples: 100, maxTime: 15 })
  .add('randomatic single item', () => randomatic('*', 40), { minSamples: 100, maxTime: 15 })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log('Benchmark completed');
  })
  .run({ async: true, minSamples: 500, name: 'Generate-Passphrase Benchmark' });
