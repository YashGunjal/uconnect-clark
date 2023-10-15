import React from "react";
import ReactLoading from "react-loading";

export default function Loading(props){

    return(
        <div style={{display: "flex",justifyContent: "center", width:props.width}}>
           <ReactLoading color="#BE63E5" type={"bubbles"} height={"10%"} width={"10%"} {...props} />
        </div>
    )
}