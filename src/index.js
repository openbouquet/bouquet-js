/*
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

const URI  = require('urijs');
const pack = require('../package.json');
const crypto = require('crypto');
require('es6-promise').polyfill();
require('es6-object-assign').polyfill();
const popsicle = require('popsicle');

class Bouquet {
    constructor( options ) {
        options = options || {};
        if ( !options.url ) {
            throw new Error( 'Parameter "url" is required' );
        }
        if ( !options.clientId ) {
            throw new Error( 'Parameter "clientId" is required' );
        }
        this.config = options;
        this.uri = new URI( options.url );
        this._authPromise = null;
        // if (this.config.secret && this.config.secret !== null) {
        // 	this.mac = crypto.createHmac('sha1', this.config.secret);
        // }
    }
    
    _buildRequestUrl(query, addAuthorization) {
        let url = this.uri.clone();
        let path;
        let data;
        if ( typeof query === 'object' ) {
            path = query.path;
            data = query.data;
        } else {
            path = query;
        }
        let pathURI = new URI( path );
        // set the path
        url.path( URI.joinPaths( this.uri, pathURI.path() ) );
        // set the query
        let parsedQuery = URI.parseQuery( pathURI.query() );
        for ( var q in parsedQuery ) {
            url.setQuery( q, parsedQuery[q] );
        }
        // set the data
        if (data) {
            url.addQuery(data);
        }
        if ( this.config.code ) {
            url.setQuery( 'code', this.config.code );
        }
        if (addAuthorization === true) {
            if (this.config.access_token) {
                url.setQuery( 'access_token', this.config.access_token );
            } else {
                if (this.config.apiKey) {
                    url.setQuery( 'api_key', this.config.apiKey );
                }
            }
        }
        url.setQuery( 'clientId', this.config.clientId );
        return url.toString();
    }

    _doRequest(query, callback ) {
        let url, promise, data, req, authorization, stringToHash;
        if ( typeof query === 'object' ) {
            data = query.data;
        }

        if ( data ) {
            // POST
            url = this._buildRequestUrl({ path : query.path });
            req = {
                    method: 'POST',
                    url: url,
                    body: data,
                    headers: {}
            };
        } else {
            // GET
            url = this._buildRequestUrl(query);
            req = {
                    method: 'GET',
                    url: url,
                    headers: {}
            };
        }
        stringToHash = url;
        
        if (this.config.access_token) {
            authorization = 'Bearer '+ this.config.access_token;
        } else {
            if (this.config.apiKey) {
                authorization = 'ApiKey '+ this.config.apiKey;
            }
        }

        if (this.config.secret) {
            const signature = crypto.createHmac('sha1', this.config.secret).update(stringToHash).digest('hex');
            req.headers.Signature = signature;
        }

        if (authorization) {
            req.headers.Authorization = authorization;
        };
        promise = popsicle.request(req);
        promise = promise.use(popsicle.plugins.parse('json'));
        
        if ( !callback ) {
            // return as a promise
            return promise.then( function( res ) {
                if (res.statusType() == 2) {
                    return res.body;
                } else {
                    throw res;
                }
            });
        } else {
            // return as callback
            promise.then( function( res ) {
                callback( null, res.body );
            })
            .catch( function( err ) {
                callback( err );
            });
        }
    }
    
    getVersion() {
        return pack.version;
    }

    // request a new OAuth2 token
    requestToken( callback ) {
        // check if no auth already in progress
        if (!this._authPromise) {
            this._authPromise = this._doRequest( '/rs/token', callback );
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
    request( query, parameters, callback ) {
        if (this.config.code) {
            // auth_code flow
            return this.requestToken().then(
                (res) => {
                    this.config.access_token = res.access_token;
                    if (parameters) {
                        let path;
                        let data;
                        if ( typeof query === 'object' ) {
                            let pathURI = new URI( query.path );
                            for ( var q in parameters ) {
                                pathURI.setQuery( q, parameters[q] );
                            }
                            let newQuery = jQuery.extend(true, {}, query);
                            newQuery.path = pathURI.toString();
                            return this._doRequest(newQuery, callback );
                        } else {
                            let pathURI = new URI( query );
                            for ( var q in parameters ) {
                                pathURI.setQuery( q, parameters[q] );
                            }
                            return this._doRequest(pathURI.toString(), callback );
                        }
                    } else {
                        return this._doRequest(query, callback );
                    }
                }
            );
        } else {
            if (this.config.apiKey) {
                return this._doRequest(query, callback );
            } else {
                return this._doRequest(query, callback );
            }
        }
    }
    
    /* 
     * Get a full request URL with token and query parameter serialized from and query object passed-in.
     * @param query a query used to define a path - defined either by 
     *  - a single string such as '/path?query'
     *  - a JSON object such as : { path : '', data : {} }
     */
    getRequestUrl( query) {
        if ( this.config.access_token ) {
            return new Promise((resolve) => {
                let url = this._buildRequestUrl( query, true);
                resolve(url);
            });
        } else {
            return this.requestToken().then(
                (res) => {
                    this.config.access_token = res.access_token;
                    return this._buildRequestUrl( query, true);
                }
            );
        }
    }
}

module.exports = Bouquet;

