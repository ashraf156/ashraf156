const Users = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.status(200).json(user);
});

const setUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json("Please enter all your field");
  }
  const user = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(200).json("user not exit");
  }

  const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

const delaetUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(200).json("user not exit");
  }
  const deletedUser = await Users.findByIdAndDelete(req.params.id);
  res.status(200).json(`user id:${req.params.id} deleted`);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json("Please enter all your field");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await Users.create({
    name,
    email,
    password: hashPassword,
  });
  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Invalid credenials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await Users.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getAllUsers,
  getUser,
  setUser,
  updateUser,
  delaetUser,
  registerUser,
  loginUser,
  getMe,
};
