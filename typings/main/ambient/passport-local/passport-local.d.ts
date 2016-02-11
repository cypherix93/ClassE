// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/67e09fcdb1efacbb3abf964672b4b362f0e68b4b/passport-local/passport-local.d.ts
// Type definitions for passport-local 1.0.0
// Project: https://github.com/jaredhanson/passport-local
// Definitions by: Maxime LUCE <https://github.com/SomaticIT>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module 'passport-local' {

    import passport = require('passport');
    import express = require('express');

    interface IStrategyOptions {
        usernameField?: string;
        passwordField?: string;
        passReqToCallback?: boolean;
    }

    interface IStrategyOptionsWithRequest {
        usernameField?: string;
        passwordField?: string;
        passReqToCallback: boolean;
    }

    interface IVerifyOptions {
        message: string;
    }

    interface VerifyFunctionWithRequest {
        (req: express.Request, username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
    }

    interface VerifyFunction {
        (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): void;
    }

    class Strategy implements passport.Strategy {
        constructor(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);
        constructor(options: IStrategyOptions, verify: VerifyFunction);
        constructor(verify: VerifyFunction);

        name: string;
        authenticate: (req: express.Request, options?: Object) => void;
    }
}