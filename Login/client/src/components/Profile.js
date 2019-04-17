import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            student_id: '',
            email: '',
            value1:'',
            button:[],
            newVal:[],
            
        }
        
                            
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    /*--------------encrypt code start here---------------------------*/
    handleChange1(event){
        
    this.setState({value1: 'a' + event.target.value + ((event.target.value).charCodeAt(2))*5 });
                    
    }

    handleClick(event){
     alert("Encrypted Value: "+ this.state.value1);   
    }
    
    /*--------------------end here----------------------------*/
    
    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            student_id: decoded.student_id,
            email: decoded.email,
        })
    
        
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
                            document.querySelector(".reqDoc").textContent +="" +curr.student_id +" " +curr.name + " "+curr.required_doc+"\n";
                        }})


    
    })
 
 }
 
        
            
                     
       

    

    render () {
        var {first_name, last_name,student_id,email,val1,items} = this.state
        //console.log(items);
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-6 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    
                    <div>
                   
                        {
                            
                                    
                        <table>
                                <tr class="reqDoc"></tr>
                            </table> 
                            
                            
                            
                        }   
                            
                            
                        
                            
                                       
                                                   
                                
                            
                                                  
                            
                            
                    
                                                    
                   
            </div>
                    
                   
                   <input type="text" placeholder="Enter Name of receiver" />{"\n"}  
                   <input type="text" placeholder="Enter the hash" />{"\n"}
                                <input type="button" id="sendhash" class="btn btn-md btn-secondary active" value="Send hash" disabled/>         
                        
                    
                </div>
                
                <div className="form-group">
          <label>
              Encrypt:</label>
                <input type="text" value={this.state.value} onChange={this.handleChange1} class="form-control"/></div><br/>
            <br/><input type="button" value="Encrypt" onClick={this.handleClick} class="btn btn-md btn-secondary btn-block active"/>
        
            </div>
        )
    }
}

export default Profile