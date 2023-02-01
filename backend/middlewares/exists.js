const Board = require("../models/Board");
const Card = require("../models/Card");
const List = require("../models/List");

const isBoardExists = async (req, res, next) => {
  const { board_id } = req.body;
  const board = await Board.findById(board_id);

  if (!board) {
    return res.status(404).json({
      success: false,
      message: "Board not found!",
    });
  }
  req.board = board;
  next();
};

const isCardExists = async (req, res, next) => {
  const { card_id } = req.body;
  const card = await Card.findById(card_id);

  if (!card) {
    return res.status(404).json({
      success: false,
      message: "Card not found!",
    });
  }
  req.card = card;
  next();
};

module.exports = {
  isBoardExists,
  isCardExists,
};
