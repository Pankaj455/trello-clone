const Board = require("../models/Board");
const User = require("../models/User");
const cloudinary = require("cloudinary");

const createBoard = async (req, res) => {
  try {
    const { title, visibility, cover } = req.body;
    const newBoardData = {
      title,
      visibility: visibility === false ? false : true,
      admin: req.user._id,
    };

    if (cover) {
      const cloud = await cloudinary.v2.uploader.upload(cover, {
        folder: "covers",
      });

      newBoardData.cover = {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      };
    }

    const newBoard = await Board.create(newBoardData);
    const user = await User.findById(req.user._id);
    user.boards.push(newBoard._id);
    await user.save();

    res.status(200).json({
      success: true,
      board: newBoard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { user_id, board_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(400).json({
        success: false,
        message: "Board not found!",
      });
    }

    if (board.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only admin can add members!",
      });
    }

    // adding user in the board's members

    // checking if the member is already in the board or not
    if (board.members.includes(user_id)) {
      return res.status(400).json({
        success: false,
        message: "Member is already added to the board!",
      });
    }
    board.members.push(user_id);
    await board.save();

    // adding board in the user's boards
    user.boards.push(board_id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "member added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const removeMember = async (req, res) => {
  try {
    const { user_id, board_id } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(400).json({
        success: false,
        message: "Board not found!",
      });
    }

    if (board.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only admin can remove members!",
      });
    }

    // checking if the member is in the board or not
    if (!board.members.includes(user_id)) {
      return res.status(400).json({
        success: false,
        message: "Member is not in the board!",
      });
    }
    // removing user from the board's members
    board.members.splice(board.members.indexOf(user_id), 1);
    await board.save();

    // removing board from the user's boards
    user.boards.splice(user.boards.indexOf(board_id), 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "member removed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to update the title, description and visibility of the board
const updateBoard = async (req, res) => {
  try {
    const { board_id, title, description, visibility } = req.body;

    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(400).json({
        success: false,
        message: "Board not found!",
      });
    }

    if (board.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only admin can update the board!",
      });
    }

    if (title) {
      board.title = title;
    } else if (description) {
      board.description = description;
    } else {
      board.visibility = visibility;
    }

    await board.save();

    res.status(200).json({
      success: true,
      message: "Board updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBoard,
  addMember,
  removeMember,
  updateBoard,
};
