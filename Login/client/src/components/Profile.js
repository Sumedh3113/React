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
    
//ready code just find what is the fucking url for get
// if fetch do not work import 'whatwg-fetch';
        
 fetch('http://localhost:5000/requests/req1')
       .then((response) => response.json())
      .then((res) => {
    //   console.log(res.name);
        this.setState({
            newVal: res,
            });
       // console.log(this.state.newVal.student_id);
    })
        //console.log(this.state.newVal); 
       // console.log("hi "+ this.state.newVal);
    
        

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
                            
                        this.state.newVal.map((curr)=> 
                            
                            <div>
                            <span>{curr.student_id} </span>
                            <span>{curr.name} </span>
                            <span>{curr.required_doc} </span>
                                                  
                            </div>
                            
                        )}
                                                  
                            
                            
                    
 
                        
                                                        
                )}
        
                             
                        
                                                    
                   
            </div>
                    
                    
                    
                   <input type="text" />
                                <input type="button" value="Send hash" disabled/>         
                        
                    
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