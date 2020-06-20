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
     this.addImage = this.addImage.bind(this);
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
        // console.log(parent, "parent")
        // console.log(selectedEl, "selected")
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
        let para = document.getElementById("test")
        console.log(para.childNodes )
        //
        e.preventDefault();
        let b = document.createElement("hr");
        const last = document.getElementById("last");
        last.appendChild(b);
        let h = new Node("hr", "", null, null)
        let prev = this.state.nodeList;
        let newState = [...prev, h]
        this.setState({
            nodeList : newState
        })
    }
    addElement(e){
        e.preventDefault();
        this.setState((prevState =>({
            menue : !prevState.menue
        })))
    }
    addImage(e){
        let last = document.getElementById("last");
        let i = document.createElement("img");
        i.setAttribute("width",500)
        i.setAttribute("height",250)
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function(){
            i.setAttribute("src",  reader.result) ;
        }
        if(file){
            reader.readAsDataURL(file);
            last.appendChild(i);
            let nl = this.state.nodeList;
            let newNode = new Node("image",null,{src : ""},null);
            let fm = new FormData();
            console.log(file, file.name, "file")
            fm.append("image",file,file.name);
            axios.post("http://localhost:8000/upload",fm).then((response)=>{
                newNode.nodeAtrr.src = response.data.result;
                this.setState({
                    nodeList : [...nl,newNode]
                })
            }).catch(err=>console.log(err))
            
        }else{
            i.src = ""
        }
        
        
    }
    // addText(e){
    //     let name = e.target.tagName;
    //     let content = e.target.value;
    //     let art = e.target.attributes;
    //     let child = e.target.childNodes;
    //     let element = new Node(name, content, art, child);
    //     let copy = [...this.state.nodeList, element];
    //     this.setState({
    //         nodeList : copy
    //     })

    // }
    handleChange(e){
        let t = e.target.value;
        this.setState({
            text : t
        })
    }
    handleEnter(e){
        var last = document.getElementById("last");
        var p = document.createElement("p");
        let text = this.state.text
        let tx = document.createTextNode(text)
        p.appendChild(tx)
        console.log(p)
        var b = document.createElement("br")
            if (e.keyCode == 13 && e.shiftKey){
               p.appendChild(b)
            }else if(e.keyCode == 13 && !e.shiftKey){
               
                // p.appendChild(b)
                // p.innerHTML += "and its countinue"
                last.appendChild(p);
                let node = new Node("p",text,{},[])
                let copy = [...this.state.nodeList, node];
                this.setState({
                    text : "",
                    nodeList : copy
                })
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
            <Menue addImage={this.addImage} addBreak={this.addBreak}/>
        ):
        (null)
        console.log(this.state.nodeList)
        //here
           


        //til here
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
                <p id="test">this is a text before a tag for linking<a href="htts://google.com">clickme</a>and this is the text after link</p>
            </div>
        )
    }
}