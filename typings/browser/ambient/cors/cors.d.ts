// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/ee872c633411d2524cafc68d339f016acbfa1fd6/cors/cors.d.ts
// Type definitions for cors
// Project: https://github.com/troygoode/node-cors/
// Definitions by: Mihhail Lapushkin <https://github.com/mihhail-lapushkin/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module "cors" {
    import express = require('express');

    module e {
        interface CorsOptions  {
            origin?: any;
            methods?: any;
            allowedHeaders?: any;
            exposedHeaders?: any;
            credentials?: boolean;
            maxAge?: number;
        }
    }

    function e(options?: e.CorsOptions): express.RequestHandler;
    export = e;
}