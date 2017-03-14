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

import popsicle from 'popsicle';
import URI from 'urijs';
import pack from '../package.json';

export default class Bouquet {
    constructor( options ) {
        options = options || {};
        if ( !options.url ) {
            throw new Error( 'Parameter "url" is required' );
        }
        if ( !options.clientId ) {
            throw new Error( 'Parameter "clientId" is required' );
        }
        if ( ( !options.apiKey ) && ( !options.access_token ) ) {
            throw new Error( 'Either "apiKey" or "access_token" paremeter is required' );
        }
        this.config = options;
        this.uri = new URI( options.url );
    }
    
    getVersion() {
        return pack.version;
    }

    // request a new OAuth2 token
    requestToken( callback ) {
        return this.doRequest( null, '/rs/token', callback );
    }

    doRequest( access_token, query, callback ) {
        let url = this.uri.clone();
        let path, data;
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
        if ( access_token ) {
            url.setQuery( 'access_token', access_token );
        } else {
            url.setQuery( 'assertion', this.config.apiKey );
        }
        url.setQuery( 'clientId', this.config.clientId );
        let promise;
        if ( data ) {
            // POST 
            promise = popsicle.post( {
                url: url.toString(),
                body: data
            });
        } else {
            // GET
            promise = popsicle.get( url.toString() );
        }
        if ( !callback ) {
            // return the token as a promise
            return promise.then( function( res ) {
                return res.body;
            });
        } else {
            // return the token as callback argument
            promise.then( function( res ) {
                callback( null, res.body );
            })
                .catch( function( err ) {
                    callback( err );
                });
        }
    }

    /* 
     * Perform an API request.
     * @param query a query defined either by 
     *  - a single string such as '/path?query'
     *  - a JSON object such as : { path : '', data : {} }
     */
    request( query, callback ) {
        if ( this.config.token ) {
            return this.doRequest( this.config.access_token, query, callback );
        } else {
            let me = this;
            return this.requestToken().then(
                function( res ) {
                    me.config.token = res.access_token;
                    return me.doRequest( me.config.token, query, callback );
                }
            );
        }
    }
}
