import * as assert from 'node:assert/strict';
import {suite} from 'uvu';
import {generate} from '../src/index';

const single = suite('generate single passphrase');

single('should generate a passphrase without options', () => {
  const generated = generate();
  assert.equal(typeof generated, 'string');
  assert.equal(generated.split('-').length, 4);
});

single.run();

const options = suite('with options');

options('should generate a passphrase with size length', () => {
  const generated = generate({length: 10});
  assert.equal(typeof generated, 'string');
  assert.equal(generated.split('-').length, 10);
});

options('should generate all word pattern with numbers: false', () => {
  const generated = generate({numbers: false}).split('-');
  for (const element of generated) {
    assert.match(element, /[a-zA-Z]/g);
  }
});

options('should generate all word pattern with pattern: WWWWW', () => {
  const generated = generate({pattern: 'WWWWW'}).split('-');
  assert.equal(generated.length, 5);
  for (const element of generated) {
    assert.match(element, /[a-zA-Z]/g);
  }
});

options('should generate all number pattern with pattern: NNNNN', () => {
  const generated = generate({pattern: 'NNNNN'}).split('-');
  assert.equal(generated.length, 5);
  for (const element of generated) {
    assert.match(element, /\d/g);
  }
});

options('should works if pattern equal undefined', () => {
  const generated = generate({pattern: undefined});
  assert.equal(typeof generated, 'string');
  assert.equal(generated.split('-').length, 4);
});

options('should generate all uppercase word pattern', () => {
  const generated = generate({numbers: false, uppercase: true}).split('-');
  for (const element of generated) {
    assert.match(element, /[A-Z]/g);
  }
});

options('should generate all titlecase word pattern', () => {
  const generated = generate({numbers: false, titlecase: true}).split('-');
  for (const element of generated) {
    const perWord = [...element];
    assert.match(perWord[0], /[A-Z]/g);
    assert.match(perWord[1], /[a-z]/g);
    assert.match(perWord[2], /[a-z]/g);
  }
});

options('should have different separator', () => {
  const generated = generate({separator: '_'});
  assert.ok(generated.includes('_'));
});

options('should use pattern if length equal also provided', () => {
  const generated = generate({length: 10, pattern: 'WWNWWW'}).split('-');
  assert.equal(generated.length, 6);
});

options('should still be uppercase if titlecase equal also true', () => {
  const generated = generate({uppercase: true, titlecase: true, numbers: false}).split('-');
  for (const element of generated) {
    assert.match(element, /[A-Z]/g);
  }
});

options('should have all uppercase words and numbers', () => {
  const generated = generate({
    pattern: 'WWWNWWNWWN', uppercase: true, titlecase: true, numbers: true,
  }).split('-');
  for (const element of generated) {
    assert.match(element, /[\dA-Z]/g);
  }
});

options('should have all titlecase words and numbers', () => {
  const generated = generate({pattern: 'WWWNWWNWWN', titlecase: true, numbers: true}).split('-');
  for (const element of generated) {
    const perWord = [...element];
    assert.match(perWord[0], /[\dA-Z]/g);
    assert.match(perWord[1], /[\da-z]/g);
  }
});

options.run();

const errors = suite('should output error');

errors('should output error for unknown pattern', () => {
  assert.throws(() => generate({pattern: 'AAA'}), new Error('Unknown pattern found. Use N or W instead.'));
});
errors('should output error for length = 0', () => {
  assert.throws(() => generate({length: 0}), new Error('Length should be 1 or bigger. It should not be zero or lower.'));
});

errors.run();
