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
app.use(cors({ origin: ["http://localhost:5005"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts);
// });
// app.get("/api/students", (req, res) => {
//   res.json(students);
// });

// main handler
app.use("/api", require("./routes/index.routes"))

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
