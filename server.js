//* EXPRESS IMPORTS
const express = require("express");
require("express-async-errors");
const app = express();

//* EXPRESS ROUTER
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

//* CUSTOM IMPORTS
const colors = require("colors");
const dotenv = require("dotenv");
//? looks for .env file in root
dotenv.config();
const morgan = require("morgan");
const connectDB = require("./connectDB/connectDB");

// * SECURITY
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

//* CONST
const PORT = process.env.PORT || 5000;

//* MIDDLEWARE IMPORTS
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const authenticateUser = require("./middleware/authenticateUser");

//? check process
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//! only when ready to deploy we need to point to the build folder
app.use(express.static("build"));
// app.use(express.static(__dirname + "/client/build"));

//* makes json data available in the controlers
app.use(express.json());
// * Secure headers
app.use(helmet());
//*  Sanitize the input prevents cross site scripting
app.use(xss());
//* Prevent mongo db operator injection
app.use(mongoSanitize());
//* Add rate limiter for all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 10 minutes
  max: 200, // Limit each IP to 20 requests per `window` (here, per 10 minutes)
  message:
    "Previše zahtjeva sa ove IP adrese, pokušajte ponovo nakon 15 minuta.",
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

//* SERVER TEST ROUTE
// app.post("/api/v1/testRoute", (req, res) => {
//   const dok = req.params.dok;
//   console.log("====================================");
//   console.log(dok);
//   console.log("====================================");
//   res.json({
//     msg: "API",
//   });
// });

//* AUTH ROUTES
app.use("/api/v1/auth", authRoutes);
//* JOB ROUTES
app.use("/api/v1/jobs", authenticateUser, jobRoutes);

//! only when ready to deploy
// app.get("*", function (request, response) {
//   response.sendFile(__dirname + "/client/build", "index.html");
// });

//* MIDDLEWARE FOR ALL ROUTES
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//* CONNECT TO MONGO DB
//? Start the server only if connection to db ok
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(PORT, () => {
      console.log(
        `SERVER ON: ${PORT} & CONNECTION TO MONGODB SUCCESSFUL `.blue
      );
    });
  } catch (error) {
    console.log("====================================");
    console.log(`ERROR IN STARTING THE SERVER => ${error}`);
    console.log("====================================");
  }
};
start();
