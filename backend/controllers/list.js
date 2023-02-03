const Board = require("../models/Board");
const Card = require("../models/Card");
const List = require("../models/List");
const cloudinary = require("cloudinary");

const addNewList = async (req, res) => {
  try {
    const { title } = req.body;
    const board = req.board;

    const list = await List.create({ title });
    board.lists.push(list._id);
    await board.save();
    res.status(200).json({
      success: true,
      _id: list._id,
      message: "New list created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateList = async (req, res) => {
  try {
    const { list_id, title } = req.body;
    const list = await List.findById(list_id);

    if (!list) {
      return res.status(400).json({
        success: false,
        message: "List not found!",
      });
    }

    list.title = title;
    await list.save();
    res.status(200).json({
      success: true,
      message: "list's title updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteList = async (req, res) => {
  try {
    const { list_id } = req.body;
    const list = await List.findById(list_id);
    const board = req.board;

    if (!list) {
      return res.status(400).json({
        success: false,
        message: "List not found!",
      });
    }

    // removing cards
    const cardIds = list.cards;
    for (let cardId of cardIds) {
      let card = await Card.findById(cardId);
      if (card) {
        if (card.cover.public_id) {
          await cloudinary.v2.uploader.destroy(
            card.cover.public_id,
            (error) => {
              if (error) {
                return res.status(500).json({
                  status: false,
                  message: error,
                });
              }
            }
          );
        }
        await card.remove();
        list.cards.filter((item) => item != cardId);
        await list.save();
      }
    }

    await List.findByIdAndRemove(list_id);
    board.lists.splice(board.lists.indexOf(list_id), 1);
    await board.save();

    res.status(200).json({
      success: true,
      message: "list has been removed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllLists = async (req, res) => {
  try {
    const board = await Board.findOne(
      { _id: req.query.id },
      { lists: 1 }
    ).populate({
      path: "lists",
      populate: {
        path: "cards",
        model: "Card",
        populate: {
          path: "members",
          model: "User",
          select: "name avatar",
        },
      },
    });

    res.status(200).json({
      board_id: board._id,
      lists: board.lists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addNewList,
  updateList,
  deleteList,
  getAllLists,
  deleteList,
};
