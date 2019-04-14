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
            value1:''
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
    }

    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-6 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-sm-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Student ID</td>
                                <td>{this.state.student_id}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
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