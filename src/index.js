// const popsicle = require('popsicle');
import popsicle from 'popsicle';

export default class Bouquet {
    constructor( options ) {
        options = options || {};
        if ( !options.url ) {
            throw new Error( 'Parameter "url" is required' );
        }
        if ( !options.clientId ) {
            throw new Error( 'Parameter "clientId" is required' );
        }
        this.config = options;
    }
    
    // request a new OAuth2 token
    requestToken( token, callback ) {
        if (!token) {
            token = this.config.apiKey;
            if (!token) {
                throw new Error( 'Parameter "token" is required is no apiKey defined' );
            }
        }
        let tokenUrl = this.config.url+'/rs/token';
        tokenUrl += '?assertion='+token;
        tokenUrl += '&clientId='+this.config.clientId;
        const promise = popsicle.get(tokenUrl);
        if (!callback) {
            // return the token as a promise
            return promise.then(function(res) {
                return res.body;
            });
        } else {
            // return the token as callback argument
            promise.then( function( res ) {
                callback(null, res.body);
            })
            .catch( function( err ) {
                callback(err);
            })
        }
    }
}
