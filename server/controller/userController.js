const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/tokenService");
const { replaceSpacesWithPercent20 } = require("../middleware/imageService");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Bad request",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let image_url;
    if (req.file?.filename) {
      image_url = replaceSpacesWithPercent20(`/images/${req.file?.filename}`);
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pic: image_url,
    });
    const token = generateToken(user);
    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User with this email not exists",
      });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Password incorrect",
      });
    }
    const token = generateToken(user);
    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {}
};
const searchUser = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.status(200).json({
      users,
    });
  } catch (error) {
    throw new Error("unable to search");
  }
};
module.exports = { addUser, getUser, searchUser };
