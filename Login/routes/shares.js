const express = require("express")
const shares = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//const User = require("../models/User")

const Share = require("../models/Share")
shares.use(cors())

process.env.SECRET_KEY = 'secret'


/*------------------New code here---------------------------*/
shares.post('/share1', (req, res) => {
    const shareData = {
        
        student_id:req.body.student_id,
        hashes: req.body.hashes,
        name: req.body.name,
    }

        Share.create(shareData)
	
})
/
/*-------------------------Ends here-------------------------*/
shares.get("/share1",function(req,res){
    Share.find({},function(err, reqss){
        if(err){
            res.status(500).send("Not able to fectch data");
            
        }
        else{
            res.send(reqss)
        }
        
    })
    
})





module.exports = shares