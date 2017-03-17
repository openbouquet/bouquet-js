# Bouquet-js first tutorial

This short tutorial aims at showing the basics of using the bouquet-js library.  
This small js app will authenticate to Bouquet API using a public "guest" access and run a query defined by a Bouquet Bookmark.  

## Include bouquet.js

Bouquet-js is a Universal Javascript Library meaning that it can be used either from a Browser or from NodeJS.

Including as an HTML script
```html
<script src="//rawgit.com/openbouquet/bouquet-js/master/dist/bouquet.min.js"></script>
```

Including as a [NPM library](https://www.npmjs.com/package/bouquet-js)
```sh
npm install bouquet-js
```

## Authenticate

### Using an API key

API Key is a simple way of providing a guest access to your data - see tutorial on [how to generate an API Key](https://docs.openbouquet.io/docs/generate-api-key)

Create a new Bouquet client instance passing an ApiKey
```js
   var bouquet = new Bouquet({
       url : '<YOUR-BOUQUET-API-URL>',
       clientId : '<YOUR-CLIENT-ID>',
       apiKey : '<YOUR-API-KEY>'
   });
```

Then run an API request and get the results.
Here for example we'll get the the current logged User

For all method calls you can get the result either via a Promise
```js
   bouquet.request("/rs/user")
   .then( function(user) {
       // display user
   }).catch(function(err) {
       // handle error
   });
```
or a Callback
```js
   bouquet.request("/rs/user", function(error, user) {
        // display user or handle any error
   });
```

## Run a query given a Bouquet Bookmark

Let's say we have a Bouquet Bookmark with the following id : `@'5899bc6715abcc6bed69d766'.@bookmark:'58a5dc6b45d778b2bdb231c9'`

To get the results of the underlying analysis, we just have to call the `/analytics` endpoint.

### Method #1 using a single query string
```js
var bookmarkId = "@'5899bc6715abcc6bed69d766'.@bookmark:'58a5dc6b45d778b2bdb231c9'";

bouquet.request("/analytics/" + bookmarkId + "/query?limit=1000")
.then(function(data) {
    // display data
})
.catch(function(err) {
    // handle error
});
```

### Method #2 using a query object
```js
var bookmarkId = "/analytics/@'5899bc6715abcc6bed69d766'.@bookmark:'58a5dc6b45d778b2bdb231c9'";

var query = {
   path : "/analytics/" + bookmarkId + "/query",
   data : {
       limit: 1000
   }
};
   
bouquet.request(query)
.then(function(data) {
    // display data
})
.catch(function(err) {
    // handle error
});
```

To build more complex queries using date-ranges, filters, rollups... please refer to the [API Query reference](https://docs.openbouquet.io/docs/query-a-bookmark-or-a-domain)

This tutorial is also [available as a JSFiddle](https://jsfiddle.net/openbouquet/ava6o25q/)

Enjoy
