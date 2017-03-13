/*global describe, it, before */

import chai from 'chai';
import Library from '../dist/bouquet.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my library',  () => {
  before(() => {
    lib = new Bouquet({
        url : '//demo.openbouquet.io/release/v4.2',
        clientId : 'api-key-client',
        apiKey : 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhcGkta2V5LWNsaWVudCIsInN1YiI6IjU4YWM1Y2FiMTVhYmNjMTJiYjUwYTU0MCIsInVzZXJFbWFpbCI6ImRlbW9AbG9jYWxob3N0LmNvbSIsImN1c3RvbWVySWQiOiI1OGFjNTNjMDE1YWJjYzEyYmI1MGE0NWIiLCJqdGkiOiJnTmF3dHdiZzRaYXRtQ1JXVVRQYnFnIiwiZXhwIjo0NjQxNTM0NTE5LCJpYXQiOjE0ODc5MzQ1MTksIm5iZiI6MTQ4NzkzNDM5OX0.g5f1DHxESj9PvC5meP8UKXmcZzbGZIiW-qwZ7mNAZWTlMlaAdIn1EBOZzB9oAwHzQxS0qez0iRDac874YCmnHrwYI8kgVoJQvbbJedKIJjfP_V_ZPvMiAfsX0wqeCmqG4_uXZoAh_sumvyDkKGfzutAfpR3DCVkWTqfYZ-iornkyYwH89Yqe_yBNQPO4pXpf3Dg68BlruZqc-tiow3ytynyxuEYEOPYIuyRL-fLpjNstRGa_gXIQYBx9v1yVGlZsQFVviJ5PMbCgIduM36g5leA_IXprw46KxjH_snbnEvAHypZCwhNaJJxlLGBEWTMnFKqytR68CGURskRM2D0VPQ'
    });
  });
  describe('when requesting token', () => {
    it('should return a promise', () => {
      expect(lib.request("/analytics/@'5899bc6715abcc6bed69d766'.@bookmark:'58a5dc6b45d778b2bdb231c9'/query?envelope=ALL&data=TABLE")).to.be.equal(null);
    });
  });
});
