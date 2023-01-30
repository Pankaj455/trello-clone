const Board = require("../models/Board");
const Card = require("../models/Card");
const List = require("../models/List");
const cloudinary = require("cloudinary");

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
        message: "Only board members can create card!",
      });
    }

    const newCard = await Card.create({ title });
    list.cards.push(newCard);
    await list.save();

    res.status(200).json({
      card: newCard,
      success: true,
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
    // const board = await Board.findById(board_id);
    // if (!board) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Board not found!",
    //   });
    // }
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "card not found!",
      });
    }
    // checking if the user is member of the board or not
    // if (
    //   !board.members.includes(req.user._id) &&
    //   board.admin.toString() !== req.user._id.toString()
    // ) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Only board members can update card!",
    //   });
    // }

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

const createComment = async (req, res) => {
  try {
    const { _id, card_id, comment, commentedAt } = req.body;
    const card = await Card.findById(card_id);
    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    const newComment = {
      _id,
      user: req.user,
      comment,
      commentedAt,
    };

    card.comments.push(newComment);
    await card.save();

    res.status(200).json({
      success: true,
      message: "commented successfully...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment_id, card_id } = req.body;
    const card = await Card.findById(card_id);
    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    card.comments = card.comments.filter(
      (comment) => comment._id !== comment_id
    );
    await card.save();

    res.status(200).json({
      success: true,
      message: "comment deleted successfully...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const card = await Card.findOne(
      { _id: req.query.id },
      { comments: 1, members: 1 }
    ).populate([
      {
        path: "comments",
        populate: {
          path: "user",
          model: "User",
          select: "name avatar",
        },
      },
    ]);
    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    res.status(200).json({
      success: true,
      members: card.members,
      comments: card.comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const { member_id, card_id } = req.body;
    const card = await Card.findById(card_id);
    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    card.members.push(member_id);
    await card.save();

    res.status(200).json({
      success: true,
      message: "member added successfully...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeMember = async (req, res) => {
  try {
    const { member_id, card_id } = req.body;
    const card = await Card.findById(card_id);
    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    card.members = card.members.filter((member) => member != member_id);
    await card.save();

    res.status(200).json({
      success: true,
      message: "member removed successfully...",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const setCover = async (req, res) => {
  try {
    const { cover, card_id } = req.body;
    const card = await Card.findById(card_id);

    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    const cloud = await cloudinary.v2.uploader.upload(
      cover,
      {
        folder: "card_covers",
      },
      (error) => {
        if (error)
          return res.status(500).json({
            status: false,
            message: error,
          });
      }
    );

    card.cover = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };

    await card.save();

    res.status(200).json({
      success: true,
      cover: card.cover,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCover = async (req, res) => {
  try {
    const { prev_cover_id, cover, card_id } = req.body;
    const card = await Card.findById(card_id);

    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    await cloudinary.v2.uploader.destroy(prev_cover_id, (error) => {
      if (error) {
        return res.status(500).json({
          status: false,
          message: error,
        });
      }
    });

    const cloud = await cloudinary.v2.uploader.upload(
      cover,
      {
        folder: "card_covers",
      },
      (error) => {
        if (error) {
          return res.status(500).json({
            status: false,
            message: error,
          });
        }
      }
    );

    card.cover = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };

    await card.save();

    res.status(200).json({
      success: true,
      cover: card.cover,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeCover = async (req, res) => {
  try {
    const { cover_id, card_id } = req.body;
    const card = await Card.findById(card_id);

    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }

    await cloudinary.v2.uploader.destroy(cover_id, (error) => {
      if (error) {
        return res.status(500).json({
          status: false,
          message: error,
        });
      }
    });

    card.cover = undefined;

    await card.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const moveCard = async (req, res) => {
  try {
    const { fromList, toList, card_id, fromIndex, toIndex } = req.body;

    // verifying that the card to be moved is not deleted by someone first
    const card = await Card.findById(card_id);
    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    const srcList = await List.findById(fromList);
    if (!srcList) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }
    if (fromList === toList) {
      const cardToMove = srcList.cards.splice(fromIndex, 1)[0];
      srcList.cards.splice(toIndex, 0, cardToMove);
      await srcList.save();
    } else {
      const destList = await List.findById(toList);
      if (!destList) {
        return res.status(404).json({
          success: false,
          message: "Destination list is not found",
        });
      }

      const cardToMove = srcList.cards.splice(fromIndex, 1)[0];
      destList.cards.splice(toIndex, 0, cardToMove);
      await srcList.save();
      await destList.save();
    }
    res.status(200).json({
      success: true,
      message: "The position of card updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { board_id, list_id, cover_id, card_id } = req.body;
    const list = await List.findById(list_id);
    const card = await Card.findById(card_id);
    const board = await Board.findById(board_id);

    if (!card) {
      res.status(404).json({
        success: false,
        message: "Card not found!",
      });
    }
    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found!",
      });
    }

    if (!list) {
      return res.status(404).json({
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
        message: "Only board members can delete card!",
      });
    }

    if (cover_id) {
      await cloudinary.v2.uploader.destroy(cover_id, (error) => {
        if (error) {
          return res.status(500).json({
            status: false,
            message: error,
          });
        }
      });
    }

    await card.remove();
    list.cards = list.cards.filter((card) => card != card_id);
    await list.save();

    res.status(200).json({
      success: true,
      message: "card has been deleted successfully!",
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
  createComment,
  deleteComment,
  addMember,
  removeMember,
  getAllComments,
  setCover,
  removeCover,
  updateCover,
  moveCard,
  deleteCard,
};
