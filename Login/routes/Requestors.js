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
requests.post('/req1', (req, res) => {
    const today = new Date()
    const reqData = {
        
        required_doc: req.body.required_doc,
		name: req.body.name,
        student_id:req.body.student_id,
//        status:req.body.status,
        created: today
    }
//    if(reqData!==""){
        Request.create(reqData)
//    }
	
})

/*-------------------------Ends here-------------------------*/

module.exports = requests