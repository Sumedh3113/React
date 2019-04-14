const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")

//const Request = require("../models/Request")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        student_id:req.body.student_id,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    }).then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        }).catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        student_id: user.student_id,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: "User does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        }).catch(err => {
            res.send('error: ' + err)
        })
})


users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    }).then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        }).catch(err => {
            res.send('error: ' + err)
        })
})

/*------------------New code here---------------------------*/
users.post('/requestor', (req, res) => {
    const today = new Date()
    const reqData = {
        required_doc: req.body.required_doc,
        name: req.body.name,
        
//        status:req.body.status,
//        created: today
    }
//Request.create(reqData)
/*-------------------------Ends here-------------------------*/



module.exports = users