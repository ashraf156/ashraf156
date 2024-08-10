const express = require("express");
const router = express.Router();
const { protect } = require("../Middleware/authMiddleware");

const {
  getGoals,
  setGoal,
  updataGoal,
  deleteGoal,
} = require("../Controllres/goalControllres");

router.route("/").get(protect, getGoals).post(protect, setGoal);

router.route("/:id").put(protect, updataGoal).delete(protect, deleteGoal);

module.exports = router;
