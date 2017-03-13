# Bouquet Javascript library

Universal Javascript library to use Bouquet API
Exports in a [umd](https://github.com/umdjs/umd) format it works either in the browser or node.js

## Usage

### Using the bouquet.js in an html page

```html
<script src='../dist/bouquet.min.js'></script>

<script>
   var bouquet = new Bouquet({
       url : 'your-bouquet-url',
       clientId : 'your-bouquet-client-id',
       apiKey : 'your-api-key'
   });
   bouquet.request("your-bouquet-query")
   .then(function(response) {
       // do
   })
   .catch(function(error) {
       // error occurred
   });
</script>
```

See /examples directory for more examples

## Scripts

* `npm run build` - produces production (minified) version the `dist` folder
* `npm run dev` - produces development version and runs a watcher
* `npm run test` - runs the tests
* `npm run test:watch` - runs the tests in a watch mode
