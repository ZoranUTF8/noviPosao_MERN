const { readFile } = require("fs/promises");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./connectDB/connectDB");
const Job = require("./models/Job");
const { populate } = require("./models/Job");
const { readFileSync } = require("fs");

const start = async () => {
  try {
    //   * Connect to atkas db
    await connectDB(process.env.MONGO_URL);
    //  * Delete all data
    await Job.deleteMany();

    const jsonData = JSON.parse(await readFileSync("./mockData.json", "utf8"));

    await Job.create(jsonData);

    console.log("DATA POPULATED");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

module.exports = populate.js;
