 import React, { Component } from 'react';

export class Menue extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <button onClick={this.props.addBreak}>line break</button>
                <input type="file" style={{display : "none"}} onChange={this.props.addImage} ref={fileInput => this.fileInput = fileInput}/>
                <button onClick={()=> this.fileInput.click()}>upload image</button>
                <button>embed video</button>
            </div>
        )
    }
}

export default Menue
