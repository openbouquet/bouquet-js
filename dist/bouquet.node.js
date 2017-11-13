(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("util"), require("stream"), require("url"), require("fs"), require("http"), require("path"), require("https"), require("zlib"), require("net"), require("string_decoder"), require("tty"));
	else if(typeof define === 'function' && define.amd)
		define("Bouquet", ["util", "stream", "url", "fs", "http", "path", "https", "zlib", "net", "string_decoder", "tty"], factory);
	else if(typeof exports === 'object')
		exports["Bouquet"] = factory(require("util"), require("stream"), require("url"), require("fs"), require("http"), require("path"), require("https"), require("zlib"), require("net"), require("string_decoder"), require("tty"));
	else
		root["Bouquet"] = factory(root["util"], root["stream"], root["url"], root["fs"], root["http"], root["path"], root["https"], root["zlib"], root["net"], root["string_decoder"], root["tty"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_67__, __WEBPACK_EXTERNAL_MODULE_68__, __WEBPACK_EXTERNAL_MODULE_69__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(36)('superagent');
var formidable = __webpack_require__(44);
var FormData = __webpack_require__(40);
var Response = __webpack_require__(60);
var parse = __webpack_require__(2).parse;
var format = __webpack_require__(2).format;
var resolve = __webpack_require__(2).resolve;
var methods = __webpack_require__(15);
var Stream = __webpack_require__(1);
var utils = __webpack_require__(20);
var unzip = __webpack_require__(61).unzip;
var extend = __webpack_require__(39);
var mime = __webpack_require__(48);
var https = __webpack_require__(24);
var http = __webpack_require__(4);
var fs = __webpack_require__(3);
var qs = __webpack_require__(17);
var zlib = __webpack_require__(25);
var util = __webpack_require__(0);
var pkg = __webpack_require__(65);
var RequestBase = __webpack_require__(62);
var isFunction = __webpack_require__(53);
var shouldRetry = __webpack_require__(64);

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

/**
 * Expose `Request`.
 */

exports.Request = Request;

/**
 * Expose the agent function
 */

exports.agent = __webpack_require__(54);

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `Response`.
 */

exports.Response = Response;

/**
 * Define "form" mime type.
 */

mime.define({
  'application/x-www-form-urlencoded': ['form', 'urlencoded', 'form-data']
});

/**
 * Protocol map.
 */

exports.protocols = {
  'http:': http,
  'https:': https
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

exports.serialize = {
  'application/x-www-form-urlencoded': qs.stringify,
  'application/json': JSON.stringify
};

/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(res, fn){
 *       fn(null, res);
 *     };
 *
 */

exports.parse = __webpack_require__(56);

/**
 * Initialize internal header tracking properties on a request instance.
 *
 * @param {Object} req the instance
 * @api private
 */
function _initHeaders(req) {
  var ua = 'node-superagent/' + pkg.version;
  req._header = { // coerces header names to lowercase
    'user-agent': ua
  };
  req.header = { // preserves header name case
    'User-Agent': ua
  };
}

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String|Object} url
 * @api public
 */

function Request(method, url) {
  Stream.call(this);
  if ('string' != typeof url) url = format(url);
  this._agent = false;
  this._formData = null;
  this.method = method;
  this.url = url;
  _initHeaders(this);
  this.writable = true;
  this._redirects = 0;
  this.redirects(method === 'HEAD' ? 0 : 5);
  this.cookies = '';
  this.qs = {};
  this.qsRaw = [];
  this._redirectList = [];
  this._streamRequest = false;
  this.once('end', this.clearTimeout.bind(this));
}

/**
 * Inherit from `Stream` (which inherits from `EventEmitter`).
 * Mixin `RequestBase`.
 */
util.inherits(Request, Stream);
RequestBase(Request.prototype);

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('http://localhost/upload')
 *   .attach(new Buffer('<b>Hello world</b>'), 'hello.html')
 *   .end(callback);
 * ```
 *
 * A filename may also be used:
 *
 * ``` js
 * request.post('http://localhost/upload')
 *   .attach('files', 'image.jpg')
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {String|fs.ReadStream|Buffer} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    var o = options || {};
    if ('string' == typeof options) {
      o = { filename: options };
    }

    if ('string' == typeof file) {
      if (!o.filename) o.filename = file;
      debug('creating `fs.ReadStream` instance for file: %s', file);
      file = fs.createReadStream(file);
    } else if (!o.filename && file.path) {
      o.filename = file.path;
    }

    this._getFormData().append(field, file, o);
  }
  return this;
};

Request.prototype._getFormData = function() {
  if (!this._formData) {
    this._formData = new FormData();
    var that = this;
    this._formData.on('error', function(err) {
      that.emit('error', err);
      that.abort();
    });
  }
  return this._formData;
};

/**
 * Gets/sets the `Agent` to use for this HTTP request. The default (if this
 * function is not called) is to opt out of connection pooling (`agent: false`).
 *
 * @param {http.Agent} agent
 * @return {http.Agent}
 * @api public
 */

Request.prototype.agent = function(agent){
  if (!arguments.length) return this._agent;
  this._agent = agent;
  return this;
};

/**
 * Set _Content-Type_ response header passed through `mime.lookup()`.
 *
 * Examples:
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('json')
 *        .send(jsonstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/json')
 *        .send(jsonstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  return this.set('Content-Type', ~type.indexOf('/')
    ? type
    : mime.lookup(type));
};

/**
 * Set _Accept_ response header passed through `mime.lookup()`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  return this.set('Accept', ~type.indexOf('/')
    ? type
    : mime.lookup(type));
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' == typeof val) {
    this.qsRaw.push(val);
    return this;
  }

  extend(this.qs, val);
  return this;
};

/**
 * Write raw `data` / `encoding` to the socket.
 *
 * @param {Buffer|String} data
 * @param {String} encoding
 * @return {Boolean}
 * @api public
 */

Request.prototype.write = function(data, encoding){
  var req = this.request();
  if (!this._streamRequest) {
    this._streamRequest = true;
  }
  return req.write(data, encoding);
};

/**
 * Pipe the request body to `stream`.
 *
 * @param {Stream} stream
 * @param {Object} options
 * @return {Stream}
 * @api public
 */

Request.prototype.pipe = function(stream, options){
  this.piped = true; // HACK...
  this.buffer(false);
  this.end();
  return this._pipeContinue(stream, options);
};

Request.prototype._pipeContinue = function(stream, options){
  var self = this;
  this.req.once('response', function(res){
    // redirect
    var redirect = isRedirect(res.statusCode);
    if (redirect && self._redirects++ != self._maxRedirects) {
      return self._redirect(res)._pipeContinue(stream, options);
    }

    self.res = res;
    self._emitResponse();
    if (self._aborted) return;

    if (self._shouldUnzip(res)) {
      res.pipe(zlib.createUnzip()).pipe(stream, options);
    } else {
      res.pipe(stream, options);
    }
    res.once('end', function(){
      self.emit('end');
    });
  });
  return stream;
};

/**
 * Enable / disable buffering.
 *
 * @return {Boolean} [val]
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.buffer = function(val){
  this._buffer = (false !== val);
  return this;
};

/**
 * Redirect to `url
 *
 * @param {IncomingMessage} res
 * @return {Request} for chaining
 * @api private
 */

Request.prototype._redirect = function(res){
  var url = res.headers.location;
  if (!url) {
    return this.callback(new Error('No location header for redirect'), res);
  }

  debug('redirect %s -> %s', this.url, url);

  // location
  url = resolve(this.url, url);

  // ensure the response is being consumed
  // this is required for Node v0.10+
  res.resume();

  var headers = this.req._headers;

  var shouldStripCookie = parse(url).host !== parse(this.url).host;

  // implementation of 302 following defacto standard
  if (res.statusCode == 301 || res.statusCode == 302){
    // strip Content-* related fields
    // in case of POST etc
    headers = utils.cleanHeader(this.req._headers, shouldStripCookie);

    // force GET
    this.method = 'HEAD' == this.method
      ? 'HEAD'
      : 'GET';

    // clear data
    this._data = null;
  }
  // 303 is always GET
  if (res.statusCode == 303) {
    // strip Content-* related fields
    // in case of POST etc
    headers = utils.cleanHeader(this.req._headers, shouldStripCookie);

    // force method
    this.method = 'GET';

    // clear data
    this._data = null;
  }
  // 307 preserves method
  // 308 preserves method
  delete headers.host;

  delete this.req;
  delete this._formData;

  // remove all add header except User-Agent
  _initHeaders(this)

  // redirect
  this._endCalled = false;
  this.url = url;
  this.qs = {};
  this.qsRaw = [];
  this.set(headers);
  this.emit('redirect', res);
  this._redirectList.push(this.url);
  this.end(this._callback);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * Examples:
 *
 *   .auth('tobi', 'learnboost')
 *   .auth('tobi:learnboost')
 *   .auth('tobi')
 *   .auth(accessToken, { type: 'bearer' })
 *
 * @param {String} user
 * @param {String} [pass]
 * @param {Object} [options] options with authorization type 'basic' or 'bearer' ('basic' is default)
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (2 === arguments.length && typeof pass === 'object') options = pass;
  if (!options) {
    options = { type: 'basic' };
  }
  switch (options.type) {
    case 'bearer':
      return this.set('Authorization', 'Bearer ' + user);    
      
    default: // 'basic'
      if (!~user.indexOf(':')) user = user + ':';
      var str = new Buffer(user + pass).toString('base64');
      return this.set('Authorization', 'Basic ' + str);    
  }
};

/**
 * Set the certificate authority option for https request.
 *
 * @param {Buffer | Array} cert
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.ca = function(cert){
  this._ca = cert;
  return this;
};

/**
 * Set the client certificate key option for https request.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.key = function(cert){
  this._key = cert;
  return this;
};

/**
 * Set the key, certificate, and CA certs of the client in PFX or PKCS12 format.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.pfx = function(cert){
  this._pfx = cert;
  return this;
};

/**
 * Set the client certificate option for https request.
 *
 * @param {Buffer | String} cert
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.cert = function(cert){
  this._cert = cert;
  return this;
};

/**
 * Return an http[s] request.
 *
 * @return {OutgoingMessage}
 * @api private
 */

Request.prototype.request = function(){
  if (this.req) return this.req;

  var self = this;
  var options = {};
  var url = this.url;
  var retries = this._retries;

  // default to http://
  if (0 != url.indexOf('http')) url = 'http://' + url;
  url = parse(url);

  // support unix sockets
  if (/^https?\+unix:/.test(url.protocol) === true) {
    // get the protocol
    url.protocol = url.protocol.split('+')[0] + ':';

    // get the socket, path
    var unixParts = url.path.match(/^([^/]+)(.+)$/);
    options.socketPath = unixParts[1].replace(/%2F/g, '/');
    url.pathname = unixParts[2];
  }

  // options
  options.method = this.method;
  options.port = url.port;
  options.path = url.pathname;
  options.host = url.hostname;
  options.ca = this._ca;
  options.key = this._key;
  options.pfx = this._pfx;
  options.cert = this._cert;
  options.agent = this._agent;

  // initiate request
  var mod = exports.protocols[url.protocol];

  // request
  var req = this.req = mod.request(options);
  if ('HEAD' != options.method) {
    req.setHeader('Accept-Encoding', 'gzip, deflate');
  }
  this.protocol = url.protocol;
  this.host = url.host;

  // expose events
  req.once('drain', function(){ self.emit('drain'); });

  req.once('error', function(err){
    // flag abortion here for out timeouts
    // because node will emit a faux-error "socket hang up"
    // when request is aborted before a connection is made
    if (self._aborted) return;
    // if not the same, we are in the **old** (cancelled) request,
    // so need to continue (same as for above)
    if (self._retries !== retries) return;
    // if we've received a response then we don't want to let
    // an error in the request blow up the response
    if (self.response) return;
    self.callback(err);
  });

  // auth
  if (url.auth) {
    var auth = url.auth.split(':');
    this.auth(auth[0], auth[1]);
  }

  // query
  if (url.search)
    this.query(url.search.substr(1));

  // add cookies
  if (this.cookies) req.setHeader('Cookie', this.cookies);

  for (var key in this.header) {
    if (this.header.hasOwnProperty(key))
      req.setHeader(key, this.header[key]);
  }

  try {
    this._appendQueryString(req);
  } catch (e) {
    return this.emit('error', e);
  }

  return req;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  // Avoid the error which is emitted from 'socket hang up' to cause the fn undefined error on JS runtime.
  var fn = this._callback || noop;
  this.clearTimeout();
  if (this.called) return console.warn('superagent: double callback bug');
  this.called = true;

  if (!err) {
    if (this._isResponseOK(res)) {
      return fn(err, res);
    }

    var msg = 'Unsuccessful HTTP response';
    if (res) {
      msg = http.STATUS_CODES[res.status] || msg;
    }
    err = new Error(msg);
    err.status = res ? res.status : undefined;
  }

  err.response = res;
  if (this._maxRetries) err.retries = this._retries - 1;

  // only emit error event if there is a listener
  // otherwise we assume the callback to `.end()` will get the error
  if (err && this.listeners('error').length > 0) {
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Compose querystring to append to req.path
 *
 * @return {String} querystring
 * @api private
 */

Request.prototype._appendQueryString = function(req){
  var query = qs.stringify(this.qs, { indices: false, strictNullHandling: true });
  query += ((query.length && this.qsRaw.length) ? '&' : '') + this.qsRaw.join('&');
  req.path += query.length ? (~req.path.indexOf('?') ? '&' : '?') + query : '';

  if (this._sort) {
    var index = req.path.indexOf('?');
    if (index >= 0) {
      var queryArr = req.path.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      req.path = req.path.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  return Buffer.isBuffer(obj) || obj instanceof Stream || obj instanceof FormData;
}

/**
 * Initiate request, invoking callback `fn(err, res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype._emitResponse = function(body, files){
    var response = new Response(this);
    this.response = response;
    response.redirects = this._redirectList;
    if (undefined !== body) {
      response.body = body;
    }
    response.files = files;
    this.emit('response', response);
    return response;
};

Request.prototype.end = function(fn){
  this.request();
  debug('%s %s', this.method, this.url);

  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var data = this._data;
  var req = this.req;
  var buffer = this._buffer;
  var method = this.method;

  this._setTimeouts();

  // body
  if ('HEAD' != method && !req._headerSent) {
    // serialize stuff
    if ('string' != typeof data) {
      var contentType = req.getHeader('Content-Type')
      // Parse out just the content type from the header (ignore the charset)
      if (contentType) contentType = contentType.split(';')[0]
      var serialize = exports.serialize[contentType];
      if (!serialize && isJSON(contentType)) {
        serialize = exports.serialize['application/json'];
      }
      if (serialize) data = serialize(data);
    }

    // content-length
    if (data && !req.getHeader('Content-Length')) {
      req.setHeader('Content-Length', Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data));
    }
  }

  // response
  req.once('response', function(res){
    debug('%s %s -> %s', self.method, self.url, res.statusCode);

    if (self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (self.piped) {
      return;
    }

    var max = self._maxRedirects;
    var mime = utils.type(res.headers['content-type'] || '') || 'text/plain';
    var type = mime.split('/')[0];
    var multipart = 'multipart' == type;
    var redirect = isRedirect(res.statusCode);
    var parser = self._parser;
    var responseType = self._responseType;

    self.res = res;

    // redirect
    if (redirect && self._redirects++ != max) {
      return self._redirect(res);
    }

    if ('HEAD' == self.method) {
      self.emit('end');
      self.callback(null, self._emitResponse());
      return;
    }

    // zlib support
    if (self._shouldUnzip(res)) {
      unzip(req, res);
    }

    if (!parser) {
      if (responseType) {
        parser = exports.parse.image; // It's actually a generic Buffer
        buffer = true;
      } else if (multipart) {
        var form = new formidable.IncomingForm();
        parser = form.parse.bind(form);
        buffer = true;
      } else if (isImageOrVideo(mime)) {
        parser = exports.parse.image;
        buffer = true; // For backwards-compatibility buffering default is ad-hoc MIME-dependent
      } else if (exports.parse[mime]) {
        parser = exports.parse[mime];
      } else if ('text' == type) {
        parser = exports.parse.text;
        buffer = (buffer !== false);

        // everyone wants their own white-labeled json
      } else if (isJSON(mime)) {
        parser = exports.parse['application/json'];
        buffer = (buffer !== false);
      } else if (buffer) {
        parser = exports.parse.text;
      }
    }

    // by default only buffer text/*, json and messed up thing from hell
    if (undefined === buffer && isText(mime) || isJSON(mime)) {
      buffer = true;
    }

    var parserHandlesEnd = false;
    if (parser) {
      try {
        // Unbuffered parsers are supposed to emit response early,
        // which is weird BTW, because response.body won't be there.
        parserHandlesEnd = buffer;

        parser(res, function(err, obj, files) {
          if (self.timedout) {
            // Timeout has already handled all callbacks
            return;
          }

          // Intentional (non-timeout) abort is supposed to preserve partial response,
          // even if it doesn't parse.
          if (err && !self._aborted) {
            return self.callback(err);
          }

          if (parserHandlesEnd) {
            self.emit('end');
            self.callback(null, self._emitResponse(obj, files));
          }
        });
      } catch (err) {
        self.callback(err);
        return;
      }
    }

    self.res = res;

    // unbuffered
    if (!buffer) {
      debug('unbuffered %s %s', self.method, self.url);
      self.callback(null, self._emitResponse());
      if (multipart) return // allow multipart to handle end event
      res.once('end', function(){
        debug('end %s %s', self.method, self.url);
        self.emit('end');
      })
      return;
    }

    // terminating events
    res.once('error', function(err){
      self.callback(err, null);
    });
    if (!parserHandlesEnd) res.once('end', function(){
      debug('end %s %s', self.method, self.url);
      // TODO: unless buffering emit earlier to stream
      self.emit('end');
      self.callback(null, self._emitResponse());
    });
  });

  this.emit('request', this);

  // if a FormData instance got created, then we send that as the request body
  var formData = this._formData;
  if (formData) {

    // set headers
    var headers = formData.getHeaders();
    for (var i in headers) {
      debug('setting FormData header: "%s: %s"', i, headers[i]);
      req.setHeader(i, headers[i]);
    }

    // attempt to get "Content-Length" header
    formData.getLength(function(err, length) {
      // TODO: Add chunked encoding when no length (if err)

      debug('got FormData Content-Length: %s', length);
      if ('number' == typeof length) {
        req.setHeader('Content-Length', length);
      }

      var getProgressMonitor = function () {
        var lengthComputable = true;
        var total = req.getHeader('Content-Length');
        var loaded = 0;

        var progress = new Stream.Transform();
        progress._transform = function (chunk, encoding, cb) {
          loaded += chunk.length;
          self.emit('progress', {
            direction: 'upload',
            lengthComputable: lengthComputable,
            loaded: loaded,
            total: total
          });
          cb(null, chunk);
        };
        return progress;
      };
      formData.pipe(getProgressMonitor()).pipe(req);
    });
  } else {
    req.end(data);
  }

  return this;
};

/**
 * Check whether response has a non-0-sized gzip-encoded body
 */
Request.prototype._shouldUnzip = function(res){
  if (res.statusCode === 204 || res.statusCode === 304) {
    // These aren't supposed to have any body
    return false;
  }

  // header content is a string, and distinction between 0 and no information is crucial
  if ('0' === res.headers['content-length']) {
    // We know that the body is empty (unfortunately, this check does not cover chunked encoding)
    return false;
  }

  // console.log(res);
  return /^\s*(?:deflate|gzip)\s*$/.test(res.headers['content-encoding']);
};

// generate HTTP verb methods
if (methods.indexOf('del') == -1) {
  // create a copy so we don't cause conflicts with
  // other packages using the methods package and
  // npm 3.x
  methods = methods.slice(0);
  methods.push('del');
}
methods.forEach(function(method){
  var name = method;
  method = 'del' == method ? 'delete' : method;

  method = method.toUpperCase();
  request[name] = function(url, data, fn){
    var req = request(method, url);
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.send(data);
    fn && req.end(fn);
    return req;
  };
});

/**
 * Check if `mime` is text and should be buffered.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api public
 */

function isText(mime) {
  var parts = mime.split('/');
  var type = parts[0];
  var subtype = parts[1];

  return 'text' == type
    || 'x-www-form-urlencoded' == subtype;
}

function isImageOrVideo(mime) {
  var type = mime.split('/')[0];

  return 'image' == type || 'video' == type;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Check if we should follow the redirect `code`.
 *
 * @param {Number} code
 * @return {Boolean}
 * @api private
 */

function isRedirect(code) {
  return ~[301, 302, 303, 305, 307, 308].indexOf(code);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// API
module.exports = abort;

/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */
function abort(state)
{
  Object.keys(state.jobs).forEach(clean.bind(state));

  // reset leftover jobs
  state.jobs = {};
}

/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */
function clean(key)
{
  if (typeof this.jobs[key] == 'function')
  {
    this.jobs[key]();
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var defer = __webpack_require__(31);

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback)
{
  var isAsync = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err, result)
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback()
      {
        callback(err, result);
      });
    }
  };
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var async = __webpack_require__(8)
  , abort = __webpack_require__(7)
  ;

// API
module.exports = iterate;

/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */
function iterate(list, iterator, state, callback)
{
  // store current index
  var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

  state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
  {
    // don't repeat yourself
    // skip secondary callbacks
    if (!(key in state.jobs))
    {
      return;
    }

    // clean up jobs
    delete state.jobs[key];

    if (error)
    {
      // don't process rest of the results
      // stop still active jobs
      // and reset the list
      abort(state);
    }
    else
    {
      state.results[key] = output;
    }

    // return salvaged results
    callback(error, state.results);
  });
}

/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */
function runJob(iterator, key, item, callback)
{
  var aborter;

  // allow shortcut if iterator expects only two arguments
  if (iterator.length == 2)
  {
    aborter = iterator(item, async(callback));
  }
  // otherwise go with full three arguments
  else
  {
    aborter = iterator(item, key, async(callback));
  }

  return aborter;
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// API
module.exports = state;

/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */
function state(list, sortMethod)
{
  var isNamedList = !Array.isArray(list)
    , initState =
    {
      index    : 0,
      keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
      jobs     : {},
      results  : isNamedList ? {} : [],
      size     : isNamedList ? Object.keys(list).length : list.length
    }
    ;

  if (sortMethod)
  {
    // sort array keys based on it's values
    // sort object's keys just on own merit
    initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
    {
      return sortMethod(list[a], list[b]);
    });
  }

  return initState;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var abort = __webpack_require__(7)
  , async = __webpack_require__(8)
  ;

// API
module.exports = terminator;

/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */
function terminator(callback)
{
  if (!Object.keys(this.jobs).length)
  {
    return;
  }

  // fast forward iteration index
  this.index = this.size;

  // abort jobs
  abort(this);

  // send back results we have so far
  async(callback)(null, this.results);
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var iterate    = __webpack_require__(9)
  , initState  = __webpack_require__(10)
  , terminator = __webpack_require__(11)
  ;

// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending  = ascending;
module.exports.descending = descending;

/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serialOrdered(list, iterator, sortMethod, callback)
{
  var state = initState(list, sortMethod);

  iterate(list, iterator, state, function iteratorHandler(error, result)
  {
    if (error)
    {
      callback(error, result);
      return;
    }

    state.index++;

    // are we there yet?
    if (state.index < (state['keyedList'] || list).length)
    {
      iterate(list, iterator, state, iteratorHandler);
      return;
    }

    // done here
    callback(null, state.results);
  });

  return terminator.bind(state, callback);
}

/*
 * -- Sort methods
 */

/**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function ascending(a, b)
{
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function descending(a, b)
{
  return -1 * ascending(a, b);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/* jshint node: true */
(function () {
    "use strict";

    function CookieAccessInfo(domain, path, secure, script) {
        if (this instanceof CookieAccessInfo) {
            this.domain = domain || undefined;
            this.path = path || "/";
            this.secure = !!secure;
            this.script = !!script;
            return this;
        }
        return new CookieAccessInfo(domain, path, secure, script);
    }
    CookieAccessInfo.All = Object.freeze(Object.create(null));
    exports.CookieAccessInfo = CookieAccessInfo;

    function Cookie(cookiestr, request_domain, request_path) {
        if (cookiestr instanceof Cookie) {
            return cookiestr;
        }
        if (this instanceof Cookie) {
            this.name = null;
            this.value = null;
            this.expiration_date = Infinity;
            this.path = String(request_path || "/");
            this.explicit_path = false;
            this.domain = request_domain || null;
            this.explicit_domain = false;
            this.secure = false; //how to define default?
            this.noscript = false; //httponly
            if (cookiestr) {
                this.parse(cookiestr, request_domain, request_path);
            }
            return this;
        }
        return new Cookie(cookiestr, request_domain, request_path);
    }
    exports.Cookie = Cookie;

    Cookie.prototype.toString = function toString() {
        var str = [this.name + "=" + this.value];
        if (this.expiration_date !== Infinity) {
            str.push("expires=" + (new Date(this.expiration_date)).toGMTString());
        }
        if (this.domain) {
            str.push("domain=" + this.domain);
        }
        if (this.path) {
            str.push("path=" + this.path);
        }
        if (this.secure) {
            str.push("secure");
        }
        if (this.noscript) {
            str.push("httponly");
        }
        return str.join("; ");
    };

    Cookie.prototype.toValueString = function toValueString() {
        return this.name + "=" + this.value;
    };

    var cookie_str_splitter = /[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g;
    Cookie.prototype.parse = function parse(str, request_domain, request_path) {
        if (this instanceof Cookie) {
            var parts = str.split(";").filter(function (value) {
                    return !!value;
                }),
                pair = parts[0].match(/([^=]+)=([\s\S]*)/),
                key = pair[1],
                value = pair[2],
                i;
            this.name = key;
            this.value = value;

            for (i = 1; i < parts.length; i += 1) {
                pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
                key = pair[1].trim().toLowerCase();
                value = pair[2];
                switch (key) {
                case "httponly":
                    this.noscript = true;
                    break;
                case "expires":
                    this.expiration_date = value ?
                            Number(Date.parse(value)) :
                            Infinity;
                    break;
                case "path":
                    this.path = value ?
                            value.trim() :
                            "";
                    this.explicit_path = true;
                    break;
                case "domain":
                    this.domain = value ?
                            value.trim() :
                            "";
                    this.explicit_domain = !!this.domain;
                    break;
                case "secure":
                    this.secure = true;
                    break;
                }
            }

            if (!this.explicit_path) {
               this.path = request_path || "/";
            }
            if (!this.explicit_domain) {
               this.domain = request_domain;
            }

            return this;
        }
        return new Cookie().parse(str, request_domain, request_path);
    };

    Cookie.prototype.matches = function matches(access_info) {
        if (access_info === CookieAccessInfo.All) {
          return true;
        }
        if (this.noscript && access_info.script ||
                this.secure && !access_info.secure ||
                !this.collidesWith(access_info)) {
            return false;
        }
        return true;
    };

    Cookie.prototype.collidesWith = function collidesWith(access_info) {
        if ((this.path && !access_info.path) || (this.domain && !access_info.domain)) {
            return false;
        }
        if (this.path && access_info.path.indexOf(this.path) !== 0) {
            return false;
        }
        if (this.explicit_path && access_info.path.indexOf( this.path ) !== 0) {
           return false;
        }
        var access_domain = access_info.domain && access_info.domain.replace(/^[\.]/,'');
        var cookie_domain = this.domain && this.domain.replace(/^[\.]/,'');
        if (cookie_domain === access_domain) {
            return true;
        }
        if (cookie_domain) {
            if (!this.explicit_domain) {
                return false; // we already checked if the domains were exactly the same
            }
            var wildcard = access_domain.indexOf(cookie_domain);
            if (wildcard === -1 || wildcard !== access_domain.length - cookie_domain.length) {
                return false;
            }
            return true;
        }
        return true;
    };

    function CookieJar() {
        var cookies, cookies_list, collidable_cookie;
        if (this instanceof CookieJar) {
            cookies = Object.create(null); //name: [Cookie]

            this.setCookie = function setCookie(cookie, request_domain, request_path) {
                var remove, i;
                cookie = new Cookie(cookie, request_domain, request_path);
                //Delete the cookie if the set is past the current time
                remove = cookie.expiration_date <= Date.now();
                if (cookies[cookie.name] !== undefined) {
                    cookies_list = cookies[cookie.name];
                    for (i = 0; i < cookies_list.length; i += 1) {
                        collidable_cookie = cookies_list[i];
                        if (collidable_cookie.collidesWith(cookie)) {
                            if (remove) {
                                cookies_list.splice(i, 1);
                                if (cookies_list.length === 0) {
                                    delete cookies[cookie.name];
                                }
                                return false;
                            }
                            cookies_list[i] = cookie;
                            return cookie;
                        }
                    }
                    if (remove) {
                        return false;
                    }
                    cookies_list.push(cookie);
                    return cookie;
                }
                if (remove) {
                    return false;
                }
                cookies[cookie.name] = [cookie];
                return cookies[cookie.name];
            };
            //returns a cookie
            this.getCookie = function getCookie(cookie_name, access_info) {
                var cookie, i;
                cookies_list = cookies[cookie_name];
                if (!cookies_list) {
                    return;
                }
                for (i = 0; i < cookies_list.length; i += 1) {
                    cookie = cookies_list[i];
                    if (cookie.expiration_date <= Date.now()) {
                        if (cookies_list.length === 0) {
                            delete cookies[cookie.name];
                        }
                        continue;
                    }

                    if (cookie.matches(access_info)) {
                        return cookie;
                    }
                }
            };
            //returns a list of cookies
            this.getCookies = function getCookies(access_info) {
                var matches = [], cookie_name, cookie;
                for (cookie_name in cookies) {
                    cookie = this.getCookie(cookie_name, access_info);
                    if (cookie) {
                        matches.push(cookie);
                    }
                }
                matches.toString = function toString() {
                    return matches.join(":");
                };
                matches.toValueString = function toValueString() {
                    return matches.map(function (c) {
                        return c.toValueString();
                    }).join(';');
                };
                return matches;
            };

            return this;
        }
        return new CookieJar();
    }
    exports.CookieJar = CookieJar;

    //returns list of cookies that were set correctly. Cookies that are expired and removed are not returned.
    CookieJar.prototype.setCookies = function setCookies(cookies, request_domain, request_path) {
        cookies = Array.isArray(cookies) ?
                cookies :
                cookies.split(cookie_str_splitter);
        var successful = [],
            i,
            cookie;
        cookies = cookies.map(function(item){
            return new Cookie(item, request_domain, request_path);
        });
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i];
            if (this.setCookie(cookie, request_domain, request_path)) {
                successful.push(cookie);
            }
        }
        return successful;
    };
}());


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(50);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * methods
 * Copyright(c) 2013-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var http = __webpack_require__(4);

/**
 * Module exports.
 * @public
 */

module.exports = getCurrentNodeMethods() || getBasicNodeMethods();

/**
 * Get the current Node.js methods.
 * @private
 */

function getCurrentNodeMethods() {
  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
    return method.toLowerCase();
  });
}

/**
 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
 * @private
 */

function getBasicNodeMethods() {
  return [
    'get',
    'post',
    'put',
    'head',
    'delete',
    'options',
    'trace',
    'copy',
    'lock',
    'mkcol',
    'move',
    'purge',
    'propfind',
    'proppatch',
    'unlock',
    'report',
    'mkactivity',
    'checkout',
    'merge',
    'm-search',
    'notify',
    'subscribe',
    'unsubscribe',
    'patch',
    'search',
    'connect'
  ];
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(52);
var parse = __webpack_require__(51);
var formats = __webpack_require__(16);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),
/* 20 */
/***/ (function(module, exports) {


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.18.10
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.IPv6 = factory(root);
  }
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }
  
    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.18.10
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.SecondLevelDomains = factory(root);
  }
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0
 */

(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  return typeof x === 'function' || typeof x === 'object' && x !== null;
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (!Array.isArray) {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
} else {
  _isArray = Array.isArray;
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"vertx\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  _resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        _resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      _reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      _reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    _reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return _resolve(promise, value);
    }, function (reason) {
      return _reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$) {
  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$ === GET_THEN_ERROR) {
      _reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$ === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$)) {
      handleForeignThenable(promise, maybeThenable, then$$);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function _resolve(promise, value) {
  if (promise === value) {
    _reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function _reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      _reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      _resolve(promise, value);
    } else if (failed) {
      _reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      _reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      _resolve(promise, value);
    }, function rejectPromise(reason) {
      _reject(promise, reason);
    });
  } catch (e) {
    _reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this._input = input;
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate();
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    _reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
};

Enumerator.prototype._enumerate = function () {
  var length = this.length;
  var _input = this._input;

  for (var i = 0; this._state === PENDING && i < length; i++) {
    this._eachEntry(_input[i], i);
  }
};

Enumerator.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$ = c.resolve;

  if (resolve$$ === resolve) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$) {
        return resolve$$(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$(entry), i);
  }
};

Enumerator.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      _reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  _reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
  }
}

Promise.all = all;
Promise.race = race;
Promise.resolve = resolve;
Promise.reject = reject;
Promise._setScheduler = setScheduler;
Promise._setAsap = setAsap;
Promise._asap = asap;

Promise.prototype = {
  constructor: Promise,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

function polyfill() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise;
}

// Strange compat..
Promise.polyfill = polyfill;
Promise.Promise = Promise;

