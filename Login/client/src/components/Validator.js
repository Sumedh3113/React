import React, { Component } from 'react'
import { val1 } from './ValidatorFunctions'

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student_id:'',
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
          <input type="text" value={this.state.value}  className="form-control" />
          </div>
          
         
        
        <input type="submit" value="Fetch" className="btn btn-lg btn-secondary btn-block active" />
        </form>
        <br/>    
        <div className="form-group">   
          <label>
           Student_ID:</label>
           <input type="text" className="form-control" id="approve" name="student_id" value={this.state.value} onChange={this.handleChange}  />
          </div>
        
        <input type="button" onClick={this.handleSubmit} value="Approve" className="btn btn-lg btn-secondary btn-block active" />
      
                
                </div>
            </div>
        </div>
    );
  }
}

export default Validator