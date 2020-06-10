import React from 'react';
import Menue from "./Menue";
import Node from "./util"
import axios from "axios";


export default class But extends React.Component{
    constructor(props){
        super(props)
       this.state = {
           nodeList : [{
               nodeName : "h1",
               nodeContent : "",
               nodeAtr : [],
               nodeChild : []
           }],
           menue : false,
           text: "",
       }
      this.addBreak = this.addBreak.bind(this) 
      this.title = this.title.bind(this) 
     this.addElement = this.addElement.bind(this);
     this.addText = this.addText.bind(this);
     this.handleChange = this.handleChange.bind(this)
     this.handleEnter = this.handleEnter.bind(this)
     this.submit = this.submit.bind(this)
    }
    title(e){
        e.preventDefault();
        let t = e.target.value;
        let copy = this.state.nodeList[0];
        copy.nodeContent = t;
        this.setState({
            nodeList : [copy]
        })
    }
    addBreak(e){
        e.preventDefault();
        let b = document.createElement("hr");
        const last = document.getElementById("last");
        last.appendChild(b);
    }
    addElement(e){
        e.preventDefault();
        this.setState((prevState =>({
            menue : !prevState.menue
        })))
    }
    addText(e){
        let name = e.target.tagName;
        let content = e.target.value;
        let art = e.target.attributes;
        let child = e.target.childNodes;
        console.log(name)
        console.log(content)
        console.log(art)
        console.log(child)
        console.log(child[0])
        let element = new Node(name, content, art, child);
        let copy = [...this.state.nodeList, element];
        this.setState({
            nodeList : copy
        })


    }
    handleChange(e){
        let t = e.target.value;
        this.setState({
            text : t
        })
    }
    handleEnter(e){
        if(e.keyCode == 13){
            let p = document.createElement("p");
            let t = document.createTextNode(this.state.text)
            p.appendChild(t);
            const last = document.getElementById("last");
            last.appendChild(p);
            let text = this.state.text
            let node = new Node("p",text,[],[])
            let copy = [...this.state.nodeList, node];
            this.setState({
                text : "",
                nodeList : copy
            })
        }
    }
    submit(e){
        e.preventDefault();
        const url = "http://localhost:8000/submit";
        // const option = {
        //     mode : "no-cors",
        //     cache: 'no-cache',
        //     credentials: 'include',
        //     method : "POST",
        //     body : JSON.stringify(this.state.nodeList),
        //     headers : {
        //         'Content-Type': 'application/json',
        //              }
        // }
        let body = JSON.stringify(this.state.nodeList)
       axios.post(url, body)
       .then(res=> alert(res.data.result + res.data.er))

    }
    render(){
        const showMenue = this.state.menue ? (
            <Menue text={this.addText} addBreak={this.addBreak}/>
        ):
        (null)
        return(
            <div id="add">
                 <input type="text" value={this.state.title} placeholder={"write the title of your blog here"} onChange={this.title}></input>
                <hr></hr>
                <article id="last">

                </article>
                <div>
                    {showMenue}
                    <button onClick={this.addElement}>
                        +
                    </button>
                    <input  type="text" placeholder="wirte what is in your mind" value={this.state.text} onChange = {this.handleChange} onKeyDown={this.handleEnter}></input>
                </div>
                <button type="submit" onClick={this.submit}>submit blog</button>
            </div>
        )
    }
}