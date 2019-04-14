import React, { Component } from 'react'
import { requests } from './UserFunctions'

class Requestor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
//                name: '',
                  required_doc: '',
                  name:''
                 };

//    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

//  handleChange1(event) {
//    this.setState({value1: event.target.value });
//  }

handleChange2(event) {
    this.setState({required_doc: event.target.value });
  }
 
  handleChange4(event) {
  this.setState({name: event.target.value});
  }
  handleSubmit(event) {
    
//    alert('You selected: ' + this.state.value1);
//    alert('Name: ' + this.state.name);
//      alert('Documents: ' + this.state.required_doc);
      event.preventDefault();
      
      const requestor = {
            name: this.state.name,
            required_doc: this.state.required_doc        }

      
  }

  render() {
    return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
      <form onSubmit={this.handleSubmit}><br/>
        <div className="form-group">
        <label>
          Pick Required Documents: </label>
          <select className="form-control"
 value={this.state.value} onChange={this.handleChange1}>
            <option value=""></option>
            <option value="i20">I-20</option>
            <option value="transcript">Transcript</option>
            <option value="passport">Passport</option>
            <option value="i94">I-94</option>
          </select>
       
        </div>
          
          <div className="form-group">
        <label htmlFor="email">Document List:</label>
    <input type="text" className="form-control" name="doc"
        placeholder="Enter document names" name="required_doc" value={this.state.required_doc} onChange={this.handleChange2} />
                </div>
          
        <div className="form-group">
          <label>
          Name:</label>
          <input type="test" placeholder="Enter your name" name="name" className="form-control" value={this.state.name} onChange={this.handleChange4} />
        <br/>
            </div>
            
            
        <input type="submit" value="Send" className="btn btn-lg btn-secondary btn-block active" />
      </form>
        <br/>        
        <div className="form-group">
          <label>        
              Decrypt :</label> 
          <input type="text"  placeholder="Enter hash to decrypt" className="form-control" value={this.state.value} onChange={this.handleChange5} />
        </div>

            
        <input type="button" value="Decrypt" className="btn btn-lg btn-secondary btn-block active"/>
            
        </div>
            </div>
            </div>

    );
  }
}

export default Requestor