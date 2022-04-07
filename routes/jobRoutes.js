const express = require("express");
const router = express.Router();

const {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  showStats,
} = require("../controllers/jobsController");

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

module.exports = router;
