import React from "react";
import ReactLoading from "react-loading";

export default function Loading(props){

    return(
        <div style={{display: "flex",justifyContent: "center", width:props.width}}>
           <ReactLoading color="#cf2e2e" type={"bubbles"} height={"10%"} width={"10%"} {...props} />
        </div>
    )
}