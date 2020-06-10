 import React, { Component } from 'react';

export class Menue extends Component {
    render() {
        return (
            <div>
                <button id="but" className={"hamintori", "ali"} onClick={this.props.text} value="click on me">click me</button>
                <button onClick={this.props.addBreak}>line break</button>
                <button>upload image</button>
                <button>embed video</button>
            </div>
        )
    }
}

export default Menue
