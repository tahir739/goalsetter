const mongoose = require("mongoose");

const modelDataSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    objId: {
      type: String,
    },
    objText: {
      type: String,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    isSubmitted: {
      type: Boolean,
    },
    date: {
      type: Number,
    },
    submitted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ModelData", modelDataSchema);
