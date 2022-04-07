const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Molimo navedite naziv kompanije"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Molimo navedite poziciju"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["intervju", "odbijen", "čekanje"],
      default: "pending",
    },

    jobType: {
      type: String,
      enum: ["puno","skraćeno","daljinski","pripravnički"],
      default: "puno",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Molimo navedite korisnika"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
