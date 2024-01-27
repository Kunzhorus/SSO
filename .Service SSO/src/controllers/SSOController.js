import { v4 as uuidv4 } from "uuid";
import { updateUserRefreshToken } from "../services/loginRegisterService";
import { getGroupWithRoles } from "../services/groupService";
import { createJWT } from "../middleware/JWTAction";
require('dotenv').config()

const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
};
const GetLoginPage = (req, res) => {
  const serviceURL = req.query.serviceURL;
  return res.render("login.ejs", { redirectURL: serviceURL });
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

const verifySSOToken = async (req, res) => {
  try {
    const ssoToken = req.body.ssoToken;
    if (req?.user?.code === ssoToken) {
      const refresh_token = uuidv4();

      //update refreshToken
      await updateUserRefreshToken(req.user.email, refresh_token);

      //create access token
      // let roles = await getGroupWithRoles(req.user);
      let payload = {
        email: req.user.email,
        username: req.user.username,
        roles: req.user.roles,
        // roles: roles
      };
      let access_token = createJWT(payload);

      //set cookies
      res.cookie('access_token', access_token , {
        maxAge: 15*60*1000,
        httpOnly: true
      })

      res.cookie('refresh_token', refresh_token , {
        maxAge: 60*60*1000,
        httpOnly: true
      })

      let responseData = {
        access_token,
        refresh_token,
        email: req.user.email,
        username: req.user.username,
        roles: req.user.roles,
      };

      //destroy session
      req.logout(function (err) {});
      
      return res.status(200).json({
        EM: "Login successfully",
        EC: 0,
        DT: responseData,
      });
    } else {
      return res.status(401).json({
        EM: "SSOToken didn't match ",
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Something wrong in the server...",
      EC: -1,
    });
  }
};


export {
  handleHelloWord,
  GetLoginPage,
  verifySSOToken,
  handleLogout
};
