const {
  getProfile,
  register,
  login,
  uploadAvatar,
  updateProfile,
  getUsers,
  getAllCards,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me/", isAuthenticated, getProfile);

router.get("/me/cards", isAuthenticated, getAllCards);

router.get("/search/:name", isAuthenticated, getUsers);

router.post("/upload/avatar", isAuthenticated, uploadAvatar);

router.put("/update/profile", isAuthenticated, updateProfile);

router.post("/register/", register);

router.post("/login/", login);

router.post("/forgot/password", forgotPassword);

router.put("/reset/password/:token", resetPassword);

module.exports = router;
