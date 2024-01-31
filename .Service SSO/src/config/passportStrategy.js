import passport from "passport";
import LocalStrategy from "passport-local";
import { loginUser } from "../services/loginRegisterService";
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { upsertUserSocialMedia } from "../services/loginRegisterService";
import { v4 as uuidv4 } from "uuid";

const ConfigLocalStrategy = () => {
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
          //input for passport.serializeUser
          return done(null, response.DT);
        } else {
          return done(null, false, {message: response.EM});
        }
      }
    )
  );
};

const ConfigGoogleStrategy =() => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: process.env.GOOGLE_APP_CALLBACK_URL
      },
      async function(accessToken, refreshToken, profile, cb) {
        const typeAcc = "GOOGLE";
        let dataRaw = {
            username: profile.displayName,
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
            googleId: profile.id
        }
        let user = await upsertUserSocialMedia(typeAcc, dataRaw)
        user.code = uuidv4() // gán user vào req: req.user
        return cb(null, user);
      }
    ));
}

const ConfigFacebookStrategy = () => {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
          profileFields: ['id', 'email', 'name', 'displayName'] 
        },
        async function (accessToken, refreshToken, profile, cb) {
          const typeAcc = "FACEBOOK";
          let dataRaw = {
            username: profile.displayName,
            email: profile.id
          };
          let user = await upsertUserSocialMedia(typeAcc, dataRaw);
          user.code = uuidv4();
          return cb(null, user);
        }
      )
    );
  };
  

export { ConfigLocalStrategy, ConfigGoogleStrategy, ConfigFacebookStrategy };