return Promise;

})));
//# sourceMappingURL=es6-promise.map


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.18.10
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(23), __webpack_require__(21), __webpack_require__(22));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(23), __webpack_require__(21), __webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  URI.version = '1.18.10';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {};
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };
  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    if (v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
      }

      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
    }
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v !== undefined) {
      if (v) {
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');

        if (!v.match(URI.protocol_expression)) {
          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        if (v.match(/[^0-9]/)) {
          throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = {};
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v) {
        URI.ensureValidHostname(v);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      URI.ensureValidHostname(v);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {
	"name": "bouquet-js",
	"version": "1.7.0",
	"description": "Universal Javascript library for Bouquet API",
	"main": "dist/bouquet.js",
	"scripts": {
		"build": "webpack --env build",
		"dev": "webpack --progress --colors --watch --env dev",
		"test": "mocha --compilers js:babel-core/register --colors ./test/*.spec.js",
		"test:watch": "mocha --compilers js:babel-core/register --colors -w ./test/*.spec.js"
	},
	"dependencies": {
		"es6-object-assign": "^1.1.0",
		"es6-promise": "^4.1.0",
		"superagent": "^3.5.2",
		"urijs": "^1.18.9"
	},
	"devDependencies": {
		"babel": "6.5.2",
		"babel-core": "6.22.1",
		"babel-eslint": "7.1.1",
		"babel-loader": "6.2.10",
		"babel-plugin-add-module-exports": "0.1.2",
		"babel-preset-es2015": "6.22.0",
		"chai": "3.4.1",
		"eslint": "1.7.2",
		"eslint-loader": "1.6.1",
		"eslint-config-airbnb": "0.0.8",
		"mocha": "2.3.4",
		"webpack": "2.2.1",
		"yargs": "6.6.0"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/openbouquet/bouquet-js.git"
	},
	"keywords": [
		"webpack",
		"es6",
		"bouquet",
		"library",
		"universal",
		"umd",
		"commonjs"
	],
	"homepage": "https://github.com/openbouquet/"
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
{
  parallel      : __webpack_require__(32),
  serial        : __webpack_require__(33),
  serialOrdered : __webpack_require__(12)
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = defer;

/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */
function defer(fn)
{
  var nextTick = typeof setImmediate == 'function'
    ? setImmediate
    : (
      typeof process == 'object' && typeof process.nextTick == 'function'
      ? process.nextTick
      : null
    );

  if (nextTick)
  {
    nextTick(fn);
  }
  else
  {
    setTimeout(fn, 0);
  }
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var iterate    = __webpack_require__(9)
  , initState  = __webpack_require__(10)
  , terminator = __webpack_require__(11)
  ;

// Public API
module.exports = parallel;

/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function parallel(list, iterator, callback)
{
  var state = initState(list);

  while (state.index < (state['keyedList'] || list).length)
  {
    iterate(list, iterator, state, function(error, result)
    {
      if (error)
      {
        callback(error, result);
        return;
      }

      // looks like it's the last one
      if (Object.keys(state.jobs).length === 0)
      {
        callback(null, state.results);
        return;
      }
    });

    state.index++;
  }

  return terminator.bind(state, callback);
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var serialOrdered = __webpack_require__(12);

// Public API
module.exports = serial;

/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serial(list, iterator, callback)
{
  return serialOrdered(list, iterator, null, callback);
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);
var Stream = __webpack_require__(1).Stream;
var DelayedStream = __webpack_require__(38);

module.exports = CombinedStream;
function CombinedStream() {
  this.writable = false;
  this.readable = true;
  this.dataSize = 0;
  this.maxDataSize = 2 * 1024 * 1024;
  this.pauseStreams = true;

  this._released = false;
  this._streams = [];
  this._currentStream = null;
}
util.inherits(CombinedStream, Stream);

CombinedStream.create = function(options) {
  var combinedStream = new this();

  options = options || {};
  for (var option in options) {
    combinedStream[option] = options[option];
  }

  return combinedStream;
};

CombinedStream.isStreamLike = function(stream) {
  return (typeof stream !== 'function')
    && (typeof stream !== 'string')
    && (typeof stream !== 'boolean')
    && (typeof stream !== 'number')
    && (!Buffer.isBuffer(stream));
};

CombinedStream.prototype.append = function(stream) {
  var isStreamLike = CombinedStream.isStreamLike(stream);

  if (isStreamLike) {
    if (!(stream instanceof DelayedStream)) {
      var newStream = DelayedStream.create(stream, {
        maxDataSize: Infinity,
        pauseStream: this.pauseStreams,
      });
      stream.on('data', this._checkDataSize.bind(this));
      stream = newStream;
    }

    this._handleErrors(stream);

    if (this.pauseStreams) {
      stream.pause();
    }
  }

  this._streams.push(stream);
  return this;
};

CombinedStream.prototype.pipe = function(dest, options) {
  Stream.prototype.pipe.call(this, dest, options);
  this.resume();
  return dest;
};

CombinedStream.prototype._getNext = function() {
  this._currentStream = null;
  var stream = this._streams.shift();


  if (typeof stream == 'undefined') {
    this.end();
    return;
  }

  if (typeof stream !== 'function') {
    this._pipeNext(stream);
    return;
  }

  var getStream = stream;
  getStream(function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('data', this._checkDataSize.bind(this));
      this._handleErrors(stream);
    }

    this._pipeNext(stream);
  }.bind(this));
};

CombinedStream.prototype._pipeNext = function(stream) {
  this._currentStream = stream;

  var isStreamLike = CombinedStream.isStreamLike(stream);
  if (isStreamLike) {
    stream.on('end', this._getNext.bind(this));
    stream.pipe(this, {end: false});
    return;
  }

  var value = stream;
  this.write(value);
  this._getNext();
};

CombinedStream.prototype._handleErrors = function(stream) {
  var self = this;
  stream.on('error', function(err) {
    self._emitError(err);
  });
};

CombinedStream.prototype.write = function(data) {
  this.emit('data', data);
};

CombinedStream.prototype.pause = function() {
  if (!this.pauseStreams) {
    return;
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
  this.emit('pause');
};

CombinedStream.prototype.resume = function() {
  if (!this._released) {
    this._released = true;
    this.writable = true;
    this._getNext();
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
  this.emit('resume');
};

CombinedStream.prototype.end = function() {
  this._reset();
  this.emit('end');
};

CombinedStream.prototype.destroy = function() {
  this._reset();
  this.emit('close');
};

CombinedStream.prototype._reset = function() {
  this.writable = false;
  this._streams = [];
  this._currentStream = null;
};

CombinedStream.prototype._checkDataSize = function() {
  this._updateDataSize();
  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
  this._emitError(new Error(message));
};

CombinedStream.prototype._updateDataSize = function() {
  this.dataSize = 0;

  var self = this;
  this._streams.forEach(function(stream) {
    if (!stream.dataSize) {
      return;
    }

    self.dataSize += stream.dataSize;
  });

  if (this._currentStream && this._currentStream.dataSize) {
    this.dataSize += this._currentStream.dataSize;
  }
};

CombinedStream.prototype._emitError = function(err) {
  this._reset();
  this.emit('error', err);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(14);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window && typeof window.process !== 'undefined' && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document && 'WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window && window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(35);
} else {
  module.exports = __webpack_require__(37);
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(69);
var util = __webpack_require__(0);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(14);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(3);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(67);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = util._extend({}, exports.inspectOpts);
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(1).Stream;
var util = __webpack_require__(0);

module.exports = DelayedStream;
function DelayedStream() {
  this.source = null;
  this.dataSize = 0;
  this.maxDataSize = 1024 * 1024;
  this.pauseStream = true;

  this._maxDataSizeExceeded = false;
  this._released = false;
  this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);

DelayedStream.create = function(source, options) {
  var delayedStream = new this();

  options = options || {};
  for (var option in options) {
    delayedStream[option] = options[option];
  }

  delayedStream.source = source;

  var realEmit = source.emit;
  source.emit = function() {
    delayedStream._handleEmit(arguments);
    return realEmit.apply(source, arguments);
  };

  source.on('error', function() {});
  if (delayedStream.pauseStream) {
    source.pause();
  }

  return delayedStream;
};

Object.defineProperty(DelayedStream.prototype, 'readable', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this.source.readable;
  }
});

DelayedStream.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};

DelayedStream.prototype.resume = function() {
  if (!this._released) {
    this.release();
  }

  this.source.resume();
};

DelayedStream.prototype.pause = function() {
  this.source.pause();
};

DelayedStream.prototype.release = function() {
  this._released = true;

  this._bufferedEvents.forEach(function(args) {
    this.emit.apply(this, args);
  }.bind(this));
  this._bufferedEvents = [];
};

DelayedStream.prototype.pipe = function() {
  var r = Stream.prototype.pipe.apply(this, arguments);
  this.resume();
  return r;
};

DelayedStream.prototype._handleEmit = function(args) {
  if (this._released) {
    this.emit.apply(this, args);
    return;
  }

  if (args[0] === 'data') {
    this.dataSize += args[1].length;
    this._checkIfMaxDataSizeExceeded();
  }

  this._bufferedEvents.push(args);
};

DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
  if (this._maxDataSizeExceeded) {
    return;
  }

  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  this._maxDataSizeExceeded = true;
  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this.emit('error', new Error(message));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var CombinedStream = __webpack_require__(34);
var util = __webpack_require__(0);
var path = __webpack_require__(5);
var http = __webpack_require__(4);
var https = __webpack_require__(24);
var parseUrl = __webpack_require__(2).parse;
var fs = __webpack_require__(3);
var mime = __webpack_require__(47);
var asynckit = __webpack_require__(30);
var populate = __webpack_require__(41);

// Public API
module.exports = FormData;

// make it a Stream
util.inherits(FormData, CombinedStream);

/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 */
function FormData() {
  if (!(this instanceof FormData)) {
    return new FormData();
  }

  this._overheadLength = 0;
  this._valueLength = 0;
  this._valuesToMeasure = [];

  CombinedStream.call(this);
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

FormData.prototype.append = function(field, value, options) {

  options = options || {};

  // allow filename as single option
  if (typeof options == 'string') {
    options = {filename: options};
  }

  var append = CombinedStream.prototype.append.bind(this);

  // all that streamy business can't handle numbers
  if (typeof value == 'number') {
    value = '' + value;
  }

  // https://github.com/felixge/node-form-data/issues/38
  if (util.isArray(value)) {
    // Please convert your array into string
    // the way web server expects it
    this._error(new Error('Arrays are not supported.'));
    return;
  }

  var header = this._multiPartHeader(field, value, options);
  var footer = this._multiPartFooter();

  append(header);
  append(value);
  append(footer);

  // pass along options.knownLength
  this._trackLength(header, value, options);
};

FormData.prototype._trackLength = function(header, value, options) {
  var valueLength = 0;

  // used w/ getLengthSync(), when length is known.
  // e.g. for streaming directly from a remote server,
  // w/ a known file a size, and not wanting to wait for
  // incoming file to finish to get its size.
  if (options.knownLength != null) {
    valueLength += +options.knownLength;
  } else if (Buffer.isBuffer(value)) {
    valueLength = value.length;
  } else if (typeof value === 'string') {
    valueLength = Buffer.byteLength(value);
  }

  this._valueLength += valueLength;

  // @check why add CRLF? does this account for custom/multiple CRLFs?
  this._overheadLength +=
    Buffer.byteLength(header) +
    FormData.LINE_BREAK.length;

  // empty or either doesn't have path or not an http response
  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) )) {
    return;
  }

  // no need to bother with the length
  if (!options.knownLength) {
    this._valuesToMeasure.push(value);
  }
};

FormData.prototype._lengthRetriever = function(value, callback) {

  if (value.hasOwnProperty('fd')) {

    // take read range into a account
    // `end` = Infinity –> read file till the end
    //
    // TODO: Looks like there is bug in Node fs.createReadStream
    // it doesn't respect `end` options without `start` options
    // Fix it when node fixes it.
    // https://github.com/joyent/node/issues/7819
    if (value.end != undefined && value.end != Infinity && value.start != undefined) {

      // when end specified
      // no need to calculate range
      // inclusive, starts with 0
      callback(null, value.end + 1 - (value.start ? value.start : 0));

    // not that fast snoopy
    } else {
      // still need to fetch file size from fs
      fs.stat(value.path, function(err, stat) {

        var fileSize;

        if (err) {
          callback(err);
          return;
        }

        // update final size based on the range options
        fileSize = stat.size - (value.start ? value.start : 0);
        callback(null, fileSize);
      });
    }

  // or http response
  } else if (value.hasOwnProperty('httpVersion')) {
    callback(null, +value.headers['content-length']);

  // or request stream http://github.com/mikeal/request
  } else if (value.hasOwnProperty('httpModule')) {
    // wait till response come back
    value.on('response', function(response) {
      value.pause();
      callback(null, +response.headers['content-length']);
    });
    value.resume();

  // something else
  } else {
    callback('Unknown stream');
  }
};

FormData.prototype._multiPartHeader = function(field, value, options) {
  // custom header specified (as string)?
  // it becomes responsible for boundary
  // (e.g. to handle extra CRLFs on .NET servers)
  if (typeof options.header == 'string') {
    return options.header;
  }

  var contentDisposition = this._getContentDisposition(value, options);
  var contentType = this._getContentType(value, options);

  var contents = '';
  var headers  = {
    // add custom disposition as third element or keep it two elements if not
    'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
    // if no content type. allow it to be empty array
    'Content-Type': [].concat(contentType || [])
  };

  // allow custom headers.
  if (typeof options.header == 'object') {
    populate(headers, options.header);
  }

  var header;
  for (var prop in headers) {
    header = headers[prop];

    // skip nullish headers.
    if (header == null) {
      continue;
    }

    // convert all headers to arrays.
    if (!Array.isArray(header)) {
      header = [header];
    }

    // add non-empty headers.
    if (header.length) {
      contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
    }
  }

  return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};

FormData.prototype._getContentDisposition = function(value, options) {

  var contentDisposition;

  // custom filename takes precedence
  // fs- and request- streams have path property
  // formidable and the browser add a name property.
  var filename = options.filename || value.name || value.path;

  // or try http response
  if (!filename && value.readable && value.hasOwnProperty('httpVersion')) {
    filename = value.client._httpMessage.path;
  }

  if (filename) {
    contentDisposition = 'filename="' + path.basename(filename) + '"';
  }

  return contentDisposition;
};

FormData.prototype._getContentType = function(value, options) {

  // use custom content-type above all
  var contentType = options.contentType;

  // or try `name` from formidable, browser
  if (!contentType && value.name) {
    contentType = mime.lookup(value.name);
  }

  // or try `path` from fs-, request- streams
  if (!contentType && value.path) {
    contentType = mime.lookup(value.path);
  }

  // or if it's http-reponse
  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
    contentType = value.headers['content-type'];
  }

  // or guess it from the filename
  if (!contentType && options.filename) {
    contentType = mime.lookup(options.filename);
  }

  // fallback to the default content type if `value` is not simple value
  if (!contentType && typeof value == 'object') {
    contentType = FormData.DEFAULT_CONTENT_TYPE;
  }

  return contentType;
};

FormData.prototype._multiPartFooter = function() {
  return function(next) {
    var footer = FormData.LINE_BREAK;

    var lastPart = (this._streams.length === 0);
    if (lastPart) {
      footer += this._lastBoundary();
    }

    next(footer);
  }.bind(this);
};

FormData.prototype._lastBoundary = function() {
  return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function(userHeaders) {
  var header;
  var formHeaders = {
    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
  };

  for (header in userHeaders) {
    if (userHeaders.hasOwnProperty(header)) {
      formHeaders[header.toLowerCase()] = userHeaders[header];
    }
  }

  return formHeaders;
};

FormData.prototype.getBoundary = function() {
  if (!this._boundary) {
    this._generateBoundary();
  }

  return this._boundary;
};

FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};

// Note: getLengthSync DOESN'T calculate streams length
// As workaround one can calculate file size manually
// and add it as knownLength option
FormData.prototype.getLengthSync = function() {
  var knownLength = this._overheadLength + this._valueLength;

  // Don't get confused, there are 3 "internal" streams for each keyval pair
  // so it basically checks if there is any value added to the form
  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  // https://github.com/form-data/form-data/issues/40
  if (!this.hasKnownLength()) {
    // Some async length retrievers are present
    // therefore synchronous length calculation is false.
    // Please use getLength(callback) to get proper length
    this._error(new Error('Cannot calculate proper length in synchronous way.'));
  }

  return knownLength;
};

// Public API to check if length of added values is known
// https://github.com/form-data/form-data/issues/196
// https://github.com/form-data/form-data/issues/262
FormData.prototype.hasKnownLength = function() {
  var hasKnownLength = true;

  if (this._valuesToMeasure.length) {
    hasKnownLength = false;
  }

  return hasKnownLength;
};

FormData.prototype.getLength = function(cb) {
  var knownLength = this._overheadLength + this._valueLength;

  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  if (!this._valuesToMeasure.length) {
    process.nextTick(cb.bind(this, null, knownLength));
    return;
  }

  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
    if (err) {
      cb(err);
      return;
    }

    values.forEach(function(length) {
      knownLength += length;
    });

    cb(null, knownLength);
  });
};

FormData.prototype.submit = function(params, cb) {
  var request
    , options
    , defaults = {method: 'post'}
    ;

  // parse provided url if it's string
  // or treat it as options object
  if (typeof params == 'string') {

    params = parseUrl(params);
    options = populate({
      port: params.port,
      path: params.pathname,
      host: params.hostname
    }, defaults);

  // use custom params
  } else {

    options = populate(params, defaults);
    // if no port provided use default one
    if (!options.port) {
      options.port = options.protocol == 'https:' ? 443 : 80;
    }
  }

  // put that good code in getHeaders to some use
  options.headers = this.getHeaders(params.headers);

  // https if specified, fallback to http in any other case
  if (options.protocol == 'https:') {
    request = https.request(options);
  } else {
    request = http.request(options);
  }

  // get content length and fire away
  this.getLength(function(err, length) {
    if (err) {
      this._error(err);
      return;
    }

    // add content length
    request.setHeader('Content-Length', length);

    this.pipe(request);
    if (cb) {
      request.on('error', cb);
      request.on('response', cb.bind(this, null));
    }
  }.bind(this));

  return request;
};

FormData.prototype._error = function(err) {
  if (!this.error) {
    this.error = err;
    this.pause();
    this.emit('error', err);
  }
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// populates missing values
module.exports = function(dst, src) {

  Object.keys(src).forEach(function(prop)
  {
    dst[prop] = dst[prop] || src[prop];
  });

  return dst;
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 42;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var require;if (global.GENTLY) require = GENTLY.hijack(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

var crypto = require('crypto');
var fs = require('fs');
var util = require('util'),
    path = require('path'),
    File = require('./file'),
    MultipartParser = require('./multipart_parser').MultipartParser,
    QuerystringParser = require('./querystring_parser').QuerystringParser,
    OctetParser       = require('./octet_parser').OctetParser,
    JSONParser = require('./json_parser').JSONParser,
    StringDecoder = require('string_decoder').StringDecoder,
    EventEmitter = require('events').EventEmitter,
    Stream = require('stream').Stream,
    os = require('os');

function IncomingForm(opts) {
  if (!(this instanceof IncomingForm)) return new IncomingForm(opts);
  EventEmitter.call(this);

  opts=opts||{};

  this.error = null;
  this.ended = false;

  this.maxFields = opts.maxFields || 1000;
  this.maxFieldsSize = opts.maxFieldsSize || 2 * 1024 * 1024;
  this.keepExtensions = opts.keepExtensions || false;
  this.uploadDir = opts.uploadDir || (os.tmpdir && os.tmpdir()) || os.tmpDir();
  this.encoding = opts.encoding || 'utf-8';
  this.headers = null;
  this.type = null;
  this.hash = opts.hash || false;
  this.multiples = opts.multiples || false;

  this.bytesReceived = null;
  this.bytesExpected = null;

  this._parser = null;
  this._flushing = 0;
  this._fieldsSize = 0;
  this.openedFiles = [];

  return this;
}
util.inherits(IncomingForm, EventEmitter);
exports.IncomingForm = IncomingForm;

IncomingForm.prototype.parse = function(req, cb) {
  this.pause = function() {
    try {
      req.pause();
    } catch (err) {
      // the stream was destroyed
      if (!this.ended) {
        // before it was completed, crash & burn
        this._error(err);
      }
      return false;
    }
    return true;
  };

  this.resume = function() {
    try {
      req.resume();
    } catch (err) {
      // the stream was destroyed
      if (!this.ended) {
        // before it was completed, crash & burn
        this._error(err);
      }
      return false;
    }

    return true;
  };

  // Setup callback first, so we don't miss anything from data events emitted
  // immediately.
  if (cb) {
    var fields = {}, files = {};
    this
      .on('field', function(name, value) {
        fields[name] = value;
      })
      .on('file', function(name, file) {
        if (this.multiples) {
          if (files[name]) {
            if (!Array.isArray(files[name])) {
              files[name] = [files[name]];
            }
            files[name].push(file);
          } else {
            files[name] = file;
          }
        } else {
          files[name] = file;
        }
      })
      .on('error', function(err) {
        cb(err, fields, files);
      })
      .on('end', function() {
        cb(null, fields, files);
      });
  }

  // Parse headers and setup the parser, ready to start listening for data.
  this.writeHeaders(req.headers);

  // Start listening for data.
  var self = this;
  req
    .on('error', function(err) {
      self._error(err);
    })
    .on('aborted', function() {
      self.emit('aborted');
      self._error(new Error('Request aborted'));
    })
    .on('data', function(buffer) {
      self.write(buffer);
    })
    .on('end', function() {
      if (self.error) {
        return;
      }

      var err = self._parser.end();
      if (err) {
        self._error(err);
      }
    });

  return this;
};

IncomingForm.prototype.writeHeaders = function(headers) {
  this.headers = headers;
  this._parseContentLength();
  this._parseContentType();
};

IncomingForm.prototype.write = function(buffer) {
  if (this.error) {
    return;
  }
  if (!this._parser) {
    this._error(new Error('uninitialized parser'));
    return;
  }

  this.bytesReceived += buffer.length;
  this.emit('progress', this.bytesReceived, this.bytesExpected);

  var bytesParsed = this._parser.write(buffer);
  if (bytesParsed !== buffer.length) {
    this._error(new Error('parser error, '+bytesParsed+' of '+buffer.length+' bytes parsed'));
  }

  return bytesParsed;
};

IncomingForm.prototype.pause = function() {
  // this does nothing, unless overwritten in IncomingForm.parse
  return false;
};

IncomingForm.prototype.resume = function() {
  // this does nothing, unless overwritten in IncomingForm.parse
  return false;
};

IncomingForm.prototype.onPart = function(part) {
  // this method can be overwritten by the user
  this.handlePart(part);
};

IncomingForm.prototype.handlePart = function(part) {
  var self = this;

  if (part.filename === undefined) {
    var value = ''
      , decoder = new StringDecoder(this.encoding);

    part.on('data', function(buffer) {
      self._fieldsSize += buffer.length;
      if (self._fieldsSize > self.maxFieldsSize) {
        self._error(new Error('maxFieldsSize exceeded, received '+self._fieldsSize+' bytes of field data'));
        return;
      }
      value += decoder.write(buffer);
    });

    part.on('end', function() {
      self.emit('field', part.name, value);
    });
    return;
  }

  this._flushing++;

  var file = new File({
    path: this._uploadPath(part.filename),
    name: part.filename,
    type: part.mime,
    hash: self.hash
  });

  this.emit('fileBegin', part.name, file);

  file.open();
  this.openedFiles.push(file);

  part.on('data', function(buffer) {
    if (buffer.length == 0) {
      return;
    }
    self.pause();
    file.write(buffer, function() {
      self.resume();
    });
  });

  part.on('end', function() {
    file.end(function() {
      self._flushing--;
      self.emit('file', part.name, file);
      self._maybeEnd();
    });
  });
};

function dummyParser(self) {
  return {
    end: function () {
      self.ended = true;
      self._maybeEnd();
      return null;
    }
  };
}

IncomingForm.prototype._parseContentType = function() {
  if (this.bytesExpected === 0) {
    this._parser = dummyParser(this);
    return;
  }

  if (!this.headers['content-type']) {
    this._error(new Error('bad content-type header, no content-type'));
    return;
  }

  if (this.headers['content-type'].match(/octet-stream/i)) {
    this._initOctetStream();
    return;
  }

  if (this.headers['content-type'].match(/urlencoded/i)) {
    this._initUrlencoded();
    return;
  }

  if (this.headers['content-type'].match(/multipart/i)) {
    var m = this.headers['content-type'].match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (m) {
      this._initMultipart(m[1] || m[2]);
    } else {
      this._error(new Error('bad content-type header, no multipart boundary'));
    }
    return;
  }

  if (this.headers['content-type'].match(/json/i)) {
    this._initJSONencoded();
    return;
  }

  this._error(new Error('bad content-type header, unknown content-type: '+this.headers['content-type']));
};

IncomingForm.prototype._error = function(err) {
  if (this.error || this.ended) {
    return;
  }

  this.error = err;
  this.emit('error', err);

  if (Array.isArray(this.openedFiles)) {
    this.openedFiles.forEach(function(file) {
      file._writeStream.destroy();
      setTimeout(fs.unlink, 0, file.path, function(error) { });
    });
  }
};

IncomingForm.prototype._parseContentLength = function() {
  this.bytesReceived = 0;
  if (this.headers['content-length']) {
    this.bytesExpected = parseInt(this.headers['content-length'], 10);
  } else if (this.headers['transfer-encoding'] === undefined) {
    this.bytesExpected = 0;
  }

  if (this.bytesExpected !== null) {
    this.emit('progress', this.bytesReceived, this.bytesExpected);
  }
};

IncomingForm.prototype._newParser = function() {
  return new MultipartParser();
};

IncomingForm.prototype._initMultipart = function(boundary) {
  this.type = 'multipart';

  var parser = new MultipartParser(),
      self = this,
      headerField,
      headerValue,
      part;

  parser.initWithBoundary(boundary);

  parser.onPartBegin = function() {
    part = new Stream();
    part.readable = true;
    part.headers = {};
    part.name = null;
    part.filename = null;
    part.mime = null;

    part.transferEncoding = 'binary';
    part.transferBuffer = '';

    headerField = '';
    headerValue = '';
  };

  parser.onHeaderField = function(b, start, end) {
    headerField += b.toString(self.encoding, start, end);
  };

  parser.onHeaderValue = function(b, start, end) {
    headerValue += b.toString(self.encoding, start, end);
  };

  parser.onHeaderEnd = function() {
    headerField = headerField.toLowerCase();
    part.headers[headerField] = headerValue;

    // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
    var m = headerValue.match(/\bname=("([^"]*)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))/i);
    if (headerField == 'content-disposition') {
      if (m) {
        part.name = m[2] || m[3] || '';
      }

      part.filename = self._fileName(headerValue);
    } else if (headerField == 'content-type') {
      part.mime = headerValue;
    } else if (headerField == 'content-transfer-encoding') {
      part.transferEncoding = headerValue.toLowerCase();
    }

    headerField = '';
    headerValue = '';
  };

  parser.onHeadersEnd = function() {
    switch(part.transferEncoding){
      case 'binary':
      case '7bit':
      case '8bit':
      parser.onPartData = function(b, start, end) {
        part.emit('data', b.slice(start, end));
      };

      parser.onPartEnd = function() {
        part.emit('end');
      };
      break;

      case 'base64':
      parser.onPartData = function(b, start, end) {
        part.transferBuffer += b.slice(start, end).toString('ascii');

        /*
        four bytes (chars) in base64 converts to three bytes in binary
        encoding. So we should always work with a number of bytes that
        can be divided by 4, it will result in a number of buytes that
        can be divided vy 3.
        */
        var offset = parseInt(part.transferBuffer.length / 4, 10) * 4;
        part.emit('data', new Buffer(part.transferBuffer.substring(0, offset), 'base64'));
        part.transferBuffer = part.transferBuffer.substring(offset);
      };

      parser.onPartEnd = function() {
        part.emit('data', new Buffer(part.transferBuffer, 'base64'));
        part.emit('end');
      };
      break;

      default:
      return self._error(new Error('unknown transfer-encoding'));
    }

    self.onPart(part);
  };


  parser.onEnd = function() {
    self.ended = true;
    self._maybeEnd();
  };

  this._parser = parser;
};

IncomingForm.prototype._fileName = function(headerValue) {
  // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
  var m = headerValue.match(/\bfilename=("(.*?)"|([^\(\)<>@,;:\\"\/\[\]\?=\{\}\s\t/]+))($|;\s)/i);
  if (!m) return;

  var match = m[2] || m[3] || '';
  var filename = match.substr(match.lastIndexOf('\\') + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#([\d]{4});/g, function(m, code) {
    return String.fromCharCode(code);
  });
  return filename;
};

IncomingForm.prototype._initUrlencoded = function() {
  this.type = 'urlencoded';

  var parser = new QuerystringParser(this.maxFields)
    , self = this;

  parser.onField = function(key, val) {
    self.emit('field', key, val);
  };

  parser.onEnd = function() {
    self.ended = true;
    self._maybeEnd();
  };

  this._parser = parser;
};

IncomingForm.prototype._initOctetStream = function() {
  this.type = 'octet-stream';
  var filename = this.headers['x-file-name'];
  var mime = this.headers['content-type'];

  var file = new File({
    path: this._uploadPath(filename),
    name: filename,
    type: mime
  });

  this.emit('fileBegin', filename, file);
  file.open();

  this._flushing++;

  var self = this;

  self._parser = new OctetParser();

  //Keep track of writes that haven't finished so we don't emit the file before it's done being written
  var outstandingWrites = 0;

  self._parser.on('data', function(buffer){
    self.pause();
    outstandingWrites++;

    file.write(buffer, function() {
      outstandingWrites--;
      self.resume();

      if(self.ended){
        self._parser.emit('doneWritingFile');
      }
    });
  });

  self._parser.on('end', function(){
    self._flushing--;
    self.ended = true;

    var done = function(){
      file.end(function() {
        self.emit('file', 'file', file);
        self._maybeEnd();
      });
    };

    if(outstandingWrites === 0){
      done();
    } else {
      self._parser.once('doneWritingFile', done);
    }
  });
};

IncomingForm.prototype._initJSONencoded = function() {
  this.type = 'json';

  var parser = new JSONParser(this)
    , self = this;

  if (this.bytesExpected) {
    parser.initWithLength(this.bytesExpected);
  }

  parser.onField = function(key, val) {
    self.emit('field', key, val);
  };

  parser.onEnd = function() {
    self.ended = true;
    self._maybeEnd();
  };

  this._parser = parser;
};

IncomingForm.prototype._uploadPath = function(filename) {
  var buf = crypto.randomBytes(16);
  var name = 'upload_' + buf.toString('hex');

  if (this.keepExtensions) {
    var ext = path.extname(filename);
    ext     = ext.replace(/(\.[a-z0-9]+).*/i, '$1');

    name += ext;
  }

  return path.join(this.uploadDir, name);
};

IncomingForm.prototype._maybeEnd = function() {
  if (!this.ended || this._flushing || this.error) {
    return;
  }

  this.emit('end');
};



/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var IncomingForm = __webpack_require__(43).IncomingForm;
IncomingForm.IncomingForm = IncomingForm;
module.exports = IncomingForm;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {
	"application/1d-interleaved-parityfec": {
		"source": "iana"
	},
	"application/3gpdash-qoe-report+xml": {
		"source": "iana"
	},
	"application/3gpp-ims+xml": {
		"source": "iana"
	},
	"application/a2l": {
		"source": "iana"
	},
	"application/activemessage": {
		"source": "iana"
	},
	"application/alto-costmap+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-costmapfilter+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-directory+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointcost+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointcostparams+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointprop+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-endpointpropparams+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-error+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-networkmap+json": {
		"source": "iana",
		"compressible": true
	},
	"application/alto-networkmapfilter+json": {
		"source": "iana",
		"compressible": true
	},
	"application/aml": {
		"source": "iana"
	},
	"application/andrew-inset": {
		"source": "iana",
		"extensions": [
			"ez"
		]
	},
	"application/applefile": {
		"source": "iana"
	},
	"application/applixware": {
		"source": "apache",
		"extensions": [
			"aw"
		]
	},
	"application/atf": {
		"source": "iana"
	},
	"application/atfx": {
		"source": "iana"
	},
	"application/atom+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"atom"
		]
	},
	"application/atomcat+xml": {
		"source": "iana",
		"extensions": [
			"atomcat"
		]
	},
	"application/atomdeleted+xml": {
		"source": "iana"
	},
	"application/atomicmail": {
		"source": "iana"
	},
	"application/atomsvc+xml": {
		"source": "iana",
		"extensions": [
			"atomsvc"
		]
	},
	"application/atxml": {
		"source": "iana"
	},
	"application/auth-policy+xml": {
		"source": "iana"
	},
	"application/bacnet-xdd+zip": {
		"source": "iana"
	},
	"application/batch-smtp": {
		"source": "iana"
	},
	"application/bdoc": {
		"compressible": false,
		"extensions": [
			"bdoc"
		]
	},
	"application/beep+xml": {
		"source": "iana"
	},
	"application/calendar+json": {
		"source": "iana",
		"compressible": true
	},
	"application/calendar+xml": {
		"source": "iana"
	},
	"application/call-completion": {
		"source": "iana"
	},
	"application/cals-1840": {
		"source": "iana"
	},
	"application/cbor": {
		"source": "iana"
	},
	"application/ccmp+xml": {
		"source": "iana"
	},
	"application/ccxml+xml": {
		"source": "iana",
		"extensions": [
			"ccxml"
		]
	},
	"application/cdfx+xml": {
		"source": "iana"
	},
	"application/cdmi-capability": {
		"source": "iana",
		"extensions": [
			"cdmia"
		]
	},
	"application/cdmi-container": {
		"source": "iana",
		"extensions": [
			"cdmic"
		]
	},
	"application/cdmi-domain": {
		"source": "iana",
		"extensions": [
			"cdmid"
		]
	},
	"application/cdmi-object": {
		"source": "iana",
		"extensions": [
			"cdmio"
		]
	},
	"application/cdmi-queue": {
		"source": "iana",
		"extensions": [
			"cdmiq"
		]
	},
	"application/cdni": {
		"source": "iana"
	},
	"application/cea": {
		"source": "iana"
	},
	"application/cea-2018+xml": {
		"source": "iana"
	},
	"application/cellml+xml": {
		"source": "iana"
	},
	"application/cfw": {
		"source": "iana"
	},
	"application/clue_info+xml": {
		"source": "iana"
	},
	"application/cms": {
		"source": "iana"
	},
	"application/cnrp+xml": {
		"source": "iana"
	},
	"application/coap-group+json": {
		"source": "iana",
		"compressible": true
	},
	"application/coap-payload": {
		"source": "iana"
	},
	"application/commonground": {
		"source": "iana"
	},
	"application/conference-info+xml": {
		"source": "iana"
	},
	"application/cose": {
		"source": "iana"
	},
	"application/cose-key": {
		"source": "iana"
	},
	"application/cose-key-set": {
		"source": "iana"
	},
	"application/cpl+xml": {
		"source": "iana"
	},
	"application/csrattrs": {
		"source": "iana"
	},
	"application/csta+xml": {
		"source": "iana"
	},
	"application/cstadata+xml": {
		"source": "iana"
	},
	"application/csvm+json": {
		"source": "iana",
		"compressible": true
	},
	"application/cu-seeme": {
		"source": "apache",
		"extensions": [
			"cu"
		]
	},
	"application/cybercash": {
		"source": "iana"
	},
	"application/dart": {
		"compressible": true
	},
	"application/dash+xml": {
		"source": "iana",
		"extensions": [
			"mpd"
		]
	},
	"application/dashdelta": {
		"source": "iana"
	},
	"application/davmount+xml": {
		"source": "iana",
		"extensions": [
			"davmount"
		]
	},
	"application/dca-rft": {
		"source": "iana"
	},
	"application/dcd": {
		"source": "iana"
	},
	"application/dec-dx": {
		"source": "iana"
	},
	"application/dialog-info+xml": {
		"source": "iana"
	},
	"application/dicom": {
		"source": "iana"
	},
	"application/dicom+json": {
		"source": "iana",
		"compressible": true
	},
	"application/dicom+xml": {
		"source": "iana"
	},
	"application/dii": {
		"source": "iana"
	},
	"application/dit": {
		"source": "iana"
	},
	"application/dns": {
		"source": "iana"
	},
	"application/docbook+xml": {
		"source": "apache",
		"extensions": [
			"dbk"
		]
	},
	"application/dskpp+xml": {
		"source": "iana"
	},
	"application/dssc+der": {
		"source": "iana",
		"extensions": [
			"dssc"
		]
	},
	"application/dssc+xml": {
		"source": "iana",
		"extensions": [
			"xdssc"
		]
	},
	"application/dvcs": {
		"source": "iana"
	},
	"application/ecmascript": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"ecma"
		]
	},
	"application/edi-consent": {
		"source": "iana"
	},
	"application/edi-x12": {
		"source": "iana",
		"compressible": false
	},
	"application/edifact": {
		"source": "iana",
		"compressible": false
	},
	"application/efi": {
		"source": "iana"
	},
	"application/emergencycalldata.comment+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.deviceinfo+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.providerinfo+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.serviceinfo+xml": {
		"source": "iana"
	},
	"application/emergencycalldata.subscriberinfo+xml": {
		"source": "iana"
	},
	"application/emma+xml": {
		"source": "iana",
		"extensions": [
			"emma"
		]
	},
	"application/emotionml+xml": {
		"source": "iana"
	},
	"application/encaprtp": {
		"source": "iana"
	},
	"application/epp+xml": {
		"source": "iana"
	},
	"application/epub+zip": {
		"source": "iana",
		"extensions": [
			"epub"
		]
	},
	"application/eshop": {
		"source": "iana"
	},
	"application/exi": {
		"source": "iana",
		"extensions": [
			"exi"
		]
	},
	"application/fastinfoset": {
		"source": "iana"
	},
	"application/fastsoap": {
		"source": "iana"
	},
	"application/fdt+xml": {
		"source": "iana"
	},
	"application/fits": {
		"source": "iana"
	},
	"application/font-sfnt": {
		"source": "iana"
	},
	"application/font-tdpfr": {
		"source": "iana",
		"extensions": [
			"pfr"
		]
	},
	"application/font-woff": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"woff"
		]
	},
	"application/font-woff2": {
		"compressible": false,
		"extensions": [
			"woff2"
		]
	},
	"application/framework-attributes+xml": {
		"source": "iana"
	},
	"application/geo+json": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"geojson"
		]
	},
	"application/gml+xml": {
		"source": "iana",
		"extensions": [
			"gml"
		]
	},
	"application/gpx+xml": {
		"source": "apache",
		"extensions": [
			"gpx"
		]
	},
	"application/gxf": {
		"source": "apache",
		"extensions": [
			"gxf"
		]
	},
	"application/gzip": {
		"source": "iana",
		"compressible": false
	},
	"application/h224": {
		"source": "iana"
	},
	"application/held+xml": {
		"source": "iana"
	},
	"application/http": {
		"source": "iana"
	},
	"application/hyperstudio": {
		"source": "iana",
		"extensions": [
			"stk"
		]
	},
	"application/ibe-key-request+xml": {
		"source": "iana"
	},
	"application/ibe-pkg-reply+xml": {
		"source": "iana"
	},
	"application/ibe-pp-data": {
		"source": "iana"
	},
	"application/iges": {
		"source": "iana"
	},
	"application/im-iscomposing+xml": {
		"source": "iana"
	},
	"application/index": {
		"source": "iana"
	},
	"application/index.cmd": {
		"source": "iana"
	},
	"application/index.obj": {
		"source": "iana"
	},
	"application/index.response": {
		"source": "iana"
	},
	"application/index.vnd": {
		"source": "iana"
	},
	"application/inkml+xml": {
		"source": "iana",
		"extensions": [
			"ink",
			"inkml"
		]
	},
	"application/iotp": {
		"source": "iana"
	},
	"application/ipfix": {
		"source": "iana",
		"extensions": [
			"ipfix"
		]
	},
	"application/ipp": {
		"source": "iana"
	},
	"application/isup": {
		"source": "iana"
	},
	"application/its+xml": {
		"source": "iana"
	},
	"application/java-archive": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"jar",
			"war",
			"ear"
		]
	},
	"application/java-serialized-object": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"ser"
		]
	},
	"application/java-vm": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"class"
		]
	},
	"application/javascript": {
		"source": "iana",
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"js"
		]
	},
	"application/jose": {
		"source": "iana"
	},
	"application/jose+json": {
		"source": "iana",
		"compressible": true
	},
	"application/jrd+json": {
		"source": "iana",
		"compressible": true
	},
	"application/json": {
		"source": "iana",
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"json",
			"map"
		]
	},
	"application/json-patch+json": {
		"source": "iana",
		"compressible": true
	},
	"application/json-seq": {
		"source": "iana"
	},
	"application/json5": {
		"extensions": [
			"json5"
		]
	},
	"application/jsonml+json": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"jsonml"
		]
	},
	"application/jwk+json": {
		"source": "iana",
		"compressible": true
	},
	"application/jwk-set+json": {
		"source": "iana",
		"compressible": true
	},
	"application/jwt": {
		"source": "iana"
	},
	"application/kpml-request+xml": {
		"source": "iana"
	},
	"application/kpml-response+xml": {
		"source": "iana"
	},
	"application/ld+json": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"jsonld"
		]
	},
	"application/lgr+xml": {
		"source": "iana"
	},
	"application/link-format": {
		"source": "iana"
	},
	"application/load-control+xml": {
		"source": "iana"
	},
	"application/lost+xml": {
		"source": "iana",
		"extensions": [
			"lostxml"
		]
	},
	"application/lostsync+xml": {
		"source": "iana"
	},
	"application/lxf": {
		"source": "iana"
	},
	"application/mac-binhex40": {
		"source": "iana",
		"extensions": [
			"hqx"
		]
	},
	"application/mac-compactpro": {
		"source": "apache",
		"extensions": [
			"cpt"
		]
	},
	"application/macwriteii": {
		"source": "iana"
	},
	"application/mads+xml": {
		"source": "iana",
		"extensions": [
			"mads"
		]
	},
	"application/manifest+json": {
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"webmanifest"
		]
	},
	"application/marc": {
		"source": "iana",
		"extensions": [
			"mrc"
		]
	},
	"application/marcxml+xml": {
		"source": "iana",
		"extensions": [
			"mrcx"
		]
	},
	"application/mathematica": {
		"source": "iana",
		"extensions": [
			"ma",
			"nb",
			"mb"
		]
	},
	"application/mathml+xml": {
		"source": "iana",
		"extensions": [
			"mathml"
		]
	},
	"application/mathml-content+xml": {
		"source": "iana"
	},
	"application/mathml-presentation+xml": {
		"source": "iana"
	},
	"application/mbms-associated-procedure-description+xml": {
		"source": "iana"
	},
	"application/mbms-deregister+xml": {
		"source": "iana"
	},
	"application/mbms-envelope+xml": {
		"source": "iana"
	},
	"application/mbms-msk+xml": {
		"source": "iana"
	},
	"application/mbms-msk-response+xml": {
		"source": "iana"
	},
	"application/mbms-protection-description+xml": {
		"source": "iana"
	},
	"application/mbms-reception-report+xml": {
		"source": "iana"
	},
	"application/mbms-register+xml": {
		"source": "iana"
	},
	"application/mbms-register-response+xml": {
		"source": "iana"
	},
	"application/mbms-schedule+xml": {
		"source": "iana"
	},
	"application/mbms-user-service-description+xml": {
		"source": "iana"
	},
	"application/mbox": {
		"source": "iana",
		"extensions": [
			"mbox"
		]
	},
	"application/media-policy-dataset+xml": {
		"source": "iana"
	},
	"application/media_control+xml": {
		"source": "iana"
	},
	"application/mediaservercontrol+xml": {
		"source": "iana",
		"extensions": [
			"mscml"
		]
	},
	"application/merge-patch+json": {
		"source": "iana",
		"compressible": true
	},
	"application/metalink+xml": {
		"source": "apache",
		"extensions": [
			"metalink"
		]
	},
	"application/metalink4+xml": {
		"source": "iana",
		"extensions": [
			"meta4"
		]
	},
	"application/mets+xml": {
		"source": "iana",
		"extensions": [
			"mets"
		]
	},
	"application/mf4": {
		"source": "iana"
	},
	"application/mikey": {
		"source": "iana"
	},
	"application/mods+xml": {
		"source": "iana",
		"extensions": [
			"mods"
		]
	},
	"application/moss-keys": {
		"source": "iana"
	},
	"application/moss-signature": {
		"source": "iana"
	},
	"application/mosskey-data": {
		"source": "iana"
	},
	"application/mosskey-request": {
		"source": "iana"
	},
	"application/mp21": {
		"source": "iana",
		"extensions": [
			"m21",
			"mp21"
		]
	},
	"application/mp4": {
		"source": "iana",
		"extensions": [
			"mp4s",
			"m4p"
		]
	},
	"application/mpeg4-generic": {
		"source": "iana"
	},
	"application/mpeg4-iod": {
		"source": "iana"
	},
	"application/mpeg4-iod-xmt": {
		"source": "iana"
	},
	"application/mrb-consumer+xml": {
		"source": "iana"
	},
	"application/mrb-publish+xml": {
		"source": "iana"
	},
	"application/msc-ivr+xml": {
		"source": "iana"
	},
	"application/msc-mixer+xml": {
		"source": "iana"
	},
	"application/msword": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"doc",
			"dot"
		]
	},
	"application/mud+json": {
		"source": "iana",
		"compressible": true
	},
	"application/mxf": {
		"source": "iana",
		"extensions": [
			"mxf"
		]
	},
	"application/nasdata": {
		"source": "iana"
	},
	"application/news-checkgroups": {
		"source": "iana"
	},
	"application/news-groupinfo": {
		"source": "iana"
	},
	"application/news-transmission": {
		"source": "iana"
	},
	"application/nlsml+xml": {
		"source": "iana"
	},
	"application/nss": {
		"source": "iana"
	},
	"application/ocsp-request": {
		"source": "iana"
	},
	"application/ocsp-response": {
		"source": "iana"
	},
	"application/octet-stream": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"bin",
			"dms",
			"lrf",
			"mar",
			"so",
			"dist",
			"distz",
			"pkg",
			"bpk",
			"dump",
			"elc",
			"deploy",
			"exe",
			"dll",
			"deb",
			"dmg",
			"iso",
			"img",
			"msi",
			"msp",
			"msm",
			"buffer"
		]
	},
	"application/oda": {
		"source": "iana",
		"extensions": [
			"oda"
		]
	},
	"application/odx": {
		"source": "iana"
	},
	"application/oebps-package+xml": {
		"source": "iana",
		"extensions": [
			"opf"
		]
	},
	"application/ogg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"ogx"
		]
	},
	"application/omdoc+xml": {
		"source": "apache",
		"extensions": [
			"omdoc"
		]
	},
	"application/onenote": {
		"source": "apache",
		"extensions": [
			"onetoc",
			"onetoc2",
			"onetmp",
			"onepkg"
		]
	},
	"application/oxps": {
		"source": "iana",
		"extensions": [
			"oxps"
		]
	},
	"application/p2p-overlay+xml": {
		"source": "iana"
	},
	"application/parityfec": {
		"source": "iana"
	},
	"application/patch-ops-error+xml": {
		"source": "iana",
		"extensions": [
			"xer"
		]
	},
	"application/pdf": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"pdf"
		]
	},
	"application/pdx": {
		"source": "iana"
	},
	"application/pgp-encrypted": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"pgp"
		]
	},
	"application/pgp-keys": {
		"source": "iana"
	},
	"application/pgp-signature": {
		"source": "iana",
		"extensions": [
			"asc",
			"sig"
		]
	},
	"application/pics-rules": {
		"source": "apache",
		"extensions": [
			"prf"
		]
	},
	"application/pidf+xml": {
		"source": "iana"
	},
	"application/pidf-diff+xml": {
		"source": "iana"
	},
	"application/pkcs10": {
		"source": "iana",
		"extensions": [
			"p10"
		]
	},
	"application/pkcs12": {
		"source": "iana"
	},
	"application/pkcs7-mime": {
		"source": "iana",
		"extensions": [
			"p7m",
			"p7c"
		]
	},
	"application/pkcs7-signature": {
		"source": "iana",
		"extensions": [
			"p7s"
		]
	},
	"application/pkcs8": {
		"source": "iana",
		"extensions": [
			"p8"
		]
	},
	"application/pkix-attr-cert": {
		"source": "iana",
		"extensions": [
			"ac"
		]
	},
	"application/pkix-cert": {
		"source": "iana",
		"extensions": [
			"cer"
		]
	},
	"application/pkix-crl": {
		"source": "iana",
		"extensions": [
			"crl"
		]
	},
	"application/pkix-pkipath": {
		"source": "iana",
		"extensions": [
			"pkipath"
		]
	},
	"application/pkixcmp": {
		"source": "iana",
		"extensions": [
			"pki"
		]
	},
	"application/pls+xml": {
		"source": "iana",
		"extensions": [
			"pls"
		]
	},
	"application/poc-settings+xml": {
		"source": "iana"
	},
	"application/postscript": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"ai",
			"eps",
			"ps"
		]
	},
	"application/ppsp-tracker+json": {
		"source": "iana",
		"compressible": true
	},
	"application/problem+json": {
		"source": "iana",
		"compressible": true
	},
	"application/problem+xml": {
		"source": "iana"
	},
	"application/provenance+xml": {
		"source": "iana"
	},
	"application/prs.alvestrand.titrax-sheet": {
		"source": "iana"
	},
	"application/prs.cww": {
		"source": "iana",
		"extensions": [
			"cww"
		]
	},
	"application/prs.hpub+zip": {
		"source": "iana"
	},
	"application/prs.nprend": {
		"source": "iana"
	},
	"application/prs.plucker": {
		"source": "iana"
	},
	"application/prs.rdf-xml-crypt": {
		"source": "iana"
	},
	"application/prs.xsf+xml": {
		"source": "iana"
	},
	"application/pskc+xml": {
		"source": "iana",
		"extensions": [
			"pskcxml"
		]
	},
	"application/qsig": {
		"source": "iana"
	},
	"application/raptorfec": {
		"source": "iana"
	},
	"application/rdap+json": {
		"source": "iana",
		"compressible": true
	},
	"application/rdf+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rdf"
		]
	},
	"application/reginfo+xml": {
		"source": "iana",
		"extensions": [
			"rif"
		]
	},
	"application/relax-ng-compact-syntax": {
		"source": "iana",
		"extensions": [
			"rnc"
		]
	},
	"application/remote-printing": {
		"source": "iana"
	},
	"application/reputon+json": {
		"source": "iana",
		"compressible": true
	},
	"application/resource-lists+xml": {
		"source": "iana",
		"extensions": [
			"rl"
		]
	},
	"application/resource-lists-diff+xml": {
		"source": "iana",
		"extensions": [
			"rld"
		]
	},
	"application/rfc+xml": {
		"source": "iana"
	},
	"application/riscos": {
		"source": "iana"
	},
	"application/rlmi+xml": {
		"source": "iana"
	},
	"application/rls-services+xml": {
		"source": "iana",
		"extensions": [
			"rs"
		]
	},
	"application/rpki-ghostbusters": {
		"source": "iana",
		"extensions": [
			"gbr"
		]
	},
	"application/rpki-manifest": {
		"source": "iana",
		"extensions": [
			"mft"
		]
	},
	"application/rpki-roa": {
		"source": "iana",
		"extensions": [
			"roa"
		]
	},
	"application/rpki-updown": {
		"source": "iana"
	},
	"application/rsd+xml": {
		"source": "apache",
		"extensions": [
			"rsd"
		]
	},
	"application/rss+xml": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"rss"
		]
	},
	"application/rtf": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rtf"
		]
	},
	"application/rtploopback": {
		"source": "iana"
	},
	"application/rtx": {
		"source": "iana"
	},
	"application/samlassertion+xml": {
		"source": "iana"
	},
	"application/samlmetadata+xml": {
		"source": "iana"
	},
	"application/sbml+xml": {
		"source": "iana",
		"extensions": [
			"sbml"
		]
	},
	"application/scaip+xml": {
		"source": "iana"
	},
	"application/scim+json": {
		"source": "iana",
		"compressible": true
	},
	"application/scvp-cv-request": {
		"source": "iana",
		"extensions": [
			"scq"
		]
	},
	"application/scvp-cv-response": {
		"source": "iana",
		"extensions": [
			"scs"
		]
	},
	"application/scvp-vp-request": {
		"source": "iana",
		"extensions": [
			"spq"
		]
	},
	"application/scvp-vp-response": {
		"source": "iana",
		"extensions": [
			"spp"
		]
	},
	"application/sdp": {
		"source": "iana",
		"extensions": [
			"sdp"
		]
	},
	"application/sep+xml": {
		"source": "iana"
	},
	"application/sep-exi": {
		"source": "iana"
	},
	"application/session-info": {
		"source": "iana"
	},
	"application/set-payment": {
		"source": "iana"
	},
	"application/set-payment-initiation": {
		"source": "iana",
		"extensions": [
			"setpay"
		]
	},
	"application/set-registration": {
		"source": "iana"
	},
	"application/set-registration-initiation": {
		"source": "iana",
		"extensions": [
			"setreg"
		]
	},
	"application/sgml": {
		"source": "iana"
	},
	"application/sgml-open-catalog": {
		"source": "iana"
	},
	"application/shf+xml": {
		"source": "iana",
		"extensions": [
			"shf"
		]
	},
	"application/sieve": {
		"source": "iana"
	},
	"application/simple-filter+xml": {
		"source": "iana"
	},
	"application/simple-message-summary": {
		"source": "iana"
	},
	"application/simplesymbolcontainer": {
		"source": "iana"
	},
	"application/slate": {
		"source": "iana"
	},
	"application/smil": {
		"source": "iana"
	},
	"application/smil+xml": {
		"source": "iana",
		"extensions": [
			"smi",
			"smil"
		]
	},
	"application/smpte336m": {
		"source": "iana"
	},
	"application/soap+fastinfoset": {
		"source": "iana"
	},
	"application/soap+xml": {
		"source": "iana",
		"compressible": true
	},
	"application/sparql-query": {
		"source": "iana",
		"extensions": [
			"rq"
		]
	},
	"application/sparql-results+xml": {
		"source": "iana",
		"extensions": [
			"srx"
		]
	},
	"application/spirits-event+xml": {
		"source": "iana"
	},
	"application/sql": {
		"source": "iana"
	},
	"application/srgs": {
		"source": "iana",
		"extensions": [
			"gram"
		]
	},
	"application/srgs+xml": {
		"source": "iana",
		"extensions": [
			"grxml"
		]
	},
	"application/sru+xml": {
		"source": "iana",
		"extensions": [
			"sru"
		]
	},
	"application/ssdl+xml": {
		"source": "apache",
		"extensions": [
			"ssdl"
		]
	},
	"application/ssml+xml": {
		"source": "iana",
		"extensions": [
			"ssml"
		]
	},
	"application/tamp-apex-update": {
		"source": "iana"
	},
	"application/tamp-apex-update-confirm": {
		"source": "iana"
	},
	"application/tamp-community-update": {
		"source": "iana"
	},
	"application/tamp-community-update-confirm": {
		"source": "iana"
	},
	"application/tamp-error": {
		"source": "iana"
	},
	"application/tamp-sequence-adjust": {
		"source": "iana"
	},
	"application/tamp-sequence-adjust-confirm": {
		"source": "iana"
	},
	"application/tamp-status-query": {
		"source": "iana"
	},
	"application/tamp-status-response": {
		"source": "iana"
	},
	"application/tamp-update": {
		"source": "iana"
	},
	"application/tamp-update-confirm": {
		"source": "iana"
	},
	"application/tar": {
		"compressible": true
	},
	"application/tei+xml": {
		"source": "iana",
		"extensions": [
			"tei",
			"teicorpus"
		]
	},
	"application/thraud+xml": {
		"source": "iana",
		"extensions": [
			"tfi"
		]
	},
	"application/timestamp-query": {
		"source": "iana"
	},
	"application/timestamp-reply": {
		"source": "iana"
	},
	"application/timestamped-data": {
		"source": "iana",
		"extensions": [
			"tsd"
		]
	},
	"application/trig": {
		"source": "iana"
	},
	"application/ttml+xml": {
		"source": "iana"
	},
	"application/tve-trigger": {
		"source": "iana"
	},
	"application/ulpfec": {
		"source": "iana"
	},
	"application/urc-grpsheet+xml": {
		"source": "iana"
	},
	"application/urc-ressheet+xml": {
		"source": "iana"
	},
	"application/urc-targetdesc+xml": {
		"source": "iana"
	},
	"application/urc-uisocketdesc+xml": {
		"source": "iana"
	},
	"application/vcard+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vcard+xml": {
		"source": "iana"
	},
	"application/vemmi": {
		"source": "iana"
	},
	"application/vividence.scriptfile": {
		"source": "apache"
	},
	"application/vnd.3gpp-prose+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp-prose-pc3ch+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.access-transfer-events+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.bsf+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.mid-call+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.pic-bw-large": {
		"source": "iana",
		"extensions": [
			"plb"
		]
	},
	"application/vnd.3gpp.pic-bw-small": {
		"source": "iana",
		"extensions": [
			"psb"
		]
	},
	"application/vnd.3gpp.pic-bw-var": {
		"source": "iana",
		"extensions": [
			"pvb"
		]
	},
	"application/vnd.3gpp.sms": {
		"source": "iana"
	},
	"application/vnd.3gpp.sms+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.srvcc-ext+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.srvcc-info+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.state-and-event-info+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp.ussd+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp2.bcmcsinfo+xml": {
		"source": "iana"
	},
	"application/vnd.3gpp2.sms": {
		"source": "iana"
	},
	"application/vnd.3gpp2.tcap": {
		"source": "iana",
		"extensions": [
			"tcap"
		]
	},
	"application/vnd.3lightssoftware.imagescal": {
		"source": "iana"
	},
	"application/vnd.3m.post-it-notes": {
		"source": "iana",
		"extensions": [
			"pwn"
		]
	},
	"application/vnd.accpac.simply.aso": {
		"source": "iana",
		"extensions": [
			"aso"
		]
	},
	"application/vnd.accpac.simply.imp": {
		"source": "iana",
		"extensions": [
			"imp"
		]
	},
	"application/vnd.acucobol": {
		"source": "iana",
		"extensions": [
			"acu"
		]
	},
	"application/vnd.acucorp": {
		"source": "iana",
		"extensions": [
			"atc",
			"acutc"
		]
	},
	"application/vnd.adobe.air-application-installer-package+zip": {
		"source": "apache",
		"extensions": [
			"air"
		]
	},
	"application/vnd.adobe.flash.movie": {
		"source": "iana"
	},
	"application/vnd.adobe.formscentral.fcdt": {
		"source": "iana",
		"extensions": [
			"fcdt"
		]
	},
	"application/vnd.adobe.fxp": {
		"source": "iana",
		"extensions": [
			"fxp",
			"fxpl"
		]
	},
	"application/vnd.adobe.partial-upload": {
		"source": "iana"
	},
	"application/vnd.adobe.xdp+xml": {
		"source": "iana",
		"extensions": [
			"xdp"
		]
	},
	"application/vnd.adobe.xfdf": {
		"source": "iana",
		"extensions": [
			"xfdf"
		]
	},
	"application/vnd.aether.imp": {
		"source": "iana"
	},
	"application/vnd.ah-barcode": {
		"source": "iana"
	},
	"application/vnd.ahead.space": {
		"source": "iana",
		"extensions": [
			"ahead"
		]
	},
	"application/vnd.airzip.filesecure.azf": {
		"source": "iana",
		"extensions": [
			"azf"
		]
	},
	"application/vnd.airzip.filesecure.azs": {
		"source": "iana",
		"extensions": [
			"azs"
		]
	},
	"application/vnd.amazon.ebook": {
		"source": "apache",
		"extensions": [
			"azw"
		]
	},
	"application/vnd.amazon.mobi8-ebook": {
		"source": "iana"
	},
	"application/vnd.americandynamics.acc": {
		"source": "iana",
		"extensions": [
			"acc"
		]
	},
	"application/vnd.amiga.ami": {
		"source": "iana",
		"extensions": [
			"ami"
		]
	},
	"application/vnd.amundsen.maze+xml": {
		"source": "iana"
	},
	"application/vnd.android.package-archive": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"apk"
		]
	},
	"application/vnd.anki": {
		"source": "iana"
	},
	"application/vnd.anser-web-certificate-issue-initiation": {
		"source": "iana",
		"extensions": [
			"cii"
		]
	},
	"application/vnd.anser-web-funds-transfer-initiation": {
		"source": "apache",
		"extensions": [
			"fti"
		]
	},
	"application/vnd.antix.game-component": {
		"source": "iana",
		"extensions": [
			"atx"
		]
	},
	"application/vnd.apache.thrift.binary": {
		"source": "iana"
	},
	"application/vnd.apache.thrift.compact": {
		"source": "iana"
	},
	"application/vnd.apache.thrift.json": {
		"source": "iana"
	},
	"application/vnd.api+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.apple.installer+xml": {
		"source": "iana",
		"extensions": [
			"mpkg"
		]
	},
	"application/vnd.apple.mpegurl": {
		"source": "iana",
		"extensions": [
			"m3u8"
		]
	},
	"application/vnd.apple.pkpass": {
		"compressible": false,
		"extensions": [
			"pkpass"
		]
	},
	"application/vnd.arastra.swi": {
		"source": "iana"
	},
	"application/vnd.aristanetworks.swi": {
		"source": "iana",
		"extensions": [
			"swi"
		]
	},
	"application/vnd.artsquare": {
		"source": "iana"
	},
	"application/vnd.astraea-software.iota": {
		"source": "iana",
		"extensions": [
			"iota"
		]
	},
	"application/vnd.audiograph": {
		"source": "iana",
		"extensions": [
			"aep"
		]
	},
	"application/vnd.autopackage": {
		"source": "iana"
	},
	"application/vnd.avistar+xml": {
		"source": "iana"
	},
	"application/vnd.balsamiq.bmml+xml": {
		"source": "iana"
	},
	"application/vnd.balsamiq.bmpr": {
		"source": "iana"
	},
	"application/vnd.bekitzur-stech+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.biopax.rdf+xml": {
		"source": "iana"
	},
	"application/vnd.blueice.multipass": {
		"source": "iana",
		"extensions": [
			"mpm"
		]
	},
	"application/vnd.bluetooth.ep.oob": {
		"source": "iana"
	},
	"application/vnd.bluetooth.le.oob": {
		"source": "iana"
	},
	"application/vnd.bmi": {
		"source": "iana",
		"extensions": [
			"bmi"
		]
	},
	"application/vnd.businessobjects": {
		"source": "iana",
		"extensions": [
			"rep"
		]
	},
	"application/vnd.cab-jscript": {
		"source": "iana"
	},
	"application/vnd.canon-cpdl": {
		"source": "iana"
	},
	"application/vnd.canon-lips": {
		"source": "iana"
	},
	"application/vnd.cendio.thinlinc.clientconf": {
		"source": "iana"
	},
	"application/vnd.century-systems.tcp_stream": {
		"source": "iana"
	},
	"application/vnd.chemdraw+xml": {
		"source": "iana",
		"extensions": [
			"cdxml"
		]
	},
	"application/vnd.chess-pgn": {
		"source": "iana"
	},
	"application/vnd.chipnuts.karaoke-mmd": {
		"source": "iana",
		"extensions": [
			"mmd"
		]
	},
	"application/vnd.cinderella": {
		"source": "iana",
		"extensions": [
			"cdy"
		]
	},
	"application/vnd.cirpack.isdn-ext": {
		"source": "iana"
	},
	"application/vnd.citationstyles.style+xml": {
		"source": "iana"
	},
	"application/vnd.claymore": {
		"source": "iana",
		"extensions": [
			"cla"
		]
	},
	"application/vnd.cloanto.rp9": {
		"source": "iana",
		"extensions": [
			"rp9"
		]
	},
	"application/vnd.clonk.c4group": {
		"source": "iana",
		"extensions": [
			"c4g",
			"c4d",
			"c4f",
			"c4p",
			"c4u"
		]
	},
	"application/vnd.cluetrust.cartomobile-config": {
		"source": "iana",
		"extensions": [
			"c11amc"
		]
	},
	"application/vnd.cluetrust.cartomobile-config-pkg": {
		"source": "iana",
		"extensions": [
			"c11amz"
		]
	},
	"application/vnd.coffeescript": {
		"source": "iana"
	},
	"application/vnd.collection+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.collection.doc+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.collection.next+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.comicbook+zip": {
		"source": "iana"
	},
	"application/vnd.commerce-battelle": {
		"source": "iana"
	},
	"application/vnd.commonspace": {
		"source": "iana",
		"extensions": [
			"csp"
		]
	},
	"application/vnd.contact.cmsg": {
		"source": "iana",
		"extensions": [
			"cdbcmsg"
		]
	},
	"application/vnd.coreos.ignition+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.cosmocaller": {
		"source": "iana",
		"extensions": [
			"cmc"
		]
	},
	"application/vnd.crick.clicker": {
		"source": "iana",
		"extensions": [
			"clkx"
		]
	},
	"application/vnd.crick.clicker.keyboard": {
		"source": "iana",
		"extensions": [
			"clkk"
		]
	},
	"application/vnd.crick.clicker.palette": {
		"source": "iana",
		"extensions": [
			"clkp"
		]
	},
	"application/vnd.crick.clicker.template": {
		"source": "iana",
		"extensions": [
			"clkt"
		]
	},
	"application/vnd.crick.clicker.wordbank": {
		"source": "iana",
		"extensions": [
			"clkw"
		]
	},
	"application/vnd.criticaltools.wbs+xml": {
		"source": "iana",
		"extensions": [
			"wbs"
		]
	},
	"application/vnd.ctc-posml": {
		"source": "iana",
		"extensions": [
			"pml"
		]
	},
	"application/vnd.ctct.ws+xml": {
		"source": "iana"
	},
	"application/vnd.cups-pdf": {
		"source": "iana"
	},
	"application/vnd.cups-postscript": {
		"source": "iana"
	},
	"application/vnd.cups-ppd": {
		"source": "iana",
		"extensions": [
			"ppd"
		]
	},
	"application/vnd.cups-raster": {
		"source": "iana"
	},
	"application/vnd.cups-raw": {
		"source": "iana"
	},
	"application/vnd.curl": {
		"source": "iana"
	},
	"application/vnd.curl.car": {
		"source": "apache",
		"extensions": [
			"car"
		]
	},
	"application/vnd.curl.pcurl": {
		"source": "apache",
		"extensions": [
			"pcurl"
		]
	},
	"application/vnd.cyan.dean.root+xml": {
		"source": "iana"
	},
	"application/vnd.cybank": {
		"source": "iana"
	},
	"application/vnd.d2l.coursepackage1p0+zip": {
		"source": "iana"
	},
	"application/vnd.dart": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"dart"
		]
	},
	"application/vnd.data-vision.rdz": {
		"source": "iana",
		"extensions": [
			"rdz"
		]
	},
	"application/vnd.dataresource+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.debian.binary-package": {
		"source": "iana"
	},
	"application/vnd.dece.data": {
		"source": "iana",
		"extensions": [
			"uvf",
			"uvvf",
			"uvd",
			"uvvd"
		]
	},
	"application/vnd.dece.ttml+xml": {
		"source": "iana",
		"extensions": [
			"uvt",
			"uvvt"
		]
	},
	"application/vnd.dece.unspecified": {
		"source": "iana",
		"extensions": [
			"uvx",
			"uvvx"
		]
	},
	"application/vnd.dece.zip": {
		"source": "iana",
		"extensions": [
			"uvz",
			"uvvz"
		]
	},
	"application/vnd.denovo.fcselayout-link": {
		"source": "iana",
		"extensions": [
			"fe_launch"
		]
	},
	"application/vnd.desmume-movie": {
		"source": "iana"
	},
	"application/vnd.desmume.movie": {
		"source": "apache"
	},
	"application/vnd.dir-bi.plate-dl-nosuffix": {
		"source": "iana"
	},
	"application/vnd.dm.delegation+xml": {
		"source": "iana"
	},
	"application/vnd.dna": {
		"source": "iana",
		"extensions": [
			"dna"
		]
	},
	"application/vnd.document+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.dolby.mlp": {
		"source": "apache",
		"extensions": [
			"mlp"
		]
	},
	"application/vnd.dolby.mobile.1": {
		"source": "iana"
	},
	"application/vnd.dolby.mobile.2": {
		"source": "iana"
	},
	"application/vnd.doremir.scorecloud-binary-document": {
		"source": "iana"
	},
	"application/vnd.dpgraph": {
		"source": "iana",
		"extensions": [
			"dpg"
		]
	},
	"application/vnd.dreamfactory": {
		"source": "iana",
		"extensions": [
			"dfac"
		]
	},
	"application/vnd.drive+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ds-keypoint": {
		"source": "apache",
		"extensions": [
			"kpxx"
		]
	},
	"application/vnd.dtg.local": {
		"source": "iana"
	},
	"application/vnd.dtg.local.flash": {
		"source": "iana"
	},
	"application/vnd.dtg.local.html": {
		"source": "iana"
	},
	"application/vnd.dvb.ait": {
		"source": "iana",
		"extensions": [
			"ait"
		]
	},
	"application/vnd.dvb.dvbj": {
		"source": "iana"
	},
	"application/vnd.dvb.esgcontainer": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcdftnotifaccess": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcesgaccess": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcesgaccess2": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcesgpdd": {
		"source": "iana"
	},
	"application/vnd.dvb.ipdcroaming": {
		"source": "iana"
	},
	"application/vnd.dvb.iptv.alfec-base": {
		"source": "iana"
	},
	"application/vnd.dvb.iptv.alfec-enhancement": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-aggregate-root+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-container+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-generic+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-ia-msglist+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-ia-registration-request+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-ia-registration-response+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.notif-init+xml": {
		"source": "iana"
	},
	"application/vnd.dvb.pfr": {
		"source": "iana"
	},
	"application/vnd.dvb.service": {
		"source": "iana",
		"extensions": [
			"svc"
		]
	},
	"application/vnd.dxr": {
		"source": "iana"
	},
	"application/vnd.dynageo": {
		"source": "iana",
		"extensions": [
			"geo"
		]
	},
	"application/vnd.dzr": {
		"source": "iana"
	},
	"application/vnd.easykaraoke.cdgdownload": {
		"source": "iana"
	},
	"application/vnd.ecdis-update": {
		"source": "iana"
	},
	"application/vnd.ecowin.chart": {
		"source": "iana",
		"extensions": [
			"mag"
		]
	},
	"application/vnd.ecowin.filerequest": {
		"source": "iana"
	},
	"application/vnd.ecowin.fileupdate": {
		"source": "iana"
	},
	"application/vnd.ecowin.series": {
		"source": "iana"
	},
	"application/vnd.ecowin.seriesrequest": {
		"source": "iana"
	},
	"application/vnd.ecowin.seriesupdate": {
		"source": "iana"
	},
	"application/vnd.emclient.accessrequest+xml": {
		"source": "iana"
	},
	"application/vnd.enliven": {
		"source": "iana",
		"extensions": [
			"nml"
		]
	},
	"application/vnd.enphase.envoy": {
		"source": "iana"
	},
	"application/vnd.eprints.data+xml": {
		"source": "iana"
	},
	"application/vnd.epson.esf": {
		"source": "iana",
		"extensions": [
			"esf"
		]
	},
	"application/vnd.epson.msf": {
		"source": "iana",
		"extensions": [
			"msf"
		]
	},
	"application/vnd.epson.quickanime": {
		"source": "iana",
		"extensions": [
			"qam"
		]
	},
	"application/vnd.epson.salt": {
		"source": "iana",
		"extensions": [
			"slt"
		]
	},
	"application/vnd.epson.ssf": {
		"source": "iana",
		"extensions": [
			"ssf"
		]
	},
	"application/vnd.ericsson.quickcall": {
		"source": "iana"
	},
	"application/vnd.espass-espass+zip": {
		"source": "iana"
	},
	"application/vnd.eszigno3+xml": {
		"source": "iana",
		"extensions": [
			"es3",
			"et3"
		]
	},
	"application/vnd.etsi.aoc+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.asic-e+zip": {
		"source": "iana"
	},
	"application/vnd.etsi.asic-s+zip": {
		"source": "iana"
	},
	"application/vnd.etsi.cug+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvcommand+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvdiscovery+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvprofile+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsad-bc+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsad-cod+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsad-npvr+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvservice+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvsync+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.iptvueprofile+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.mcid+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.mheg5": {
		"source": "iana"
	},
	"application/vnd.etsi.overload-control-policy-dataset+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.pstn+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.sci+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.simservs+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.timestamp-token": {
		"source": "iana"
	},
	"application/vnd.etsi.tsl+xml": {
		"source": "iana"
	},
	"application/vnd.etsi.tsl.der": {
		"source": "iana"
	},
	"application/vnd.eudora.data": {
		"source": "iana"
	},
	"application/vnd.ezpix-album": {
		"source": "iana",
		"extensions": [
			"ez2"
		]
	},
	"application/vnd.ezpix-package": {
		"source": "iana",
		"extensions": [
			"ez3"
		]
	},
	"application/vnd.f-secure.mobile": {
		"source": "iana"
	},
	"application/vnd.fastcopy-disk-image": {
		"source": "iana"
	},
	"application/vnd.fdf": {
		"source": "iana",
		"extensions": [
			"fdf"
		]
	},
	"application/vnd.fdsn.mseed": {
		"source": "iana",
		"extensions": [
			"mseed"
		]
	},
	"application/vnd.fdsn.seed": {
		"source": "iana",
		"extensions": [
			"seed",
			"dataless"
		]
	},
	"application/vnd.ffsns": {
		"source": "iana"
	},
	"application/vnd.filmit.zfc": {
		"source": "iana"
	},
	"application/vnd.fints": {
		"source": "iana"
	},
	"application/vnd.firemonkeys.cloudcell": {
		"source": "iana"
	},
	"application/vnd.flographit": {
		"source": "iana",
		"extensions": [
			"gph"
		]
	},
	"application/vnd.fluxtime.clip": {
		"source": "iana",
		"extensions": [
			"ftc"
		]
	},
	"application/vnd.font-fontforge-sfd": {
		"source": "iana"
	},
	"application/vnd.framemaker": {
		"source": "iana",
		"extensions": [
			"fm",
			"frame",
			"maker",
			"book"
		]
	},
	"application/vnd.frogans.fnc": {
		"source": "iana",
		"extensions": [
			"fnc"
		]
	},
	"application/vnd.frogans.ltf": {
		"source": "iana",
		"extensions": [
			"ltf"
		]
	},
	"application/vnd.fsc.weblaunch": {
		"source": "iana",
		"extensions": [
			"fsc"
		]
	},
	"application/vnd.fujitsu.oasys": {
		"source": "iana",
		"extensions": [
			"oas"
		]
	},
	"application/vnd.fujitsu.oasys2": {
		"source": "iana",
		"extensions": [
			"oa2"
		]
	},
	"application/vnd.fujitsu.oasys3": {
		"source": "iana",
		"extensions": [
			"oa3"
		]
	},
	"application/vnd.fujitsu.oasysgp": {
		"source": "iana",
		"extensions": [
			"fg5"
		]
	},
	"application/vnd.fujitsu.oasysprs": {
		"source": "iana",
		"extensions": [
			"bh2"
		]
	},
	"application/vnd.fujixerox.art-ex": {
		"source": "iana"
	},
	"application/vnd.fujixerox.art4": {
		"source": "iana"
	},
	"application/vnd.fujixerox.ddd": {
		"source": "iana",
		"extensions": [
			"ddd"
		]
	},
	"application/vnd.fujixerox.docuworks": {
		"source": "iana",
		"extensions": [
			"xdw"
		]
	},
	"application/vnd.fujixerox.docuworks.binder": {
		"source": "iana",
		"extensions": [
			"xbd"
		]
	},
	"application/vnd.fujixerox.docuworks.container": {
		"source": "iana"
	},
	"application/vnd.fujixerox.hbpl": {
		"source": "iana"
	},
	"application/vnd.fut-misnet": {
		"source": "iana"
	},
	"application/vnd.fuzzysheet": {
		"source": "iana",
		"extensions": [
			"fzs"
		]
	},
	"application/vnd.genomatix.tuxedo": {
		"source": "iana",
		"extensions": [
			"txd"
		]
	},
	"application/vnd.geo+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.geocube+xml": {
		"source": "iana"
	},
	"application/vnd.geogebra.file": {
		"source": "iana",
		"extensions": [
			"ggb"
		]
	},
	"application/vnd.geogebra.tool": {
		"source": "iana",
		"extensions": [
			"ggt"
		]
	},
	"application/vnd.geometry-explorer": {
		"source": "iana",
		"extensions": [
			"gex",
			"gre"
		]
	},
	"application/vnd.geonext": {
		"source": "iana",
		"extensions": [
			"gxt"
		]
	},
	"application/vnd.geoplan": {
		"source": "iana",
		"extensions": [
			"g2w"
		]
	},
	"application/vnd.geospace": {
		"source": "iana",
		"extensions": [
			"g3w"
		]
	},
	"application/vnd.gerber": {
		"source": "iana"
	},
	"application/vnd.globalplatform.card-content-mgt": {
		"source": "iana"
	},
	"application/vnd.globalplatform.card-content-mgt-response": {
		"source": "iana"
	},
	"application/vnd.gmx": {
		"source": "iana",
		"extensions": [
			"gmx"
		]
	},
	"application/vnd.google-apps.document": {
		"compressible": false,
		"extensions": [
			"gdoc"
		]
	},
	"application/vnd.google-apps.presentation": {
		"compressible": false,
		"extensions": [
			"gslides"
		]
	},
	"application/vnd.google-apps.spreadsheet": {
		"compressible": false,
		"extensions": [
			"gsheet"
		]
	},
	"application/vnd.google-earth.kml+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"kml"
		]
	},
	"application/vnd.google-earth.kmz": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"kmz"
		]
	},
	"application/vnd.gov.sk.e-form+xml": {
		"source": "iana"
	},
	"application/vnd.gov.sk.e-form+zip": {
		"source": "iana"
	},
	"application/vnd.gov.sk.xmldatacontainer+xml": {
		"source": "iana"
	},
	"application/vnd.grafeq": {
		"source": "iana",
		"extensions": [
			"gqf",
			"gqs"
		]
	},
	"application/vnd.gridmp": {
		"source": "iana"
	},
	"application/vnd.groove-account": {
		"source": "iana",
		"extensions": [
			"gac"
		]
	},
	"application/vnd.groove-help": {
		"source": "iana",
		"extensions": [
			"ghf"
		]
	},
	"application/vnd.groove-identity-message": {
		"source": "iana",
		"extensions": [
			"gim"
		]
	},
	"application/vnd.groove-injector": {
		"source": "iana",
		"extensions": [
			"grv"
		]
	},
	"application/vnd.groove-tool-message": {
		"source": "iana",
		"extensions": [
			"gtm"
		]
	},
	"application/vnd.groove-tool-template": {
		"source": "iana",
		"extensions": [
			"tpl"
		]
	},
	"application/vnd.groove-vcard": {
		"source": "iana",
		"extensions": [
			"vcg"
		]
	},
	"application/vnd.hal+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hal+xml": {
		"source": "iana",
		"extensions": [
			"hal"
		]
	},
	"application/vnd.handheld-entertainment+xml": {
		"source": "iana",
		"extensions": [
			"zmm"
		]
	},
	"application/vnd.hbci": {
		"source": "iana",
		"extensions": [
			"hbci"
		]
	},
	"application/vnd.hc+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hcl-bireports": {
		"source": "iana"
	},
	"application/vnd.hdt": {
		"source": "iana"
	},
	"application/vnd.heroku+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hhe.lesson-player": {
		"source": "iana",
		"extensions": [
			"les"
		]
	},
	"application/vnd.hp-hpgl": {
		"source": "iana",
		"extensions": [
			"hpgl"
		]
	},
	"application/vnd.hp-hpid": {
		"source": "iana",
		"extensions": [
			"hpid"
		]
	},
	"application/vnd.hp-hps": {
		"source": "iana",
		"extensions": [
			"hps"
		]
	},
	"application/vnd.hp-jlyt": {
		"source": "iana",
		"extensions": [
			"jlt"
		]
	},
	"application/vnd.hp-pcl": {
		"source": "iana",
		"extensions": [
			"pcl"
		]
	},
	"application/vnd.hp-pclxl": {
		"source": "iana",
		"extensions": [
			"pclxl"
		]
	},
	"application/vnd.httphone": {
		"source": "iana"
	},
	"application/vnd.hydrostatix.sof-data": {
		"source": "iana",
		"extensions": [
			"sfd-hdstx"
		]
	},
	"application/vnd.hyperdrive+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.hzn-3d-crossword": {
		"source": "iana"
	},
	"application/vnd.ibm.afplinedata": {
		"source": "iana"
	},
	"application/vnd.ibm.electronic-media": {
		"source": "iana"
	},
	"application/vnd.ibm.minipay": {
		"source": "iana",
		"extensions": [
			"mpy"
		]
	},
	"application/vnd.ibm.modcap": {
		"source": "iana",
		"extensions": [
			"afp",
			"listafp",
			"list3820"
		]
	},
	"application/vnd.ibm.rights-management": {
		"source": "iana",
		"extensions": [
			"irm"
		]
	},
	"application/vnd.ibm.secure-container": {
		"source": "iana",
		"extensions": [
			"sc"
		]
	},
	"application/vnd.iccprofile": {
		"source": "iana",
		"extensions": [
			"icc",
			"icm"
		]
	},
	"application/vnd.ieee.1905": {
		"source": "iana"
	},
	"application/vnd.igloader": {
		"source": "iana",
		"extensions": [
			"igl"
		]
	},
	"application/vnd.immervision-ivp": {
		"source": "iana",
		"extensions": [
			"ivp"
		]
	},
	"application/vnd.immervision-ivu": {
		"source": "iana",
		"extensions": [
			"ivu"
		]
	},
	"application/vnd.ims.imsccv1p1": {
		"source": "iana"
	},
	"application/vnd.ims.imsccv1p2": {
		"source": "iana"
	},
	"application/vnd.ims.imsccv1p3": {
		"source": "iana"
	},
	"application/vnd.ims.lis.v2.result+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolproxy+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolproxy.id+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolsettings+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.ims.lti.v2.toolsettings.simple+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.informedcontrol.rms+xml": {
		"source": "iana"
	},
	"application/vnd.informix-visionary": {
		"source": "iana"
	},
	"application/vnd.infotech.project": {
		"source": "iana"
	},
	"application/vnd.infotech.project+xml": {
		"source": "iana"
	},
	"application/vnd.innopath.wamp.notification": {
		"source": "iana"
	},
	"application/vnd.insors.igm": {
		"source": "iana",
		"extensions": [
			"igm"
		]
	},
	"application/vnd.intercon.formnet": {
		"source": "iana",
		"extensions": [
			"xpw",
			"xpx"
		]
	},
	"application/vnd.intergeo": {
		"source": "iana",
		"extensions": [
			"i2g"
		]
	},
	"application/vnd.intertrust.digibox": {
		"source": "iana"
	},
	"application/vnd.intertrust.nncp": {
		"source": "iana"
	},
	"application/vnd.intu.qbo": {
		"source": "iana",
		"extensions": [
			"qbo"
		]
	},
	"application/vnd.intu.qfx": {
		"source": "iana",
		"extensions": [
			"qfx"
		]
	},
	"application/vnd.iptc.g2.catalogitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.conceptitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.knowledgeitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.newsitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.newsmessage+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.packageitem+xml": {
		"source": "iana"
	},
	"application/vnd.iptc.g2.planningitem+xml": {
		"source": "iana"
	},
	"application/vnd.ipunplugged.rcprofile": {
		"source": "iana",
		"extensions": [
			"rcprofile"
		]
	},
	"application/vnd.irepository.package+xml": {
		"source": "iana",
		"extensions": [
			"irp"
		]
	},
	"application/vnd.is-xpr": {
		"source": "iana",
		"extensions": [
			"xpr"
		]
	},
	"application/vnd.isac.fcs": {
		"source": "iana",
		"extensions": [
			"fcs"
		]
	},
	"application/vnd.jam": {
		"source": "iana",
		"extensions": [
			"jam"
		]
	},
	"application/vnd.japannet-directory-service": {
		"source": "iana"
	},
	"application/vnd.japannet-jpnstore-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-payment-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-registration": {
		"source": "iana"
	},
	"application/vnd.japannet-registration-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-setstore-wakeup": {
		"source": "iana"
	},
	"application/vnd.japannet-verification": {
		"source": "iana"
	},
	"application/vnd.japannet-verification-wakeup": {
		"source": "iana"
	},
	"application/vnd.jcp.javame.midlet-rms": {
		"source": "iana",
		"extensions": [
			"rms"
		]
	},
	"application/vnd.jisp": {
		"source": "iana",
		"extensions": [
			"jisp"
		]
	},
	"application/vnd.joost.joda-archive": {
		"source": "iana",
		"extensions": [
			"joda"
		]
	},
	"application/vnd.jsk.isdn-ngn": {
		"source": "iana"
	},
	"application/vnd.kahootz": {
		"source": "iana",
		"extensions": [
			"ktz",
			"ktr"
		]
	},
	"application/vnd.kde.karbon": {
		"source": "iana",
		"extensions": [
			"karbon"
		]
	},
	"application/vnd.kde.kchart": {
		"source": "iana",
		"extensions": [
			"chrt"
		]
	},
	"application/vnd.kde.kformula": {
		"source": "iana",
		"extensions": [
			"kfo"
		]
	},
	"application/vnd.kde.kivio": {
		"source": "iana",
		"extensions": [
			"flw"
		]
	},
	"application/vnd.kde.kontour": {
		"source": "iana",
		"extensions": [
			"kon"
		]
	},
	"application/vnd.kde.kpresenter": {
		"source": "iana",
		"extensions": [
			"kpr",
			"kpt"
		]
	},
	"application/vnd.kde.kspread": {
		"source": "iana",
		"extensions": [
			"ksp"
		]
	},
	"application/vnd.kde.kword": {
		"source": "iana",
		"extensions": [
			"kwd",
			"kwt"
		]
	},
	"application/vnd.kenameaapp": {
		"source": "iana",
		"extensions": [
			"htke"
		]
	},
	"application/vnd.kidspiration": {
		"source": "iana",
		"extensions": [
			"kia"
		]
	},
	"application/vnd.kinar": {
		"source": "iana",
		"extensions": [
			"kne",
			"knp"
		]
	},
	"application/vnd.koan": {
		"source": "iana",
		"extensions": [
			"skp",
			"skd",
			"skt",
			"skm"
		]
	},
	"application/vnd.kodak-descriptor": {
		"source": "iana",
		"extensions": [
			"sse"
		]
	},
	"application/vnd.las.las+xml": {
		"source": "iana",
		"extensions": [
			"lasxml"
		]
	},
	"application/vnd.liberty-request+xml": {
		"source": "iana"
	},
	"application/vnd.llamagraphics.life-balance.desktop": {
		"source": "iana",
		"extensions": [
			"lbd"
		]
	},
	"application/vnd.llamagraphics.life-balance.exchange+xml": {
		"source": "iana",
		"extensions": [
			"lbe"
		]
	},
	"application/vnd.lotus-1-2-3": {
		"source": "iana",
		"extensions": [
			"123"
		]
	},
	"application/vnd.lotus-approach": {
		"source": "iana",
		"extensions": [
			"apr"
		]
	},
	"application/vnd.lotus-freelance": {
		"source": "iana",
		"extensions": [
			"pre"
		]
	},
	"application/vnd.lotus-notes": {
		"source": "iana",
		"extensions": [
			"nsf"
		]
	},
	"application/vnd.lotus-organizer": {
		"source": "iana",
		"extensions": [
			"org"
		]
	},
	"application/vnd.lotus-screencam": {
		"source": "iana",
		"extensions": [
			"scm"
		]
	},
	"application/vnd.lotus-wordpro": {
		"source": "iana",
		"extensions": [
			"lwp"
		]
	},
	"application/vnd.macports.portpkg": {
		"source": "iana",
		"extensions": [
			"portpkg"
		]
	},
	"application/vnd.mapbox-vector-tile": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.actiontoken+xml": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.conftoken+xml": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.license+xml": {
		"source": "iana"
	},
	"application/vnd.marlin.drm.mdcf": {
		"source": "iana"
	},
	"application/vnd.mason+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.maxmind.maxmind-db": {
		"source": "iana"
	},
	"application/vnd.mcd": {
		"source": "iana",
		"extensions": [
			"mcd"
		]
	},
	"application/vnd.medcalcdata": {
		"source": "iana",
		"extensions": [
			"mc1"
		]
	},
	"application/vnd.mediastation.cdkey": {
		"source": "iana",
		"extensions": [
			"cdkey"
		]
	},
	"application/vnd.meridian-slingshot": {
		"source": "iana"
	},
	"application/vnd.mfer": {
		"source": "iana",
		"extensions": [
			"mwf"
		]
	},
	"application/vnd.mfmp": {
		"source": "iana",
		"extensions": [
			"mfm"
		]
	},
	"application/vnd.micro+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.micrografx.flo": {
		"source": "iana",
		"extensions": [
			"flo"
		]
	},
	"application/vnd.micrografx.igx": {
		"source": "iana",
		"extensions": [
			"igx"
		]
	},
	"application/vnd.microsoft.portable-executable": {
		"source": "iana"
	},
	"application/vnd.miele+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.mif": {
		"source": "iana",
		"extensions": [
			"mif"
		]
	},
	"application/vnd.minisoft-hp3000-save": {
		"source": "iana"
	},
	"application/vnd.mitsubishi.misty-guard.trustweb": {
		"source": "iana"
	},
	"application/vnd.mobius.daf": {
		"source": "iana",
		"extensions": [
			"daf"
		]
	},
	"application/vnd.mobius.dis": {
		"source": "iana",
		"extensions": [
			"dis"
		]
	},
	"application/vnd.mobius.mbk": {
		"source": "iana",
		"extensions": [
			"mbk"
		]
	},
	"application/vnd.mobius.mqy": {
		"source": "iana",
		"extensions": [
			"mqy"
		]
	},
	"application/vnd.mobius.msl": {
		"source": "iana",
		"extensions": [
			"msl"
		]
	},
	"application/vnd.mobius.plc": {
		"source": "iana",
		"extensions": [
			"plc"
		]
	},
	"application/vnd.mobius.txf": {
		"source": "iana",
		"extensions": [
			"txf"
		]
	},
	"application/vnd.mophun.application": {
		"source": "iana",
		"extensions": [
			"mpn"
		]
	},
	"application/vnd.mophun.certificate": {
		"source": "iana",
		"extensions": [
			"mpc"
		]
	},
	"application/vnd.motorola.flexsuite": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.adsi": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.fis": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.gotap": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.kmr": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.ttc": {
		"source": "iana"
	},
	"application/vnd.motorola.flexsuite.wem": {
		"source": "iana"
	},
	"application/vnd.motorola.iprm": {
		"source": "iana"
	},
	"application/vnd.mozilla.xul+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xul"
		]
	},
	"application/vnd.ms-3mfdocument": {
		"source": "iana"
	},
	"application/vnd.ms-artgalry": {
		"source": "iana",
		"extensions": [
			"cil"
		]
	},
	"application/vnd.ms-asf": {
		"source": "iana"
	},
	"application/vnd.ms-cab-compressed": {
		"source": "iana",
		"extensions": [
			"cab"
		]
	},
	"application/vnd.ms-color.iccprofile": {
		"source": "apache"
	},
	"application/vnd.ms-excel": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"xls",
			"xlm",
			"xla",
			"xlc",
			"xlt",
			"xlw"
		]
	},
	"application/vnd.ms-excel.addin.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xlam"
		]
	},
	"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xlsb"
		]
	},
	"application/vnd.ms-excel.sheet.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xlsm"
		]
	},
	"application/vnd.ms-excel.template.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"xltm"
		]
	},
	"application/vnd.ms-fontobject": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"eot"
		]
	},
	"application/vnd.ms-htmlhelp": {
		"source": "iana",
		"extensions": [
			"chm"
		]
	},
	"application/vnd.ms-ims": {
		"source": "iana",
		"extensions": [
			"ims"
		]
	},
	"application/vnd.ms-lrm": {
		"source": "iana",
		"extensions": [
			"lrm"
		]
	},
	"application/vnd.ms-office.activex+xml": {
		"source": "iana"
	},
	"application/vnd.ms-officetheme": {
		"source": "iana",
		"extensions": [
			"thmx"
		]
	},
	"application/vnd.ms-opentype": {
		"source": "apache",
		"compressible": true
	},
	"application/vnd.ms-package.obfuscated-opentype": {
		"source": "apache"
	},
	"application/vnd.ms-pki.seccat": {
		"source": "apache",
		"extensions": [
			"cat"
		]
	},
	"application/vnd.ms-pki.stl": {
		"source": "apache",
		"extensions": [
			"stl"
		]
	},
	"application/vnd.ms-playready.initiator+xml": {
		"source": "iana"
	},
	"application/vnd.ms-powerpoint": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"ppt",
			"pps",
			"pot"
		]
	},
	"application/vnd.ms-powerpoint.addin.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"ppam"
		]
	},
	"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"pptm"
		]
	},
	"application/vnd.ms-powerpoint.slide.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"sldm"
		]
	},
	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"ppsm"
		]
	},
	"application/vnd.ms-powerpoint.template.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"potm"
		]
	},
	"application/vnd.ms-printdevicecapabilities+xml": {
		"source": "iana"
	},
	"application/vnd.ms-printing.printticket+xml": {
		"source": "apache"
	},
	"application/vnd.ms-printschematicket+xml": {
		"source": "iana"
	},
	"application/vnd.ms-project": {
		"source": "iana",
		"extensions": [
			"mpp",
			"mpt"
		]
	},
	"application/vnd.ms-tnef": {
		"source": "iana"
	},
	"application/vnd.ms-windows.devicepairing": {
		"source": "iana"
	},
	"application/vnd.ms-windows.nwprinting.oob": {
		"source": "iana"
	},
	"application/vnd.ms-windows.printerpairing": {
		"source": "iana"
	},
	"application/vnd.ms-windows.wsd.oob": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.lic-chlg-req": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.lic-resp": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.meter-chlg-req": {
		"source": "iana"
	},
	"application/vnd.ms-wmdrm.meter-resp": {
		"source": "iana"
	},
	"application/vnd.ms-word.document.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"docm"
		]
	},
	"application/vnd.ms-word.template.macroenabled.12": {
		"source": "iana",
		"extensions": [
			"dotm"
		]
	},
	"application/vnd.ms-works": {
		"source": "iana",
		"extensions": [
			"wps",
			"wks",
			"wcm",
			"wdb"
		]
	},
	"application/vnd.ms-wpl": {
		"source": "iana",
		"extensions": [
			"wpl"
		]
	},
	"application/vnd.ms-xpsdocument": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"xps"
		]
	},
	"application/vnd.msa-disk-image": {
		"source": "iana"
	},
	"application/vnd.mseq": {
		"source": "iana",
		"extensions": [
			"mseq"
		]
	},
	"application/vnd.msign": {
		"source": "iana"
	},
	"application/vnd.multiad.creator": {
		"source": "iana"
	},
	"application/vnd.multiad.creator.cif": {
		"source": "iana"
	},
	"application/vnd.music-niff": {
		"source": "iana"
	},
	"application/vnd.musician": {
		"source": "iana",
		"extensions": [
			"mus"
		]
	},
	"application/vnd.muvee.style": {
		"source": "iana",
		"extensions": [
			"msty"
		]
	},
	"application/vnd.mynfc": {
		"source": "iana",
		"extensions": [
			"taglet"
		]
	},
	"application/vnd.ncd.control": {
		"source": "iana"
	},
	"application/vnd.ncd.reference": {
		"source": "iana"
	},
	"application/vnd.nearst.inv+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.nervana": {
		"source": "iana"
	},
	"application/vnd.netfpx": {
		"source": "iana"
	},
	"application/vnd.neurolanguage.nlu": {
		"source": "iana",
		"extensions": [
			"nlu"
		]
	},
	"application/vnd.nintendo.nitro.rom": {
		"source": "iana"
	},
	"application/vnd.nintendo.snes.rom": {
		"source": "iana"
	},
	"application/vnd.nitf": {
		"source": "iana",
		"extensions": [
			"ntf",
			"nitf"
		]
	},
	"application/vnd.noblenet-directory": {
		"source": "iana",
		"extensions": [
			"nnd"
		]
	},
	"application/vnd.noblenet-sealer": {
		"source": "iana",
		"extensions": [
			"nns"
		]
	},
	"application/vnd.noblenet-web": {
		"source": "iana",
		"extensions": [
			"nnw"
		]
	},
	"application/vnd.nokia.catalogs": {
		"source": "iana"
	},
	"application/vnd.nokia.conml+wbxml": {
		"source": "iana"
	},
	"application/vnd.nokia.conml+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.iptv.config+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.isds-radio-presets": {
		"source": "iana"
	},
	"application/vnd.nokia.landmark+wbxml": {
		"source": "iana"
	},
	"application/vnd.nokia.landmark+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.landmarkcollection+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.n-gage.ac+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.n-gage.data": {
		"source": "iana",
		"extensions": [
			"ngdat"
		]
	},
	"application/vnd.nokia.n-gage.symbian.install": {
		"source": "iana",
		"extensions": [
			"n-gage"
		]
	},
	"application/vnd.nokia.ncd": {
		"source": "iana"
	},
	"application/vnd.nokia.pcd+wbxml": {
		"source": "iana"
	},
	"application/vnd.nokia.pcd+xml": {
		"source": "iana"
	},
	"application/vnd.nokia.radio-preset": {
		"source": "iana",
		"extensions": [
			"rpst"
		]
	},
	"application/vnd.nokia.radio-presets": {
		"source": "iana",
		"extensions": [
			"rpss"
		]
	},
	"application/vnd.novadigm.edm": {
		"source": "iana",
		"extensions": [
			"edm"
		]
	},
	"application/vnd.novadigm.edx": {
		"source": "iana",
		"extensions": [
			"edx"
		]
	},
	"application/vnd.novadigm.ext": {
		"source": "iana",
		"extensions": [
			"ext"
		]
	},
	"application/vnd.ntt-local.content-share": {
		"source": "iana"
	},
	"application/vnd.ntt-local.file-transfer": {
		"source": "iana"
	},
	"application/vnd.ntt-local.ogw_remote-access": {
		"source": "iana"
	},
	"application/vnd.ntt-local.sip-ta_remote": {
		"source": "iana"
	},
	"application/vnd.ntt-local.sip-ta_tcp_stream": {
		"source": "iana"
	},
	"application/vnd.oasis.opendocument.chart": {
		"source": "iana",
		"extensions": [
			"odc"
		]
	},
	"application/vnd.oasis.opendocument.chart-template": {
		"source": "iana",
		"extensions": [
			"otc"
		]
	},
	"application/vnd.oasis.opendocument.database": {
		"source": "iana",
		"extensions": [
			"odb"
		]
	},
	"application/vnd.oasis.opendocument.formula": {
		"source": "iana",
		"extensions": [
			"odf"
		]
	},
	"application/vnd.oasis.opendocument.formula-template": {
		"source": "iana",
		"extensions": [
			"odft"
		]
	},
	"application/vnd.oasis.opendocument.graphics": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"odg"
		]
	},
	"application/vnd.oasis.opendocument.graphics-template": {
		"source": "iana",
		"extensions": [
			"otg"
		]
	},
	"application/vnd.oasis.opendocument.image": {
		"source": "iana",
		"extensions": [
			"odi"
		]
	},
	"application/vnd.oasis.opendocument.image-template": {
		"source": "iana",
		"extensions": [
			"oti"
		]
	},
	"application/vnd.oasis.opendocument.presentation": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"odp"
		]
	},
	"application/vnd.oasis.opendocument.presentation-template": {
		"source": "iana",
		"extensions": [
			"otp"
		]
	},
	"application/vnd.oasis.opendocument.spreadsheet": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"ods"
		]
	},
	"application/vnd.oasis.opendocument.spreadsheet-template": {
		"source": "iana",
		"extensions": [
			"ots"
		]
	},
	"application/vnd.oasis.opendocument.text": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"odt"
		]
	},
	"application/vnd.oasis.opendocument.text-master": {
		"source": "iana",
		"extensions": [
			"odm"
		]
	},
	"application/vnd.oasis.opendocument.text-template": {
		"source": "iana",
		"extensions": [
			"ott"
		]
	},
	"application/vnd.oasis.opendocument.text-web": {
		"source": "iana",
		"extensions": [
			"oth"
		]
	},
	"application/vnd.obn": {
		"source": "iana"
	},
	"application/vnd.oftn.l10n+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.oipf.contentaccessdownload+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.contentaccessstreaming+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.cspg-hexbinary": {
		"source": "iana"
	},
	"application/vnd.oipf.dae.svg+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.dae.xhtml+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.mippvcontrolmessage+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.pae.gem": {
		"source": "iana"
	},
	"application/vnd.oipf.spdiscovery+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.spdlist+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.ueprofile+xml": {
		"source": "iana"
	},
	"application/vnd.oipf.userprofile+xml": {
		"source": "iana"
	},
	"application/vnd.olpc-sugar": {
		"source": "iana",
		"extensions": [
			"xo"
		]
	},
	"application/vnd.oma-scws-config": {
		"source": "iana"
	},
	"application/vnd.oma-scws-http-request": {
		"source": "iana"
	},
	"application/vnd.oma-scws-http-response": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.drm-trigger+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.imd+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.ltkm": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.notification+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.provisioningtrigger": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sgboot": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sgdd+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sgdu": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.simple-symbol-container": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.smartcard-trigger+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.sprov+xml": {
		"source": "iana"
	},
	"application/vnd.oma.bcast.stkm": {
		"source": "iana"
	},
	"application/vnd.oma.cab-address-book+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-feature-handler+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-pcc+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-subs-invite+xml": {
		"source": "iana"
	},
	"application/vnd.oma.cab-user-prefs+xml": {
		"source": "iana"
	},
	"application/vnd.oma.dcd": {
		"source": "iana"
	},
	"application/vnd.oma.dcdc": {
		"source": "iana"
	},
	"application/vnd.oma.dd2+xml": {
		"source": "iana",
		"extensions": [
			"dd2"
		]
	},
	"application/vnd.oma.drm.risd+xml": {
		"source": "iana"
	},
	"application/vnd.oma.group-usage-list+xml": {
		"source": "iana"
	},
	"application/vnd.oma.lwm2m+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.oma.lwm2m+tlv": {
		"source": "iana"
	},
	"application/vnd.oma.pal+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.detailed-progress-report+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.final-report+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.groups+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.invocation-descriptor+xml": {
		"source": "iana"
	},
	"application/vnd.oma.poc.optimized-progress-report+xml": {
		"source": "iana"
	},
	"application/vnd.oma.push": {
		"source": "iana"
	},
	"application/vnd.oma.scidm.messages+xml": {
		"source": "iana"
	},
	"application/vnd.oma.xcap-directory+xml": {
		"source": "iana"
	},
	"application/vnd.omads-email+xml": {
		"source": "iana"
	},
	"application/vnd.omads-file+xml": {
		"source": "iana"
	},
	"application/vnd.omads-folder+xml": {
		"source": "iana"
	},
	"application/vnd.omaloc-supl-init": {
		"source": "iana"
	},
	"application/vnd.onepager": {
		"source": "iana"
	},
	"application/vnd.openblox.game+xml": {
		"source": "iana"
	},
	"application/vnd.openblox.game-binary": {
		"source": "iana"
	},
	"application/vnd.openeye.oeb": {
		"source": "iana"
	},
	"application/vnd.openofficeorg.extension": {
		"source": "apache",
		"extensions": [
			"oxt"
		]
	},
	"application/vnd.openstreetmap.data+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawing+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml-template": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"pptx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slide": {
		"source": "iana",
		"extensions": [
			"sldx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
		"source": "iana",
		"extensions": [
			"ppsx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.template": {
		"source": "apache",
		"extensions": [
			"potx"
		]
	},
	"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"xlsx"
		]
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
		"source": "apache",
		"extensions": [
			"xltx"
		]
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.theme+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.vmldrawing": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"docx"
		]
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
		"source": "apache",
		"extensions": [
			"dotx"
		]
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-package.core-properties+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
		"source": "iana"
	},
	"application/vnd.openxmlformats-package.relationships+xml": {
		"source": "iana"
	},
	"application/vnd.oracle.resource+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.orange.indata": {
		"source": "iana"
	},
	"application/vnd.osa.netdeploy": {
		"source": "iana"
	},
	"application/vnd.osgeo.mapguide.package": {
		"source": "iana",
		"extensions": [
			"mgp"
		]
	},
	"application/vnd.osgi.bundle": {
		"source": "iana"
	},
	"application/vnd.osgi.dp": {
		"source": "iana",
		"extensions": [
			"dp"
		]
	},
	"application/vnd.osgi.subsystem": {
		"source": "iana",
		"extensions": [
			"esa"
		]
	},
	"application/vnd.otps.ct-kip+xml": {
		"source": "iana"
	},
	"application/vnd.oxli.countgraph": {
		"source": "iana"
	},
	"application/vnd.pagerduty+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.palm": {
		"source": "iana",
		"extensions": [
			"pdb",
			"pqa",
			"oprc"
		]
	},
	"application/vnd.panoply": {
		"source": "iana"
	},
	"application/vnd.paos+xml": {
		"source": "iana"
	},
	"application/vnd.paos.xml": {
		"source": "apache"
	},
	"application/vnd.pawaafile": {
		"source": "iana",
		"extensions": [
			"paw"
		]
	},
	"application/vnd.pcos": {
		"source": "iana"
	},
	"application/vnd.pg.format": {
		"source": "iana",
		"extensions": [
			"str"
		]
	},
	"application/vnd.pg.osasli": {
		"source": "iana",
		"extensions": [
			"ei6"
		]
	},
	"application/vnd.piaccess.application-licence": {
		"source": "iana"
	},
	"application/vnd.picsel": {
		"source": "iana",
		"extensions": [
			"efif"
		]
	},
	"application/vnd.pmi.widget": {
		"source": "iana",
		"extensions": [
			"wg"
		]
	},
	"application/vnd.poc.group-advertisement+xml": {
		"source": "iana"
	},
	"application/vnd.pocketlearn": {
		"source": "iana",
		"extensions": [
			"plf"
		]
	},
	"application/vnd.powerbuilder6": {
		"source": "iana",
		"extensions": [
			"pbd"
		]
	},
	"application/vnd.powerbuilder6-s": {
		"source": "iana"
	},
	"application/vnd.powerbuilder7": {
		"source": "iana"
	},
	"application/vnd.powerbuilder7-s": {
		"source": "iana"
	},
	"application/vnd.powerbuilder75": {
		"source": "iana"
	},
	"application/vnd.powerbuilder75-s": {
		"source": "iana"
	},
	"application/vnd.preminet": {
		"source": "iana"
	},
	"application/vnd.previewsystems.box": {
		"source": "iana",
		"extensions": [
			"box"
		]
	},
	"application/vnd.proteus.magazine": {
		"source": "iana",
		"extensions": [
			"mgz"
		]
	},
	"application/vnd.publishare-delta-tree": {
		"source": "iana",
		"extensions": [
			"qps"
		]
	},
	"application/vnd.pvi.ptid1": {
		"source": "iana",
		"extensions": [
			"ptid"
		]
	},
	"application/vnd.pwg-multiplexed": {
		"source": "iana"
	},
	"application/vnd.pwg-xhtml-print+xml": {
		"source": "iana"
	},
	"application/vnd.qualcomm.brew-app-res": {
		"source": "iana"
	},
	"application/vnd.quarantainenet": {
		"source": "iana"
	},
	"application/vnd.quark.quarkxpress": {
		"source": "iana",
		"extensions": [
			"qxd",
			"qxt",
			"qwd",
			"qwt",
			"qxl",
			"qxb"
		]
	},
	"application/vnd.quobject-quoxdocument": {
		"source": "iana"
	},
	"application/vnd.radisys.moml+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-conf+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-conn+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-dialog+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-audit-stream+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-conf+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-base+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-fax-detect+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-group+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-speech+xml": {
		"source": "iana"
	},
	"application/vnd.radisys.msml-dialog-transform+xml": {
		"source": "iana"
	},
	"application/vnd.rainstor.data": {
		"source": "iana"
	},
	"application/vnd.rapid": {
		"source": "iana"
	},
	"application/vnd.rar": {
		"source": "iana"
	},
	"application/vnd.realvnc.bed": {
		"source": "iana",
		"extensions": [
			"bed"
		]
	},
	"application/vnd.recordare.musicxml": {
		"source": "iana",
		"extensions": [
			"mxl"
		]
	},
	"application/vnd.recordare.musicxml+xml": {
		"source": "iana",
		"extensions": [
			"musicxml"
		]
	},
	"application/vnd.renlearn.rlprint": {
		"source": "iana"
	},
	"application/vnd.rig.cryptonote": {
		"source": "iana",
		"extensions": [
			"cryptonote"
		]
	},
	"application/vnd.rim.cod": {
		"source": "apache",
		"extensions": [
			"cod"
		]
	},
	"application/vnd.rn-realmedia": {
		"source": "apache",
		"extensions": [
			"rm"
		]
	},
	"application/vnd.rn-realmedia-vbr": {
		"source": "apache",
		"extensions": [
			"rmvb"
		]
	},
	"application/vnd.route66.link66+xml": {
		"source": "iana",
		"extensions": [
			"link66"
		]
	},
	"application/vnd.rs-274x": {
		"source": "iana"
	},
	"application/vnd.ruckus.download": {
		"source": "iana"
	},
	"application/vnd.s3sms": {
		"source": "iana"
	},
	"application/vnd.sailingtracker.track": {
		"source": "iana",
		"extensions": [
			"st"
		]
	},
	"application/vnd.sbm.cid": {
		"source": "iana"
	},
	"application/vnd.sbm.mid2": {
		"source": "iana"
	},
	"application/vnd.scribus": {
		"source": "iana"
	},
	"application/vnd.sealed.3df": {
		"source": "iana"
	},
	"application/vnd.sealed.csf": {
		"source": "iana"
	},
	"application/vnd.sealed.doc": {
		"source": "iana"
	},
	"application/vnd.sealed.eml": {
		"source": "iana"
	},
	"application/vnd.sealed.mht": {
		"source": "iana"
	},
	"application/vnd.sealed.net": {
		"source": "iana"
	},
	"application/vnd.sealed.ppt": {
		"source": "iana"
	},
	"application/vnd.sealed.tiff": {
		"source": "iana"
	},
	"application/vnd.sealed.xls": {
		"source": "iana"
	},
	"application/vnd.sealedmedia.softseal.html": {
		"source": "iana"
	},
	"application/vnd.sealedmedia.softseal.pdf": {
		"source": "iana"
	},
	"application/vnd.seemail": {
		"source": "iana",
		"extensions": [
			"see"
		]
	},
	"application/vnd.sema": {
		"source": "iana",
		"extensions": [
			"sema"
		]
	},
	"application/vnd.semd": {
		"source": "iana",
		"extensions": [
			"semd"
		]
	},
	"application/vnd.semf": {
		"source": "iana",
		"extensions": [
			"semf"
		]
	},
	"application/vnd.shana.informed.formdata": {
		"source": "iana",
		"extensions": [
			"ifm"
		]
	},
	"application/vnd.shana.informed.formtemplate": {
		"source": "iana",
		"extensions": [
			"itp"
		]
	},
	"application/vnd.shana.informed.interchange": {
		"source": "iana",
		"extensions": [
			"iif"
		]
	},
	"application/vnd.shana.informed.package": {
		"source": "iana",
		"extensions": [
			"ipk"
		]
	},
	"application/vnd.simtech-mindmapper": {
		"source": "iana",
		"extensions": [
			"twd",
			"twds"
		]
	},
	"application/vnd.siren+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.smaf": {
		"source": "iana",
		"extensions": [
			"mmf"
		]
	},
	"application/vnd.smart.notebook": {
		"source": "iana"
	},
	"application/vnd.smart.teacher": {
		"source": "iana",
		"extensions": [
			"teacher"
		]
	},
	"application/vnd.software602.filler.form+xml": {
		"source": "iana"
	},
	"application/vnd.software602.filler.form-xml-zip": {
		"source": "iana"
	},
	"application/vnd.solent.sdkm+xml": {
		"source": "iana",
		"extensions": [
			"sdkm",
			"sdkd"
		]
	},
	"application/vnd.spotfire.dxp": {
		"source": "iana",
		"extensions": [
			"dxp"
		]
	},
	"application/vnd.spotfire.sfs": {
		"source": "iana",
		"extensions": [
			"sfs"
		]
	},
	"application/vnd.sss-cod": {
		"source": "iana"
	},
	"application/vnd.sss-dtf": {
		"source": "iana"
	},
	"application/vnd.sss-ntf": {
		"source": "iana"
	},
	"application/vnd.stardivision.calc": {
		"source": "apache",
		"extensions": [
			"sdc"
		]
	},
	"application/vnd.stardivision.draw": {
		"source": "apache",
		"extensions": [
			"sda"
		]
	},
	"application/vnd.stardivision.impress": {
		"source": "apache",
		"extensions": [
			"sdd"
		]
	},
	"application/vnd.stardivision.math": {
		"source": "apache",
		"extensions": [
			"smf"
		]
	},
	"application/vnd.stardivision.writer": {
		"source": "apache",
		"extensions": [
			"sdw",
			"vor"
		]
	},
	"application/vnd.stardivision.writer-global": {
		"source": "apache",
		"extensions": [
			"sgl"
		]
	},
	"application/vnd.stepmania.package": {
		"source": "iana",
		"extensions": [
			"smzip"
		]
	},
	"application/vnd.stepmania.stepchart": {
		"source": "iana",
		"extensions": [
			"sm"
		]
	},
	"application/vnd.street-stream": {
		"source": "iana"
	},
	"application/vnd.sun.wadl+xml": {
		"source": "iana"
	},
	"application/vnd.sun.xml.calc": {
		"source": "apache",
		"extensions": [
			"sxc"
		]
	},
	"application/vnd.sun.xml.calc.template": {
		"source": "apache",
		"extensions": [
			"stc"
		]
	},
	"application/vnd.sun.xml.draw": {
		"source": "apache",
		"extensions": [
			"sxd"
		]
	},
	"application/vnd.sun.xml.draw.template": {
		"source": "apache",
		"extensions": [
			"std"
		]
	},
	"application/vnd.sun.xml.impress": {
		"source": "apache",
		"extensions": [
			"sxi"
		]
	},
	"application/vnd.sun.xml.impress.template": {
		"source": "apache",
		"extensions": [
			"sti"
		]
	},
	"application/vnd.sun.xml.math": {
		"source": "apache",
		"extensions": [
			"sxm"
		]
	},
	"application/vnd.sun.xml.writer": {
		"source": "apache",
		"extensions": [
			"sxw"
		]
	},
	"application/vnd.sun.xml.writer.global": {
		"source": "apache",
		"extensions": [
			"sxg"
		]
	},
	"application/vnd.sun.xml.writer.template": {
		"source": "apache",
		"extensions": [
			"stw"
		]
	},
	"application/vnd.sus-calendar": {
		"source": "iana",
		"extensions": [
			"sus",
			"susp"
		]
	},
	"application/vnd.svd": {
		"source": "iana",
		"extensions": [
			"svd"
		]
	},
	"application/vnd.swiftview-ics": {
		"source": "iana"
	},
	"application/vnd.symbian.install": {
		"source": "apache",
		"extensions": [
			"sis",
			"sisx"
		]
	},
	"application/vnd.syncml+xml": {
		"source": "iana",
		"extensions": [
			"xsm"
		]
	},
	"application/vnd.syncml.dm+wbxml": {
		"source": "iana",
		"extensions": [
			"bdm"
		]
	},
	"application/vnd.syncml.dm+xml": {
		"source": "iana",
		"extensions": [
			"xdm"
		]
	},
	"application/vnd.syncml.dm.notification": {
		"source": "iana"
	},
	"application/vnd.syncml.dmddf+wbxml": {
		"source": "iana"
	},
	"application/vnd.syncml.dmddf+xml": {
		"source": "iana"
	},
	"application/vnd.syncml.dmtnds+wbxml": {
		"source": "iana"
	},
	"application/vnd.syncml.dmtnds+xml": {
		"source": "iana"
	},
	"application/vnd.syncml.ds.notification": {
		"source": "iana"
	},
	"application/vnd.tableschema+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.tao.intent-module-archive": {
		"source": "iana",
		"extensions": [
			"tao"
		]
	},
	"application/vnd.tcpdump.pcap": {
		"source": "iana",
		"extensions": [
			"pcap",
			"cap",
			"dmp"
		]
	},
	"application/vnd.tmd.mediaflex.api+xml": {
		"source": "iana"
	},
	"application/vnd.tml": {
		"source": "iana"
	},
	"application/vnd.tmobile-livetv": {
		"source": "iana",
		"extensions": [
			"tmo"
		]
	},
	"application/vnd.tri.onesource": {
		"source": "iana"
	},
	"application/vnd.trid.tpt": {
		"source": "iana",
		"extensions": [
			"tpt"
		]
	},
	"application/vnd.triscape.mxs": {
		"source": "iana",
		"extensions": [
			"mxs"
		]
	},
	"application/vnd.trueapp": {
		"source": "iana",
		"extensions": [
			"tra"
		]
	},
	"application/vnd.truedoc": {
		"source": "iana"
	},
	"application/vnd.ubisoft.webplayer": {
		"source": "iana"
	},
	"application/vnd.ufdl": {
		"source": "iana",
		"extensions": [
			"ufd",
			"ufdl"
		]
	},
	"application/vnd.uiq.theme": {
		"source": "iana",
		"extensions": [
			"utz"
		]
	},
	"application/vnd.umajin": {
		"source": "iana",
		"extensions": [
			"umj"
		]
	},
	"application/vnd.unity": {
		"source": "iana",
		"extensions": [
			"unityweb"
		]
	},
	"application/vnd.uoml+xml": {
		"source": "iana",
		"extensions": [
			"uoml"
		]
	},
	"application/vnd.uplanet.alert": {
		"source": "iana"
	},
	"application/vnd.uplanet.alert-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.bearer-choice": {
		"source": "iana"
	},
	"application/vnd.uplanet.bearer-choice-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.cacheop": {
		"source": "iana"
	},
	"application/vnd.uplanet.cacheop-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.channel": {
		"source": "iana"
	},
	"application/vnd.uplanet.channel-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.list": {
		"source": "iana"
	},
	"application/vnd.uplanet.list-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.listcmd": {
		"source": "iana"
	},
	"application/vnd.uplanet.listcmd-wbxml": {
		"source": "iana"
	},
	"application/vnd.uplanet.signal": {
		"source": "iana"
	},
	"application/vnd.uri-map": {
		"source": "iana"
	},
	"application/vnd.valve.source.material": {
		"source": "iana"
	},
	"application/vnd.vcx": {
		"source": "iana",
		"extensions": [
			"vcx"
		]
	},
	"application/vnd.vd-study": {
		"source": "iana"
	},
	"application/vnd.vectorworks": {
		"source": "iana"
	},
	"application/vnd.vel+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.verimatrix.vcas": {
		"source": "iana"
	},
	"application/vnd.vidsoft.vidconference": {
		"source": "iana"
	},
	"application/vnd.visio": {
		"source": "iana",
		"extensions": [
			"vsd",
			"vst",
			"vss",
			"vsw"
		]
	},
	"application/vnd.visionary": {
		"source": "iana",
		"extensions": [
			"vis"
		]
	},
	"application/vnd.vividence.scriptfile": {
		"source": "iana"
	},
	"application/vnd.vsf": {
		"source": "iana",
		"extensions": [
			"vsf"
		]
	},
	"application/vnd.wap.sic": {
		"source": "iana"
	},
	"application/vnd.wap.slc": {
		"source": "iana"
	},
	"application/vnd.wap.wbxml": {
		"source": "iana",
		"extensions": [
			"wbxml"
		]
	},
	"application/vnd.wap.wmlc": {
		"source": "iana",
		"extensions": [
			"wmlc"
		]
	},
	"application/vnd.wap.wmlscriptc": {
		"source": "iana",
		"extensions": [
			"wmlsc"
		]
	},
	"application/vnd.webturbo": {
		"source": "iana",
		"extensions": [
			"wtb"
		]
	},
	"application/vnd.wfa.p2p": {
		"source": "iana"
	},
	"application/vnd.wfa.wsc": {
		"source": "iana"
	},
	"application/vnd.windows.devicepairing": {
		"source": "iana"
	},
	"application/vnd.wmc": {
		"source": "iana"
	},
	"application/vnd.wmf.bootstrap": {
		"source": "iana"
	},
	"application/vnd.wolfram.mathematica": {
		"source": "iana"
	},
	"application/vnd.wolfram.mathematica.package": {
		"source": "iana"
	},
	"application/vnd.wolfram.player": {
		"source": "iana",
		"extensions": [
			"nbp"
		]
	},
	"application/vnd.wordperfect": {
		"source": "iana",
		"extensions": [
			"wpd"
		]
	},
	"application/vnd.wqd": {
		"source": "iana",
		"extensions": [
			"wqd"
		]
	},
	"application/vnd.wrq-hp3000-labelled": {
		"source": "iana"
	},
	"application/vnd.wt.stf": {
		"source": "iana",
		"extensions": [
			"stf"
		]
	},
	"application/vnd.wv.csp+wbxml": {
		"source": "iana"
	},
	"application/vnd.wv.csp+xml": {
		"source": "iana"
	},
	"application/vnd.wv.ssp+xml": {
		"source": "iana"
	},
	"application/vnd.xacml+json": {
		"source": "iana",
		"compressible": true
	},
	"application/vnd.xara": {
		"source": "iana",
		"extensions": [
			"xar"
		]
	},
	"application/vnd.xfdl": {
		"source": "iana",
		"extensions": [
			"xfdl"
		]
	},
	"application/vnd.xfdl.webform": {
		"source": "iana"
	},
	"application/vnd.xmi+xml": {
		"source": "iana"
	},
	"application/vnd.xmpie.cpkg": {
		"source": "iana"
	},
	"application/vnd.xmpie.dpkg": {
		"source": "iana"
	},
	"application/vnd.xmpie.plan": {
		"source": "iana"
	},
	"application/vnd.xmpie.ppkg": {
		"source": "iana"
	},
	"application/vnd.xmpie.xlim": {
		"source": "iana"
	},
	"application/vnd.yamaha.hv-dic": {
		"source": "iana",
		"extensions": [
			"hvd"
		]
	},
	"application/vnd.yamaha.hv-script": {
		"source": "iana",
		"extensions": [
			"hvs"
		]
	},
	"application/vnd.yamaha.hv-voice": {
		"source": "iana",
		"extensions": [
			"hvp"
		]
	},
	"application/vnd.yamaha.openscoreformat": {
		"source": "iana",
		"extensions": [
			"osf"
		]
	},
	"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
		"source": "iana",
		"extensions": [
			"osfpvg"
		]
	},
	"application/vnd.yamaha.remote-setup": {
		"source": "iana"
	},
	"application/vnd.yamaha.smaf-audio": {
		"source": "iana",
		"extensions": [
			"saf"
		]
	},
	"application/vnd.yamaha.smaf-phrase": {
		"source": "iana",
		"extensions": [
			"spf"
		]
	},
	"application/vnd.yamaha.through-ngn": {
		"source": "iana"
	},
	"application/vnd.yamaha.tunnel-udpencap": {
		"source": "iana"
	},
	"application/vnd.yaoweme": {
		"source": "iana"
	},
	"application/vnd.yellowriver-custom-menu": {
		"source": "iana",
		"extensions": [
			"cmp"
		]
	},
	"application/vnd.zul": {
		"source": "iana",
		"extensions": [
			"zir",
			"zirz"
		]
	},
	"application/vnd.zzazz.deck+xml": {
		"source": "iana",
		"extensions": [
			"zaz"
		]
	},
	"application/voicexml+xml": {
		"source": "iana",
		"extensions": [
			"vxml"
		]
	},
	"application/vq-rtcpxr": {
		"source": "iana"
	},
	"application/watcherinfo+xml": {
		"source": "iana"
	},
	"application/whoispp-query": {
		"source": "iana"
	},
	"application/whoispp-response": {
		"source": "iana"
	},
	"application/widget": {
		"source": "iana",
		"extensions": [
			"wgt"
		]
	},
	"application/winhlp": {
		"source": "apache",
		"extensions": [
			"hlp"
		]
	},
	"application/wita": {
		"source": "iana"
	},
	"application/wordperfect5.1": {
		"source": "iana"
	},
	"application/wsdl+xml": {
		"source": "iana",
		"extensions": [
			"wsdl"
		]
	},
	"application/wspolicy+xml": {
		"source": "iana",
		"extensions": [
			"wspolicy"
		]
	},
	"application/x-7z-compressed": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"7z"
		]
	},
	"application/x-abiword": {
		"source": "apache",
		"extensions": [
			"abw"
		]
	},
	"application/x-ace-compressed": {
		"source": "apache",
		"extensions": [
			"ace"
		]
	},
	"application/x-amf": {
		"source": "apache"
	},
	"application/x-apple-diskimage": {
		"source": "apache",
		"extensions": [
			"dmg"
		]
	},
	"application/x-authorware-bin": {
		"source": "apache",
		"extensions": [
			"aab",
			"x32",
			"u32",
			"vox"
		]
	},
	"application/x-authorware-map": {
		"source": "apache",
		"extensions": [
			"aam"
		]
	},
	"application/x-authorware-seg": {
		"source": "apache",
		"extensions": [
			"aas"
		]
	},
	"application/x-bcpio": {
		"source": "apache",
		"extensions": [
			"bcpio"
		]
	},
	"application/x-bdoc": {
		"compressible": false,
		"extensions": [
			"bdoc"
		]
	},
	"application/x-bittorrent": {
		"source": "apache",
		"extensions": [
			"torrent"
		]
	},
	"application/x-blorb": {
		"source": "apache",
		"extensions": [
			"blb",
			"blorb"
		]
	},
	"application/x-bzip": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"bz"
		]
	},
	"application/x-bzip2": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"bz2",
			"boz"
		]
	},
	"application/x-cbr": {
		"source": "apache",
		"extensions": [
			"cbr",
			"cba",
			"cbt",
			"cbz",
			"cb7"
		]
	},
	"application/x-cdlink": {
		"source": "apache",
		"extensions": [
			"vcd"
		]
	},
	"application/x-cfs-compressed": {
		"source": "apache",
		"extensions": [
			"cfs"
		]
	},
	"application/x-chat": {
		"source": "apache",
		"extensions": [
			"chat"
		]
	},
	"application/x-chess-pgn": {
		"source": "apache",
		"extensions": [
			"pgn"
		]
	},
	"application/x-chrome-extension": {
		"extensions": [
			"crx"
		]
	},
	"application/x-cocoa": {
		"source": "nginx",
		"extensions": [
			"cco"
		]
	},
	"application/x-compress": {
		"source": "apache"
	},
	"application/x-conference": {
		"source": "apache",
		"extensions": [
			"nsc"
		]
	},
	"application/x-cpio": {
		"source": "apache",
		"extensions": [
			"cpio"
		]
	},
	"application/x-csh": {
		"source": "apache",
		"extensions": [
			"csh"
		]
	},
	"application/x-deb": {
		"compressible": false
	},
	"application/x-debian-package": {
		"source": "apache",
		"extensions": [
			"deb",
			"udeb"
		]
	},
	"application/x-dgc-compressed": {
		"source": "apache",
		"extensions": [
			"dgc"
		]
	},
	"application/x-director": {
		"source": "apache",
		"extensions": [
			"dir",
			"dcr",
			"dxr",
			"cst",
			"cct",
			"cxt",
			"w3d",
			"fgd",
			"swa"
		]
	},
	"application/x-doom": {
		"source": "apache",
		"extensions": [
			"wad"
		]
	},
	"application/x-dtbncx+xml": {
		"source": "apache",
		"extensions": [
			"ncx"
		]
	},
	"application/x-dtbook+xml": {
		"source": "apache",
		"extensions": [
			"dtb"
		]
	},
	"application/x-dtbresource+xml": {
		"source": "apache",
		"extensions": [
			"res"
		]
	},
	"application/x-dvi": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"dvi"
		]
	},
	"application/x-envoy": {
		"source": "apache",
		"extensions": [
			"evy"
		]
	},
	"application/x-eva": {
		"source": "apache",
		"extensions": [
			"eva"
		]
	},
	"application/x-font-bdf": {
		"source": "apache",
		"extensions": [
			"bdf"
		]
	},
	"application/x-font-dos": {
		"source": "apache"
	},
	"application/x-font-framemaker": {
		"source": "apache"
	},
	"application/x-font-ghostscript": {
		"source": "apache",
		"extensions": [
			"gsf"
		]
	},
	"application/x-font-libgrx": {
		"source": "apache"
	},
	"application/x-font-linux-psf": {
		"source": "apache",
		"extensions": [
			"psf"
		]
	},
	"application/x-font-otf": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"otf"
		]
	},
	"application/x-font-pcf": {
		"source": "apache",
		"extensions": [
			"pcf"
		]
	},
	"application/x-font-snf": {
		"source": "apache",
		"extensions": [
			"snf"
		]
	},
	"application/x-font-speedo": {
		"source": "apache"
	},
	"application/x-font-sunos-news": {
		"source": "apache"
	},
	"application/x-font-ttf": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"ttf",
			"ttc"
		]
	},
	"application/x-font-type1": {
		"source": "apache",
		"extensions": [
			"pfa",
			"pfb",
			"pfm",
			"afm"
		]
	},
	"application/x-font-vfont": {
		"source": "apache"
	},
	"application/x-freearc": {
		"source": "apache",
		"extensions": [
			"arc"
		]
	},
	"application/x-futuresplash": {
		"source": "apache",
		"extensions": [
			"spl"
		]
	},
	"application/x-gca-compressed": {
		"source": "apache",
		"extensions": [
			"gca"
		]
	},
	"application/x-glulx": {
		"source": "apache",
		"extensions": [
			"ulx"
		]
	},
	"application/x-gnumeric": {
		"source": "apache",
		"extensions": [
			"gnumeric"
		]
	},
	"application/x-gramps-xml": {
		"source": "apache",
		"extensions": [
			"gramps"
		]
	},
	"application/x-gtar": {
		"source": "apache",
		"extensions": [
			"gtar"
		]
	},
	"application/x-gzip": {
		"source": "apache"
	},
	"application/x-hdf": {
		"source": "apache",
		"extensions": [
			"hdf"
		]
	},
	"application/x-httpd-php": {
		"compressible": true,
		"extensions": [
			"php"
		]
	},
	"application/x-install-instructions": {
		"source": "apache",
		"extensions": [
			"install"
		]
	},
	"application/x-iso9660-image": {
		"source": "apache",
		"extensions": [
			"iso"
		]
	},
	"application/x-java-archive-diff": {
		"source": "nginx",
		"extensions": [
			"jardiff"
		]
	},
	"application/x-java-jnlp-file": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"jnlp"
		]
	},
	"application/x-javascript": {
		"compressible": true
	},
	"application/x-latex": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"latex"
		]
	},
	"application/x-lua-bytecode": {
		"extensions": [
			"luac"
		]
	},
	"application/x-lzh-compressed": {
		"source": "apache",
		"extensions": [
			"lzh",
			"lha"
		]
	},
	"application/x-makeself": {
		"source": "nginx",
		"extensions": [
			"run"
		]
	},
	"application/x-mie": {
		"source": "apache",
		"extensions": [
			"mie"
		]
	},
	"application/x-mobipocket-ebook": {
		"source": "apache",
		"extensions": [
			"prc",
			"mobi"
		]
	},
	"application/x-mpegurl": {
		"compressible": false
	},
	"application/x-ms-application": {
		"source": "apache",
		"extensions": [
			"application"
		]
	},
	"application/x-ms-shortcut": {
		"source": "apache",
		"extensions": [
			"lnk"
		]
	},
	"application/x-ms-wmd": {
		"source": "apache",
		"extensions": [
			"wmd"
		]
	},
	"application/x-ms-wmz": {
		"source": "apache",
		"extensions": [
			"wmz"
		]
	},
	"application/x-ms-xbap": {
		"source": "apache",
		"extensions": [
			"xbap"
		]
	},
	"application/x-msaccess": {
		"source": "apache",
		"extensions": [
			"mdb"
		]
	},
	"application/x-msbinder": {
		"source": "apache",
		"extensions": [
			"obd"
		]
	},
	"application/x-mscardfile": {
		"source": "apache",
		"extensions": [
			"crd"
		]
	},
	"application/x-msclip": {
		"source": "apache",
		"extensions": [
			"clp"
		]
	},
	"application/x-msdos-program": {
		"extensions": [
			"exe"
		]
	},
	"application/x-msdownload": {
		"source": "apache",
		"extensions": [
			"exe",
			"dll",
			"com",
			"bat",
			"msi"
		]
	},
	"application/x-msmediaview": {
		"source": "apache",
		"extensions": [
			"mvb",
			"m13",
			"m14"
		]
	},
	"application/x-msmetafile": {
		"source": "apache",
		"extensions": [
			"wmf",
			"wmz",
			"emf",
			"emz"
		]
	},
	"application/x-msmoney": {
		"source": "apache",
		"extensions": [
			"mny"
		]
	},
	"application/x-mspublisher": {
		"source": "apache",
		"extensions": [
			"pub"
		]
	},
	"application/x-msschedule": {
		"source": "apache",
		"extensions": [
			"scd"
		]
	},
	"application/x-msterminal": {
		"source": "apache",
		"extensions": [
			"trm"
		]
	},
	"application/x-mswrite": {
		"source": "apache",
		"extensions": [
			"wri"
		]
	},
	"application/x-netcdf": {
		"source": "apache",
		"extensions": [
			"nc",
			"cdf"
		]
	},
	"application/x-ns-proxy-autoconfig": {
		"compressible": true,
		"extensions": [
			"pac"
		]
	},
	"application/x-nzb": {
		"source": "apache",
		"extensions": [
			"nzb"
		]
	},
	"application/x-perl": {
		"source": "nginx",
		"extensions": [
			"pl",
			"pm"
		]
	},
	"application/x-pilot": {
		"source": "nginx",
		"extensions": [
			"prc",
			"pdb"
		]
	},
	"application/x-pkcs12": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"p12",
			"pfx"
		]
	},
	"application/x-pkcs7-certificates": {
		"source": "apache",
		"extensions": [
			"p7b",
			"spc"
		]
	},
	"application/x-pkcs7-certreqresp": {
		"source": "apache",
		"extensions": [
			"p7r"
		]
	},
	"application/x-rar-compressed": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"rar"
		]
	},
	"application/x-redhat-package-manager": {
		"source": "nginx",
		"extensions": [
			"rpm"
		]
	},
	"application/x-research-info-systems": {
		"source": "apache",
		"extensions": [
			"ris"
		]
	},
	"application/x-sea": {
		"source": "nginx",
		"extensions": [
			"sea"
		]
	},
	"application/x-sh": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"sh"
		]
	},
	"application/x-shar": {
		"source": "apache",
		"extensions": [
			"shar"
		]
	},
	"application/x-shockwave-flash": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"swf"
		]
	},
	"application/x-silverlight-app": {
		"source": "apache",
		"extensions": [
			"xap"
		]
	},
	"application/x-sql": {
		"source": "apache",
		"extensions": [
			"sql"
		]
	},
	"application/x-stuffit": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"sit"
		]
	},
	"application/x-stuffitx": {
		"source": "apache",
		"extensions": [
			"sitx"
		]
	},
	"application/x-subrip": {
		"source": "apache",
		"extensions": [
			"srt"
		]
	},
	"application/x-sv4cpio": {
		"source": "apache",
		"extensions": [
			"sv4cpio"
		]
	},
	"application/x-sv4crc": {
		"source": "apache",
		"extensions": [
			"sv4crc"
		]
	},
	"application/x-t3vm-image": {
		"source": "apache",
		"extensions": [
			"t3"
		]
	},
	"application/x-tads": {
		"source": "apache",
		"extensions": [
			"gam"
		]
	},
	"application/x-tar": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"tar"
		]
	},
	"application/x-tcl": {
		"source": "apache",
		"extensions": [
			"tcl",
			"tk"
		]
	},
	"application/x-tex": {
		"source": "apache",
		"extensions": [
			"tex"
		]
	},
	"application/x-tex-tfm": {
		"source": "apache",
		"extensions": [
			"tfm"
		]
	},
	"application/x-texinfo": {
		"source": "apache",
		"extensions": [
			"texinfo",
			"texi"
		]
	},
	"application/x-tgif": {
		"source": "apache",
		"extensions": [
			"obj"
		]
	},
	"application/x-ustar": {
		"source": "apache",
		"extensions": [
			"ustar"
		]
	},
	"application/x-wais-source": {
		"source": "apache",
		"extensions": [
			"src"
		]
	},
	"application/x-web-app-manifest+json": {
		"compressible": true,
		"extensions": [
			"webapp"
		]
	},
	"application/x-www-form-urlencoded": {
		"source": "iana",
		"compressible": true
	},
	"application/x-x509-ca-cert": {
		"source": "apache",
		"extensions": [
			"der",
			"crt",
			"pem"
		]
	},
	"application/x-xfig": {
		"source": "apache",
		"extensions": [
			"fig"
		]
	},
	"application/x-xliff+xml": {
		"source": "apache",
		"extensions": [
			"xlf"
		]
	},
	"application/x-xpinstall": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"xpi"
		]
	},
	"application/x-xz": {
		"source": "apache",
		"extensions": [
			"xz"
		]
	},
	"application/x-zmachine": {
		"source": "apache",
		"extensions": [
			"z1",
			"z2",
			"z3",
			"z4",
			"z5",
			"z6",
			"z7",
			"z8"
		]
	},
	"application/x400-bp": {
		"source": "iana"
	},
	"application/xacml+xml": {
		"source": "iana"
	},
	"application/xaml+xml": {
		"source": "apache",
		"extensions": [
			"xaml"
		]
	},
	"application/xcap-att+xml": {
		"source": "iana"
	},
	"application/xcap-caps+xml": {
		"source": "iana"
	},
	"application/xcap-diff+xml": {
		"source": "iana",
		"extensions": [
			"xdf"
		]
	},
	"application/xcap-el+xml": {
		"source": "iana"
	},
	"application/xcap-error+xml": {
		"source": "iana"
	},
	"application/xcap-ns+xml": {
		"source": "iana"
	},
	"application/xcon-conference-info+xml": {
		"source": "iana"
	},
	"application/xcon-conference-info-diff+xml": {
		"source": "iana"
	},
	"application/xenc+xml": {
		"source": "iana",
		"extensions": [
			"xenc"
		]
	},
	"application/xhtml+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xhtml",
			"xht"
		]
	},
	"application/xhtml-voice+xml": {
		"source": "apache"
	},
	"application/xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xml",
			"xsl",
			"xsd",
			"rng"
		]
	},
	"application/xml-dtd": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"dtd"
		]
	},
	"application/xml-external-parsed-entity": {
		"source": "iana"
	},
	"application/xml-patch+xml": {
		"source": "iana"
	},
	"application/xmpp+xml": {
		"source": "iana"
	},
	"application/xop+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xop"
		]
	},
	"application/xproc+xml": {
		"source": "apache",
		"extensions": [
			"xpl"
		]
	},
	"application/xslt+xml": {
		"source": "iana",
		"extensions": [
			"xslt"
		]
	},
	"application/xspf+xml": {
		"source": "apache",
		"extensions": [
			"xspf"
		]
	},
	"application/xv+xml": {
		"source": "iana",
		"extensions": [
			"mxml",
			"xhvml",
			"xvml",
			"xvm"
		]
	},
	"application/yang": {
		"source": "iana",
		"extensions": [
			"yang"
		]
	},
	"application/yang-data+json": {
		"source": "iana",
		"compressible": true
	},
	"application/yang-data+xml": {
		"source": "iana"
	},
	"application/yang-patch+json": {
		"source": "iana",
		"compressible": true
	},
	"application/yang-patch+xml": {
		"source": "iana"
	},
	"application/yin+xml": {
		"source": "iana",
		"extensions": [
			"yin"
		]
	},
	"application/zip": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"zip"
		]
	},
	"application/zlib": {
		"source": "iana"
	},
	"audio/1d-interleaved-parityfec": {
		"source": "iana"
	},
	"audio/32kadpcm": {
		"source": "iana"
	},
	"audio/3gpp": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"3gpp"
		]
	},
	"audio/3gpp2": {
		"source": "iana"
	},
	"audio/ac3": {
		"source": "iana"
	},
	"audio/adpcm": {
		"source": "apache",
		"extensions": [
			"adp"
		]
	},
	"audio/amr": {
		"source": "iana"
	},
	"audio/amr-wb": {
		"source": "iana"
	},
	"audio/amr-wb+": {
		"source": "iana"
	},
	"audio/aptx": {
		"source": "iana"
	},
	"audio/asc": {
		"source": "iana"
	},
	"audio/atrac-advanced-lossless": {
		"source": "iana"
	},
	"audio/atrac-x": {
		"source": "iana"
	},
	"audio/atrac3": {
		"source": "iana"
	},
	"audio/basic": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"au",
			"snd"
		]
	},
	"audio/bv16": {
		"source": "iana"
	},
	"audio/bv32": {
		"source": "iana"
	},
	"audio/clearmode": {
		"source": "iana"
	},
	"audio/cn": {
		"source": "iana"
	},
	"audio/dat12": {
		"source": "iana"
	},
	"audio/dls": {
		"source": "iana"
	},
	"audio/dsr-es201108": {
		"source": "iana"
	},
	"audio/dsr-es202050": {
		"source": "iana"
	},
	"audio/dsr-es202211": {
		"source": "iana"
	},
	"audio/dsr-es202212": {
		"source": "iana"
	},
	"audio/dv": {
		"source": "iana"
	},
	"audio/dvi4": {
		"source": "iana"
	},
	"audio/eac3": {
		"source": "iana"
	},
	"audio/encaprtp": {
		"source": "iana"
	},
	"audio/evrc": {
		"source": "iana"
	},
	"audio/evrc-qcp": {
		"source": "iana"
	},
	"audio/evrc0": {
		"source": "iana"
	},
	"audio/evrc1": {
		"source": "iana"
	},
	"audio/evrcb": {
		"source": "iana"
	},
	"audio/evrcb0": {
		"source": "iana"
	},
	"audio/evrcb1": {
		"source": "iana"
	},
	"audio/evrcnw": {
		"source": "iana"
	},
	"audio/evrcnw0": {
		"source": "iana"
	},
	"audio/evrcnw1": {
		"source": "iana"
	},
	"audio/evrcwb": {
		"source": "iana"
	},
	"audio/evrcwb0": {
		"source": "iana"
	},
	"audio/evrcwb1": {
		"source": "iana"
	},
	"audio/evs": {
		"source": "iana"
	},
	"audio/fwdred": {
		"source": "iana"
	},
	"audio/g711-0": {
		"source": "iana"
	},
	"audio/g719": {
		"source": "iana"
	},
	"audio/g722": {
		"source": "iana"
	},
	"audio/g7221": {
		"source": "iana"
	},
	"audio/g723": {
		"source": "iana"
	},
	"audio/g726-16": {
		"source": "iana"
	},
	"audio/g726-24": {
		"source": "iana"
	},
	"audio/g726-32": {
		"source": "iana"
	},
	"audio/g726-40": {
		"source": "iana"
	},
	"audio/g728": {
		"source": "iana"
	},
	"audio/g729": {
		"source": "iana"
	},
	"audio/g7291": {
		"source": "iana"
	},
	"audio/g729d": {
		"source": "iana"
	},
	"audio/g729e": {
		"source": "iana"
	},
	"audio/gsm": {
		"source": "iana"
	},
	"audio/gsm-efr": {
		"source": "iana"
	},
	"audio/gsm-hr-08": {
		"source": "iana"
	},
	"audio/ilbc": {
		"source": "iana"
	},
	"audio/ip-mr_v2.5": {
		"source": "iana"
	},
	"audio/isac": {
		"source": "apache"
	},
	"audio/l16": {
		"source": "iana"
	},
	"audio/l20": {
		"source": "iana"
	},
	"audio/l24": {
		"source": "iana",
		"compressible": false
	},
	"audio/l8": {
		"source": "iana"
	},
	"audio/lpc": {
		"source": "iana"
	},
	"audio/midi": {
		"source": "apache",
		"extensions": [
			"mid",
			"midi",
			"kar",
			"rmi"
		]
	},
	"audio/mobile-xmf": {
		"source": "iana"
	},
	"audio/mp3": {
		"compressible": false,
		"extensions": [
			"mp3"
		]
	},
	"audio/mp4": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"m4a",
			"mp4a"
		]
	},
	"audio/mp4a-latm": {
		"source": "iana"
	},
	"audio/mpa": {
		"source": "iana"
	},
	"audio/mpa-robust": {
		"source": "iana"
	},
	"audio/mpeg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"mpga",
			"mp2",
			"mp2a",
			"mp3",
			"m2a",
			"m3a"
		]
	},
	"audio/mpeg4-generic": {
		"source": "iana"
	},
	"audio/musepack": {
		"source": "apache"
	},
	"audio/ogg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"oga",
			"ogg",
			"spx"
		]
	},
	"audio/opus": {
		"source": "iana"
	},
	"audio/parityfec": {
		"source": "iana"
	},
	"audio/pcma": {
		"source": "iana"
	},
	"audio/pcma-wb": {
		"source": "iana"
	},
	"audio/pcmu": {
		"source": "iana"
	},
	"audio/pcmu-wb": {
		"source": "iana"
	},
	"audio/prs.sid": {
		"source": "iana"
	},
	"audio/qcelp": {
		"source": "iana"
	},
	"audio/raptorfec": {
		"source": "iana"
	},
	"audio/red": {
		"source": "iana"
	},
	"audio/rtp-enc-aescm128": {
		"source": "iana"
	},
	"audio/rtp-midi": {
		"source": "iana"
	},
	"audio/rtploopback": {
		"source": "iana"
	},
	"audio/rtx": {
		"source": "iana"
	},
	"audio/s3m": {
		"source": "apache",
		"extensions": [
			"s3m"
		]
	},
	"audio/silk": {
		"source": "apache",
		"extensions": [
			"sil"
		]
	},
	"audio/smv": {
		"source": "iana"
	},
	"audio/smv-qcp": {
		"source": "iana"
	},
	"audio/smv0": {
		"source": "iana"
	},
	"audio/sp-midi": {
		"source": "iana"
	},
	"audio/speex": {
		"source": "iana"
	},
	"audio/t140c": {
		"source": "iana"
	},
	"audio/t38": {
		"source": "iana"
	},
	"audio/telephone-event": {
		"source": "iana"
	},
	"audio/tone": {
		"source": "iana"
	},
	"audio/uemclip": {
		"source": "iana"
	},
	"audio/ulpfec": {
		"source": "iana"
	},
	"audio/vdvi": {
		"source": "iana"
	},
	"audio/vmr-wb": {
		"source": "iana"
	},
	"audio/vnd.3gpp.iufp": {
		"source": "iana"
	},
	"audio/vnd.4sb": {
		"source": "iana"
	},
	"audio/vnd.audiokoz": {
		"source": "iana"
	},
	"audio/vnd.celp": {
		"source": "iana"
	},
	"audio/vnd.cisco.nse": {
		"source": "iana"
	},
	"audio/vnd.cmles.radio-events": {
		"source": "iana"
	},
	"audio/vnd.cns.anp1": {
		"source": "iana"
	},
	"audio/vnd.cns.inf1": {
		"source": "iana"
	},
	"audio/vnd.dece.audio": {
		"source": "iana",
		"extensions": [
			"uva",
			"uvva"
		]
	},
	"audio/vnd.digital-winds": {
		"source": "iana",
		"extensions": [
			"eol"
		]
	},
	"audio/vnd.dlna.adts": {
		"source": "iana"
	},
	"audio/vnd.dolby.heaac.1": {
		"source": "iana"
	},
	"audio/vnd.dolby.heaac.2": {
		"source": "iana"
	},
	"audio/vnd.dolby.mlp": {
		"source": "iana"
	},
	"audio/vnd.dolby.mps": {
		"source": "iana"
	},
	"audio/vnd.dolby.pl2": {
		"source": "iana"
	},
	"audio/vnd.dolby.pl2x": {
		"source": "iana"
	},
	"audio/vnd.dolby.pl2z": {
		"source": "iana"
	},
	"audio/vnd.dolby.pulse.1": {
		"source": "iana"
	},
	"audio/vnd.dra": {
		"source": "iana",
		"extensions": [
			"dra"
		]
	},
	"audio/vnd.dts": {
		"source": "iana",
		"extensions": [
			"dts"
		]
	},
	"audio/vnd.dts.hd": {
		"source": "iana",
		"extensions": [
			"dtshd"
		]
	},
	"audio/vnd.dvb.file": {
		"source": "iana"
	},
	"audio/vnd.everad.plj": {
		"source": "iana"
	},
	"audio/vnd.hns.audio": {
		"source": "iana"
	},
	"audio/vnd.lucent.voice": {
		"source": "iana",
		"extensions": [
			"lvp"
		]
	},
	"audio/vnd.ms-playready.media.pya": {
		"source": "iana",
		"extensions": [
			"pya"
		]
	},
	"audio/vnd.nokia.mobile-xmf": {
		"source": "iana"
	},
	"audio/vnd.nortel.vbk": {
		"source": "iana"
	},
	"audio/vnd.nuera.ecelp4800": {
		"source": "iana",
		"extensions": [
			"ecelp4800"
		]
	},
	"audio/vnd.nuera.ecelp7470": {
		"source": "iana",
		"extensions": [
			"ecelp7470"
		]
	},
	"audio/vnd.nuera.ecelp9600": {
		"source": "iana",
		"extensions": [
			"ecelp9600"
		]
	},
	"audio/vnd.octel.sbc": {
		"source": "iana"
	},
	"audio/vnd.qcelp": {
		"source": "iana"
	},
	"audio/vnd.rhetorex.32kadpcm": {
		"source": "iana"
	},
	"audio/vnd.rip": {
		"source": "iana",
		"extensions": [
			"rip"
		]
	},
	"audio/vnd.rn-realaudio": {
		"compressible": false
	},
	"audio/vnd.sealedmedia.softseal.mpeg": {
		"source": "iana"
	},
	"audio/vnd.vmx.cvsd": {
		"source": "iana"
	},
	"audio/vnd.wave": {
		"compressible": false
	},
	"audio/vorbis": {
		"source": "iana",
		"compressible": false
	},
	"audio/vorbis-config": {
		"source": "iana"
	},
	"audio/wav": {
		"compressible": false,
		"extensions": [
			"wav"
		]
	},
	"audio/wave": {
		"compressible": false,
		"extensions": [
			"wav"
		]
	},
	"audio/webm": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"weba"
		]
	},
	"audio/x-aac": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"aac"
		]
	},
	"audio/x-aiff": {
		"source": "apache",
		"extensions": [
			"aif",
			"aiff",
			"aifc"
		]
	},
	"audio/x-caf": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"caf"
		]
	},
	"audio/x-flac": {
		"source": "apache",
		"extensions": [
			"flac"
		]
	},
	"audio/x-m4a": {
		"source": "nginx",
		"extensions": [
			"m4a"
		]
	},
	"audio/x-matroska": {
		"source": "apache",
		"extensions": [
			"mka"
		]
	},
	"audio/x-mpegurl": {
		"source": "apache",
		"extensions": [
			"m3u"
		]
	},
	"audio/x-ms-wax": {
		"source": "apache",
		"extensions": [
			"wax"
		]
	},
	"audio/x-ms-wma": {
		"source": "apache",
		"extensions": [
			"wma"
		]
	},
	"audio/x-pn-realaudio": {
		"source": "apache",
		"extensions": [
			"ram",
			"ra"
		]
	},
	"audio/x-pn-realaudio-plugin": {
		"source": "apache",
		"extensions": [
			"rmp"
		]
	},
	"audio/x-realaudio": {
		"source": "nginx",
		"extensions": [
			"ra"
		]
	},
	"audio/x-tta": {
		"source": "apache"
	},
	"audio/x-wav": {
		"source": "apache",
		"extensions": [
			"wav"
		]
	},
	"audio/xm": {
		"source": "apache",
		"extensions": [
			"xm"
		]
	},
	"chemical/x-cdx": {
		"source": "apache",
		"extensions": [
			"cdx"
		]
	},
	"chemical/x-cif": {
		"source": "apache",
		"extensions": [
			"cif"
		]
	},
	"chemical/x-cmdf": {
		"source": "apache",
		"extensions": [
			"cmdf"
		]
	},
	"chemical/x-cml": {
		"source": "apache",
		"extensions": [
			"cml"
		]
	},
	"chemical/x-csml": {
		"source": "apache",
		"extensions": [
			"csml"
		]
	},
	"chemical/x-pdb": {
		"source": "apache"
	},
	"chemical/x-xyz": {
		"source": "apache",
		"extensions": [
			"xyz"
		]
	},
	"font/opentype": {
		"compressible": true,
		"extensions": [
			"otf"
		]
	},
	"image/bmp": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"bmp"
		]
	},
	"image/cgm": {
		"source": "iana",
		"extensions": [
			"cgm"
		]
	},
	"image/dicom-rle": {
		"source": "iana"
	},
	"image/emf": {
		"source": "iana"
	},
	"image/fits": {
		"source": "iana"
	},
	"image/g3fax": {
		"source": "iana",
		"extensions": [
			"g3"
		]
	},
	"image/gif": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"gif"
		]
	},
	"image/ief": {
		"source": "iana",
		"extensions": [
			"ief"
		]
	},
	"image/jls": {
		"source": "iana"
	},
	"image/jp2": {
		"source": "iana"
	},
	"image/jpeg": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"jpeg",
			"jpg",
			"jpe"
		]
	},
	"image/jpm": {
		"source": "iana"
	},
	"image/jpx": {
		"source": "iana"
	},
	"image/ktx": {
		"source": "iana",
		"extensions": [
			"ktx"
		]
	},
	"image/naplps": {
		"source": "iana"
	},
	"image/pjpeg": {
		"compressible": false
	},
	"image/png": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"png"
		]
	},
	"image/prs.btif": {
		"source": "iana",
		"extensions": [
			"btif"
		]
	},
	"image/prs.pti": {
		"source": "iana"
	},
	"image/pwg-raster": {
		"source": "iana"
	},
	"image/sgi": {
		"source": "apache",
		"extensions": [
			"sgi"
		]
	},
	"image/svg+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"svg",
			"svgz"
		]
	},
	"image/t38": {
		"source": "iana"
	},
	"image/tiff": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"tiff",
			"tif"
		]
	},
	"image/tiff-fx": {
		"source": "iana"
	},
	"image/vnd.adobe.photoshop": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"psd"
		]
	},
	"image/vnd.airzip.accelerator.azv": {
		"source": "iana"
	},
	"image/vnd.cns.inf2": {
		"source": "iana"
	},
	"image/vnd.dece.graphic": {
		"source": "iana",
		"extensions": [
			"uvi",
			"uvvi",
			"uvg",
			"uvvg"
		]
	},
	"image/vnd.djvu": {
		"source": "iana",
		"extensions": [
			"djvu",
			"djv"
		]
	},
	"image/vnd.dvb.subtitle": {
		"source": "iana",
		"extensions": [
			"sub"
		]
	},
	"image/vnd.dwg": {
		"source": "iana",
		"extensions": [
			"dwg"
		]
	},
	"image/vnd.dxf": {
		"source": "iana",
		"extensions": [
			"dxf"
		]
	},
	"image/vnd.fastbidsheet": {
		"source": "iana",
		"extensions": [
			"fbs"
		]
	},
	"image/vnd.fpx": {
		"source": "iana",
		"extensions": [
			"fpx"
		]
	},
	"image/vnd.fst": {
		"source": "iana",
		"extensions": [
			"fst"
		]
	},
	"image/vnd.fujixerox.edmics-mmr": {
		"source": "iana",
		"extensions": [
			"mmr"
		]
	},
	"image/vnd.fujixerox.edmics-rlc": {
		"source": "iana",
		"extensions": [
			"rlc"
		]
	},
	"image/vnd.globalgraphics.pgb": {
		"source": "iana"
	},
	"image/vnd.microsoft.icon": {
		"source": "iana"
	},
	"image/vnd.mix": {
		"source": "iana"
	},
	"image/vnd.mozilla.apng": {
		"source": "iana"
	},
	"image/vnd.ms-modi": {
		"source": "iana",
		"extensions": [
			"mdi"
		]
	},
	"image/vnd.ms-photo": {
		"source": "apache",
		"extensions": [
			"wdp"
		]
	},
	"image/vnd.net-fpx": {
		"source": "iana",
		"extensions": [
			"npx"
		]
	},
	"image/vnd.radiance": {
		"source": "iana"
	},
	"image/vnd.sealed.png": {
		"source": "iana"
	},
	"image/vnd.sealedmedia.softseal.gif": {
		"source": "iana"
	},
	"image/vnd.sealedmedia.softseal.jpg": {
		"source": "iana"
	},
	"image/vnd.svf": {
		"source": "iana"
	},
	"image/vnd.tencent.tap": {
		"source": "iana"
	},
	"image/vnd.valve.source.texture": {
		"source": "iana"
	},
	"image/vnd.wap.wbmp": {
		"source": "iana",
		"extensions": [
			"wbmp"
		]
	},
	"image/vnd.xiff": {
		"source": "iana",
		"extensions": [
			"xif"
		]
	},
	"image/vnd.zbrush.pcx": {
		"source": "iana"
	},
	"image/webp": {
		"source": "apache",
		"extensions": [
			"webp"
		]
	},
	"image/wmf": {
		"source": "iana"
	},
	"image/x-3ds": {
		"source": "apache",
		"extensions": [
			"3ds"
		]
	},
	"image/x-cmu-raster": {
		"source": "apache",
		"extensions": [
			"ras"
		]
	},
	"image/x-cmx": {
		"source": "apache",
		"extensions": [
			"cmx"
		]
	},
	"image/x-freehand": {
		"source": "apache",
		"extensions": [
			"fh",
			"fhc",
			"fh4",
			"fh5",
			"fh7"
		]
	},
	"image/x-icon": {
		"source": "apache",
		"compressible": true,
		"extensions": [
			"ico"
		]
	},
	"image/x-jng": {
		"source": "nginx",
		"extensions": [
			"jng"
		]
	},
	"image/x-mrsid-image": {
		"source": "apache",
		"extensions": [
			"sid"
		]
	},
	"image/x-ms-bmp": {
		"source": "nginx",
		"compressible": true,
		"extensions": [
			"bmp"
		]
	},
	"image/x-pcx": {
		"source": "apache",
		"extensions": [
			"pcx"
		]
	},
	"image/x-pict": {
		"source": "apache",
		"extensions": [
			"pic",
			"pct"
		]
	},
	"image/x-portable-anymap": {
		"source": "apache",
		"extensions": [
			"pnm"
		]
	},
	"image/x-portable-bitmap": {
		"source": "apache",
		"extensions": [
			"pbm"
		]
	},
	"image/x-portable-graymap": {
		"source": "apache",
		"extensions": [
			"pgm"
		]
	},
	"image/x-portable-pixmap": {
		"source": "apache",
		"extensions": [
			"ppm"
		]
	},
	"image/x-rgb": {
		"source": "apache",
		"extensions": [
			"rgb"
		]
	},
	"image/x-tga": {
		"source": "apache",
		"extensions": [
			"tga"
		]
	},
	"image/x-xbitmap": {
		"source": "apache",
		"extensions": [
			"xbm"
		]
	},
	"image/x-xcf": {
		"compressible": false
	},
	"image/x-xpixmap": {
		"source": "apache",
		"extensions": [
			"xpm"
		]
	},
	"image/x-xwindowdump": {
		"source": "apache",
		"extensions": [
			"xwd"
		]
	},
	"message/cpim": {
		"source": "iana"
	},
	"message/delivery-status": {
		"source": "iana"
	},
	"message/disposition-notification": {
		"source": "iana"
	},
	"message/external-body": {
		"source": "iana"
	},
	"message/feedback-report": {
		"source": "iana"
	},
	"message/global": {
		"source": "iana"
	},
	"message/global-delivery-status": {
		"source": "iana"
	},
	"message/global-disposition-notification": {
		"source": "iana"
	},
	"message/global-headers": {
		"source": "iana"
	},
	"message/http": {
		"source": "iana",
		"compressible": false
	},
	"message/imdn+xml": {
		"source": "iana",
		"compressible": true
	},
	"message/news": {
		"source": "iana"
	},
	"message/partial": {
		"source": "iana",
		"compressible": false
	},
	"message/rfc822": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"eml",
			"mime"
		]
	},
	"message/s-http": {
		"source": "iana"
	},
	"message/sip": {
		"source": "iana"
	},
	"message/sipfrag": {
		"source": "iana"
	},
	"message/tracking-status": {
		"source": "iana"
	},
	"message/vnd.si.simp": {
		"source": "iana"
	},
	"message/vnd.wfa.wsc": {
		"source": "iana"
	},
	"model/gltf+json": {
		"source": "iana",
		"compressible": true
	},
	"model/iges": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"igs",
			"iges"
		]
	},
	"model/mesh": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"msh",
			"mesh",
			"silo"
		]
	},
	"model/vnd.collada+xml": {
		"source": "iana",
		"extensions": [
			"dae"
		]
	},
	"model/vnd.dwf": {
		"source": "iana",
		"extensions": [
			"dwf"
		]
	},
	"model/vnd.flatland.3dml": {
		"source": "iana"
	},
	"model/vnd.gdl": {
		"source": "iana",
		"extensions": [
			"gdl"
		]
	},
	"model/vnd.gs-gdl": {
		"source": "apache"
	},
	"model/vnd.gs.gdl": {
		"source": "iana"
	},
	"model/vnd.gtw": {
		"source": "iana",
		"extensions": [
			"gtw"
		]
	},
	"model/vnd.moml+xml": {
		"source": "iana"
	},
	"model/vnd.mts": {
		"source": "iana",
		"extensions": [
			"mts"
		]
	},
	"model/vnd.opengex": {
		"source": "iana"
	},
	"model/vnd.parasolid.transmit.binary": {
		"source": "iana"
	},
	"model/vnd.parasolid.transmit.text": {
		"source": "iana"
	},
	"model/vnd.rosette.annotated-data-model": {
		"source": "iana"
	},
	"model/vnd.valve.source.compiled-map": {
		"source": "iana"
	},
	"model/vnd.vtu": {
		"source": "iana",
		"extensions": [
			"vtu"
		]
	},
	"model/vrml": {
		"source": "iana",
		"compressible": false,
		"extensions": [
			"wrl",
			"vrml"
		]
	},
	"model/x3d+binary": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"x3db",
			"x3dbz"
		]
	},
	"model/x3d+fastinfoset": {
		"source": "iana"
	},
	"model/x3d+vrml": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"x3dv",
			"x3dvz"
		]
	},
	"model/x3d+xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"x3d",
			"x3dz"
		]
	},
	"model/x3d-vrml": {
		"source": "iana"
	},
	"multipart/alternative": {
		"source": "iana",
		"compressible": false
	},
	"multipart/appledouble": {
		"source": "iana"
	},
	"multipart/byteranges": {
		"source": "iana"
	},
	"multipart/digest": {
		"source": "iana"
	},
	"multipart/encrypted": {
		"source": "iana",
		"compressible": false
	},
	"multipart/form-data": {
		"source": "iana",
		"compressible": false
	},
	"multipart/header-set": {
		"source": "iana"
	},
	"multipart/mixed": {
		"source": "iana",
		"compressible": false
	},
	"multipart/parallel": {
		"source": "iana"
	},
	"multipart/related": {
		"source": "iana",
		"compressible": false
	},
	"multipart/report": {
		"source": "iana"
	},
	"multipart/signed": {
		"source": "iana",
		"compressible": false
	},
	"multipart/voice-message": {
		"source": "iana"
	},
	"multipart/x-mixed-replace": {
		"source": "iana"
	},
	"text/1d-interleaved-parityfec": {
		"source": "iana"
	},
	"text/cache-manifest": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"appcache",
			"manifest"
		]
	},
	"text/calendar": {
		"source": "iana",
		"extensions": [
			"ics",
			"ifb"
		]
	},
	"text/calender": {
		"compressible": true
	},
	"text/cmd": {
		"compressible": true
	},
	"text/coffeescript": {
		"extensions": [
			"coffee",
			"litcoffee"
		]
	},
	"text/css": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"css"
		]
	},
	"text/csv": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"csv"
		]
	},
	"text/csv-schema": {
		"source": "iana"
	},
	"text/directory": {
		"source": "iana"
	},
	"text/dns": {
		"source": "iana"
	},
	"text/ecmascript": {
		"source": "iana"
	},
	"text/encaprtp": {
		"source": "iana"
	},
	"text/enriched": {
		"source": "iana"
	},
	"text/fwdred": {
		"source": "iana"
	},
	"text/grammar-ref-list": {
		"source": "iana"
	},
	"text/hjson": {
		"extensions": [
			"hjson"
		]
	},
	"text/html": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"html",
			"htm",
			"shtml"
		]
	},
	"text/jade": {
		"extensions": [
			"jade"
		]
	},
	"text/javascript": {
		"source": "iana",
		"compressible": true
	},
	"text/jcr-cnd": {
		"source": "iana"
	},
	"text/jsx": {
		"compressible": true,
		"extensions": [
			"jsx"
		]
	},
	"text/less": {
		"extensions": [
			"less"
		]
	},
	"text/markdown": {
		"source": "iana"
	},
	"text/mathml": {
		"source": "nginx",
		"extensions": [
			"mml"
		]
	},
	"text/mizar": {
		"source": "iana"
	},
	"text/n3": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"n3"
		]
	},
	"text/parameters": {
		"source": "iana"
	},
	"text/parityfec": {
		"source": "iana"
	},
	"text/plain": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"txt",
			"text",
			"conf",
			"def",
			"list",
			"log",
			"in",
			"ini"
		]
	},
	"text/provenance-notation": {
		"source": "iana"
	},
	"text/prs.fallenstein.rst": {
		"source": "iana"
	},
	"text/prs.lines.tag": {
		"source": "iana",
		"extensions": [
			"dsc"
		]
	},
	"text/prs.prop.logic": {
		"source": "iana"
	},
	"text/raptorfec": {
		"source": "iana"
	},
	"text/red": {
		"source": "iana"
	},
	"text/rfc822-headers": {
		"source": "iana"
	},
	"text/richtext": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rtx"
		]
	},
	"text/rtf": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"rtf"
		]
	},
	"text/rtp-enc-aescm128": {
		"source": "iana"
	},
	"text/rtploopback": {
		"source": "iana"
	},
	"text/rtx": {
		"source": "iana"
	},
	"text/sgml": {
		"source": "iana",
		"extensions": [
			"sgml",
			"sgm"
		]
	},
	"text/slim": {
		"extensions": [
			"slim",
			"slm"
		]
	},
	"text/stylus": {
		"extensions": [
			"stylus",
			"styl"
		]
	},
	"text/t140": {
		"source": "iana"
	},
	"text/tab-separated-values": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"tsv"
		]
	},
	"text/troff": {
		"source": "iana",
		"extensions": [
			"t",
			"tr",
			"roff",
			"man",
			"me",
			"ms"
		]
	},
	"text/turtle": {
		"source": "iana",
		"extensions": [
			"ttl"
		]
	},
	"text/ulpfec": {
		"source": "iana"
	},
	"text/uri-list": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"uri",
			"uris",
			"urls"
		]
	},
	"text/vcard": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"vcard"
		]
	},
	"text/vnd.a": {
		"source": "iana"
	},
	"text/vnd.abc": {
		"source": "iana"
	},
	"text/vnd.ascii-art": {
		"source": "iana"
	},
	"text/vnd.curl": {
		"source": "iana",
		"extensions": [
			"curl"
		]
	},
	"text/vnd.curl.dcurl": {
		"source": "apache",
		"extensions": [
			"dcurl"
		]
	},
	"text/vnd.curl.mcurl": {
		"source": "apache",
		"extensions": [
			"mcurl"
		]
	},
	"text/vnd.curl.scurl": {
		"source": "apache",
		"extensions": [
			"scurl"
		]
	},
	"text/vnd.debian.copyright": {
		"source": "iana"
	},
	"text/vnd.dmclientscript": {
		"source": "iana"
	},
	"text/vnd.dvb.subtitle": {
		"source": "iana",
		"extensions": [
			"sub"
		]
	},
	"text/vnd.esmertec.theme-descriptor": {
		"source": "iana"
	},
	"text/vnd.fly": {
		"source": "iana",
		"extensions": [
			"fly"
		]
	},
	"text/vnd.fmi.flexstor": {
		"source": "iana",
		"extensions": [
			"flx"
		]
	},
	"text/vnd.graphviz": {
		"source": "iana",
		"extensions": [
			"gv"
		]
	},
	"text/vnd.in3d.3dml": {
		"source": "iana",
		"extensions": [
			"3dml"
		]
	},
	"text/vnd.in3d.spot": {
		"source": "iana",
		"extensions": [
			"spot"
		]
	},
	"text/vnd.iptc.newsml": {
		"source": "iana"
	},
	"text/vnd.iptc.nitf": {
		"source": "iana"
	},
	"text/vnd.latex-z": {
		"source": "iana"
	},
	"text/vnd.motorola.reflex": {
		"source": "iana"
	},
	"text/vnd.ms-mediapackage": {
		"source": "iana"
	},
	"text/vnd.net2phone.commcenter.command": {
		"source": "iana"
	},
	"text/vnd.radisys.msml-basic-layout": {
		"source": "iana"
	},
	"text/vnd.si.uricatalogue": {
		"source": "iana"
	},
	"text/vnd.sun.j2me.app-descriptor": {
		"source": "iana",
		"extensions": [
			"jad"
		]
	},
	"text/vnd.trolltech.linguist": {
		"source": "iana"
	},
	"text/vnd.wap.si": {
		"source": "iana"
	},
	"text/vnd.wap.sl": {
		"source": "iana"
	},
	"text/vnd.wap.wml": {
		"source": "iana",
		"extensions": [
			"wml"
		]
	},
	"text/vnd.wap.wmlscript": {
		"source": "iana",
		"extensions": [
			"wmls"
		]
	},
	"text/vtt": {
		"charset": "UTF-8",
		"compressible": true,
		"extensions": [
			"vtt"
		]
	},
	"text/x-asm": {
		"source": "apache",
		"extensions": [
			"s",
			"asm"
		]
	},
	"text/x-c": {
		"source": "apache",
		"extensions": [
			"c",
			"cc",
			"cxx",
			"cpp",
			"h",
			"hh",
			"dic"
		]
	},
	"text/x-component": {
		"source": "nginx",
		"extensions": [
			"htc"
		]
	},
	"text/x-fortran": {
		"source": "apache",
		"extensions": [
			"f",
			"for",
			"f77",
			"f90"
		]
	},
	"text/x-gwt-rpc": {
		"compressible": true
	},
	"text/x-handlebars-template": {
		"extensions": [
			"hbs"
		]
	},
	"text/x-java-source": {
		"source": "apache",
		"extensions": [
			"java"
		]
	},
	"text/x-jquery-tmpl": {
		"compressible": true
	},
	"text/x-lua": {
		"extensions": [
			"lua"
		]
	},
	"text/x-markdown": {
		"compressible": true,
		"extensions": [
			"markdown",
			"md",
			"mkd"
		]
	},
	"text/x-nfo": {
		"source": "apache",
		"extensions": [
			"nfo"
		]
	},
	"text/x-opml": {
		"source": "apache",
		"extensions": [
			"opml"
		]
	},
	"text/x-pascal": {
		"source": "apache",
		"extensions": [
			"p",
			"pas"
		]
	},
	"text/x-processing": {
		"compressible": true,
		"extensions": [
			"pde"
		]
	},
	"text/x-sass": {
		"extensions": [
			"sass"
		]
	},
	"text/x-scss": {
		"extensions": [
			"scss"
		]
	},
	"text/x-setext": {
		"source": "apache",
		"extensions": [
			"etx"
		]
	},
	"text/x-sfv": {
		"source": "apache",
		"extensions": [
			"sfv"
		]
	},
	"text/x-suse-ymp": {
		"compressible": true,
		"extensions": [
			"ymp"
		]
	},
	"text/x-uuencode": {
		"source": "apache",
		"extensions": [
			"uu"
		]
	},
	"text/x-vcalendar": {
		"source": "apache",
		"extensions": [
			"vcs"
		]
	},
	"text/x-vcard": {
		"source": "apache",
		"extensions": [
			"vcf"
		]
	},
	"text/xml": {
		"source": "iana",
		"compressible": true,
		"extensions": [
			"xml"
		]
	},
	"text/xml-external-parsed-entity": {
		"source": "iana"
	},
	"text/yaml": {
		"extensions": [
			"yaml",
			"yml"
		]
	},
	"video/1d-interleaved-parityfec": {
		"source": "apache"
	},
	"video/3gpp": {
		"source": "apache",
		"extensions": [
			"3gp",
			"3gpp"
		]
	},
	"video/3gpp-tt": {
		"source": "apache"
	},
	"video/3gpp2": {
		"source": "apache",
		"extensions": [
			"3g2"
		]
	},
	"video/bmpeg": {
		"source": "apache"
	},
	"video/bt656": {
		"source": "apache"
	},
	"video/celb": {
		"source": "apache"
	},
	"video/dv": {
		"source": "apache"
	},
	"video/encaprtp": {
		"source": "apache"
	},
	"video/h261": {
		"source": "apache",
		"extensions": [
			"h261"
		]
	},
	"video/h263": {
		"source": "apache",
		"extensions": [
			"h263"
		]
	},
	"video/h263-1998": {
		"source": "apache"
	},
	"video/h263-2000": {
		"source": "apache"
	},
	"video/h264": {
		"source": "apache",
		"extensions": [
			"h264"
		]
	},
	"video/h264-rcdo": {
		"source": "apache"
	},
	"video/h264-svc": {
		"source": "apache"
	},
	"video/h265": {
		"source": "apache"
	},
	"video/iso.segment": {
		"source": "apache"
	},
	"video/jpeg": {
		"source": "apache",
		"extensions": [
			"jpgv"
		]
	},
	"video/jpeg2000": {
		"source": "apache"
	},
	"video/jpm": {
		"source": "apache",
		"extensions": [
			"jpm",
			"jpgm"
		]
	},
	"video/mj2": {
		"source": "apache",
		"extensions": [
			"mj2",
			"mjp2"
		]
	},
	"video/mp1s": {
		"source": "apache"
	},
	"video/mp2p": {
		"source": "apache"
	},
	"video/mp2t": {
		"source": "apache",
		"extensions": [
			"ts"
		]
	},
	"video/mp4": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"mp4",
			"mp4v",
			"mpg4"
		]
	},
	"video/mp4v-es": {
		"source": "apache"
	},
	"video/mpeg": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"mpeg",
			"mpg",
			"mpe",
			"m1v",
			"m2v"
		]
	},
	"video/mpeg4-generic": {
		"source": "apache"
	},
	"video/mpv": {
		"source": "apache"
	},
	"video/nv": {
		"source": "apache"
	},
	"video/ogg": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"ogv"
		]
	},
	"video/parityfec": {
		"source": "apache"
	},
	"video/pointer": {
		"source": "apache"
	},
	"video/quicktime": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"qt",
			"mov"
		]
	},
	"video/raptorfec": {
		"source": "apache"
	},
	"video/raw": {
		"source": "apache"
	},
	"video/rtp-enc-aescm128": {
		"source": "apache"
	},
	"video/rtploopback": {
		"source": "apache"
	},
	"video/rtx": {
		"source": "apache"
	},
	"video/smpte292m": {
		"source": "apache"
	},
	"video/ulpfec": {
		"source": "apache"
	},
	"video/vc1": {
		"source": "apache"
	},
	"video/vnd.cctv": {
		"source": "apache"
	},
	"video/vnd.dece.hd": {
		"source": "apache",
		"extensions": [
			"uvh",
			"uvvh"
		]
	},
	"video/vnd.dece.mobile": {
		"source": "apache",
		"extensions": [
			"uvm",
			"uvvm"
		]
	},
	"video/vnd.dece.mp4": {
		"source": "apache"
	},
	"video/vnd.dece.pd": {
		"source": "apache",
		"extensions": [
			"uvp",
			"uvvp"
		]
	},
	"video/vnd.dece.sd": {
		"source": "apache",
		"extensions": [
			"uvs",
			"uvvs"
		]
	},
	"video/vnd.dece.video": {
		"source": "apache",
		"extensions": [
			"uvv",
			"uvvv"
		]
	},
	"video/vnd.directv.mpeg": {
		"source": "apache"
	},
	"video/vnd.directv.mpeg-tts": {
		"source": "apache"
	},
	"video/vnd.dlna.mpeg-tts": {
		"source": "apache"
	},
	"video/vnd.dvb.file": {
		"source": "apache",
		"extensions": [
			"dvb"
		]
	},
	"video/vnd.fvt": {
		"source": "apache",
		"extensions": [
			"fvt"
		]
	},
	"video/vnd.hns.video": {
		"source": "apache"
	},
	"video/vnd.iptvforum.1dparityfec-1010": {
		"source": "apache"
	},
	"video/vnd.iptvforum.1dparityfec-2005": {
		"source": "apache"
	},
	"video/vnd.iptvforum.2dparityfec-1010": {
		"source": "apache"
	},
	"video/vnd.iptvforum.2dparityfec-2005": {
		"source": "apache"
	},
	"video/vnd.iptvforum.ttsavc": {
		"source": "apache"
	},
	"video/vnd.iptvforum.ttsmpeg2": {
		"source": "apache"
	},
	"video/vnd.motorola.video": {
		"source": "apache"
	},
	"video/vnd.motorola.videop": {
		"source": "apache"
	},
	"video/vnd.mpegurl": {
		"source": "apache",
		"extensions": [
			"mxu",
			"m4u"
		]
	},
	"video/vnd.ms-playready.media.pyv": {
		"source": "apache",
		"extensions": [
			"pyv"
		]
	},
	"video/vnd.nokia.interleaved-multimedia": {
		"source": "apache"
	},
	"video/vnd.nokia.videovoip": {
		"source": "apache"
	},
	"video/vnd.objectvideo": {
		"source": "apache"
	},
	"video/vnd.radgamettools.bink": {
		"source": "apache"
	},
	"video/vnd.radgamettools.smacker": {
		"source": "apache"
	},
	"video/vnd.sealed.mpeg1": {
		"source": "apache"
	},
	"video/vnd.sealed.mpeg4": {
		"source": "apache"
	},
	"video/vnd.sealed.swf": {
		"source": "apache"
	},
	"video/vnd.sealedmedia.softseal.mov": {
		"source": "apache"
	},
	"video/vnd.uvvu.mp4": {
		"source": "apache",
		"extensions": [
			"uvu",
			"uvvu"
		]
	},
	"video/vnd.vivo": {
		"source": "apache",
		"extensions": [
			"viv"
		]
	},
	"video/vp8": {
		"source": "apache"
	},
	"video/webm": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"webm"
		]
	},
	"video/x-f4v": {
		"source": "apache",
		"extensions": [
			"f4v"
		]
	},
	"video/x-fli": {
		"source": "apache",
		"extensions": [
			"fli"
		]
	},
	"video/x-flv": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"flv"
		]
	},
	"video/x-m4v": {
		"source": "apache",
		"extensions": [
			"m4v"
		]
	},
	"video/x-matroska": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"mkv",
			"mk3d",
			"mks"
		]
	},
	"video/x-mng": {
		"source": "apache",
		"extensions": [
			"mng"
		]
	},
	"video/x-ms-asf": {
		"source": "apache",
		"extensions": [
			"asf",
			"asx"
		]
	},
	"video/x-ms-vob": {
		"source": "apache",
		"extensions": [
			"vob"
		]
	},
	"video/x-ms-wm": {
		"source": "apache",
		"extensions": [
			"wm"
		]
	},
	"video/x-ms-wmv": {
		"source": "apache",
		"compressible": false,
		"extensions": [
			"wmv"
		]
	},
	"video/x-ms-wmx": {
		"source": "apache",
		"extensions": [
			"wmx"
		]
	},
	"video/x-ms-wvx": {
		"source": "apache",
		"extensions": [
			"wvx"
		]
	},
	"video/x-msvideo": {
		"source": "apache",
		"extensions": [
			"avi"
		]
	},
	"video/x-sgi-movie": {
		"source": "apache",
		"extensions": [
			"movie"
		]
	},
	"video/x-smv": {
		"source": "apache",
		"extensions": [
			"smv"
		]
	},
	"x-conference/x-cooltalk": {
		"source": "apache",
		"extensions": [
			"ice"
		]
	},
	"x-shader/x-fragment": {
		"compressible": true
	},
	"x-shader/x-vertex": {
		"compressible": true
	}
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __webpack_require__(45)


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __webpack_require__(46)
var extname = __webpack_require__(5).extname

