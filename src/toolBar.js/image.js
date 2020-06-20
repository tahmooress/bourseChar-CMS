import React from 'react';
import Menue from "./Menue";
import Node from "./util"
import axios from "axios";
import "../../public/2.png";


export default class But extends React.Component{
    constructor(props){
        super(props)
       this.state = {
           nodeList : [{
               nodeName : "h1",
               nodeContent : "",
               nodeAtr : {},
               nodeChild : []
           }],
           menue : false,
           text: "",
           link : "",
           selected : "",
       }
      this.addBreak = this.addBreak.bind(this) 
      this.title = this.title.bind(this) 
     this.addElement = this.addElement.bind(this);
     this.addText = this.addText.bind(this);
     this.handleChange = this.handleChange.bind(this)
     this.handleEnter = this.handleEnter.bind(this)
     this.submit = this.submit.bind(this)
    }
    componentDidMount(){
        window.addEventListener("mousedown",(e)=>{
            document.getSelection().removeAllRanges();
            let id = document.getElementById("display");
            console.log(e.target.id, "target")
            if (e.target.id !== "linkBut"){
                if (id !== null){
                    id.remove()
                }
            }
           
        })
       window.addEventListener("mouseup",()=>{
        var sel = document.getSelection();
        console.log(sel,"from selected")
        let t = sel.toString();
        if (t !== ""){
        var parent = sel.focusNode.parentElement.parentElement;
        var selectedEl = sel.focusNode.parentElement;
        console.log(parent, "parent")
        console.log(selectedEl, "selected")
        let span = document.createElement("span");
        span.setAttribute("id","display");
        let LinkBut = document.createElement("button");
        let linkText = document.createTextNode("add link");
        LinkBut.appendChild(linkText);
        LinkBut.setAttribute("id","linkBut");
        span.appendChild(LinkBut);
        parent.insertBefore(span,selectedEl);
        LinkBut.addEventListener("click", ()=>{
            let i = document.createElement("input");
            i.setAttribute("placeholder","add link here")
            parent.insertBefore(i,selectedEl);
            document.getElementById("linkBut").remove()
            i.addEventListener("input",(e)=>{
                this.setState({
                    link : e.target.value
                })
            })
            i.addEventListener("keydown",(e)=>{
                if(e.keyCode == 13){
                    
                }
            })
        })
        
        }
       }) 
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
        var last = document.getElementById("last");
        if(e.keyCode == 13 && !e.shiftKey){
            var p = document.createElement("p");
            let t = document.createTextNode(this.state.text)
            p.appendChild(t);
            last.appendChild(p);
            let text = this.state.text
            let node = new Node("p",text,[],[])
            let copy = [...this.state.nodeList, node];
            this.setState({
                text : "",
                nodeList : copy
            })
        }else if (e.keyCode == 13 && e.shiftKey){
            let t = this.state.text;
            let newT = t + "<br>"
            this.setState({
                text : newT
            })
            let b = document.createElement("br")
            console.log(last)
            last.appendChild(b)
        }
    }
    handleShift(e){
        
    }
    submit(e){
        e.preventDefault();
        const url = "http://localhost:8000/submit";
        let body = JSON.stringify(this.state.nodeList)
       axios.post(url, body)
       .then(res=> alert(res.data.result + res.data.er))

    }
    render(){
        const showMenue = this.state.menue ? (
            <Menue text={this.addText} addBreak={this.addBreak}/>
        ):
        (null)
        console.log(this.state.nodeList)
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