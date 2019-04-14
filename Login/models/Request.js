const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    
    required_doc: {
    type: String
    },
	name: {
        type: String
    },
    student_id: {
    type: String,
    //    default:0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Request= mongoose.model('requests', RequestSchema)


