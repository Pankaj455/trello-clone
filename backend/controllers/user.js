const User = require("../models/User");
const cloudinary = require("cloudinary");

const getProfile = async (req, res) => {
  try {
    let user;

    if (req.query.id) {
      user = await User.findOne({ _id: req.query.id });
    } else {
      user = await User.findOne({ _id: req.user._id }).populate({
        path: "boards",
        populate: {
          path: "members",
          model: "User",
          select: "name",
        },
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await User.find(
      { _id: req.user._id },
      { boards: 1 }
    ).populate({
      path: "boards",
      populate: {
        path: "members",
        model: "User",
        select: "name",
      },
    });

    res.status(200).json({
      allBoards: boards,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    const newUser = await User.create({ name, email, password });
    const token = await newUser.generateToken();
    res.status(200).json({
      _id: newUser._id,
      token,
      message: "Successfully registered!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user;
    if (name) {
      user = await User.findOne({ name }).select("+password");
    } else if (email) {
      user = await User.findOne({ email }).select("+password");
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or username",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = await user.generateToken();
    res.status(200).json({
      _id: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const cloud = await cloudinary.v2.uploader.upload(req.body.image);

    user.avatar = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };

    user.save();

    res.status(200).json({
      success: true,
      message: "avatar uploaded successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  getBoards,
  register,
  login,
  uploadAvatar,
};
