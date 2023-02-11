const User = require("../models/User");
const Card = require("../models/Card");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const getProfile = async (req, res) => {
  try {
    let user;
    if (req.query.id) {
      user = await User.findOne({ _id: req.query.id });
    } else {
      user = await User.findById(req.user._id).populate({
        path: "boards",
        select: "-lists",
        populate: {
          path: "members",
          model: "User",
          select: "name avatar",
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
        select: ["name", "avatar"],
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
    const cloud = await cloudinary.v2.uploader.upload(
      req.body.image,
      {
        folder: "profiles",
      },
      (error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error. Couldn't upload avatar",
          });
        }
      }
    );

    user.avatar = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };

    await user.save();

    res.status(200).json({
      success: true,
      avatar: user.avatar,
      message: "avatar uploaded successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { public_id, image, name } = req.body;
    let cloud;
    if (public_id) {
      cloud = await cloudinary.v2.uploader.destroy(public_id, (error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Server Error. Couldn't update profile",
          });
        }
      });
    }
    if (image) {
      cloud = await cloudinary.v2.uploader.upload(
        image,
        {
          folder: "profiles",
        },
        (error) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error,
            });
          }
        }
      );
      user.avatar = {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      };
    } else {
      user.avatar = undefined;
    }

    if (name) user.name = name;

    await user.save();

    res.status(200).json({
      success: true,
      avatar: user.avatar,
      name: user.name,
      message: `avatar ${image ? "updated" : "removed"} successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {
        name: { $regex: req.params.name, $options: "i" },
      },
      { name: 1, avatar: 1 }
    );
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find(
      { members: req.user._id },
      { cover: 1, labels: 1, title: 1 }
    );
    res.status(200).json({
      success: true,
      cards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    const resetToken = user.generateResetToken();
    await user.save();

    const resetLink = `https://ccrello.netlify.app/user/reset-password/${resetToken}`;

    const message = `<p>Just click the link to reset your password - <a href='${resetLink}'>${resetLink}</a></p>`;

    const isEmailSent = await sendEmail({
      to: email,
      subject: "Crello - Password Reset",
      message,
    });

    if (isEmailSent) {
      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } else {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return res.status(401).json({
        success: false,
        message: "Something went wrong. Email is not sent... try again",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Link is invalid or has expired",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated!",
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
  forgotPassword,
  resetPassword,
  uploadAvatar,
  getUsers,
  getAllCards,
  updateProfile,
};
