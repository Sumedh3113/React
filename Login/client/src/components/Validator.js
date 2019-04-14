import React, { Component } from 'react'

class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value2:'',
                 value3:''};

    // this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
 
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  // handleChange1(event) {
  //   this.setState({value1: event.target.value });
  // }
  handleChange2(event) {
  this.setState({value2: event.target.value});
  }
  handleChange3(event) {
  this.setState({value3: event.target.value});
  }
  handleSubmit(event) {
    // alert('You selected: ' + this.state.value1);
    alert('Your account: ' + this.state.value2);
    alert('Student Id: ' + this.state.value3);
    
    event.preventDefault();
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
          <input type="text" value={this.state.value} onChange={this.handleChange2} className="form-control" />
          </div>
          
         
        
        <input type="button" value="Fetch" className="btn btn-lg btn-secondary btn-block active" />
        
        <br/>    
        <div className="form-group">   
          <label>
           Student_ID:</label>
           <input type="number" value={this.state.value} onChange={this.handleChange3} className="form-control" />
          </div>
        
        <input type="submit" value="Approve" className="btn btn-lg btn-secondary btn-block active" />
      </form>
                
                </div>
            </div>
        </div>
    );
  }
}

export default Validator