const router = require("express").Router();
const {
  createBoard,
  addMember,
  removeMember,
  updateBoard,
  deleteBoard,
} = require("../controllers/board");

const isAuthenticated = require("../middlewares/auth");

router.route("/create/").post(isAuthenticated, createBoard);
router.route("/addMember/").post(isAuthenticated, addMember);
router.route("/removeMember/").post(isAuthenticated, removeMember);
router.route("/update/").put(isAuthenticated, updateBoard);
router.route("/delete/:id").delete(isAuthenticated, deleteBoard);

module.exports = router;
