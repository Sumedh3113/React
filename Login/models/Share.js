const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Share = new Schema({
    student_id: {
        type: Number
    },
    hashes: {
    type: String
    },
    name:{
        type: String
    }
})

module.exports = mongoose.model('shares', Share)


