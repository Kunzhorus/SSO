const CheckAuthentication = (req, res, next) => {
  //check for session is valid
  if (req.isAuthenticated()) {
    if (req.path === "/login") {
      return res.redirect("/");
    }
    next();
  } else {
    if (req.path === "/login") {
      next();
    } else return res.redirect("/login");
  }
};

export default CheckAuthentication;
