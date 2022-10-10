const Board = require("../models/Board");
const Card = require("../models/Card");
const List = require("../models/List");

const addNewCard = async (req, res) => {
  try {
    const { board_id, list_id, title } = req.body;
    const list = await List.findById(list_id);
    const board = await Board.findById(board_id);

    if (!board) {
      return res.status(400).json({
        success: false,
        message: "Board not found!",
      });
    }

    if (!list) {
      return res.status(400).json({
        success: false,
        message: "List not found!",
      });
    }

    // checking if the user is member of the board or not
    if (
      !board.members.includes(req.user._id) &&
      board.admin.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only board members can update list!",
      });
    }

    const newCard = await Card.create({ title });
    list.cards.push(newCard);
    await list.save();

    res.status(200).json({
      _id: newCard._id,
      message: "New card added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateCard = async (req, res) => {
  try {
    const { board_id, card_id, title, description } = req.body;
    const card = await Card.findById(card_id);
    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found!",
      });
    }
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "card not found!",
      });
    }
    // checking if the user is member of the board or not
    if (
      !board.members.includes(req.user._id) &&
      board.admin.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Only board members can update card!",
      });
    }

    if (title) card.title = title;
    if (description) card.description = description;
    await card.save();
    res.status(200).json({
      success: true,
      message: "card updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addNewCard,
  updateCard,
};
