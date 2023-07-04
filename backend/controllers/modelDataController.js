const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
const ModelData = require("../models/stateModel");

//@desc get ModalData
// @route GET /api/ModelData
// @access private

const getModelData = asyncHandler(async (req, res) => {
  const data = await ModelData.find({ user: req.user.id });
  //const goal = await Goal.find({ name: req.user.name });
  const doneGoal = await ModelData.find({ name: req.user.name });
  const all = await ModelData.find({});
  // console.log(all, "all")

  const xz = req.user;
  const x = req.body.text;

  if (xz.email === "tahir@gmail.com") {
    return res.status(200).json(all);
  }

   all.forEach((item) => {
    if (item.name) {
      return res.status(200).json(doneGoal);
    }
  });

  /*if (x === goal.name) {
    return res.status(200).json(goal);
  }*/

  // return res.status(200).json(all);
});

//@desc set ModelData
// @route POST /api/ModelData
// @access private

const setModelData = asyncHandler(async (req, res) => {
  const { status, isSubmitted, date, objId, objText, name } = req.body;
  /* if (!text || !name) {
    res.status(400);
    throw new Error("please add a text field");
  }*/

  let submitted;
  if (status === "done") {
    submitted = true;
  }

  const modelData = await ModelData.create({
    status,
    isSubmitted,
    submitted,
    date,
    objId,
    objText,
    name,
    user: req.user.id,
  });
  return res.status(200).json(modelData);
});

//@desc update goals
// @route PUT /api/goals/:id
// @access private

const updateGoal = asyncHandler(async (req, res) => {
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
  getModelData,
  setModelData,
  updateGoal,
  deleteGoal,
};
