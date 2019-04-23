import React, { Component } from 'react'
import { val1 } from './ValidatorFunctions'
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student_id:'',
					data:[],
                 status:false};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange (e) {
  this.setState({student_id: e.target.value,
                status: true
                });
  }
  
    
handleSubmit (e) {
    e.preventDefault()
    
    const vals = {
			
            student_id:this.state.student_id ,
			status: this.state.status,
            
        }

        val1(vals) 
    document.getElementById("approve").value=""
	alert("Documents approved successfully")
  };
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
	const ad = document.getElementById("inputval").value;
	var patt1 = /^0x/;
	
	if ( ad==="" || !ad.match(patt1) || ad.length <42){alert("Please enter your account address");}
	else{
	myAbi.methods.getIpfsHashByAddress(ad).call()
	.then((value) => { 
			var temp=[];
			// this is my own solution
			value[0].forEach((cur,i)=>{
				document.getElementById("IPFS").innerHTML += "Hash: " + cur + "<br>";
				 document.getElementById("IPFS").innerHTML += "Document name: " + value[1][i] + "<br>";
			});
			// value[1].forEach(cur=>{
				// document.getElementById("IPFS").innerHTML += "Document name: " + cur + "<br>";
				
			// });
			
		
		
		// else{
			// document.getElementById("IPFS").innerHTML += "Document name: " + value[x] + "<br>";
		// }
	
	});
	
	}
	}
	catch (err) {
	    console.log(err);
	}
	
	document.getElementById("inputval").value="";
}


  render() {	
    return (
    
    <div className="container">
        <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
      <form onSubmit={this.handleSubmit}>
        <br/>
        <div className="form-group">  
        <label>
          Account:</label>
          <input type="text" id = "inputval" value={this.state.value}  className="form-control" />
          </div>
          
         
        
        <input type="button" value="Fetch" onClick= {()=>{this.xyz()}} className="btn btn-lg btn-secondary btn-block active" />
        </form>
        <br/>    
        <div className="form-group">   
          <label>
           Student_ID:</label>
           <input type="text" className="form-control" id="approve" name="student_id" value={this.state.value} onChange={this.handleChange}  />
          </div>
        
        <input type="button" onClick={this.handleSubmit} value="Approve" className="btn btn-lg btn-secondary btn-block active" />
      
                
                </div>
			<div id="IPFS">

			</div>
            </div>
        </div>
    );
  }
}

export default Validator