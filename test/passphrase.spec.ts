/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import { generate, generateMultiple } from '../src/index';

describe('generate-passphrase', function () {
  it('should generate a passphrase without options', function () {
    const generated = generate();
    assert.isString(generated);
    expect(generated.split('-').length).to.be.equal(4);
  });
  it('should generate 5 multiple passphrase without options', function () {
    const generated = generateMultiple(5);
    assert.isArray(generated);
    expect(generated.length).to.be.equal(5);
  });
  it('should generate 25 multiple passphrase without options', function () {
    this.timeout(10000);
    const generated = generateMultiple(25);
    assert.isArray(generated);
    expect(generated.length).to.be.equal(25);
  });
  it('should generate 50 multiple passphrase without options', function () {
    this.timeout(10000);
    const generated = generateMultiple(50);
    assert.isArray(generated);
    expect(generated.length).to.be.equal(50);
  });
  it('should generate a passphrase with size length', function () {
    const generated = generate({ length: 10 });
    assert.isString(generated);
    expect(generated.split('-').length).to.be.equal(10);
  });
  it('should generate all word pattern with numbers: false', function () {
    const generated = generate({ numbers: false }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[a-zA-Z]/g);
    }
  });
  it('should output error for unknown pattern', function () {
    expect(() => generate({ pattern: 'AAA' })).to.throw('Unknown pattern found. Use N or W instead.');
  });
  it('should output error for length = 0', function () {
    expect(() => generate({ length: 0 })).to.throw('Length should be 1 or bigger. It should not be zero.');
  });
  it('should generate all word pattern with pattern: WWWWW', function () {
    const generated = generate({ pattern: 'WWWWW' }).split('-');
    expect(generated.length).to.be.equal(5);
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[a-zA-Z]/g);
    }
  });
  it('should generate all number pattern with pattern: NNNNN', function () {
    const generated = generate({ pattern: 'NNNNN' }).split('-');
    expect(generated.length).to.be.equal(5);
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[0-9]/g);
    }
  });
  it('should works if pattern is undefined', function () {
    const generated = generate({ pattern: undefined });
    assert.isString(generated);
    expect(generated.split('-').length).to.be.equal(4);
  });
  it('should generate all uppercase word pattern', function () {
    const generated = generate({ numbers: false, uppercase: true }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[A-Z]/g);
    }
  });
  it('should generate all titlecase word pattern', function () {
    const generated = generate({ numbers: false, titlecase: true }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      const perWord = generated[i].split('');
      expect(perWord[0]).to.match(/[A-Z]/g);
      expect(perWord[1]).to.match(/[a-z]/g);
      expect(perWord[2]).to.match(/[a-z]/g);
    }
  });
  it('should have different separator', function () {
    const generated = generate({ separator: '_' });
    expect(generated).to.include('_');
  });
  it('should use pattern if length is also provided', function () {
    const generated = generate({ length: 10, pattern: 'WWNWWW' }).split('-');
    expect(generated.length).to.be.equal(6);
  });
  it('should still be uppercase if titlecase is also true', function () {
    const generated = generate({ uppercase: true, titlecase: true, numbers: false }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[A-Z]/g);
    }
  });
  it('should have all uppercase words and numbers', function () {
    const generated = generate({
      pattern: 'WWWNWWNWWN', uppercase: true, titlecase: true, numbers: true,
    }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[0-9A-Z]/g);
    }
  });
  it('should have all titlecase words and numbers', function () {
    const generated = generate({ pattern: 'WWWNWWNWWN', titlecase: true, numbers: true }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      const perWord = generated[i].split('');
      expect(perWord[0]).to.match(/[0-9A-Z]/g);
      expect(perWord[1]).to.match(/[0-9a-z]/g);
    }
  });
});
