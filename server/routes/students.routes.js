// first import the router
// then export the router

const router  = require ("express").Router()
const Cohort = require("../models/cohorts.model")
const Student = require("../models/students.model") // I need to access my collection comng from my model
// all the routes are prefixed with /api
// /api/students

// route to get all the students
router.get('/', async (req, res, next)=>{
    console.log("Received a request for /students");
    try {
        const allStudents = await Student.find()
        res.json(allStudents)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
        
    }
})

// route to get all students of a specific cohort
router.get('/cohort/:cohortId', async (req, res, next)=>{
    try {
        const studentsOfOneCohort = await Cohort.findById(req.params.cohortId)
        .populate("students")
        res.json(studentsOfOneCohort.students)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
})

// route to get one student by Id
router.get('/:studentId', async (req, res, next)=>{
    try {
        const oneStudent = await Student.findById(req.params.studentId)
        res.json(oneStudent)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
})

// route to create a student with a specified cohortId
router.post('/', async(req, res, next)=>{
    try {
        const {firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects} = req.body
        let studentToCreate = req.body
        if(!firstName || !lastName || !program || !cohort){
            return res.status(404).json({message: "Fill all fields to create a student"})
        }
        
        const createdStudent = await Student.create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects})
        res.status(201).json(createdStudent)

	} catch (error) {
		console.log(error)
        res.status(500).json({ message: "Internal server error" });
	}
})

// route to update a specified student by Id
router.put("/:studentId", async(req, res, next)=>{
    try {
        const {firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects} = req.body 
        const id = req.params.studentId
        const studentToUpdate = {firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects}
        const newStudent = await Student.findByIdAndUpdate(id, studentToUpdate, {new: true})
        res.json(newStudent)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
        
    }
})

// route to delete a specific student by Id
router.delete("/:studentId", async(req, res, next)=>{
    const id = req.params.studentId
    try {
        await Student.findByIdAndDelete(id)
        res.json({message : `Student ${id} was deleted`})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }

})
module.exports = router