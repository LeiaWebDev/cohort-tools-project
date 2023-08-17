const router = require("express").Router();
const Cohort = require("../models/cohorts.model");

//POST /api/cohorts - Creates a new cohort
router.post("/", (req, res) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  const cohortToCreate = {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    format,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  };
console.log(req.body)
  Cohort.create(cohortToCreate)
    .then((createdCohort) => {
      console.log(createdCohort);
      res.status(200).json(createdCohort);
    })
    .catch((error) => {
      console.error("Error while creating cohort", error);
      res.status(500).json({ error: "Failed to create the cohort" });
    });
});
// GET /api/cohorts - Retrieves all of the cohorts in the database collection

router.get("/", (req, res) => {
  Cohort.find()
    .then((allCohorts) => {
      console.log(allCohorts);
      res.status(200).json(allCohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts", error);
      res.status(500).json({ error: "Sorry, failed to retrieve cohorts" });
    });
});

//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id

router.get("/:cohortId", (req, res) => {
    const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((oneCohort) => {
      console.log(oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts", error);
      res.status(500).json({ error: "Sorry, failed to retrieve this cohort" });
    });
});

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
/** By default, findOneAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied */

router.put("/:cohortId", (req, res) => {
    const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Updated cohort", updatedCohort);
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      console.error("Error while updating the cohort", error);
      res.status(500).json({ error: "Failed to update the cohort" });
    });
});

//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id

router.delete("/:cohortId", (req, res) => {
    
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((res) => {
      console.log("Cohort successfully deleted");
      res.status(200).json(); //Send back only status code 204 indicating that resource is deleted
    })
    .catch((error) => {
      console.error("Error while deleting cohort", error);
      res.status(500).json({ error: "Deleting cohort failed" });
    });
});

module.exports = router;
