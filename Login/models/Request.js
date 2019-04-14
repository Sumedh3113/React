const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Request = new Schema({
    name: {
        type: String
    },
    required_doc: {
    type: String
    },
//    status: {
//    type: Number,
//        default:0
//    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Request', Request)

