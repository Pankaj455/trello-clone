module.exports.requestLogger = (req, res, next) => {
  console.log("------------------------");
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("------------------------\n");
  next();
};
