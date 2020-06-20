import  React from 'react'

export default class HighlightMenue extends React.Component{
    constructor(props){
        super(props)
    }
render(){
    return(
        <span id="highlight">
            <button onClick={this.props.addLink}>add link</button>
            <button onClick={this.props.addH2}>add h2</button>
            <button onClick={this.props.addH3}>add h3</button>
        </span>
    )
}
}
