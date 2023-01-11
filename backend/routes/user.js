const {
  getProfile,
  getBoards,
  register,
  login,
  uploadAvatar,
  getUsers,
} = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me/", isAuthenticated, getProfile);

router.get("/search/:name", isAuthenticated, getUsers);

router.post("/upload/avatar", isAuthenticated, uploadAvatar);

router.post("/register/", register);

router.post("/login/", login);

module.exports = router;