/**
 * Module variables.
 * @private
 */

var extractTypeRegExp = /^\s*([^;\s]*)(?:;|\s|$)/
var textTypeRegExp = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = extractTypeRegExp.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && textTypeRegExp.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = extractTypeRegExp.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          from > to || (from === to && types[extension].substr(0, 12) === 'application/')) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(5);
var fs = __webpack_require__(3);

function Mime() {
  // Map of extension -> mime type
  this.types = Object.create(null);

  // Map of mime type -> extension
  this.extensions = Object.create(null);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * @param map (Object) type definitions
 */
Mime.prototype.define = function (map) {
  for (var type in map) {
    var exts = map[type];
    for (var i = 0; i < exts.length; i++) {
      if (process.env.DEBUG_MIME && this.types[exts[i]]) {
        console.warn((this._loading || "define()").replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
          this.types[exts[i]] + ' to ' + type);
      }

      this.types[exts[i]] = type;
    }

    // Default extension is the first one we encounter
    if (!this.extensions[type]) {
      this.extensions[type] = exts[0];
    }
  }
};

/**
 * Load an Apache2-style ".types" file
 *
 * This may be called multiple times (it's expected).  Where files declare
 * overlapping types/extensions, the last file wins.
 *
 * @param file (String) path of file to load.
 */
Mime.prototype.load = function(file) {
  this._loading = file;
  // Read file and split into lines
  var map = {},
      content = fs.readFileSync(file, 'ascii'),
      lines = content.split(/[\r\n]+/);

  lines.forEach(function(line) {
    // Clean up whitespace/comments, and split into fields
    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
    map[fields.shift()] = fields;
  });

  this.define(map);

  this._loading = null;
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.lookup = function(path, fallback) {
  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

  return this.types[ext] || fallback || this.default_type;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.extension = function(mimeType) {
  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
  return this.extensions[type];
};

// Default instance
var mime = new Mime();

// Define built-in types
mime.define(__webpack_require__(49));

// Default type
mime.default_type = mime.lookup('bin');

//
// Additional API specific to the default instance
//

mime.Mime = Mime;

/**
 * Lookup a charset based on mime type.
 */
mime.charsets = {
  lookup: function(mimeType, fallback) {
    // Assume text types are utf8
    return (/^text\/|^application\/(javascript|json)/).test(mimeType) ? 'UTF-8' : fallback;
  }
};

module.exports = mime;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {
	"application/andrew-inset": [
		"ez"
	],
	"application/applixware": [
		"aw"
	],
	"application/atom+xml": [
		"atom"
	],
	"application/atomcat+xml": [
		"atomcat"
	],
	"application/atomsvc+xml": [
		"atomsvc"
	],
	"application/bdoc": [
		"bdoc"
	],
	"application/ccxml+xml": [
		"ccxml"
	],
	"application/cdmi-capability": [
		"cdmia"
	],
	"application/cdmi-container": [
		"cdmic"
	],
	"application/cdmi-domain": [
		"cdmid"
	],
	"application/cdmi-object": [
		"cdmio"
	],
	"application/cdmi-queue": [
		"cdmiq"
	],
	"application/cu-seeme": [
		"cu"
	],
	"application/dash+xml": [
		"mpd"
	],
	"application/davmount+xml": [
		"davmount"
	],
	"application/docbook+xml": [
		"dbk"
	],
	"application/dssc+der": [
		"dssc"
	],
	"application/dssc+xml": [
		"xdssc"
	],
	"application/ecmascript": [
		"ecma"
	],
	"application/emma+xml": [
		"emma"
	],
	"application/epub+zip": [
		"epub"
	],
	"application/exi": [
		"exi"
	],
	"application/font-tdpfr": [
		"pfr"
	],
	"application/font-woff": [
		"woff"
	],
	"application/font-woff2": [
		"woff2"
	],
	"application/geo+json": [
		"geojson"
	],
	"application/gml+xml": [
		"gml"
	],
	"application/gpx+xml": [
		"gpx"
	],
	"application/gxf": [
		"gxf"
	],
	"application/hyperstudio": [
		"stk"
	],
	"application/inkml+xml": [
		"ink",
		"inkml"
	],
	"application/ipfix": [
		"ipfix"
	],
	"application/java-archive": [
		"jar",
		"war",
		"ear"
	],
	"application/java-serialized-object": [
		"ser"
	],
	"application/java-vm": [
		"class"
	],
	"application/javascript": [
		"js"
	],
	"application/json": [
		"json",
		"map"
	],
	"application/json5": [
		"json5"
	],
	"application/jsonml+json": [
		"jsonml"
	],
	"application/ld+json": [
		"jsonld"
	],
	"application/lost+xml": [
		"lostxml"
	],
	"application/mac-binhex40": [
		"hqx"
	],
	"application/mac-compactpro": [
		"cpt"
	],
	"application/mads+xml": [
		"mads"
	],
	"application/manifest+json": [
		"webmanifest"
	],
	"application/marc": [
		"mrc"
	],
	"application/marcxml+xml": [
		"mrcx"
	],
	"application/mathematica": [
		"ma",
		"nb",
		"mb"
	],
	"application/mathml+xml": [
		"mathml"
	],
	"application/mbox": [
		"mbox"
	],
	"application/mediaservercontrol+xml": [
		"mscml"
	],
	"application/metalink+xml": [
		"metalink"
	],
	"application/metalink4+xml": [
		"meta4"
	],
	"application/mets+xml": [
		"mets"
	],
	"application/mods+xml": [
		"mods"
	],
	"application/mp21": [
		"m21",
		"mp21"
	],
	"application/mp4": [
		"mp4s",
		"m4p"
	],
	"application/msword": [
		"doc",
		"dot"
	],
	"application/mxf": [
		"mxf"
	],
	"application/octet-stream": [
		"bin",
		"dms",
		"lrf",
		"mar",
		"so",
		"dist",
		"distz",
		"pkg",
		"bpk",
		"dump",
		"elc",
		"deploy",
		"exe",
		"dll",
		"deb",
		"dmg",
		"iso",
		"img",
		"msi",
		"msp",
		"msm",
		"buffer"
	],
	"application/oda": [
		"oda"
	],
	"application/oebps-package+xml": [
		"opf"
	],
	"application/ogg": [
		"ogx"
	],
	"application/omdoc+xml": [
		"omdoc"
	],
	"application/onenote": [
		"onetoc",
		"onetoc2",
		"onetmp",
		"onepkg"
	],
	"application/oxps": [
		"oxps"
	],
	"application/patch-ops-error+xml": [
		"xer"
	],
	"application/pdf": [
		"pdf"
	],
	"application/pgp-encrypted": [
		"pgp"
	],
	"application/pgp-signature": [
		"asc",
		"sig"
	],
	"application/pics-rules": [
		"prf"
	],
	"application/pkcs10": [
		"p10"
	],
	"application/pkcs7-mime": [
		"p7m",
		"p7c"
	],
	"application/pkcs7-signature": [
		"p7s"
	],
	"application/pkcs8": [
		"p8"
	],
	"application/pkix-attr-cert": [
		"ac"
	],
	"application/pkix-cert": [
		"cer"
	],
	"application/pkix-crl": [
		"crl"
	],
	"application/pkix-pkipath": [
		"pkipath"
	],
	"application/pkixcmp": [
		"pki"
	],
	"application/pls+xml": [
		"pls"
	],
	"application/postscript": [
		"ai",
		"eps",
		"ps"
	],
	"application/prs.cww": [
		"cww"
	],
	"application/pskc+xml": [
		"pskcxml"
	],
	"application/rdf+xml": [
		"rdf"
	],
	"application/reginfo+xml": [
		"rif"
	],
	"application/relax-ng-compact-syntax": [
		"rnc"
	],
	"application/resource-lists+xml": [
		"rl"
	],
	"application/resource-lists-diff+xml": [
		"rld"
	],
	"application/rls-services+xml": [
		"rs"
	],
	"application/rpki-ghostbusters": [
		"gbr"
	],
	"application/rpki-manifest": [
		"mft"
	],
	"application/rpki-roa": [
		"roa"
	],
	"application/rsd+xml": [
		"rsd"
	],
	"application/rss+xml": [
		"rss"
	],
	"application/rtf": [
		"rtf"
	],
	"application/sbml+xml": [
		"sbml"
	],
	"application/scvp-cv-request": [
		"scq"
	],
	"application/scvp-cv-response": [
		"scs"
	],
	"application/scvp-vp-request": [
		"spq"
	],
	"application/scvp-vp-response": [
		"spp"
	],
	"application/sdp": [
		"sdp"
	],
	"application/set-payment-initiation": [
		"setpay"
	],
	"application/set-registration-initiation": [
		"setreg"
	],
	"application/shf+xml": [
		"shf"
	],
	"application/smil+xml": [
		"smi",
		"smil"
	],
	"application/sparql-query": [
		"rq"
	],
	"application/sparql-results+xml": [
		"srx"
	],
	"application/srgs": [
		"gram"
	],
	"application/srgs+xml": [
		"grxml"
	],
	"application/sru+xml": [
		"sru"
	],
	"application/ssdl+xml": [
		"ssdl"
	],
	"application/ssml+xml": [
		"ssml"
	],
	"application/tei+xml": [
		"tei",
		"teicorpus"
	],
	"application/thraud+xml": [
		"tfi"
	],
	"application/timestamped-data": [
		"tsd"
	],
	"application/vnd.3gpp.pic-bw-large": [
		"plb"
	],
	"application/vnd.3gpp.pic-bw-small": [
		"psb"
	],
	"application/vnd.3gpp.pic-bw-var": [
		"pvb"
	],
	"application/vnd.3gpp2.tcap": [
		"tcap"
	],
	"application/vnd.3m.post-it-notes": [
		"pwn"
	],
	"application/vnd.accpac.simply.aso": [
		"aso"
	],
	"application/vnd.accpac.simply.imp": [
		"imp"
	],
	"application/vnd.acucobol": [
		"acu"
	],
	"application/vnd.acucorp": [
		"atc",
		"acutc"
	],
	"application/vnd.adobe.air-application-installer-package+zip": [
		"air"
	],
	"application/vnd.adobe.formscentral.fcdt": [
		"fcdt"
	],
	"application/vnd.adobe.fxp": [
		"fxp",
		"fxpl"
	],
	"application/vnd.adobe.xdp+xml": [
		"xdp"
	],
	"application/vnd.adobe.xfdf": [
		"xfdf"
	],
	"application/vnd.ahead.space": [
		"ahead"
	],
	"application/vnd.airzip.filesecure.azf": [
		"azf"
	],
	"application/vnd.airzip.filesecure.azs": [
		"azs"
	],
	"application/vnd.amazon.ebook": [
		"azw"
	],
	"application/vnd.americandynamics.acc": [
		"acc"
	],
	"application/vnd.amiga.ami": [
		"ami"
	],
	"application/vnd.android.package-archive": [
		"apk"
	],
	"application/vnd.anser-web-certificate-issue-initiation": [
		"cii"
	],
	"application/vnd.anser-web-funds-transfer-initiation": [
		"fti"
	],
	"application/vnd.antix.game-component": [
		"atx"
	],
	"application/vnd.apple.installer+xml": [
		"mpkg"
	],
	"application/vnd.apple.mpegurl": [
		"m3u8"
	],
	"application/vnd.apple.pkpass": [
		"pkpass"
	],
	"application/vnd.aristanetworks.swi": [
		"swi"
	],
	"application/vnd.astraea-software.iota": [
		"iota"
	],
	"application/vnd.audiograph": [
		"aep"
	],
	"application/vnd.blueice.multipass": [
		"mpm"
	],
	"application/vnd.bmi": [
		"bmi"
	],
	"application/vnd.businessobjects": [
		"rep"
	],
	"application/vnd.chemdraw+xml": [
		"cdxml"
	],
	"application/vnd.chipnuts.karaoke-mmd": [
		"mmd"
	],
	"application/vnd.cinderella": [
		"cdy"
	],
	"application/vnd.claymore": [
		"cla"
	],
	"application/vnd.cloanto.rp9": [
		"rp9"
	],
	"application/vnd.clonk.c4group": [
		"c4g",
		"c4d",
		"c4f",
		"c4p",
		"c4u"
	],
	"application/vnd.cluetrust.cartomobile-config": [
		"c11amc"
	],
	"application/vnd.cluetrust.cartomobile-config-pkg": [
		"c11amz"
	],
	"application/vnd.commonspace": [
		"csp"
	],
	"application/vnd.contact.cmsg": [
		"cdbcmsg"
	],
	"application/vnd.cosmocaller": [
		"cmc"
	],
	"application/vnd.crick.clicker": [
		"clkx"
	],
	"application/vnd.crick.clicker.keyboard": [
		"clkk"
	],
	"application/vnd.crick.clicker.palette": [
		"clkp"
	],
	"application/vnd.crick.clicker.template": [
		"clkt"
	],
	"application/vnd.crick.clicker.wordbank": [
		"clkw"
	],
	"application/vnd.criticaltools.wbs+xml": [
		"wbs"
	],
	"application/vnd.ctc-posml": [
		"pml"
	],
	"application/vnd.cups-ppd": [
		"ppd"
	],
	"application/vnd.curl.car": [
		"car"
	],
	"application/vnd.curl.pcurl": [
		"pcurl"
	],
	"application/vnd.dart": [
		"dart"
	],
	"application/vnd.data-vision.rdz": [
		"rdz"
	],
	"application/vnd.dece.data": [
		"uvf",
		"uvvf",
		"uvd",
		"uvvd"
	],
	"application/vnd.dece.ttml+xml": [
		"uvt",
		"uvvt"
	],
	"application/vnd.dece.unspecified": [
		"uvx",
		"uvvx"
	],
	"application/vnd.dece.zip": [
		"uvz",
		"uvvz"
	],
	"application/vnd.denovo.fcselayout-link": [
		"fe_launch"
	],
	"application/vnd.dna": [
		"dna"
	],
	"application/vnd.dolby.mlp": [
		"mlp"
	],
	"application/vnd.dpgraph": [
		"dpg"
	],
	"application/vnd.dreamfactory": [
		"dfac"
	],
	"application/vnd.ds-keypoint": [
		"kpxx"
	],
	"application/vnd.dvb.ait": [
		"ait"
	],
	"application/vnd.dvb.service": [
		"svc"
	],
	"application/vnd.dynageo": [
		"geo"
	],
	"application/vnd.ecowin.chart": [
		"mag"
	],
	"application/vnd.enliven": [
		"nml"
	],
	"application/vnd.epson.esf": [
		"esf"
	],
	"application/vnd.epson.msf": [
		"msf"
	],
	"application/vnd.epson.quickanime": [
		"qam"
	],
	"application/vnd.epson.salt": [
		"slt"
	],
	"application/vnd.epson.ssf": [
		"ssf"
	],
	"application/vnd.eszigno3+xml": [
		"es3",
		"et3"
	],
	"application/vnd.ezpix-album": [
		"ez2"
	],
	"application/vnd.ezpix-package": [
		"ez3"
	],
	"application/vnd.fdf": [
		"fdf"
	],
	"application/vnd.fdsn.mseed": [
		"mseed"
	],
	"application/vnd.fdsn.seed": [
		"seed",
		"dataless"
	],
	"application/vnd.flographit": [
		"gph"
	],
	"application/vnd.fluxtime.clip": [
		"ftc"
	],
	"application/vnd.framemaker": [
		"fm",
		"frame",
		"maker",
		"book"
	],
	"application/vnd.frogans.fnc": [
		"fnc"
	],
	"application/vnd.frogans.ltf": [
		"ltf"
	],
	"application/vnd.fsc.weblaunch": [
		"fsc"
	],
	"application/vnd.fujitsu.oasys": [
		"oas"
	],
	"application/vnd.fujitsu.oasys2": [
		"oa2"
	],
	"application/vnd.fujitsu.oasys3": [
		"oa3"
	],
	"application/vnd.fujitsu.oasysgp": [
		"fg5"
	],
	"application/vnd.fujitsu.oasysprs": [
		"bh2"
	],
	"application/vnd.fujixerox.ddd": [
		"ddd"
	],
	"application/vnd.fujixerox.docuworks": [
		"xdw"
	],
	"application/vnd.fujixerox.docuworks.binder": [
		"xbd"
	],
	"application/vnd.fuzzysheet": [
		"fzs"
	],
	"application/vnd.genomatix.tuxedo": [
		"txd"
	],
	"application/vnd.geogebra.file": [
		"ggb"
	],
	"application/vnd.geogebra.tool": [
		"ggt"
	],
	"application/vnd.geometry-explorer": [
		"gex",
		"gre"
	],
	"application/vnd.geonext": [
		"gxt"
	],
	"application/vnd.geoplan": [
		"g2w"
	],
	"application/vnd.geospace": [
		"g3w"
	],
	"application/vnd.gmx": [
		"gmx"
	],
	"application/vnd.google-apps.document": [
		"gdoc"
	],
	"application/vnd.google-apps.presentation": [
		"gslides"
	],
	"application/vnd.google-apps.spreadsheet": [
		"gsheet"
	],
	"application/vnd.google-earth.kml+xml": [
		"kml"
	],
	"application/vnd.google-earth.kmz": [
		"kmz"
	],
	"application/vnd.grafeq": [
		"gqf",
		"gqs"
	],
	"application/vnd.groove-account": [
		"gac"
	],
	"application/vnd.groove-help": [
		"ghf"
	],
	"application/vnd.groove-identity-message": [
		"gim"
	],
	"application/vnd.groove-injector": [
		"grv"
	],
	"application/vnd.groove-tool-message": [
		"gtm"
	],
	"application/vnd.groove-tool-template": [
		"tpl"
	],
	"application/vnd.groove-vcard": [
		"vcg"
	],
	"application/vnd.hal+xml": [
		"hal"
	],
	"application/vnd.handheld-entertainment+xml": [
		"zmm"
	],
	"application/vnd.hbci": [
		"hbci"
	],
	"application/vnd.hhe.lesson-player": [
		"les"
	],
	"application/vnd.hp-hpgl": [
		"hpgl"
	],
	"application/vnd.hp-hpid": [
		"hpid"
	],
	"application/vnd.hp-hps": [
		"hps"
	],
	"application/vnd.hp-jlyt": [
		"jlt"
	],
	"application/vnd.hp-pcl": [
		"pcl"
	],
	"application/vnd.hp-pclxl": [
		"pclxl"
	],
	"application/vnd.hydrostatix.sof-data": [
		"sfd-hdstx"
	],
	"application/vnd.ibm.minipay": [
		"mpy"
	],
	"application/vnd.ibm.modcap": [
		"afp",
		"listafp",
		"list3820"
	],
	"application/vnd.ibm.rights-management": [
		"irm"
	],
	"application/vnd.ibm.secure-container": [
		"sc"
	],
	"application/vnd.iccprofile": [
		"icc",
		"icm"
	],
	"application/vnd.igloader": [
		"igl"
	],
	"application/vnd.immervision-ivp": [
		"ivp"
	],
	"application/vnd.immervision-ivu": [
		"ivu"
	],
	"application/vnd.insors.igm": [
		"igm"
	],
	"application/vnd.intercon.formnet": [
		"xpw",
		"xpx"
	],
	"application/vnd.intergeo": [
		"i2g"
	],
	"application/vnd.intu.qbo": [
		"qbo"
	],
	"application/vnd.intu.qfx": [
		"qfx"
	],
	"application/vnd.ipunplugged.rcprofile": [
		"rcprofile"
	],
	"application/vnd.irepository.package+xml": [
		"irp"
	],
	"application/vnd.is-xpr": [
		"xpr"
	],
	"application/vnd.isac.fcs": [
		"fcs"
	],
	"application/vnd.jam": [
		"jam"
	],
	"application/vnd.jcp.javame.midlet-rms": [
		"rms"
	],
	"application/vnd.jisp": [
		"jisp"
	],
	"application/vnd.joost.joda-archive": [
		"joda"
	],
	"application/vnd.kahootz": [
		"ktz",
		"ktr"
	],
	"application/vnd.kde.karbon": [
		"karbon"
	],
	"application/vnd.kde.kchart": [
		"chrt"
	],
	"application/vnd.kde.kformula": [
		"kfo"
	],
	"application/vnd.kde.kivio": [
		"flw"
	],
	"application/vnd.kde.kontour": [
		"kon"
	],
	"application/vnd.kde.kpresenter": [
		"kpr",
		"kpt"
	],
	"application/vnd.kde.kspread": [
		"ksp"
	],
	"application/vnd.kde.kword": [
		"kwd",
		"kwt"
	],
	"application/vnd.kenameaapp": [
		"htke"
	],
	"application/vnd.kidspiration": [
		"kia"
	],
	"application/vnd.kinar": [
		"kne",
		"knp"
	],
	"application/vnd.koan": [
		"skp",
		"skd",
		"skt",
		"skm"
	],
	"application/vnd.kodak-descriptor": [
		"sse"
	],
	"application/vnd.las.las+xml": [
		"lasxml"
	],
	"application/vnd.llamagraphics.life-balance.desktop": [
		"lbd"
	],
	"application/vnd.llamagraphics.life-balance.exchange+xml": [
		"lbe"
	],
	"application/vnd.lotus-1-2-3": [
		"123"
	],
	"application/vnd.lotus-approach": [
		"apr"
	],
	"application/vnd.lotus-freelance": [
		"pre"
	],
	"application/vnd.lotus-notes": [
		"nsf"
	],
	"application/vnd.lotus-organizer": [
		"org"
	],
	"application/vnd.lotus-screencam": [
		"scm"
	],
	"application/vnd.lotus-wordpro": [
		"lwp"
	],
	"application/vnd.macports.portpkg": [
		"portpkg"
	],
	"application/vnd.mcd": [
		"mcd"
	],
	"application/vnd.medcalcdata": [
		"mc1"
	],
	"application/vnd.mediastation.cdkey": [
		"cdkey"
	],
	"application/vnd.mfer": [
		"mwf"
	],
	"application/vnd.mfmp": [
		"mfm"
	],
	"application/vnd.micrografx.flo": [
		"flo"
	],
	"application/vnd.micrografx.igx": [
		"igx"
	],
	"application/vnd.mif": [
		"mif"
	],
	"application/vnd.mobius.daf": [
		"daf"
	],
	"application/vnd.mobius.dis": [
		"dis"
	],
	"application/vnd.mobius.mbk": [
		"mbk"
	],
	"application/vnd.mobius.mqy": [
		"mqy"
	],
	"application/vnd.mobius.msl": [
		"msl"
	],
	"application/vnd.mobius.plc": [
		"plc"
	],
	"application/vnd.mobius.txf": [
		"txf"
	],
	"application/vnd.mophun.application": [
		"mpn"
	],
	"application/vnd.mophun.certificate": [
		"mpc"
	],
	"application/vnd.mozilla.xul+xml": [
		"xul"
	],
	"application/vnd.ms-artgalry": [
		"cil"
	],
	"application/vnd.ms-cab-compressed": [
		"cab"
	],
	"application/vnd.ms-excel": [
		"xls",
		"xlm",
		"xla",
		"xlc",
		"xlt",
		"xlw"
	],
	"application/vnd.ms-excel.addin.macroenabled.12": [
		"xlam"
	],
	"application/vnd.ms-excel.sheet.binary.macroenabled.12": [
		"xlsb"
	],
	"application/vnd.ms-excel.sheet.macroenabled.12": [
		"xlsm"
	],
	"application/vnd.ms-excel.template.macroenabled.12": [
		"xltm"
	],
	"application/vnd.ms-fontobject": [
		"eot"
	],
	"application/vnd.ms-htmlhelp": [
		"chm"
	],
	"application/vnd.ms-ims": [
		"ims"
	],
	"application/vnd.ms-lrm": [
		"lrm"
	],
	"application/vnd.ms-officetheme": [
		"thmx"
	],
	"application/vnd.ms-pki.seccat": [
		"cat"
	],
	"application/vnd.ms-pki.stl": [
		"stl"
	],
	"application/vnd.ms-powerpoint": [
		"ppt",
		"pps",
		"pot"
	],
	"application/vnd.ms-powerpoint.addin.macroenabled.12": [
		"ppam"
	],
	"application/vnd.ms-powerpoint.presentation.macroenabled.12": [
		"pptm"
	],
	"application/vnd.ms-powerpoint.slide.macroenabled.12": [
		"sldm"
	],
	"application/vnd.ms-powerpoint.slideshow.macroenabled.12": [
		"ppsm"
	],
	"application/vnd.ms-powerpoint.template.macroenabled.12": [
		"potm"
	],
	"application/vnd.ms-project": [
		"mpp",
		"mpt"
	],
	"application/vnd.ms-word.document.macroenabled.12": [
		"docm"
	],
	"application/vnd.ms-word.template.macroenabled.12": [
		"dotm"
	],
	"application/vnd.ms-works": [
		"wps",
		"wks",
		"wcm",
		"wdb"
	],
	"application/vnd.ms-wpl": [
		"wpl"
	],
	"application/vnd.ms-xpsdocument": [
		"xps"
	],
	"application/vnd.mseq": [
		"mseq"
	],
	"application/vnd.musician": [
		"mus"
	],
	"application/vnd.muvee.style": [
		"msty"
	],
	"application/vnd.mynfc": [
		"taglet"
	],
	"application/vnd.neurolanguage.nlu": [
		"nlu"
	],
	"application/vnd.nitf": [
		"ntf",
		"nitf"
	],
	"application/vnd.noblenet-directory": [
		"nnd"
	],
	"application/vnd.noblenet-sealer": [
		"nns"
	],
	"application/vnd.noblenet-web": [
		"nnw"
	],
	"application/vnd.nokia.n-gage.data": [
		"ngdat"
	],
	"application/vnd.nokia.n-gage.symbian.install": [
		"n-gage"
	],
	"application/vnd.nokia.radio-preset": [
		"rpst"
	],
	"application/vnd.nokia.radio-presets": [
		"rpss"
	],
	"application/vnd.novadigm.edm": [
		"edm"
	],
	"application/vnd.novadigm.edx": [
		"edx"
	],
	"application/vnd.novadigm.ext": [
		"ext"
	],
	"application/vnd.oasis.opendocument.chart": [
		"odc"
	],
	"application/vnd.oasis.opendocument.chart-template": [
		"otc"
	],
	"application/vnd.oasis.opendocument.database": [
		"odb"
	],
	"application/vnd.oasis.opendocument.formula": [
		"odf"
	],
	"application/vnd.oasis.opendocument.formula-template": [
		"odft"
	],
	"application/vnd.oasis.opendocument.graphics": [
		"odg"
	],
	"application/vnd.oasis.opendocument.graphics-template": [
		"otg"
	],
	"application/vnd.oasis.opendocument.image": [
		"odi"
	],
	"application/vnd.oasis.opendocument.image-template": [
		"oti"
	],
	"application/vnd.oasis.opendocument.presentation": [
		"odp"
	],
	"application/vnd.oasis.opendocument.presentation-template": [
		"otp"
	],
	"application/vnd.oasis.opendocument.spreadsheet": [
		"ods"
	],
	"application/vnd.oasis.opendocument.spreadsheet-template": [
		"ots"
	],
	"application/vnd.oasis.opendocument.text": [
		"odt"
	],
	"application/vnd.oasis.opendocument.text-master": [
		"odm"
	],
	"application/vnd.oasis.opendocument.text-template": [
		"ott"
	],
	"application/vnd.oasis.opendocument.text-web": [
		"oth"
	],
	"application/vnd.olpc-sugar": [
		"xo"
	],
	"application/vnd.oma.dd2+xml": [
		"dd2"
	],
	"application/vnd.openofficeorg.extension": [
		"oxt"
	],
	"application/vnd.openxmlformats-officedocument.presentationml.presentation": [
		"pptx"
	],
	"application/vnd.openxmlformats-officedocument.presentationml.slide": [
		"sldx"
	],
	"application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
		"ppsx"
	],
	"application/vnd.openxmlformats-officedocument.presentationml.template": [
		"potx"
	],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
		"xlsx"
	],
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
		"xltx"
	],
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
		"docx"
	],
	"application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
		"dotx"
	],
	"application/vnd.osgeo.mapguide.package": [
		"mgp"
	],
	"application/vnd.osgi.dp": [
		"dp"
	],
	"application/vnd.osgi.subsystem": [
		"esa"
	],
	"application/vnd.palm": [
		"pdb",
		"pqa",
		"oprc"
	],
	"application/vnd.pawaafile": [
		"paw"
	],
	"application/vnd.pg.format": [
		"str"
	],
	"application/vnd.pg.osasli": [
		"ei6"
	],
	"application/vnd.picsel": [
		"efif"
	],
	"application/vnd.pmi.widget": [
		"wg"
	],
	"application/vnd.pocketlearn": [
		"plf"
	],
	"application/vnd.powerbuilder6": [
		"pbd"
	],
	"application/vnd.previewsystems.box": [
		"box"
	],
	"application/vnd.proteus.magazine": [
		"mgz"
	],
	"application/vnd.publishare-delta-tree": [
		"qps"
	],
	"application/vnd.pvi.ptid1": [
		"ptid"
	],
	"application/vnd.quark.quarkxpress": [
		"qxd",
		"qxt",
		"qwd",
		"qwt",
		"qxl",
		"qxb"
	],
	"application/vnd.realvnc.bed": [
		"bed"
	],
	"application/vnd.recordare.musicxml": [
		"mxl"
	],
	"application/vnd.recordare.musicxml+xml": [
		"musicxml"
	],
	"application/vnd.rig.cryptonote": [
		"cryptonote"
	],
	"application/vnd.rim.cod": [
		"cod"
	],
	"application/vnd.rn-realmedia": [
		"rm"
	],
	"application/vnd.rn-realmedia-vbr": [
		"rmvb"
	],
	"application/vnd.route66.link66+xml": [
		"link66"
	],
	"application/vnd.sailingtracker.track": [
		"st"
	],
	"application/vnd.seemail": [
		"see"
	],
	"application/vnd.sema": [
		"sema"
	],
	"application/vnd.semd": [
		"semd"
	],
	"application/vnd.semf": [
		"semf"
	],
	"application/vnd.shana.informed.formdata": [
		"ifm"
	],
	"application/vnd.shana.informed.formtemplate": [
		"itp"
	],
	"application/vnd.shana.informed.interchange": [
		"iif"
	],
	"application/vnd.shana.informed.package": [
		"ipk"
	],
	"application/vnd.simtech-mindmapper": [
		"twd",
		"twds"
	],
	"application/vnd.smaf": [
		"mmf"
	],
	"application/vnd.smart.teacher": [
		"teacher"
	],
	"application/vnd.solent.sdkm+xml": [
		"sdkm",
		"sdkd"
	],
	"application/vnd.spotfire.dxp": [
		"dxp"
	],
	"application/vnd.spotfire.sfs": [
		"sfs"
	],
	"application/vnd.stardivision.calc": [
		"sdc"
	],
	"application/vnd.stardivision.draw": [
		"sda"
	],
	"application/vnd.stardivision.impress": [
		"sdd"
	],
	"application/vnd.stardivision.math": [
		"smf"
	],
	"application/vnd.stardivision.writer": [
		"sdw",
		"vor"
	],
	"application/vnd.stardivision.writer-global": [
		"sgl"
	],
	"application/vnd.stepmania.package": [
		"smzip"
	],
	"application/vnd.stepmania.stepchart": [
		"sm"
	],
	"application/vnd.sun.xml.calc": [
		"sxc"
	],
	"application/vnd.sun.xml.calc.template": [
		"stc"
	],
	"application/vnd.sun.xml.draw": [
		"sxd"
	],
	"application/vnd.sun.xml.draw.template": [
		"std"
	],
	"application/vnd.sun.xml.impress": [
		"sxi"
	],
	"application/vnd.sun.xml.impress.template": [
		"sti"
	],
	"application/vnd.sun.xml.math": [
		"sxm"
	],
	"application/vnd.sun.xml.writer": [
		"sxw"
	],
	"application/vnd.sun.xml.writer.global": [
		"sxg"
	],
	"application/vnd.sun.xml.writer.template": [
		"stw"
	],
	"application/vnd.sus-calendar": [
		"sus",
		"susp"
	],
	"application/vnd.svd": [
		"svd"
	],
	"application/vnd.symbian.install": [
		"sis",
		"sisx"
	],
	"application/vnd.syncml+xml": [
		"xsm"
	],
	"application/vnd.syncml.dm+wbxml": [
		"bdm"
	],
	"application/vnd.syncml.dm+xml": [
		"xdm"
	],
	"application/vnd.tao.intent-module-archive": [
		"tao"
	],
	"application/vnd.tcpdump.pcap": [
		"pcap",
		"cap",
		"dmp"
	],
	"application/vnd.tmobile-livetv": [
		"tmo"
	],
	"application/vnd.trid.tpt": [
		"tpt"
	],
	"application/vnd.triscape.mxs": [
		"mxs"
	],
	"application/vnd.trueapp": [
		"tra"
	],
	"application/vnd.ufdl": [
		"ufd",
		"ufdl"
	],
	"application/vnd.uiq.theme": [
		"utz"
	],
	"application/vnd.umajin": [
		"umj"
	],
	"application/vnd.unity": [
		"unityweb"
	],
	"application/vnd.uoml+xml": [
		"uoml"
	],
	"application/vnd.vcx": [
		"vcx"
	],
	"application/vnd.visio": [
		"vsd",
		"vst",
		"vss",
		"vsw"
	],
	"application/vnd.visionary": [
		"vis"
	],
	"application/vnd.vsf": [
		"vsf"
	],
	"application/vnd.wap.wbxml": [
		"wbxml"
	],
	"application/vnd.wap.wmlc": [
		"wmlc"
	],
	"application/vnd.wap.wmlscriptc": [
		"wmlsc"
	],
	"application/vnd.webturbo": [
		"wtb"
	],
	"application/vnd.wolfram.player": [
		"nbp"
	],
	"application/vnd.wordperfect": [
		"wpd"
	],
	"application/vnd.wqd": [
		"wqd"
	],
	"application/vnd.wt.stf": [
		"stf"
	],
	"application/vnd.xara": [
		"xar"
	],
	"application/vnd.xfdl": [
		"xfdl"
	],
	"application/vnd.yamaha.hv-dic": [
		"hvd"
	],
	"application/vnd.yamaha.hv-script": [
		"hvs"
	],
	"application/vnd.yamaha.hv-voice": [
		"hvp"
	],
	"application/vnd.yamaha.openscoreformat": [
		"osf"
	],
	"application/vnd.yamaha.openscoreformat.osfpvg+xml": [
		"osfpvg"
	],
	"application/vnd.yamaha.smaf-audio": [
		"saf"
	],
	"application/vnd.yamaha.smaf-phrase": [
		"spf"
	],
	"application/vnd.yellowriver-custom-menu": [
		"cmp"
	],
	"application/vnd.zul": [
		"zir",
		"zirz"
	],
	"application/vnd.zzazz.deck+xml": [
		"zaz"
	],
	"application/voicexml+xml": [
		"vxml"
	],
	"application/widget": [
		"wgt"
	],
	"application/winhlp": [
		"hlp"
	],
	"application/wsdl+xml": [
		"wsdl"
	],
	"application/wspolicy+xml": [
		"wspolicy"
	],
	"application/x-7z-compressed": [
		"7z"
	],
	"application/x-abiword": [
		"abw"
	],
	"application/x-ace-compressed": [
		"ace"
	],
	"application/x-apple-diskimage": [
		"dmg"
	],
	"application/x-authorware-bin": [
		"aab",
		"x32",
		"u32",
		"vox"
	],
	"application/x-authorware-map": [
		"aam"
	],
	"application/x-authorware-seg": [
		"aas"
	],
	"application/x-bcpio": [
		"bcpio"
	],
	"application/x-bdoc": [
		"bdoc"
	],
	"application/x-bittorrent": [
		"torrent"
	],
	"application/x-blorb": [
		"blb",
		"blorb"
	],
	"application/x-bzip": [
		"bz"
	],
	"application/x-bzip2": [
		"bz2",
		"boz"
	],
	"application/x-cbr": [
		"cbr",
		"cba",
		"cbt",
		"cbz",
		"cb7"
	],
	"application/x-cdlink": [
		"vcd"
	],
	"application/x-cfs-compressed": [
		"cfs"
	],
	"application/x-chat": [
		"chat"
	],
	"application/x-chess-pgn": [
		"pgn"
	],
	"application/x-chrome-extension": [
		"crx"
	],
	"application/x-cocoa": [
		"cco"
	],
	"application/x-conference": [
		"nsc"
	],
	"application/x-cpio": [
		"cpio"
	],
	"application/x-csh": [
		"csh"
	],
	"application/x-debian-package": [
		"deb",
		"udeb"
	],
	"application/x-dgc-compressed": [
		"dgc"
	],
	"application/x-director": [
		"dir",
		"dcr",
		"dxr",
		"cst",
		"cct",
		"cxt",
		"w3d",
		"fgd",
		"swa"
	],
	"application/x-doom": [
		"wad"
	],
	"application/x-dtbncx+xml": [
		"ncx"
	],
	"application/x-dtbook+xml": [
		"dtb"
	],
	"application/x-dtbresource+xml": [
		"res"
	],
	"application/x-dvi": [
		"dvi"
	],
	"application/x-envoy": [
		"evy"
	],
	"application/x-eva": [
		"eva"
	],
	"application/x-font-bdf": [
		"bdf"
	],
	"application/x-font-ghostscript": [
		"gsf"
	],
	"application/x-font-linux-psf": [
		"psf"
	],
	"application/x-font-otf": [
		"otf"
	],
	"application/x-font-pcf": [
		"pcf"
	],
	"application/x-font-snf": [
		"snf"
	],
	"application/x-font-ttf": [
		"ttf",
		"ttc"
	],
	"application/x-font-type1": [
		"pfa",
		"pfb",
		"pfm",
		"afm"
	],
	"application/x-freearc": [
		"arc"
	],
	"application/x-futuresplash": [
		"spl"
	],
	"application/x-gca-compressed": [
		"gca"
	],
	"application/x-glulx": [
		"ulx"
	],
	"application/x-gnumeric": [
		"gnumeric"
	],
	"application/x-gramps-xml": [
		"gramps"
	],
	"application/x-gtar": [
		"gtar"
	],
	"application/x-hdf": [
		"hdf"
	],
	"application/x-httpd-php": [
		"php"
	],
	"application/x-install-instructions": [
		"install"
	],
	"application/x-iso9660-image": [
		"iso"
	],
	"application/x-java-archive-diff": [
		"jardiff"
	],
	"application/x-java-jnlp-file": [
		"jnlp"
	],
	"application/x-latex": [
		"latex"
	],
	"application/x-lua-bytecode": [
		"luac"
	],
	"application/x-lzh-compressed": [
		"lzh",
		"lha"
	],
	"application/x-makeself": [
		"run"
	],
	"application/x-mie": [
		"mie"
	],
	"application/x-mobipocket-ebook": [
		"prc",
		"mobi"
	],
	"application/x-ms-application": [
		"application"
	],
	"application/x-ms-shortcut": [
		"lnk"
	],
	"application/x-ms-wmd": [
		"wmd"
	],
	"application/x-ms-wmz": [
		"wmz"
	],
	"application/x-ms-xbap": [
		"xbap"
	],
	"application/x-msaccess": [
		"mdb"
	],
	"application/x-msbinder": [
		"obd"
	],
	"application/x-mscardfile": [
		"crd"
	],
	"application/x-msclip": [
		"clp"
	],
	"application/x-msdos-program": [
		"exe"
	],
	"application/x-msdownload": [
		"exe",
		"dll",
		"com",
		"bat",
		"msi"
	],
	"application/x-msmediaview": [
		"mvb",
		"m13",
		"m14"
	],
	"application/x-msmetafile": [
		"wmf",
		"wmz",
		"emf",
		"emz"
	],
	"application/x-msmoney": [
		"mny"
	],
	"application/x-mspublisher": [
		"pub"
	],
	"application/x-msschedule": [
		"scd"
	],
	"application/x-msterminal": [
		"trm"
	],
	"application/x-mswrite": [
		"wri"
	],
	"application/x-netcdf": [
		"nc",
		"cdf"
	],
	"application/x-ns-proxy-autoconfig": [
		"pac"
	],
	"application/x-nzb": [
		"nzb"
	],
	"application/x-perl": [
		"pl",
		"pm"
	],
	"application/x-pilot": [
		"prc",
		"pdb"
	],
	"application/x-pkcs12": [
		"p12",
		"pfx"
	],
	"application/x-pkcs7-certificates": [
		"p7b",
		"spc"
	],
	"application/x-pkcs7-certreqresp": [
		"p7r"
	],
	"application/x-rar-compressed": [
		"rar"
	],
	"application/x-redhat-package-manager": [
		"rpm"
	],
	"application/x-research-info-systems": [
		"ris"
	],
	"application/x-sea": [
		"sea"
	],
	"application/x-sh": [
		"sh"
	],
	"application/x-shar": [
		"shar"
	],
	"application/x-shockwave-flash": [
		"swf"
	],
	"application/x-silverlight-app": [
		"xap"
	],
	"application/x-sql": [
		"sql"
	],
	"application/x-stuffit": [
		"sit"
	],
	"application/x-stuffitx": [
		"sitx"
	],
	"application/x-subrip": [
		"srt"
	],
	"application/x-sv4cpio": [
		"sv4cpio"
	],
	"application/x-sv4crc": [
		"sv4crc"
	],
	"application/x-t3vm-image": [
		"t3"
	],
	"application/x-tads": [
		"gam"
	],
	"application/x-tar": [
		"tar"
	],
	"application/x-tcl": [
		"tcl",
		"tk"
	],
	"application/x-tex": [
		"tex"
	],
	"application/x-tex-tfm": [
		"tfm"
	],
	"application/x-texinfo": [
		"texinfo",
		"texi"
	],
	"application/x-tgif": [
		"obj"
	],
	"application/x-ustar": [
		"ustar"
	],
	"application/x-wais-source": [
		"src"
	],
	"application/x-web-app-manifest+json": [
		"webapp"
	],
	"application/x-x509-ca-cert": [
		"der",
		"crt",
		"pem"
	],
	"application/x-xfig": [
		"fig"
	],
	"application/x-xliff+xml": [
		"xlf"
	],
	"application/x-xpinstall": [
		"xpi"
	],
	"application/x-xz": [
		"xz"
	],
	"application/x-zmachine": [
		"z1",
		"z2",
		"z3",
		"z4",
		"z5",
		"z6",
		"z7",
		"z8"
	],
	"application/xaml+xml": [
		"xaml"
	],
	"application/xcap-diff+xml": [
		"xdf"
	],
	"application/xenc+xml": [
		"xenc"
	],
	"application/xhtml+xml": [
		"xhtml",
		"xht"
	],
	"application/xml": [
		"xml",
		"xsl",
		"xsd",
		"rng"
	],
	"application/xml-dtd": [
		"dtd"
	],
	"application/xop+xml": [
		"xop"
	],
	"application/xproc+xml": [
		"xpl"
	],
	"application/xslt+xml": [
		"xslt"
	],
	"application/xspf+xml": [
		"xspf"
	],
	"application/xv+xml": [
		"mxml",
		"xhvml",
		"xvml",
		"xvm"
	],
	"application/yang": [
		"yang"
	],
	"application/yin+xml": [
		"yin"
	],
	"application/zip": [
		"zip"
	],
	"audio/3gpp": [
		"3gpp"
	],
	"audio/adpcm": [
		"adp"
	],
	"audio/basic": [
		"au",
		"snd"
	],
	"audio/midi": [
		"mid",
		"midi",
		"kar",
		"rmi"
	],
	"audio/mp3": [
		"mp3"
	],
	"audio/mp4": [
		"m4a",
		"mp4a"
	],
	"audio/mpeg": [
		"mpga",
		"mp2",
		"mp2a",
		"mp3",
		"m2a",
		"m3a"
	],
	"audio/ogg": [
		"oga",
		"ogg",
		"spx"
	],
	"audio/s3m": [
		"s3m"
	],
	"audio/silk": [
		"sil"
	],
	"audio/vnd.dece.audio": [
		"uva",
		"uvva"
	],
	"audio/vnd.digital-winds": [
		"eol"
	],
	"audio/vnd.dra": [
		"dra"
	],
	"audio/vnd.dts": [
		"dts"
	],
	"audio/vnd.dts.hd": [
		"dtshd"
	],
	"audio/vnd.lucent.voice": [
		"lvp"
	],
	"audio/vnd.ms-playready.media.pya": [
		"pya"
	],
	"audio/vnd.nuera.ecelp4800": [
		"ecelp4800"
	],
	"audio/vnd.nuera.ecelp7470": [
		"ecelp7470"
	],
	"audio/vnd.nuera.ecelp9600": [
		"ecelp9600"
	],
	"audio/vnd.rip": [
		"rip"
	],
	"audio/wav": [
		"wav"
	],
	"audio/wave": [
		"wav"
	],
	"audio/webm": [
		"weba"
	],
	"audio/x-aac": [
		"aac"
	],
	"audio/x-aiff": [
		"aif",
		"aiff",
		"aifc"
	],
	"audio/x-caf": [
		"caf"
	],
	"audio/x-flac": [
		"flac"
	],
	"audio/x-m4a": [
		"m4a"
	],
	"audio/x-matroska": [
		"mka"
	],
	"audio/x-mpegurl": [
		"m3u"
	],
	"audio/x-ms-wax": [
		"wax"
	],
	"audio/x-ms-wma": [
		"wma"
	],
	"audio/x-pn-realaudio": [
		"ram",
		"ra"
	],
	"audio/x-pn-realaudio-plugin": [
		"rmp"
	],
	"audio/x-realaudio": [
		"ra"
	],
	"audio/x-wav": [
		"wav"
	],
	"audio/xm": [
		"xm"
	],
	"chemical/x-cdx": [
		"cdx"
	],
	"chemical/x-cif": [
		"cif"
	],
	"chemical/x-cmdf": [
		"cmdf"
	],
	"chemical/x-cml": [
		"cml"
	],
	"chemical/x-csml": [
		"csml"
	],
	"chemical/x-xyz": [
		"xyz"
	],
	"font/opentype": [
		"otf"
	],
	"image/apng": [
		"apng"
	],
	"image/bmp": [
		"bmp"
	],
	"image/cgm": [
		"cgm"
	],
	"image/g3fax": [
		"g3"
	],
	"image/gif": [
		"gif"
	],
	"image/ief": [
		"ief"
	],
	"image/jpeg": [
		"jpeg",
		"jpg",
		"jpe"
	],
	"image/ktx": [
		"ktx"
	],
	"image/png": [
		"png"
	],
	"image/prs.btif": [
		"btif"
	],
	"image/sgi": [
		"sgi"
	],
	"image/svg+xml": [
		"svg",
		"svgz"
	],
	"image/tiff": [
		"tiff",
		"tif"
	],
	"image/vnd.adobe.photoshop": [
		"psd"
	],
	"image/vnd.dece.graphic": [
		"uvi",
		"uvvi",
		"uvg",
		"uvvg"
	],
	"image/vnd.djvu": [
		"djvu",
		"djv"
	],
	"image/vnd.dvb.subtitle": [
		"sub"
	],
	"image/vnd.dwg": [
		"dwg"
	],
	"image/vnd.dxf": [
		"dxf"
	],
	"image/vnd.fastbidsheet": [
		"fbs"
	],
	"image/vnd.fpx": [
		"fpx"
	],
	"image/vnd.fst": [
		"fst"
	],
	"image/vnd.fujixerox.edmics-mmr": [
		"mmr"
	],
	"image/vnd.fujixerox.edmics-rlc": [
		"rlc"
	],
	"image/vnd.ms-modi": [
		"mdi"
	],
	"image/vnd.ms-photo": [
		"wdp"
	],
	"image/vnd.net-fpx": [
		"npx"
	],
	"image/vnd.wap.wbmp": [
		"wbmp"
	],
	"image/vnd.xiff": [
		"xif"
	],
	"image/webp": [
		"webp"
	],
	"image/x-3ds": [
		"3ds"
	],
	"image/x-cmu-raster": [
		"ras"
	],
	"image/x-cmx": [
		"cmx"
	],
	"image/x-freehand": [
		"fh",
		"fhc",
		"fh4",
		"fh5",
		"fh7"
	],
	"image/x-icon": [
		"ico"
	],
	"image/x-jng": [
		"jng"
	],
	"image/x-mrsid-image": [
		"sid"
	],
	"image/x-ms-bmp": [
		"bmp"
	],
	"image/x-pcx": [
		"pcx"
	],
	"image/x-pict": [
		"pic",
		"pct"
	],
	"image/x-portable-anymap": [
		"pnm"
	],
	"image/x-portable-bitmap": [
		"pbm"
	],
	"image/x-portable-graymap": [
		"pgm"
	],
	"image/x-portable-pixmap": [
		"ppm"
	],
	"image/x-rgb": [
		"rgb"
	],
	"image/x-tga": [
		"tga"
	],
	"image/x-xbitmap": [
		"xbm"
	],
	"image/x-xpixmap": [
		"xpm"
	],
	"image/x-xwindowdump": [
		"xwd"
	],
	"message/rfc822": [
		"eml",
		"mime"
	],
	"model/iges": [
		"igs",
		"iges"
	],
	"model/mesh": [
		"msh",
		"mesh",
		"silo"
	],
	"model/vnd.collada+xml": [
		"dae"
	],
	"model/vnd.dwf": [
		"dwf"
	],
	"model/vnd.gdl": [
		"gdl"
	],
	"model/vnd.gtw": [
		"gtw"
	],
	"model/vnd.mts": [
		"mts"
	],
	"model/vnd.vtu": [
		"vtu"
	],
	"model/vrml": [
		"wrl",
		"vrml"
	],
	"model/x3d+binary": [
		"x3db",
		"x3dbz"
	],
	"model/x3d+vrml": [
		"x3dv",
		"x3dvz"
	],
	"model/x3d+xml": [
		"x3d",
		"x3dz"
	],
	"text/cache-manifest": [
		"appcache",
		"manifest"
	],
	"text/calendar": [
		"ics",
		"ifb"
	],
	"text/coffeescript": [
		"coffee",
		"litcoffee"
	],
	"text/css": [
		"css"
	],
	"text/csv": [
		"csv"
	],
	"text/hjson": [
		"hjson"
	],
	"text/html": [
		"html",
		"htm",
		"shtml"
	],
	"text/jade": [
		"jade"
	],
	"text/jsx": [
		"jsx"
	],
	"text/less": [
		"less"
	],
	"text/mathml": [
		"mml"
	],
	"text/n3": [
		"n3"
	],
	"text/plain": [
		"txt",
		"text",
		"conf",
		"def",
		"list",
		"log",
		"in",
		"ini"
	],
	"text/prs.lines.tag": [
		"dsc"
	],
	"text/richtext": [
		"rtx"
	],
	"text/rtf": [
		"rtf"
	],
	"text/sgml": [
		"sgml",
		"sgm"
	],
	"text/slim": [
		"slim",
		"slm"
	],
	"text/stylus": [
		"stylus",
		"styl"
	],
	"text/tab-separated-values": [
		"tsv"
	],
	"text/troff": [
		"t",
		"tr",
		"roff",
		"man",
		"me",
		"ms"
	],
	"text/turtle": [
		"ttl"
	],
	"text/uri-list": [
		"uri",
		"uris",
		"urls"
	],
	"text/vcard": [
		"vcard"
	],
	"text/vnd.curl": [
		"curl"
	],
	"text/vnd.curl.dcurl": [
		"dcurl"
	],
	"text/vnd.curl.mcurl": [
		"mcurl"
	],
	"text/vnd.curl.scurl": [
		"scurl"
	],
	"text/vnd.dvb.subtitle": [
		"sub"
	],
	"text/vnd.fly": [
		"fly"
	],
	"text/vnd.fmi.flexstor": [
		"flx"
	],
	"text/vnd.graphviz": [
		"gv"
	],
	"text/vnd.in3d.3dml": [
		"3dml"
	],
	"text/vnd.in3d.spot": [
		"spot"
	],
	"text/vnd.sun.j2me.app-descriptor": [
		"jad"
	],
	"text/vnd.wap.wml": [
		"wml"
	],
	"text/vnd.wap.wmlscript": [
		"wmls"
	],
	"text/vtt": [
		"vtt"
	],
	"text/x-asm": [
		"s",
		"asm"
	],
	"text/x-c": [
		"c",
		"cc",
		"cxx",
		"cpp",
		"h",
		"hh",
		"dic"
	],
	"text/x-component": [
		"htc"
	],
	"text/x-fortran": [
		"f",
		"for",
		"f77",
		"f90"
	],
	"text/x-handlebars-template": [
		"hbs"
	],
	"text/x-java-source": [
		"java"
	],
	"text/x-lua": [
		"lua"
	],
	"text/x-markdown": [
		"markdown",
		"md",
		"mkd"
	],
	"text/x-nfo": [
		"nfo"
	],
	"text/x-opml": [
		"opml"
	],
	"text/x-pascal": [
		"p",
		"pas"
	],
	"text/x-processing": [
		"pde"
	],
	"text/x-sass": [
		"sass"
	],
	"text/x-scss": [
		"scss"
	],
	"text/x-setext": [
		"etx"
	],
	"text/x-sfv": [
		"sfv"
	],
	"text/x-suse-ymp": [
		"ymp"
	],
	"text/x-uuencode": [
		"uu"
	],
	"text/x-vcalendar": [
		"vcs"
	],
	"text/x-vcard": [
		"vcf"
	],
	"text/xml": [
		"xml"
	],
	"text/yaml": [
		"yaml",
		"yml"
	],
	"video/3gpp": [
		"3gp",
		"3gpp"
	],
	"video/3gpp2": [
		"3g2"
	],
	"video/h261": [
		"h261"
	],
	"video/h263": [
		"h263"
	],
	"video/h264": [
		"h264"
	],
	"video/jpeg": [
		"jpgv"
	],
	"video/jpm": [
		"jpm",
		"jpgm"
	],
	"video/mj2": [
		"mj2",
		"mjp2"
	],
	"video/mp2t": [
		"ts"
	],
	"video/mp4": [
		"mp4",
		"mp4v",
		"mpg4"
	],
	"video/mpeg": [
		"mpeg",
		"mpg",
		"mpe",
		"m1v",
		"m2v"
	],
	"video/ogg": [
		"ogv"
	],
	"video/quicktime": [
		"qt",
		"mov"
	],
	"video/vnd.dece.hd": [
		"uvh",
		"uvvh"
	],
	"video/vnd.dece.mobile": [
		"uvm",
		"uvvm"
	],
	"video/vnd.dece.pd": [
		"uvp",
		"uvvp"
	],
	"video/vnd.dece.sd": [
		"uvs",
		"uvvs"
	],
	"video/vnd.dece.video": [
		"uvv",
		"uvvv"
	],
	"video/vnd.dvb.file": [
		"dvb"
	],
	"video/vnd.fvt": [
		"fvt"
	],
	"video/vnd.mpegurl": [
		"mxu",
		"m4u"
	],
	"video/vnd.ms-playready.media.pyv": [
		"pyv"
	],
	"video/vnd.uvvu.mp4": [
		"uvu",
		"uvvu"
	],
	"video/vnd.vivo": [
		"viv"
	],
	"video/webm": [
		"webm"
	],
	"video/x-f4v": [
		"f4v"
	],
	"video/x-fli": [
		"fli"
	],
	"video/x-flv": [
		"flv"
	],
	"video/x-m4v": [
		"m4v"
	],
	"video/x-matroska": [
		"mkv",
		"mk3d",
		"mks"
	],
	"video/x-mng": [
		"mng"
	],
	"video/x-ms-asf": [
		"asf",
		"asx"
	],
	"video/x-ms-vob": [
		"vob"
	],
	"video/x-ms-wm": [
		"wm"
	],
	"video/x-ms-wmv": [
		"wmv"
	],
	"video/x-ms-wmx": [
		"wmx"
	],
	"video/x-ms-wvx": [
		"wvx"
	],
	"video/x-msvideo": [
		"avi"
	],
	"video/x-sgi-movie": [
		"movie"
	],
	"video/x-smv": [
		"smv"
	],
	"x-conference/x-cooltalk": [
		"ice"
	]
};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(18);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(18);
var formats = __webpack_require__(16);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    return keys.join(delimiter);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = __webpack_require__(19);

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var CookieJar = __webpack_require__(13).CookieJar;
var CookieAccess = __webpack_require__(13).CookieAccessInfo;
var parse = __webpack_require__(2).parse;
var request = __webpack_require__(6);
var methods = __webpack_require__(15);

