require("dotenv").config();
const FacebookStrategy = require("passport-facebook").Strategy;
import passport from "passport";
import { upsertUserSocialMedia } from "../../services/loginRegisterService";
import { v4 as uuidv4 } from "uuid";

const ConfigLoginWithFacebook = () => {
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

export default ConfigLoginWithFacebook;
