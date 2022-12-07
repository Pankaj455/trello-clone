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
} = require("../controllers/card");
const { addNewList, updateList, getAllLists } = require("../controllers/list");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.post("/list/new/", isAuthenticated, addNewList);
router.put("/list/update/", isAuthenticated, updateList);
router.get("/list/all/", isAuthenticated, getAllLists);

router.post("/card/new/", isAuthenticated, addNewCard);
router.put("/card/update/", isAuthenticated, updateCard);
router.get("/card/restinfo", isAuthenticated, getAllComments);
router.post("/card/comment/new", isAuthenticated, createComment);
router.post("/card/comment/delete", isAuthenticated, deleteComment);
router.post("/card/addMember", isAuthenticated, addMember);
router.post("/card/removeMember", isAuthenticated, removeMember);
router.post("/card/setCover", isAuthenticated, setCover);
router.put("/card/updateCover", isAuthenticated, updateCover);
router.put("/card/removeCover", isAuthenticated, removeCover);

module.exports = router;
