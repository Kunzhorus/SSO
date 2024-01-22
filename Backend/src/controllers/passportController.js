import passport from "passport";
import LocalStrategy from "passport-local";
import { loginUser } from "../services/loginRegisterService";

const configPassport = () => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        const data = {
          valueLogin: username,
          password,
        };
        let response = await loginUser(data);
        if (response?.EC === 0) {
          return done(null, response.DT);
        } else {
          return done(null, false, {message: response.EM});
        }
      }
    )
  );
};

const handleLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
  // req.session.destroy(function(err){
  //   req.logout(function (err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.redirect('/')
  //   });
  // })
};
export { configPassport, handleLogout };
