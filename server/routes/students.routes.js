// first import the router
// then export the router

const router  = require ("express").Router()
const Cohort = require("../models/cohorts.model")
const Student = require("../models/students.model") // I need to access my collection comng from my model
// all the routes are prefixed with /api
// /api/students

// route to get all the students
router.get('/students', async (req, res, next)=>{
    try {
        const allStudents = await Student.find()
        res.json(allStudents)

    } catch (error) {
        console.log(error)
    }
})

// route to get all students of a specific cohort
router.get('/students/cohort/:cohortId', async (req, res, next)=>{
    try {
        const studentsOfOneCohort = await Cohort.findById(req.params.id)
        .populate("students")
        res.json(studentsOfOneCohort)

    } catch (error) {
        console.log(error)
    }
})

// route to get one student by Id
router.get('/students/:studentId', async (req, res, next)=>{
    try {
        const oneStudent = await Student.findById(req.params,id)
        res.json(oneStudent)

    } catch (error) {
        console.log(error)
    }
})

// route to create a student with a specified cohortId
router.post('/students', async(req, res, next)=>{
    try {
        const {firstName, lastName, program, cohort} = req.body
        let studentToCreate = req.body
        if(!studentToCreate){
            return res.status(404).json({message: "Fill all fields to create a human"})
        }
        
        const createdStudent = await Student.create({studentToCreate})
        res.status(201).json(createdStudent)

	} catch (error) {
		console.log(error)
	}
})

// route to update a specified student by Id
router.put("/students/:studentsId", async(req, res, next)=>{
    try {
        const {firstName, lastName, program, cohort} = req.body 
        const id = req.params.studentsId
        const studentToUpdate = {firstName, lastName, program, cohort}
        const newStudent = await Student.findByIdAndUpdate(id, studentToUpdate, {new: true})
        res.json(newStudent)
    } catch (error) {
        console.log(error)
        
    }
})

// route to delete a specific student by Id
router.delete("/students/:studentsId", async(req, res, next)=>{
    const id = req.params.studentsId
    try {
        await Student.findByIdAndDelete(id)
        res.json({message : `Student ${id} was deleted`})

    } catch (error) {
        console.log(error)
    }

})
module.exports = router