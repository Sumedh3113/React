const express = require("express")
const requests = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//const User = require("../models/User")

const Request = require("../models/Request")
requests.use(cors())

process.env.SECRET_KEY = 'secret'


/*------------------New code here---------------------------*/
requests.post('/requestor', (req, res) => {
    const today = new Date()
    const reqData = {
        name: req.body.name,
        required_doc: req.body.required_doc,
//        status:req.body.status,
        created: today
    }
Request.create(reqData)
/*-------------------------Ends here-------------------------*/

module.exports = requests