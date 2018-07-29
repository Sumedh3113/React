import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';


import VideoList from './components/video_list';
import SearchBar from './components/searchbar';// because we can have many files with same name

const API_Key = "Paste API Key here";//Sensitive info to share on github

//create a new component. should produce html

//const is ES6 first it was var // => instead of 'function' is ES6 syntax
// this const App is a component
class App extends Component {
constructor(props){

super(props);

this.state = {videos:[]}

/*YTSearch({key: API_Key, term:'surfboards'}, function(data){

//console.log(data);

this.setState({videos:data});
});
same function can be written as*/
YTSearch({key: API_Key, term:'surfboards'}, (videos) => {
this.setState({videos});
});
}

render(){
// these <div> tag is jsx it is subset of javascript which allows us to write html inside javascript
return ( <div>
 <SearchBar />
 <VideoList videos = {this.state.videos}/>
  </div>);
 }
}
//take this component's generated html and put it on the page(in DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
