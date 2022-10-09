const router = require("express").Router();
const {
  createBoard,
  addMember,
  removeMember,
  updateBoard,
} = require("../controllers/board");

const { addNewList } = require("../controllers/list");
const isAuthenticated = require("../middlewares/auth");

router.route("/create/").post(isAuthenticated, createBoard);
router.route("/addMember/").post(isAuthenticated, addMember);
router.route("/removeMember/").post(isAuthenticated, removeMember);
router.route("/update/").put(isAuthenticated, updateBoard);

module.exports = router;
