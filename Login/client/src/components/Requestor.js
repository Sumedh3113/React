import React, { Component } from 'react'
import { req1 } from './RequestorFunctions'

class Requestor extends Component {
  constructor() {
    super();
    this.state = {
                  required_doc: '',
                  name:'',
                student_id:'',
                    decrypt:'',
                    responses:[]
                 };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this)
	this.onSubmit = this.onSubmit.bind(this)
     
    this.handleClick = this.handleClick.bind(this);
    
  }

  handleChange(event) {
    this.setState({decrypt: event.target.value });
  }

    /*--change this function if want to change decrypt value--*/
    handleClick(e){
    alert("Decrypted Value: " + (this.state.decrypt).slice(1,-3))
    //document.querySelector(".test").textContent = "Decrypted Value: " + (this.state.decrypt).slice(1,-3)
    //clearing the fields after click
    document.getElementById("DecryptVal").value="";
        
    }
	 
    
    
onChange (e) {
        this.setState({ [e.target.name]: e.target.value,
                        [e.target.required_doc]:e.target.value,
                      [e.target.student_id]:e.target.value})
    }

    onSubmit (e) {
        e.preventDefault()
	//alert("Hello" + this.state.student_id)

        const reqs = {
			
            required_doc: this.state.required_doc ,
			name: this.state.name,
            student_id:this.state.student_id
            
        }

        req1(reqs)
        document.getElementById("shareVal1").value="";
        document.getElementById("shareVal2").value="";
        document.getElementById("shareVal3").value="";
    }
    
componentDidMount() {
        
 fetch('http://localhost:5000/shares/share1')
       .then((response) => response.json())
      .then((res) => {
        this.setState({
            responses: res,
            });
this.state.responses.map((curr)=> {
    
                      //if(curr.name === this.state.name)
                        //{
                    document.querySelector(".reqDoc").textContent += curr.student_id +"  "+curr.hashes+"\n";
                        //}
                    
                         })


    
    })
 
 }

    


  render() {
    return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
      <form onSubmit={this.onSubmit}><br/>
        <div className="form-group">
        <label>
          Choose Required Documents: </label>{"\n"}
            <span> I20 , Passport , Visa , I94 </span>
       
        </div>
          
          <div className="form-group">
        <label htmlFor="email">Document List:</label>
        <input type="text" className="form-control" 
        placeholder="Enter document names" name="required_doc" id="shareVal1" value={this.state.required_doc} onChange={this.onChange} />
                </div>
          
        <div className="form-group">
          <label>
          Name:</label>
          <input type="text" placeholder="Enter your name" name="name" id="shareVal2" className="form-control" value={this.state.name} onChange={this.onChange} />
        
            </div>
          
        <div className="form-group">
          <label>
          Student_ID:</label>
          <input type="text" placeholder="Enter Users ID" name="student_id"  id="shareVal3" className="form-control" value={this.state.student_id} onChange={this.onChange} />
        
            </div>

            
        <button type="submit" className="btn btn-lg btn-secondary btn-block active" >Send </button>
      </form>
        <br/>        
        <div className="form-group">
          <label>        
              Decrypt :</label> 
          <input type="text"  placeholder="Enter hash to decrypt"  id="DecryptVal" className="form-control" name="decypt" value={this.state.decrypt} onChange={this.handleChange} />
        </div>

            
        <input type="button" onClick={this.handleClick} value="Decrypt" className="btn btn-lg btn-secondary btn-block active"/>
                <br/>
            <div class="test">
                
                </div>
            <div class="reqDoc">
                
                </div>
                
        </div>
            </div>
            </div>

    );
  }
}

export default Requestor