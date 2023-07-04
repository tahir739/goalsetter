const express = require("express");
const router = express.Router();
const {
  
  setModelData,
  getModelData,

} = require("../controllers/modelDataController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getModelData).post(protect, setModelData);
//router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
