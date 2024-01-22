var Sequelize = require("sequelize");
var session = require("express-session");
import passport from "passport";
const configSession = (app) => {
    var SequelizeStore = require("connect-session-sequelize")(session.Store);

    // create database, ensure 'sqlite3' in your package.json
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
      host:process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false,
      define : { freezeTableName : true},
      timezone: '+07:00'
    })
    
    // configure express
    const myStore = new SequelizeStore({
      db: sequelize,
    });
    app.use(
      session({
        secret: "keyboard cat",
        store: myStore,
        saveUninitialized: false,
        resave: false,
        proxy: true,
        expiration: 24 * 60 * 1000,
        cookie: {expires: 24 * 60 * 1000}

      })
    );
    myStore.sync();

    app.use(passport.authenticate('session'));

    passport.serializeUser(function(user, cb) {
      process.nextTick(function() {
        // cb(null, { id: user.id, username: user.username });
        cb(null, user);
      });
    });
    
    passport.deserializeUser(function(user, cb) {
      process.nextTick(function() {
        return cb(null, user);
      });
    });
}

export default configSession