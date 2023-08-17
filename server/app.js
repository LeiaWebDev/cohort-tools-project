require("./config/db");
// require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
// const cohorts = require("./cohorts.json");
// const students = require("./students.json");

// const Schema = mongoose.Schema;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

//Schemas in models.js

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const Student = require("./models/students.model");

app.use(async (req, res, next) => {
  try {
    const allStudents = await Student.find();
    console.log(allStudents);
    next();
  } catch (error) {
    console.log(error);
  }
});
//Main route handler

app.use("/api", require("./routes/index.routes"));

//404

app.use((req, res, next) => {
  res.status(404).json({
    availableEndPoints: ["/api/students", "/api/cohorts", "/"],
  });
});

// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });
// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
