const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const Users = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json("add text value");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

const updataGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json("Goal not find");
  }
  const user = await Users.findById(req.user.id);
  if (!user) {
    res.status(401).json("user not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401).json("user not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json("Goal not find");
  }

  const user = await Users.findById(req.user.id);
  if (!user) {
    res.status(401).json("user not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401).json("user not authorized");
  }

  const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json("the Goal is deleted");
});

module.exports = { getGoals, setGoal, updataGoal, deleteGoal };
