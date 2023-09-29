import jwt from "jsonwebtoken";
const nonSecurePaths = ["/logout", "/register", "/login"];

const createJWT = (payload) => {
  let token = jwt.sign(payload, "secret");
  return token;
};

const verifyToken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, "secret");
  } catch (e) {
    console.log(e);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();
  if (req.user) {
    let roles = req.user.roles.Roles;
    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EM: "You don't have permission to acces this resource",
        EC: -1,
        DT: "",
      });
    }
    let canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EM: "You don't have permission to acces this resource",
        EC: -1,
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: " Not authenticated the user",
      EC: -1,
      DT: "",
    });
  }
};

// const extractToken = (req) => {
//   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//   }
//   return null;
// }
export { createJWT, verifyToken, checkUserJWT, checkUserPermission };
