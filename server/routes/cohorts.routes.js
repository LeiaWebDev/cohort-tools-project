const router = require("express").Router()
const Cohort = require("../models/Cohort.model")

/*router.get("/", (req, res, next) => {
    Cohort.find(query)
    .then((cohorts) => {
        res.json(cohorts)
    })
    .catch((e) => console.log(e))
})*/

router.post("/cohorts", async (req, res, next) => {
    try {
		const createdCohort = await Cohort.create(req.body)
		res.status(201).json(createdCohort)
	} catch (error) {
		next(error)
	}
})

router.get("/", async (req, res, next) => {
	try {
		const allCohorts = await Cohort.find()
		res.json(allCohorts)
	} catch (error) {
		console.log(error)
	}
})

router.get("/cohort/:cohortId", async (req, res, next) => {
	try {
		const studentsOfCohort = await Student.find({ cohort: cohortId })
		res.json(studentsOfCohort)
	} catch (error) {
		next(error)
	}
})


router.get("/:studentId", async (req, res, next) => {
	try {
		const oneStudent = await Student.findById(req.params.studentId)
		res.json(oneStudent)
	} catch (error) {
		next(error)
	}
})

/*PUT /api/cohorts/:cohortId - Updates a specific cohort by id

DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id*/
module.exports = router