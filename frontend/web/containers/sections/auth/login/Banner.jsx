import React from "react";
import ClarkImg from "../../../../../assets/main-logo.svg";
import style from "./LoginStyle.css";

export default function Banner() {
  return (
    <>
      <div className={style.logoSectionStyle + " " + style.flexDcol}>
        <img className={style.uconnectImg} src={ClarkImg} alt="" />
        <div className={style.logoTextStyle + " " + style.flexDcol}>
          <div className={style.poweredBy}></div>
          <div className={style.logoUconnectStyle}>UConnect</div>
        </div>
      </div>
    </>
  );
}
