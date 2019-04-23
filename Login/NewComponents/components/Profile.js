import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { share1 } from './ShareFunctions'
import { Button } from 'reactstrap';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            hashes: '',
            student_id: '',
            email: '',
            value1:'',
            button:[],
            newVal:[],
            
        }
        
                            
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        }

    /*-------------------encrypt code start here---------------------------*/
    handleChange1(event){
        
    this.setState({value1: 'a' + event.target.value + ((event.target.value).charCodeAt(2))*5 });
                    
    }

    handleClick(event){
     alert("Encrypted Value: "+ this.state.value1);  
    document.getElementById("encrypt").value = "";
    }
    
    /*--------------------end here----------------------------*/
/*---------Send hash code start here--------------------*/
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value,
                        [e.target.hashes]:e.target.value,
                      });
    }

    onSubmit (e) {
        e.preventDefault()
	//alert("Hello" + this.state.name);
      //  alert("Hello" + this.state.hashes);

        const reqs = {
			
			name: this.state.name,
            hashes:this.state.hashes,
            student_id:this.state.student_id
            
        }

        share1(reqs)
        
        document.getElementById("recName").value = "";
        document.getElementById("hash").value = "";
    }
onClick = async () => {
	const validCID = document.getElementById("inputtext").value;
	if (!validCID.match(/^Qm/) || validCID.length < 46 || !validCID.match(/^[a-z0-9]+$/i)){alert("Please enter hash in proper format");} else{
	ipfs.files.get(validCID, function (err, files) {
	files.forEach((file) => {
	console.log(file.path)
	var img=file.content.toString("base64")
    document.getElementById("design_display").src= "data:image/png;base64," + img;
	})
	})}
	document.getElementById("inputtext").value="";
}
xyz(){
	try{
		var abi= [
	{
		"constant": false,
		"inputs": [
			{
				"name": "user_Address",
				"type": "address"
			}
		],
		"name": "getipfs",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "string"
			},
			{
				"name": "m",
				"type": "string"
			}
		],
		"name": "sendHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			},
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getIpfsHashByAddress",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			},
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "hasUser",
		"outputs": [
			{
				"name": "hasIndeed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
	const _contractaddress = '0xa30fab0f5a0dda134359e4555df982f514c129b2';
	var myAbi = new web3.eth.Contract(abi,_contractaddress);
	const ad = document.getElementById("inputtext1").value;
	var patt1 = /^0x/;
	
	if ( ad==="" || !ad.match(patt1) || ad.length <42){alert("Please enter your account address");}
	else{
	myAbi.methods.getIpfsHashByAddress(ad).call()
	.then((value) => { for (var x in value) {
		if (x==0){
		document.getElementById("IPFS").innerHTML += "Hash: " + value[x] + "<br>";}
		else{document.getElementById("IPFS").innerHTML += "Document name: " + value[x] + "<br>";}
}
	});
	}
	}catch (err) {
	    console.log(err);
	}
	
	document.getElementById("inputtext1").value="";
}

    
    
/*---------------ends here------------------------*/

componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            student_id: decoded.student_id,
            email: decoded.email,
        })
    
document.getElementById("sendhash").disabled = true
    
 fetch('http://localhost:5000/validates/val1')
       .then((response) => response.json())
      .then((res) => {
        this.setState({
            button: res,
            });

     
     // the button will be active only after all the documents are validated
     this.state.button.map((curr)=> {
    
                      if(parseInt(curr.student_id) === this.state.student_id)
                        {
                            document.getElementById("sendhash").disabled = false
                        }})

     
     
    //then closing bracket 
    })
     
        
        
        
 fetch('http://localhost:5000/requests/req1')
       .then((response) => response.json())
      .then((res) => {
        this.setState({
            newVal: res,
            });
this.state.newVal.map((curr)=> {
    
                      if(parseInt(curr.student_id) === this.state.student_id)
                        {
                           // document.querySelector(".reqDoc").textContent +="" +curr.student_id +" " +curr.name + " "+curr.required_doc+"\n";
						   "<br>";
                            document.querySelector(".reqDoc").textContent +="\n Requestor: "+ curr.name +" " + " Required Documents: "+ curr.required_doc+" " ;
							"<br>";
                        }})
    
    })
 
 }
 
    

    render () {
        var {first_name, last_name,student_id,email,val1,items} = this.state
        //console.log(items);
        return (
            <div className="container">
                <div className="row" >
                
                    <div className="col-sm-7 mt-5 mx-auto">
                        
                    
                    
                    <input type="input" id="inputtext" size="30px" placeholder="Please enter your hash"></input> &nbsp;
					<Button id="uploadimage" onClick = {this.onClick} style={{height:34, width:200}} > Get Uploaded Image </Button>
					 <br>
					 </br>
					 <br>
					 </br>
					 <input type="input" id="inputtext1" size="30px" placeholder="Please enter your address" ></input> &nbsp;
					<Button id="sendmail" onClick = {()=>{this.xyz()}} style={{height:34, width:200}}> Get the IPFS hash </Button>
					<br>
					 </br>
					 <br>
					 </br>
                   <input type="text" placeholder="Enter Name of receiver" id="recName" value={this.state.name} className="form-control" name="name" onChange={this.onChange}/>  <br/>
                   <input type="text" placeholder="Enter the hash" value={this.state.hashes} className="form-control" id="hash" name="hashes" onChange={this.onChange}/><br/>
                                <input type="button" id="sendhash" className="btn btn-md btn-secondary btn-block active" value="Send hash" onClick={this.onSubmit} />    
                        <br/>
                    <label>
              Encrypt:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange1} id="encrypt" class="form-control"/>
            <br/><input type="button" value="Encrypt" onClick={this.handleClick} className="btn btn-md btn-secondary btn-block active"/>
        
                    
                    </div>    
                  
                <div className="col-sm-5 mt-4 mx-auto">
                   <h3 className="text-center">PROFILE</h3>
                        {
                                    
                        <div class="reqDoc"> </div>
                                
                        }   
                    
                    
                    </div>
				<div id ="IPFS"></div>
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" id="design_display" alt="uploaded file"/>	
                </div>
                    
                </div>
                
                        )
    }
}

export default Profile