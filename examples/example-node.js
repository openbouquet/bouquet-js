#!/usr/bin/env node

const Bouquet = require('../src/index.js');

   var bouquet = new Bouquet({
       url : 'http://demo.openbouquet.io/release/v4.2',
       clientId : 'api-key-client',
       apiKey : 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhcGkta2V5LWNsaWVudCIsInN1YiI6IjU4YWM1Y2FiMTVhYmNjMTJiYjUwYTU0MCIsInVzZXJFbWFpbCI6ImRlbW9AbG9jYWxob3N0LmNvbSIsImN1c3RvbWVySWQiOiI1OGFjNTNjMDE1YWJjYzEyYmI1MGE0NWIiLCJqdGkiOiJnTmF3dHdiZzRaYXRtQ1JXVVRQYnFnIiwiZXhwIjo0NjQxNTM0NTE5LCJpYXQiOjE0ODc5MzQ1MTksIm5iZiI6MTQ4NzkzNDM5OX0.g5f1DHxESj9PvC5meP8UKXmcZzbGZIiW-qwZ7mNAZWTlMlaAdIn1EBOZzB9oAwHzQxS0qez0iRDac874YCmnHrwYI8kgVoJQvbbJedKIJjfP_V_ZPvMiAfsX0wqeCmqG4_uXZoAh_sumvyDkKGfzutAfpR3DCVkWTqfYZ-iornkyYwH89Yqe_yBNQPO4pXpf3Dg68BlruZqc-tiow3ytynyxuEYEOPYIuyRL-fLpjNstRGa_gXIQYBx9v1yVGlZsQFVviJ5PMbCgIduM36g5leA_IXprw46KxjH_snbnEvAHypZCwhNaJJxlLGBEWTMnFKqytR68CGURskRM2D0VPQ'
   });
   bouquet.request("/analytics/@'5899bc6715abcc6bed69d766'.@bookmark:'58a5dc6b45d778b2bdb231c9'/query?envelope=ALL&data=TABLE")
   .then(function(res) {
       console.log(res.result);
   })
   .catch(function(err) {
       console.log(err);
   });