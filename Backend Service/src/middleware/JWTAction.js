import axios from "axios";
const nonSecurePaths = ["/"];
require("dotenv").config();

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJWT = async (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let tokenFromHeader = extractToken(req);
  if (tokenFromHeader) {
    let access_token = tokenFromHeader;
    //call SSO to verify token
    axios.defaults.headers.Authorization = `Bearer ${access_token}`;
    try {
      let resAPI = await axios.post(process.env.API_SSO_VERIFY_ACCESS_TOKEN);
      if (resAPI?.data?.EC === 0) {
        next();
      } else {
        return res.status(401).json({
          EC: -1,
          EM: "Not authenticated user",
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(400).json({
      EC: -1,
      EM: "Missing the auth token from header",
    });
  }
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

export { checkUserJWT, checkUserPermission };
