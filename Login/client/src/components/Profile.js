import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { share1 } from './ShareFunctions'

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

        /*--------------encrypt code start here---------------------------*/
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
                            document.querySelector(".reqDoc").textContent +=" Requestor {"+ curr.name +"}" + " Required Documents {"+ curr.required_doc+"}" ;
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
                        
                    
                    
                      
                   
                   <input type="text" placeholder="Enter Name of receiver" id="recName" value={this.state.name} className="form-control" name="name" onChange={this.onChange}/>{"\n"}  <br/>
                   <input type="text" placeholder="Enter the hash" value={this.state.hashes} className="form-control" id="hash" name="hashes" onChange={this.onChange}/>{"\n"}<br/>
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
                                    
                        <table>
                                <tr class="reqDoc">
                                    <td></td>
                                </tr>
                            </table> 
                            
                        }   
                    
                    
                    </div>
                    
                </div>
                    
                </div>
                
                        )
    }
}

export default Profile