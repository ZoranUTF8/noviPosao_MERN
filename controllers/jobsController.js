//? HANDLE JOB ROUTE REQESTS
const express = require("express");
const Job = require("../models/Job");
const StatusCode = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");
const mongoose = require("mongoose");
const moment = require("moment");

//? USER MODEL
const UserModel = require("../models/User");

//? USER PERMISSIONS
const checkPermissions = require("../utils/checkPermissions");
const { all } = require("express/lib/application");

//? CREATE NEW JOB
const createJob = async (req, res) => {
  // * Get job values from the request
  const { company, position, jobLocation, jobType, status } = req.body;

  console.log("====================================");
  console.log(status);
  console.log("====================================");
  // * Check if all values present
  if (!position || !company) {
    throw new BadRequestError("Molimo navedite sve vrijednosti");
  }

  // * Add created by to the body
  req.body.createdBy = req.user.userId;

  // * Add new job to db
  const newJob = await Job.create(req.body);
  // * Send response to frontend
  res.status(StatusCode.CREATED).json({ newJob });
};

const deleteJob = async (req, res) => {
  // * get job id from req.params
  const { id: jobId } = req.params;

  // * query db for the job with the provided job id
  const job = await Job.findById({ _id: jobId });

  // * If no job found
  if (!job) {
    throw new NotFoundError(`Nema posla sa ID-om ${jobId}`);
  } else {
    // * Check if user owner of the job
    checkPermissions(req.user, job.createdBy);

    //* Delete job
    await job.remove();

    res.status(StatusCode.OK).json({ msg: "Posao je uspješno obrisan." });
  }
};
//? GET ALL JOBS
const getAllJobs = async (req, res) => {
  // * get filter options
  const { search, searchStatus, searchType, sort } = req.query;

  // * Create query object with the current user id
  const queryObject = {
    createdBy: req.user.userId,
  };

  // * Check if custom  search is provided
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // * Check if status filter is not equal all jobs
  if (searchStatus && searchStatus !== "svi") {
    queryObject.searchStatus = searchStatus;
  }
  if (searchType && searchType !== "svi") {
    queryObject.searchType = searchType;
  }

  // * No await becouse await bring us the final result that we cannot manipulate with querys
  let result = Job.find(queryObject);

  // * Sort the results

  // chain sort conditions
  if (sort === "najnoviji") {
    result = result.sort("-createdAt");
  }
  if (sort === "najstariji") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // * Pagination setup

  // * Convert the string page to
  const page = Number(req.query.page) || 1;
  const jobsLimit = Number(req.query.jobsLimit) || 10;

  // * Get the total number of docs to skip
  const skip = (page - 1) * jobsLimit;

  // * Sort the documents with the provided skip number and jobs limit number
  // ! add custom option for limit like 5-10-15
  result = result.skip(skip).limit(jobsLimit);

  // * Get the jobs with the limit and skip
  const pagedJobs = await result;

  // * Count documents  and then divide the total jobs with the jobs limit to get the num of total pages for the current limit
  const totalNumOfJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalNumOfJobs / jobsLimit);

  res.status(StatusCode.OK).json({ pagedJobs, totalNumOfJobs, numOfPages });
};

const updateJob = async (req, res) => {
  // * Get job id from the param
  const { id: jobId } = req.params;

  // * get the values from the body
  const { company, position, jobLocation, jobType, status } = req.body;

  // * check for values present
  if (!company || !position || !jobLocation || !jobType || !status) {
    throw new BadRequestError("Molimo navedite sve vrijednosti");
  }

  // * Query the db for the job with the provided id
  const job = await Job.findOne({ _id: jobId });

  // * If no job found throw error
  if (!job) {
    throw new NotFoundError(`Nema posla sa ID-om: ${jobId}`);
  }

  job.position = position;
  job.company = company;
  job.jobLocation = jobLocation;
  job.jobType = jobType;
  job.status = status;

  checkPermissions(req.user, job.createdBy);

  // * If all ok than update the job
  // * Send updated job back
  await job.save();
  res.status(StatusCode.OK).json({ job });
};

// ? GET JOB STATS
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    // * Get the jobs that belong tho the user with the user id and group them to the status group
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // * return only the total count and status name
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  // * default stats
  const defaultStats = {
    intervju: stats.intervju || 0,
    odbijen: stats.odbijen || 0,
    čekanje: stats.čekanje || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  // * Format the date and reverse it so we get the oldest month first
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCode.OK).json({ defaultStats, monthlyApplications });
};

module.exports = { createJob, deleteJob, getAllJobs, updateJob, showStats };
