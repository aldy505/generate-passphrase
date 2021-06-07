import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {generate} from '../src/index';

const single = suite('generate single passphrase');

single('should generate a passphrase without options', () => {
  const generated = generate();
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 4);
});

single.run();

const opts = suite('with options');

opts('should generate a passphrase with size length', () => {
  const generated = generate({length: 10});
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 10);
});

opts('should generate all word pattern with numbers: false', () => {
  const generated = generate({numbers: false}).split('-');
  for (let i = 0; i < generated.length; i += 1) {
    assert.match(generated[i], /[a-zA-Z]/g);
  }
});

opts('should generate all word pattern with pattern: WWWWW', () => {
  const generated = generate({pattern: 'WWWWW'}).split('-');
  assert.is(generated.length, 5);
  for (let i = 0; i < generated.length; i += 1) {
    assert.match(generated[i], /[a-zA-Z]/g);
  }
});

opts('should generate all number pattern with pattern: NNNNN', () => {
  const generated = generate({pattern: 'NNNNN'}).split('-');
  assert.is(generated.length, 5);
  for (let i = 0; i < generated.length; i += 1) {
    assert.match(generated[i], /[0-9]/g);
  }
});

opts('should works if pattern is undefined', () => {
  const generated = generate({pattern: undefined});
  assert.type(generated, 'string');
  assert.is(generated.split('-').length, 4);
});

opts('should generate all uppercase word pattern', () => {
  const generated = generate({numbers: false, uppercase: true}).split('-');
  for (let i = 0; i < generated.length; i += 1) {
    assert.match(generated[i], /[A-Z]/g);
  }
});

opts('should generate all titlecase word pattern', () => {
  const generated = generate({numbers: false, titlecase: true}).split('-');
  for (let i = 0; i < generated.length; i += 1) {
    const perWord = generated[i].split('');
    assert.match(perWord[0], /[A-Z]/g);
    assert.match(perWord[1], /[a-z]/g);
    assert.match(perWord[2], /[a-z]/g);
  }
});

opts('should have different separator', () => {
  const generated = generate({separator: '_'});
  assert.ok(generated.includes('_'));
});

opts('should use pattern if length is also provided', () => {
  const generated = generate({length: 10, pattern: 'WWNWWW'}).split('-');
  assert.is(generated.length, 6);
});

opts('should still be uppercase if titlecase is also true', () => {
  const generated = generate({uppercase: true, titlecase: true, numbers: false}).split('-');
  for (let i = 0; i < generated.length; i += 1) {
    assert.match(generated[i], /[A-Z]/g);
  }
});

opts('should have all uppercase words and numbers', () => {
  const generated = generate({
    pattern: 'WWWNWWNWWN', uppercase: true, titlecase: true, numbers: true
  }).split('-');
  for (let i = 0; i < generated.length; i += 1) {
    assert.match(generated[i], /[0-9A-Z]/g);
  }
});

opts('should have all titlecase words and numbers', () => {
  const generated = generate({pattern: 'WWWNWWNWWN', titlecase: true, numbers: true}).split('-');
  for (let i = 0; i < generated.length; i += 1) {
    const perWord = generated[i].split('');
    assert.match(perWord[0], /[0-9A-Z]/g);
    assert.match(perWord[1], /[0-9a-z]/g);
  }
});

opts.run();

const errors = suite('should output error');

errors('should output error for unknown pattern', () => {
  assert.throws(() => generate({pattern: 'AAA'}), 'Unknown pattern found. Use N or W instead.');
});
errors('should output error for length = 0', () => {
  assert.throws(() => generate({length: 0}), 'Length should be 1 or bigger. It should not be zero or lower.');
});

errors.run();
