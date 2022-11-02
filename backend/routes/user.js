const {
  getProfile,
  getBoards,
  register,
  login,
  uploadAvatar,
} = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me/", isAuthenticated, getProfile);

router.post("/upload/avatar", isAuthenticated, uploadAvatar);

// router.get("/boards/", isAuthenticated, getBoards);

router.post("/register/", register);

router.post("/login/", login);

module.exports = router;
