import React from "react";

// class P extends React.Component{
//     constructor(props){
//         super(props)
//     }
//     render(){
//         return(
//           <p>
//              this is some text 
//           </p>
//         )
//     }
// }
// export default P

// const P = (props)=>{
//     return(
//         <p>
//             this is some text and some text
//         </p>
//     )
// }


const P = ()=>{
    let par = document.createElement("p");
    let text = document.createTextNode("this is text from function call")
    par.appendChild(text);
    return par
}
export default P

