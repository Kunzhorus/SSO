require("dotenv").config();
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  getUserByRefreshToken,
  updateUserRefreshToken,
} from "../services/loginRegisterService";
const nonSecurePaths = [
  "/logout",
  "/register",
  "/login",
  "/verify-services-jwt",
];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return "Token Expired";
    }
    console.log(e);
  }
  return decoded;
};

const checkUserJWT = async (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.access_token) {
    let access_token = cookies.access_token;
    let decoded = verifyToken(access_token);

    if (decoded && decoded !== "Token Expired") {
      decoded.access_token = access_token;
      decoded.refresh_token = cookies.refresh_token;
      req.user = decoded;
      next();
    } else if (decoded && decoded === "Token Expired") {
      //set new access_token
      if (cookies && cookies.refresh_token) {
        let data = await handelRefreshToken(cookies.refresh_token);
        let newAccessToken = data.newAccessToken;
        let newRefreshToken = data.newRefreshToken;
        //set cookies
        if (newAccessToken && newRefreshToken) {
          res.cookie("access_token", newAccessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
          });

          res.cookie("refresh_token", newRefreshToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          });
        }

        return res.status(405).json({
          EC: -1,
          EM: "Need to retry with new token",
        });
      }
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated the user",
    });
  }
};

const handelRefreshToken = async (refreshToken) => {
  let newAccessToken = "",
    newRefreshToken = "";
  let user = await getUserByRefreshToken(refreshToken);
  if (user) {
    //create new token
    let payload = {
      email: user.email,
      roles: user.roles,
      username: user.username,
    };
    newAccessToken = createJWT(payload);
    newRefreshToken = uuidv4();
    await updateUserRefreshToken(newRefreshToken, user.email);
  }
  return {
    newAccessToken,
    newRefreshToken,
  };
};
const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
  if (req.user) {
    let roles = req.user.roles?.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "You don't have permission to access this resource",
        EC: -1,
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EM: "You don't have permission to access this resource",
        EC: -1,
      });
    }
  } else {
    return res.status(401).json({
      EM: " Not authenticated the user",
      EC: -1,
    });
  }
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkServiceJWT = (req, res, next) => {
  let tokenFromHeader = extractToken(req);

  if (tokenFromHeader) {
    let access_token = tokenFromHeader;
    let decoded = verifyToken(access_token);
    if (decoded) {
      return res.status(200).json({
        EC: 0,
        EM: "The user is verified",
      });
    } else {
      return res.status(401).json({
        EC: -1,
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      EM: "Not authenticated the user",
    });
  }
};
export {
  createJWT,
  verifyToken,
  checkUserJWT,
  checkUserPermission,
  checkServiceJWT,
};
