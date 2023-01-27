const {
  getProfile,
  getBoards,
  register,
  login,
  uploadAvatar,
  updateProfile,
  getUsers,
  getAllCards,
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

module.exports = router;
