const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/cohorts-database")
  .then((db) => console.log(`Connected to Database: "${db.connection.name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
