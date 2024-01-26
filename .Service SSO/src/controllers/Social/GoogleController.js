require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from "passport";
import { upsertUserSocialMedia } from "../../services/loginRegisterService";
import { v4 as uuidv4 } from "uuid";

const ConfigLoginWithGoogle =() => {
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
        user.code = uuidv4()
        return cb(null, user);
      }
    ));
}

export default ConfigLoginWithGoogle
