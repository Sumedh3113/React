var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongodb://localhost:27017/mernloginreg'

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => console.log("MongoDB connected")).catch(err => console.log(err))

var Users = require('./routes/Users')
var Requests = require('./models/Request')

app.use('/users', Users)
//app.use('/requests',Request)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})


app.post('/requestor',function(req,res){
   var requests = new Requests();
    requests.name = req.body.name;
    requests.required_doc = req.body.required_doc;
    requests.save(function(err, savedProduct){
        if(err){
            res.status(500).send({error:"Could not save the data"});
        }
        else{
            res.send(savedProduct);
        }
        
    }) 

}); 

/*  
app.post('/validator',function(req,res){
   var requests = new Requests();
    requests.name = req.body.name;
    requests.required_doc = req.body.required_doc;
    requests.save(function(err, savedProduct){
        if(err){
            res.status(500).send({error:"Could not save the data"});
        }
        else{
            res.send(savedProduct);
        }
        
    });  
    
app.post('/share',function(req,res){
   var requests = new Requests();
    requests.name = req.body.name;
    requests.required_doc = req.body.required_doc;
    requests.save(function(err, savedProduct){
        if(err){
            res.status(500).send({error:"Could not save the data"});
        }
        else{
            res.send(savedProduct);
        }
        
    });   


});
    
*/    