import React from 'react';

/*
functional component

const SearchBar =()=>{
// will generate html input for user to type in
return <input />;// this will convert into React.createElement thats why we need to import React

}*/
// this exported component is imported in index.js
//below is class based component using ES6 class its a js object with properties and method to it
class SearchBar extends React.Component {

  constructor(props){ // use to initialize objects
  super(props);// calling parent method

  //only inside constructor we can define like this
  this.state = {term:''};

  }

  render(){
//every render function must return a jsx

//return <input onChange = {this.OnInputChange}  />;
//or we can do as below->
// return <input onChange = {event => console.log(event.target.value) } >
//or last way
// Inside all the other functon we use setState to assign values to state object
return(
<div>
   <input
   value = {this.state.term}
   onChange = {event => this.setState({term: event.target.value})}  />
   
</div>
);
// by using this.state.term we are refering the state object
}


// whenever user writes somthing
/*  OnInputChange(event){
console.log(event.target.value);// whatever you type inside search bar

  }
*/


}

export default SearchBar;// same name as above function