/**
 * Expose `Agent`.
 */

module.exports = Agent;

/**
 * Initialize a new `Agent`.
 *
 * @api public
 */

function Agent(options) {
  if (!(this instanceof Agent)) return new Agent(options);
  if (options) {
    this._ca = options.ca;
    this._key = options.key;
    this._pfx = options.pfx;
    this._cert = options.cert;
  }
  this.jar = new CookieJar;
}

/**
 * Save the cookies in the given `res` to
 * the agent's cookie jar for persistence.
 *
 * @param {Response} res
 * @api private
 */

Agent.prototype._saveCookies = function(res){
  var cookies = res.headers['set-cookie'];
  if (cookies) this.jar.setCookies(cookies);
};

/**
 * Attach cookies when available to the given `req`.
 *
 * @param {Request} req
 * @api private
 */

Agent.prototype._attachCookies = function(req){
  var url = parse(req.url);
  var access = CookieAccess(url.hostname, url.pathname, 'https:' == url.protocol);
  var cookies = this.jar.getCookies(access).toValueString();
  req.cookies = cookies;
};

// generate HTTP verb methods
if (methods.indexOf('del') == -1) {
  // create a copy so we don't cause conflicts with
  // other packages using the methods package and
  // npm 3.x
  methods = methods.slice(0);
  methods.push('del');
}
methods.forEach(function(method){
  var name = method;
  method = 'del' == method ? 'delete' : method;

  method = method.toUpperCase();
  Agent.prototype[name] = function(url, fn){
    var req = new request.Request(method, url);
    req.ca(this._ca);
    req.key(this._key);
    req.pfx(this._pfx);
    req.cert(this._cert);

    req.on('response', this._saveCookies.bind(this));
    req.on('redirect', this._saveCookies.bind(this));
    req.on('redirect', this._attachCookies.bind(this, req));
    this._attachCookies(req);

    fn && req.end(fn);
    return req;
  };
});


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = function(res, fn){
  var data = []; // Binary data needs binary storage

  res.on('data', function(chunk){
      data.push(chunk);
  });
  res.on('end', function () {
      fn(null, Buffer.concat(data));
  });
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {


exports['application/x-www-form-urlencoded'] = __webpack_require__(59);
exports['application/json'] = __webpack_require__(57);
exports.text = __webpack_require__(58);

var binary = __webpack_require__(55);
exports['application/octet-stream'] = binary;
exports.image = binary;


/***/ }),
/* 57 */
/***/ (function(module, exports) {


module.exports = function parseJSON(res, fn){
  res.text = '';
  res.setEncoding('utf8');
  res.on('data', function(chunk){ res.text += chunk;});
  res.on('end', function(){
    try {
      var body = res.text && JSON.parse(res.text);
    } catch (e) {
      var err = e;
      // issue #675: return the raw response if the response parsing fails
      err.rawResponse = res.text || null;
      // issue #876: return the http status code if the response parsing fails
      err.statusCode = res.statusCode;
    } finally {
      fn(err, body);
    }
  });
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {


module.exports = function(res, fn){
  res.text = '';
  res.setEncoding('utf8');
  res.on('data', function(chunk){ res.text += chunk; });
  res.on('end', fn);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var qs = __webpack_require__(17);

module.exports = function(res, fn){
  res.text = '';
  res.setEncoding('ascii');
  res.on('data', function(chunk){ res.text += chunk; });
  res.on('end', function(){
    try {
      fn(null, qs.parse(res.text));
    } catch (err) {
      fn(err);
    }
  });
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var util = __webpack_require__(0);
var Stream = __webpack_require__(1);
var ResponseBase = __webpack_require__(63);

/**
 * Expose `Response`.
 */

module.exports = Response;

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * @param {Request} req
 * @param {Object} options
 * @constructor
 * @extends {Stream}
 * @implements {ReadableStream}
 * @api private
 */

function Response(req) {
  Stream.call(this);
  var res = this.res = req.res;
  this.request = req;
  this.req = req.req;
  this.text = res.text;
  this.body = res.body !== undefined ? res.body : {};
  this.files = res.files || {};
  this.buffered = 'string' == typeof this.text;
  this.header = this.headers = res.headers;
  this._setStatusProperties(res.statusCode);
  this._setHeaderProperties(this.header);
  this.setEncoding = res.setEncoding.bind(res);
  res.on('data', this.emit.bind(this, 'data'));
  res.on('end', this.emit.bind(this, 'end'));
  res.on('close', this.emit.bind(this, 'close'));
  res.on('error', this.emit.bind(this, 'error'));
}

/**
 * Inherit from `Stream`.
 */

util.inherits(Response, Stream);
ResponseBase(Response.prototype);


/**
 * Implements methods of a `ReadableStream`
 */

Response.prototype.destroy = function(err){
  this.res.destroy(err);
};

/**
 * Pause.
 */

Response.prototype.pause = function(){
  this.res.pause();
};

/**
 * Resume.
 */

Response.prototype.resume = function(){
  this.res.resume();
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var path = req.path;

  var msg = 'cannot ' + method + ' ' + path + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.text = this.text;
  err.method = method;
  err.path = path;

  return err;
};


Response.prototype.setStatusProperties = function(status){
  console.warn("In superagent 2.x setStatusProperties is a private method");
  return this._setStatusProperties(status);
};

/**
 * To json.
 *
 * @return {Object}
 * @api public
 */

Response.prototype.toJSON = function(){
  return {
    req: this.request.toJSON(),
    header: this.header,
    status: this.status,
    text: this.text
  };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var StringDecoder = __webpack_require__(68).StringDecoder;
var Stream = __webpack_require__(1);
var zlib = __webpack_require__(25);

/**
 * Buffers response data events and re-emits when they're unzipped.
 *
 * @param {Request} req
 * @param {Response} res
 * @api private
 */

exports.unzip = function(req, res){
  var unzip = zlib.createUnzip();
  var stream = new Stream;
  var decoder;

  // make node responseOnEnd() happy
  stream.req = req;

  unzip.on('error', function(err){
    if (err && err.code === 'Z_BUF_ERROR') { // unexpected end of file is ignored by browsers and curl
      stream.emit('end');
      return;
    }
    stream.emit('error', err);
  });

  // pipe to unzip
  res.pipe(unzip);

  // override `setEncoding` to capture encoding
  res.setEncoding = function(type){
    decoder = new StringDecoder(type);
  };

  // decode upon decompressing with captured encoding
  unzip.on('data', function(buf){
    if (decoder) {
      var str = decoder.write(buf);
      if (str.length) stream.emit('data', str);
    } else {
      stream.emit('data', buf);
    }
  });

  unzip.on('end', function(){
    stream.emit('end');
  });

  // override `on` to capture data listeners
  var _on = res.on;
  res.on = function(type, fn){
    if ('data' == type || 'end' == type) {
      stream.on(type, fn);
    } else if ('error' == type) {
      stream.on(type, fn);
      _on.call(res, type, fn);
    } else {
      _on.call(res, type, fn);
    }
    return this;
  };
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = __webpack_require__(19);

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var utils = __webpack_require__(20);

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = {
	"_args": [
		[
			{
				"raw": "superagent",
				"scope": null,
				"escapedName": "superagent",
				"name": "superagent",
				"rawSpec": "",
				"spec": "latest",
				"type": "tag"
			},
			"/Users/obalbous/work/git/openbouquet/bouquet-js"
		]
	],
	"_from": "superagent@latest",
	"_id": "superagent@3.5.2",
	"_inCache": true,
	"_location": "/superagent",
	"_nodeVersion": "7.7.3",
	"_npmOperationalInternal": {
		"host": "packages-18-east.internal.npmjs.com",
		"tmp": "tmp/superagent-3.5.2.tgz_1490192709793_0.7011477949563414"
	},
	"_npmUser": {
		"name": "kornel",
		"email": "pornel@pornel.net"
	},
	"_npmVersion": "4.1.2",
	"_phantomChildren": {},
	"_requested": {
		"raw": "superagent",
		"scope": null,
		"escapedName": "superagent",
		"name": "superagent",
		"rawSpec": "",
		"spec": "latest",
		"type": "tag"
	},
	"_requiredBy": [
		"#USER",
		"/"
	],
	"_resolved": "https://registry.npmjs.org/superagent/-/superagent-3.5.2.tgz",
	"_shasum": "3361a3971567504c351063abeaae0faa23dbf3f8",
	"_shrinkwrap": null,
	"_spec": "superagent",
	"_where": "/Users/obalbous/work/git/openbouquet/bouquet-js",
	"author": {
		"name": "TJ Holowaychuk",
		"email": "tj@vision-media.ca"
	},
	"browser": {
		"./lib/node/index.js": "./lib/client.js",
		"./test/support/server.js": "./test/support/blank.js"
	},
	"bugs": {
		"url": "https://github.com/visionmedia/superagent/issues"
	},
	"component": {
		"scripts": {
			"superagent": "lib/client.js"
		}
	},
	"contributors": [
		{
			"name": "Kornel Lesiński",
			"email": "kornel@geekhood.net"
		},
		{
			"name": "Peter Lyons",
			"email": "pete@peterlyons.com"
		},
		{
			"name": "Hunter Loftis",
			"email": "hunter@hunterloftis.com"
		}
	],
	"dependencies": {
		"component-emitter": "^1.2.0",
		"cookiejar": "^2.0.6",
		"debug": "^2.2.0",
		"extend": "^3.0.0",
		"form-data": "^2.1.1",
		"formidable": "^1.1.1",
		"methods": "^1.1.1",
		"mime": "^1.3.4",
		"qs": "^6.1.0",
		"readable-stream": "^2.0.5"
	},
	"description": "elegant & feature rich browser / node HTTP with a fluent API",
	"devDependencies": {
		"Base64": "^1.0.0",
		"basic-auth-connect": "^1.0.0",
		"body-parser": "^1.15.0",
		"browserify": "^14.0.0",
		"cookie-parser": "^1.4.1",
		"express": "^4.13.4",
		"express-session": "^1.13.0",
		"marked": "^0.3.5",
		"mocha": "^3.1.2",
		"multer": "^1.2.0",
		"should": "^11.1.1",
		"should-http": "^0.0.4",
		"zuul": "^3.11.1"
	},
	"directories": {},
	"dist": {
		"shasum": "3361a3971567504c351063abeaae0faa23dbf3f8",
		"tarball": "https://registry.npmjs.org/superagent/-/superagent-3.5.2.tgz"
	},
	"engines": {
		"node": ">= 0.12"
	},
	"gitHead": "ef9af6c85b2b1a0cf5f350bece2f7e33d89b888a",
	"homepage": "https://github.com/visionmedia/superagent#readme",
	"keywords": [
		"http",
		"ajax",
		"request",
		"agent"
	],
	"license": "MIT",
	"main": "./lib/node/index.js",
	"maintainers": [
		{
			"name": "defunctzombie",
			"email": "shtylman@gmail.com"
		},
		{
			"name": "kof",
			"email": "oleg008@gmail.com"
		},
		{
			"name": "kornel",
			"email": "pornel@pornel.net"
		},
		{
			"name": "naman34",
			"email": "naman34@gmail.com"
		},
		{
			"name": "nw",
			"email": "nw@nwhite.net"
		},
		{
			"name": "rauchg",
			"email": "rauchg@gmail.com"
		},
		{
			"name": "superjoe",
			"email": "superjoe30@gmail.com"
		},
		{
			"name": "tjholowaychuk",
			"email": "tj@vision-media.ca"
		},
		{
			"name": "travisjeffery",
			"email": "tj@travisjeffery.com"
		},
		{
			"name": "yields",
			"email": "yields@icloud.com"
		}
	],
	"name": "superagent",
	"optionalDependencies": {},
	"readme": "ERROR: No README data found!",
	"repository": {
		"type": "git",
		"url": "git://github.com/visionmedia/superagent.git"
	},
	"scripts": {
		"prepublish": "make all",
		"test": "make test"
	},
	"version": "3.5.2"
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright © Squid Solutions, 2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of Open Bouquet software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This program is free software; you can redistribute it and/or modify
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * it under the terms of the GNU Affero General Public License as
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * published by the Free Software Foundation (version 3 of the License).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * There is a special FOSS exception to the terms and conditions of the 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * licenses as they are applied to this program. See LICENSE.txt in
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * the directory of this program distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This program is distributed in the hope that it will be useful,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Squid Solutions also offers commercial licenses with additional warranties,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * professional functionalities or services. If you purchase a commercial
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * license, then it supersedes and replaces any other agreement between
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you and Squid Solutions (above licenses and LICENSE.txt included).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See http://www.squidsolutions.com/EnterpriseBouquet/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _urijs = __webpack_require__(28);

var _urijs2 = _interopRequireDefault(_urijs);

var _package = __webpack_require__(29);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(27).polyfill();
__webpack_require__(26).polyfill();
var superagent = __webpack_require__(6);

var Bouquet = function () {
    function Bouquet(options) {
        _classCallCheck(this, Bouquet);

        options = options || {};
        if (!options.url) {
            throw new Error('Parameter "url" is required');
        }
        if (!options.clientId) {
            throw new Error('Parameter "clientId" is required');
        }
        this.config = options;
        this.uri = new _urijs2.default(options.url);
        this._authPromise = null;
    }

    _createClass(Bouquet, [{
        key: '_buildRequestUrl',
        value: function _buildRequestUrl(access_token, query) {
            var url = this.uri.clone();
            var path = void 0;
            var data = void 0;
            if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
                path = query.path;
                data = query.data;
            } else {
                path = query;
            }
            var pathURI = new _urijs2.default(path);
            // set the path
            url.path(_urijs2.default.joinPaths(this.uri, pathURI.path()));
            // set the query
            var parsedQuery = _urijs2.default.parseQuery(pathURI.query());
            for (var q in parsedQuery) {
                url.setQuery(q, parsedQuery[q]);
            }
            // set the data
            if (data) {
                url.addQuery(data);
            }
            if (access_token) {
                url.setQuery('access_token', access_token);
            } else if (this.config.apiKey) {
                url.setQuery('assertion', this.config.apiKey);
            } else if (this.config.code) {
                url.setQuery('code', this.config.code);
            }
            url.setQuery('clientId', this.config.clientId);
            return url.toString();
        }
    }, {
        key: '_doRequest',
        value: function _doRequest(access_token, query, callback) {
            var url = void 0;
            var promise = void 0;
            var data = void 0;
            if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
                data = query.data;
            }

            if (data) {
                // POST
                url = this._buildRequestUrl(access_token, { path: query.path });
                promise = superagent.post(url).set('Content-Type', 'application/json').send(data);
            } else {
                // GET
                url = this._buildRequestUrl(access_token, query);
                promise = superagent.get(url).accept('application/json');
            }

            if (!callback) {
                // return as a promise
                return promise.then(function (res) {
                    console.log(res.statusType);
                    if (res.statusType === 2) {
                        return res.body;
                    } else {
                        throw res;
                    }
                });
            } else {
                // return as callback
                promise.then(function (res) {
                    callback(null, res.body);
                }).catch(function (err) {
                    callback(err);
                });
            }
        }
    }, {
        key: 'getVersion',
        value: function getVersion() {
            return _package2.default.version;
        }

        // request a new OAuth2 token

    }, {
        key: 'requestToken',
        value: function requestToken(callback) {
            // check if no auth already in progress
            if (!this._authPromise) {
                this._authPromise = this._doRequest(null, '/rs/token', callback);
            }
            return this._authPromise;
        }

        /* 
         * Perform an API request.
         * This method will return a Promise. 
         * This Promise argument will be with the response body as a json object if HTTP code is 2XX.
         * If HTTP code isn't 2XX the response will by thrown as an error.
         * @param query a query defined either by 
         *  - a single string such as '/path?query'
         *  - a JSON object such as : { path : '', data : {} }
         * @param parameters an optional JSON object containing extra parameters to be added to the query url e.g. {envelope : 'data',data : 'RECORDS'}
         * @param a callback function to use instead of returning a Promise
         */

    }, {
        key: 'request',
        value: function request(query, parameters, callback) {
            var _this = this;

            if (this.config.apiKey || this.config.code) {
                return this.requestToken().then(function (res) {
                    _this.config.access_token = res.access_token;
                    if (parameters) {
                        var path = void 0;
                        var data = void 0;
                        if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
                            var pathURI = new _urijs2.default(query.path);
                            for (var q in parameters) {
                                pathURI.setQuery(q, parameters[q]);
                            }
                            var newQuery = jQuery.extend(true, {}, query);
                            newQuery.path = pathURI.toString();
                            return _this._doRequest(_this.config.access_token, newQuery, callback);
                        } else {
                            var _pathURI = new _urijs2.default(query);
                            for (var q in parameters) {
                                _pathURI.setQuery(q, parameters[q]);
                            }
                            return _this._doRequest(_this.config.access_token, _pathURI.toString(), callback);
                        }
                    } else {
                        return _this._doRequest(_this.config.access_token, query, callback);
                    }
                });
            } else {
                return this._doRequest(this.config.access_token, query, callback);
            }
        }

        /* 
         * Get a full request URL with token and query parameter serialized from and query object passed-in.
         * @param query a query used to define a path - defined either by 
         *  - a single string such as '/path?query'
         *  - a JSON object such as : { path : '', data : {} }
         */

    }, {
        key: 'getRequestUrl',
        value: function getRequestUrl(query, callback) {
            var _this2 = this;

            if (this.config.access_token) {
                return new Promise(function (resolve) {
                    var url = _this2._buildRequestUrl(_this2.config.access_token, query, callback);
                    resolve(url);
                });
            } else {
                return this.requestToken().then(function (res) {
                    _this2.config.access_token = res.access_token;
                    return _this2._buildRequestUrl(_this2.config.access_token, query, callback);
                });
            }
        }
    }]);

    return Bouquet;
}();

exports.default = Bouquet;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=bouquet.node.js.map