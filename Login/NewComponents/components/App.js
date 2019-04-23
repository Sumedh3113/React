import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import { Button } from 'reactstrap';
import jwt_decode from 'jwt-decode';
class App extends Component {
state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      transactionHash:'',
      txReceipt: '',
	  student_id:'',

    };
//Take file input from user
captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
      };
//Convert the file to buffer to store on IPFS
 convertToBuffer = async(reader) => {
      //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer-using es6 syntax
        this.setState({buffer});
    };
//ES6 async function
// onClick = async () => {
	// const validCID = document.getElementById("inputtext").value;
	// if (!validCID.match(/^Qm/) || validCID.length < 46 || !validCID.match(/^[a-z0-9]+$/i)){alert("Please enter hash in proper format");} else{
	// ipfs.files.get(validCID, function (err, files) {
	// files.forEach((file) => {
	// console.log(file.path)
	// var img=file.content.toString("base64")
    // document.getElementById("design_display").src= "data:image/png;base64," + img;
	// })
	// })}
	// document.getElementById("inputtext").value="";
// }
// constructor(){
	// super()
	// this.state={
		// showMe:true
	// }
// }

 // xyz(){
	// try{
		// var abi= [
	// {
		// "constant": false,
		// "inputs": [
			// {
				// "name": "user_Address",
				// "type": "address"
			// }
		// ],
		// "name": "getipfs",
		// "outputs": [],
		// "payable": false,
		// "stateMutability": "nonpayable",
		// "type": "function"
	// },
	// {
		// "constant": false,
		// "inputs": [
			// {
				// "name": "x",
				// "type": "string"
			// },
			// {
				// "name": "m",
				// "type": "string"
			// }
		// ],
		// "name": "sendHash",
		// "outputs": [],
		// "payable": false,
		// "stateMutability": "nonpayable",
		// "type": "function"
	// },
	// {
		// "constant": true,
		// "inputs": [],
		// "name": "getHash",
		// "outputs": [
			// {
				// "name": "",
				// "type": "string[]"
			// },
			// {
				// "name": "",
				// "type": "address[]"
			// }
		// ],
		// "payable": false,
		// "stateMutability": "view",
		// "type": "function"
	// },
	// {
		// "constant": true,
		// "inputs": [
			// {
				// "name": "userAddress",
				// "type": "address"
			// }
		// ],
		// "name": "getIpfsHashByAddress",
		// "outputs": [
			// {
				// "name": "",
				// "type": "string[]"
			// },
			// {
				// "name": "",
				// "type": "string[]"
			// }
		// ],
		// "payable": false,
		// "stateMutability": "view",
		// "type": "function"
	// },
	// {
		// "constant": true,
		// "inputs": [
			// {
				// "name": "userAddress",
				// "type": "address"
			// }
		// ],
		// "name": "hasUser",
		// "outputs": [
			// {
				// "name": "hasIndeed",
				// "type": "bool"
			// }
		// ],
		// "payable": false,
		// "stateMutability": "view",
		// "type": "function"
	// }
// ]
	// const _contractaddress = '0xa30fab0f5a0dda134359e4555df982f514c129b2';
	// var myAbi = new web3.eth.Contract(abi,_contractaddress);
	// const ad = document.getElementById("inputtext1").value;
	// var patt1 = /^0x/;
	
	// if ( ad==="" || !ad.match(patt1) || ad.length <42){alert("Please enter your account address");}
	// else{
	// myAbi.methods.getIpfsHashByAddress(ad).call()
	// .then((value) => { for (var x in value) {
		// if (x==0){
		// document.getElementById("IPFS").innerHTML += "Hash: " + value[x] + "<br>";}
		// else{document.getElementById("IPFS").innerHTML += "Document name: " + value[x] + "<br>";}
// }
	// });
	// }
	// }catch (err) {
	    // console.log(err);
	// }
	
	// document.getElementById("inputtext1").value="";
// }



onSubmit = async (event) => {
      event.preventDefault();
//bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
	  console.log('Sending from Metamask account: ' + accounts[0]);
    //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
	  const nameofdoc= document.getElementById("inputtext2").value
      this.setState({ethAddress});
    //save document to IPFS,return its hash#, and set hash# to state
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err,ipfsHash);//remember to remove the ipfsHash from here should not be visible to the user  
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash:ipfsHash[0].hash });
        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
        //return the transaction hash from the ethereum contract
        storehash.methods.sendHash(this.state.ipfsHash,nameofdoc).send({
          from: accounts[0]
        }, (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({transactionHash});
        });
      })
	  document.getElementById("inputtext2").value="";
    };
// componentDidMount(){
	// const token = localStorage.usertoken
        // const decoded = jwt_decode(token)
        // this.setState({
            // student_id: decoded.student_id,
        // })
	
    // fetch('http://localhost:5000/requests/req1')
       // .then((response) => response.json())
      // .then((res) => {
        // this.setState({
            // newVal: res,
            // });
// this.state.newVal.map((curr)=> {
    
                     // if(parseInt(curr.student_id) === this.state.student_id)
                        // {
                            // document.querySelector(".reqDoc").textContent +="" +curr.student_id +" " +curr.name + " "+curr.required_doc+"\n";
							
							
                        // }})
						


    
    // })
 
 // }
 temp(){this.props.history.push(`/profile`)};

  
render() {
return (
        <div className="App">
<hr/>
<grid>
          <h3> Choose file to upload to IPFS </h3>
		  <form onSubmit={this.onSubmit}>
			 <input
              type = "file" 
              onChange = {this.captureFile}
            />
			<input type="input" id="inputtext2" size="30px" placeholder="Type of document"></input> &nbsp;
             <Button
             bsStyle="primary"
             type="submit" >
             Send it
             </Button>
          </form>
		  
<hr/>
 <tbody>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td> : </td>
                    <td>{this.state.ethAddress}</td>
                  </tr>
                  <tr>
                    <td>Tx # </td>
                    <td> : </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
				  </tbody>
				  <div id ="IPFS"></div>
				  <div class="reqDoc">
                  </div> 
				  <Button id="viewreq" onClick = {()=>{this.temp()}} style={{height:34, width:200}}> View Requests </Button>
		<br></br>
		<br></br>	
        </grid>
     </div>
      
	  );
    }
}
export default App;