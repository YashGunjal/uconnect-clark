import React from "react";
import ReactLoading from "react-loading";
import { clarkRed } from "../../constants/ColorConstants";

export default function Loading(props){

    return(
        <div style={{display: "flex",justifyContent: "center", width:props.width}}>
           <ReactLoading color={clarkRed} type={"bubbles"} height={"10%"} width={"10%"} {...props} />
        </div>
    )
}