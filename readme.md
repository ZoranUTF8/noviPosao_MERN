An application that enables you to generate your job applications and monitor the outcomes. Currently, it is only accessible in Serbian.
This application enables basic CRUD functionalities, along with the ability to display an activity graph depicting them.
The app is deployed on render.com and can be accessed at https://newjob.onrender.com/landing. To use it, you must create a new account and log in.
You can find the frontend build in the "build" folder, and the backend server code is located in the "server" folder.

Dependencies:
{
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "express-async-errors": "^3.1.1",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^6.3.0",
    "helmet": "^5.0.2",
    "http-status-codes": "^2.2.0",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.1",
    "mongoose": "^6.2.4",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.15",
    "validator": "^13.7.0",
    "xss-clean": "^0.1.1"
  },
  "engines": {
    "node": "16.x"
  },
  "devDependencies": {
    "concurrently": "^7.0.0"
  }
