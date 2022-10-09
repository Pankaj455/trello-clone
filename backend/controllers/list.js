const Board = require("../models/Board");
const List = require("../models/List");

const addNewList = async (req, res) => {
  try {
    const { board_id, title } = req.body;
    const board = await Board.findById(board_id);

    if (!board) {
      return res.status(400).json({
        success: false,
        message: "Board not found!",
      });
    }

    // checking if the user is member of the board or not
    if (
      !board.members.includes(req.user._id) &&
      board.admin.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: true,
        message: "Only board members can add list!",
      });
    }
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

module.exports = {
  addNewList,
  updateList,
};
