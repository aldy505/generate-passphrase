import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {generateMultiple} from '../src/index';

const multiple = suite('generate multiple passphrase');

multiple('should generate 5 multiple passphrase without options', () => {
  const generated = generateMultiple(5);
  assert.type(generated, 'object');
  assert.is(generated.length, 5);
});

multiple('should generate 25 multiple passphrase without options', () => {
  const generated = generateMultiple(25);
  assert.type(generated, 'object');
  assert.is(generated.length, 25);
});

multiple('should generate 50 multiple passphrase without options', () => {
  const generated = generateMultiple(50);
  assert.type(generated, 'object');
  assert.is(generated.length, 50);
});

multiple.run();

const opts = suite('with options');

opts('should generate multiple passphrase with size length', () => {
  const generated = generateMultiple(5, {length: 10});
  for (let i = 0; i < generated.length; i += 1) {
    const split = generated[i].split('-');
    assert.type(generated[i], 'string');
    assert.is(split.length, 10);
  }
});

opts('should generate multiple all word pattern with numbers: false', () => {
  const generated = generateMultiple(5, {numbers: false});
  for (let i = 0; i < generated.length; i += 1) {
    const split = generated[i].split('-');
    for (let j = 0; j < split.length; j += 1) {
      assert.match(split[j], /[a-zA-Z]/g);
    }
  }
});

opts.run();
