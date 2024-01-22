import express from "express";
import homeController from "../controllers/homeController";
import passport from "passport";
import CheckAuthentication from "../middleware/CheckAuthentication";
import { handleLogout } from "../controllers/passportController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //path, handler
  router.get("/", CheckAuthentication, homeController.handleHelloWord);
  router.get("/login", CheckAuthentication, homeController.handleLogin);

  // router.post(
  //   "/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //   })
  // );

  router.post("/login", function (req, res, next) {
    passport.authenticate("local", function (error, user, info) {
      if (error) {
        return res.status(500).json(error);
      }
      if (!user) {
        return res.status(401).json(info.message);
      }
      req.login(user, function (err) {
        if (err) return next(err);
        // return res.redirect('/')
        return res
          .status(200)
          .json({ ...user, redirectURL: req.body.serviceURL });
      });
    })(req, res, next);
  });

  router.post("/logout", handleLogout);
  router.post("/verify-token", homeController.verifySSOToken);

  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req.user);
      res.redirect("/");
    }
  );

  return app.use("/", router);
};

export default initWebRoutes;
