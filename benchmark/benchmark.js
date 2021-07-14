import benchmark from 'benchmark';
import niceware from 'niceware';
import generatePassword from 'generate-password';
import randomatic from 'randomatic';
import {generate, generateMultiple} from '../dist/index.mjs';

const suite = new benchmark.Suite();

suite
  .add('generate-passphrase single item', () => generate(), {minSamples: 200, maxTime: 15})
  .add('generate-passphrase multiple items', () => generateMultiple(10), {minSamples: 200, maxTime: 15})
  .add('generate-passphrase single item with fast', () => generate({fast: true}), {minSamples: 200, maxTime: 15})
  .add('generate-passphrase multiple item with fast', () => generateMultiple(10, {fast: true}), {minSamples: 200, maxTime: 15})
  .add('generate-password single item', () => generatePassword.generate({length: 40}), {minSamples: 100, maxTime: 15})
  .add('generate-password multiple items', () => generatePassword.generateMultiple(10, {length: 40}), {minSamples: 100, maxTime: 15})
  .add('niceware single item', () => niceware.generatePassphrase(8), {minSamples: 100, maxTime: 15})
  .add('randomatic single item', () => randomatic('*', 40), {minSamples: 100, maxTime: 15})
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log('Benchmark completed');
  })
  .run({async: true, minSamples: 500, name: 'Generate-Passphrase Benchmark'});
