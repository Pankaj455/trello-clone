const { addNewCard, updateCard } = require("../controllers/card");
const { addNewList, updateList } = require("../controllers/list");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.post("/list/new/", isAuthenticated, addNewList);
router.put("/list/update/", isAuthenticated, updateList);
router.post("/list/card/new/", isAuthenticated, addNewCard);
router.put("/list/card/update/", isAuthenticated, updateCard);

module.exports = router;
