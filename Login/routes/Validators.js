const express = require("express")
const validates = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//const User = require("../models/User")

const Validate = require("../models/Validator")
validates.use(cors())

process.env.SECRET_KEY = 'secret'


/*------------------New code here---------------------------*/
validates.post('/val1', (req, res) => {
    const today = new Date()
    const valData = {
        
        student_id: req.body.student_id,
		status: req.body.status,
        created: today
    }
//    if(reqData!==""){
        Validate.create(valData)
//    }
	
})

/*-------------------------Ends here-------------------------*/
validates.get("/val1",function(req,res){
    Validate.find({},function(err, reqss){
        if(err){
            res.status(500).send("Not able to fectch data");
            
        }
        else{
            res.send(reqss)
        }
        
    })
    
})





module.exports = validates