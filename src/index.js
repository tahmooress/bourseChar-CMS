import React from 'react';
import ReactDOM from 'react-dom';
import But from "./addNode";
import P from "./toolBar.js/Paragraph"

const root = document.getElementById("root")
class App extends React.Component{
  constructor(props){
    super(props)
    // this.addText = this.addText.bind(this);
  }
//  addText(e){
//    let p = document.createElement("p")
//    let t = document.createTextNode("this is new")
//    let btnClass = "center main-text"
//    p.setAttribute("class", btnClass)
//    p.appendChild(t)
//    root.prepend(p);

//  }
//  addImage(e){
//    let i = document.createElement("image")
//    let atr = document.createAttribute("src")
//    atr.value = "https://google.com"
//    i.setAttribute(atr)
//    root.append(i)
//  }
  render(){
    return(
      <React.Fragment>
        <But />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App/>,root)