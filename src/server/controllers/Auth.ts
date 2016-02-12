import passport = require("passport");

import {Router} from "express";
import {DbContext} from "../database/DbContext";
import {AuthWorker} from "../workers/AuthWorker";
import {AuthHelper} from "../helpers/AuthHelper";
import {RoutesHelper} from "../helpers/RoutesHelper";

// Endpoint "/auth"
var authRouter = function (router:Router)
{
    // Register endpoint
    router.route("/register")
        .post(async function (req, res, next)
        {
            var registerData = await AuthWorker.doRegister(req, res, next);

            return res.json(registerData);
        })

    // Login endpoint
    router.route("/login")
        .post(async function (req, res, next)
        {
            if (req.user)
                return res.json({
                    success: true,
                    data: req.user
                });

            var loginResult = await AuthWorker.doLogin(req, res, next);

            return res.json(loginResult);
        })

    // Logout endpoint
    router.route("/logout")
        .all(RoutesHelper.authorize())
        .post(function (req, res, next)
        {
            req.logout();

            AuthHelper.clearAuthCookie(res);

            return res.json({
                success: true
            });
        })

    // Get the current user in session
    router.route("/me")
        .get(function (req, res, next)
        {
            return res.json({
                success: true,
                data: req.user
            });
        })
};

export = authRouter;