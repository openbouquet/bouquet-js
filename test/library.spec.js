/*global describe, it, before */

import chai from 'chai';
import Library from '../dist/bouquet.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my library',  () => {
  before(() => {
    lib = new Bouquet();
  });
  describe('when requesting token', () => {
    it('should return a promise', () => {
      expect(lib.requestToken()).to.be.equal(null);
    });
  });
});
