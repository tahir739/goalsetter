const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc get goals
// @route GET /api/goals
// @access private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  const goal = await Goal.find({ name: req.user.name });
  const all = await Goal.find({});

  const xz = req.user;
  const x = req.body.text;

  if (xz.email === "tahir@gmail.com") {
    return res.status(200).json(all);
  }

  all.forEach((item) => {
    if (item.name) {
      return res.status(200).json(goal);
    }
  });

  /*if (x === goal.name) {
    return res.status(200).json(goal);
  }*/

  //return res.status(200).json(all);
});

//@desc set goal
// @route POST /api/goals
// @access private

const setGoal = asyncHandler(async (req, res) => {
  const { text, name, status, comments } = req.body;
  if (!text || !name) {
    res.status(400);
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({
    text,
    name,
    status,
    comments,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

//@desc update goals
// @route PUT /api/goals/:id
// @access private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  console.log("backend", req.params.id, req.body);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal user
 /* if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }*/

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    
  });

  res.status(200).json(updatedGoal); 
});

//@desc delete goals
// @route DELETE /api/goals/:id
// @access private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
