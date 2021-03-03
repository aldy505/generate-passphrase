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
});
