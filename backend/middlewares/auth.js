const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised User!",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = isAuthenticated;
