const {
  addNewCard,
  updateCard,
  createComment,
  deleteComment,
  getAllComments,
  addMember,
  removeMember,
  setCover,
  removeCover,
  updateCover,
  moveCard,
  deleteCard,
} = require("../controllers/card");
const {
  addNewList,
  updateList,
  getAllLists,
  deleteList,
} = require("../controllers/list");
const isAuthenticated = require("../middlewares/auth");
const { isBoardExists, isCardExists } = require("../middlewares/exists");

const router = require("express").Router();

router.post("/list/new/", isAuthenticated, isBoardExists, addNewList);
router.put("/list/update/", isAuthenticated, isBoardExists, updateList);
router.get("/list/all/", isAuthenticated, getAllLists);
router.post("/list/delete/", isAuthenticated, isBoardExists, deleteList);

router.post("/card/new/", isAuthenticated, isBoardExists, addNewCard);
router.put("/card/update/", isAuthenticated, isCardExists, updateCard);
router.get("/card/restinfo", isAuthenticated, getAllComments);
router.post("/card/comment/new", isAuthenticated, isCardExists, createComment);
router.post(
  "/card/comment/delete",
  isAuthenticated,
  isCardExists,
  deleteComment
);
router.post("/card/addMember", isAuthenticated, isCardExists, addMember);
router.post("/card/removeMember", isAuthenticated, isCardExists, removeMember);
router.post("/card/setCover", isAuthenticated, isCardExists, setCover);
router.put("/card/updateCover", isAuthenticated, isCardExists, updateCover);
router.put("/card/removeCover", isAuthenticated, isCardExists, removeCover);
router.put("/card/move", isAuthenticated, moveCard);
router.post("/card/delete", isAuthenticated, isCardExists, deleteCard);

module.exports = router;
