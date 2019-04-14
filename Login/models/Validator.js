const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Valid = new Schema({
    student_id: {
        type: String
    },
    status: {
    type: Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Validate = mongoose.model('validates', Valid)


