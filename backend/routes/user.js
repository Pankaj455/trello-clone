const {
  getProfile,
  getBoards,
  register,
  login,
} = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me/", isAuthenticated, getProfile);
router.get("/boards/", isAuthenticated, getBoards);
router.post("/register/", register);
router.post("/login/", login);

module.exports = router;
