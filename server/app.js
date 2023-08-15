const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./cohorts.json");
const students = require("./students.json")

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


//Schemas
const cohortSchema = new Schema({ 
  
inProgress: {type: Boolean,
default: false},
cohortSlug: {type: String,
  required: true,
unique: true},
cohortName: {type: String,
  required: true},
program: {type: String, enum:["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
format:{type: String, enum:["Full Time", "Part Time"]},
campus: {type: String, enum:["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
startDate:{
  type: Date,
  default: Date.now,
},
endDate:  {
  type: Date,
},
programManager:  {type: String,
  required: true},
leadTeacher:  {type: String,
  required: true},
totalHours: {type: Number, 
  default: 36}
})

const studentSchema = new Schema({

  firstName: {type: String, require: true},
  lastName:  {type: String, require: true},
  email:  {type: String, unique: true, require: true},
  phone: {type: String, require: true},
  linkedinUrl: {type: String, default: ""},
  languages: {type: [String], enum:["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]},
  program: {type: String, enum:["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
  background: {type: String, default:""},
  image:{type: String, default: "https://i.imgur.com/r8bo8u7.png"},
  cohort: {type: Schema.Types.ObjectId},
  projects: {type: Array}
  
 })
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors({origin:['http://localhost:5005']}));
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
app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});
app.get("/api/students", (req, res) => {
  res.json(students)
})



// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


