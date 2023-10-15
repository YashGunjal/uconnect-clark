import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import InfoIconImg from "../../../assets/entypo_info.png"

export default function InfoIcon({ tooltip }) {
  let id = Math.floor(100000 + Math.random() * 900000);
  return (
    <> 
      <span id={"infoicon" + id}  style={{ transform: "translate(0px, -5px)" }}>
        {" "}
        <img
          style={{ transform: "translate(0px, -5px)" }}
          height="10px"
          width="10px"
          src={InfoIconImg}
        />
      </span>
      <UncontrolledTooltip delay={0} target={"infoicon"+ id}>
        {tooltip}
      </UncontrolledTooltip>
    </>
  );
}
