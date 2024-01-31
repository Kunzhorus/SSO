import express from "express";
import passport from "passport";
import {handleHelloWord, GetLoginPage, handleLogout, verifySSOToken} from "../controllers/SSOController";
import { checkServiceJWT } from "../middleware/JWTAction";
import CheckAuthentication from "../middleware/CheckAuthentication";

const ssoAPI = (app) => {
  const router = express.Router();

  //path, handler
  router.get("/", CheckAuthentication, handleHelloWord);
  router.get("/login", CheckAuthentication, GetLoginPage);
  router.post("/logout", handleLogout);
  router.post("/verify-token", verifySSOToken);
  router.post("/verify-services-jwt",checkServiceJWT)
  // router.post(
  //   "/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //   })
  // );


  //Local
  router.post("/login", function (req, res, next) {
    passport.authenticate("local", function (error, user, info) {
      if (error) {
        return res.status(500).json(error);
      }
      if (!user) {
        return res.status(401).json(info.message);
      }
      req.login(user, function (err) {
        //user from ConfigLocalStrategy
        if (err) return next(err);
        return res.status(200).json({ ...user, redirectURL: req.body.serviceURL });
      });
    })(req, res, next);
  });

  //Google
  router.get(
    "/auth/google",
    passport.authenticate("google", { failureRedirect: "/login", scope : ['email']  })
  );

  router.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      return res.render("social.ejs", { ssoToken: req.user.code });
    }
  );

  //Facebook
  router.get('/auth/facebook',
  passport.authenticate('facebook'));

  router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", { failureRedirect: "/login"}),
    function (req, res) {
      // Successful authentication, redirect home.
      return res.render("social.ejs", { ssoToken: req.user.code });
    }
  );

  return app.use("/", router);
};

export default ssoAPI;
