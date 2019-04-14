const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Valid = new Schema({
    student_id: {
        type: Number
    },
    status: {
    type: Boolean
    },
    comments: {
        type: String,
        default: "NA"
    }
})

module.exports = mongoose.model('Valid', Valid)


