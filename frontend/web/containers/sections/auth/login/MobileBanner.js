import React from "react";
import style from "./LoginStyle.css";
import LogoUconnect from "../../../../../assets/main-logo.svg";


export default function MobileBanner() {
  return (
    <>
      <div
        className={style.flexNormal + " " + style.logoComponent}
        style={{ backgroundColor: "white" }}>
        <img src={LogoUconnect} className={style.logoStyle} alt="" />
      </div>
    </>
  );
}
