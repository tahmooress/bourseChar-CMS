import React from 'react';
import ReactDOM from 'react-dom';
import But from "./addNode";
import P from "./toolBar.js/Paragraph"

const root = document.getElementById("root")
class App extends React.Component{
  constructor(props){
    super(props)
    this.addText = this.addText.bind(this);
  }
 addText(e){
   let p = document.createElement("p")
   let t = document.createTextNode("this is new")
   p.appendChild(t)
   root.prepend(p);

 }
  render(){
    return(
      <React.Fragment>
        <But text={this.addText}/>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App/>,root)