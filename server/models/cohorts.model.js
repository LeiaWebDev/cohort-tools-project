const {Schema, model, SchemaTypes} = require ('mongoose')

const cohortsSchema = new Schema(
    { 
    inProgress: {type: Boolean, default: false},
    cohortSlug: {type: String, required: true, unique: true},
    cohortName: {type: String, required: true},
    program: {type: String, enum:["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]},
    format:{type: String, enum:["Full Time", "Part Time"]},
    campus: {type: String, enum:["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]},
    startDate:{type: Date, default: Date.now,}, // Date.now = a function to execute = a callback
    endDate:  {type: Date,},
    programManager:  {type: String, required: true},
    leadTeacher:  {type: String, required: true},
    totalHours: {type: Number, default: 360}
    },
    
    {
        timestamps: true,
    }
    )


   const Cohort = model("Cohort", cohortsSchema )
   // const Schema = mongoose.Schema;

   module.exports = Cohort