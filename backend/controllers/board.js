const Board = require("../models/Board");
const User = require("../models/User");
const Card = require("../models/Card");
const List = require("../models/List");
const cloudinary = require("cloudinary");

const createBoard = async (req, res) => {
  try {
    const { title, visibility, cover } = req.body;
    const newBoardData = {
      title,
      visibility: !visibility ? false : true,
      admin: req.user._id,
    };

    if (cover) {
      const cloud = await cloudinary.v2.uploader.upload(
        cover,
        {
          folder: "covers",
        },
        (error) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "Server error. Couldn't upload cover!",
            });
          }
        }
      );
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
    const board = await Board.findById(board_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });
    }

    // checking if the member is in the board or not
    if (!board.members.includes(user_id)) {
      return res.status(404).json({
        success: false,
        message: "Member is not in the board!",
      });
    }

    for (let i = 0; i < board.lists.length; i++) {
      const list = await List.findById(board.lists[i]);
      for (let j = 0; j < list.cards.length; j++) {
        let card = await Card.findById(list.cards[j]);
        let index = card.members.indexOf(user_id);
        if (index !== -1) {
          card.members.splice(index, 1);
          await card.save();
        }
      }
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

const updateBoard = async (req, res) => {
  try {
    const { board_id, title, description, visibility, prevCover, newCover } =
      req.body;

    const board = await Board.findById(board_id);

    if (title) {
      board.title = title;
    } else if (description !== undefined) {
      board.description = description;
    } else if (visibility) {
      board.visibility = visibility;
    } else if (newCover) {
      if (prevCover) {
        await cloudinary.v2.uploader.destroy(prevCover.public_id, (error) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "Server error. Couldn't update cover!",
            });
          }
        });
      }
      const cloud = await cloudinary.v2.uploader.upload(
        newCover,
        { folder: "covers" },
        (error) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "Server error. Couldn't upload cover!",
            });
          }
        }
      );
      board.cover = {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      };
    }

    await board.save();

    res.status(200).json({
      success: true,
      message: "Board updated successfully!",
      cover: board.cover,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    for (let i = 0; i < board.lists.length; i++) {
      const list = await List.findById(board.lists[i]);
      if (list) {
        for (let j = 0; j < list.cards.length; j++) {
          const card = await Card.findById(list.cards[j]);
          if (card.cover.public_id) {
            await cloudinary.v2.uploader.destroy(
              card.cover.public_id,
              (error) => {
                if (error) {
                  return res.status(500).json({
                    status: false,
                    message: "image deletion error from cloudinary",
                  });
                }
              }
            );
          }
          await card.remove();
        }
        await list.remove();
        board.lists.filter((item) => item != list._id);
        await board.save();
      }
    }

    if (board.cover.public_id) {
      await cloudinary.v2.uploader.destroy(board.cover.public_id, (error) => {
        if (error) {
          return res.status(500).json({
            status: false,
            message: "Couldn't delete board cover",
          });
        }
      });
    }
    await board.remove();
    await User.updateMany({}, { $pull: { boards: req.params.id } });

    return res.status(200).json({
      success: true,
      message: "board deleted successfully",
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
  deleteBoard,
};
