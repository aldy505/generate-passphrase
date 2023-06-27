import * as assert from 'node:assert/strict';
import {suite} from 'uvu';
import {generateMultiple} from '../src/index';

const multiple = suite('generate multiple passphrase');

multiple('should generate 5 multiple passphrase without options', () => {
  const generated = generateMultiple(5);
  assert.equal(typeof generated, 'object');
  assert.equal(generated.length, 5);
});

multiple('should generate 25 multiple passphrase without options', () => {
  const generated = generateMultiple(25);
  assert.equal(typeof generated, 'object');
  assert.equal(generated.length, 25);
});

multiple('should generate 50 multiple passphrase without options', () => {
  const generated = generateMultiple(50);
  assert.equal(typeof generated, 'object');
  assert.equal(generated.length, 50);
});

multiple.run();

const options = suite('with options');

options('should generate multiple passphrase with size length', () => {
  const generated = generateMultiple(5, {length: 10});
  for (const element of generated) {
    const split = element.split('-');
    assert.equal(typeof element, 'string');
    assert.equal(split.length, 10);
  }
});

options('should generate multiple all word pattern with numbers: false', () => {
  const generated = generateMultiple(5, {numbers: false});
  for (const element of generated) {
    const split = element.split('-');
    for (const element of split) {
      assert.match(element, /[a-zA-Z]/g);
    }
  }
});

options.run();
