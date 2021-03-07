import { assert, expect } from 'chai';
import { describe, it } from 'mocha';
import { generate, generateMultiple } from '../src/index';

describe('generate-passphrase', () => {
  it('should generate a passphrase without options', () => {
    const generated = generate();
    assert.isString(generated);
    expect(generated.split('-').length).to.be.equal(4);
  });
  it('should generate multiple passphrase without options', () => {
    const generated = generateMultiple(5);
    assert.isArray(generated);
    expect(generated.length).to.be.equal(5);
  });
  it('should generate a passphrase with size length', () => {
    const generated = generate({ length: 10 });
    assert.isString(generated);
    expect(generated.split('-').length).to.be.equal(10);
  });
  it('should generate all word pattern with numbers: false', () => {
    const generated = generate({ numbers: false }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[a-zA-Z]/g);
    }
  });
  it('should generate all word pattern with pattern: WWWWW', () => {
    const generated = generate({ pattern: 'WWWWW' }).split('-');
    expect(generated.length).to.be.equal(5);
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[a-zA-Z]/g);
    }
  });
  it('should generate all number pattern with pattern: NNNNN', () => {
    const generated = generate({ pattern: 'NNNNN' }).split('-');
    expect(generated.length).to.be.equal(5);
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[0-9]/g);
    }
  });
  it('should generate all uppercase word pattern', () => {
    const generated = generate({ numbers: false, uppercase: true }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      expect(generated[i]).to.match(/[A-Z]/g);
    }
  });
  it('should generate all titlecase word pattern', () => {
    const generated = generate({ numbers: false, titlecase: true }).split('-');
    for (let i = 0; i < generated.length; i += 1) {
      const perWord = generated[i].split('');
      expect(perWord[0]).to.match(/[A-Z]/g);
      expect(perWord[1]).to.match(/[a-z]/g);
      expect(perWord[2]).to.match(/[a-z]/g);
    }
  });
  it('should have different separator', () => {
    const generated = generate({ separator: '_' });
    expect(generated).to.include('_');
  });
});
