import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {generate, generateMultiple} from '../src/index';

const fast = suite('should be fast! - single');

fast('generate single passphrase - normal', () => {
  const generated = generate({fast: true});
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 4);
});

fast('generate single passphrase - with options', () => {
  const generated = generate({length: 20, fast: true, numbers: true});
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 20);
});

fast.run();

const mfast = suite('should be fast! - multiple');

mfast('generate multiple passphrase - normal', () => {
  const generated = generateMultiple(20, {fast: true});
  assert.type(generated, 'object');
  assert.is(generated.length, 20);
});

mfast('generate multiple passphrase - with options', () => {
  const generated = generateMultiple(20, {length: 20, fast: true, numbers: true});
  assert.type(generated, 'object');
  assert.is(generated.length, 20);
});

mfast.run();
