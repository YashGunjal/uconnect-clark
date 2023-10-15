
import React from "react";

import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import style from "../../containers/sections/auth/login/LoginStyle.css";

function AuthFooter() {
  return (
    <>
      {window.innerWidth > 720 ? (
        <div className="clark-red"
          style={{ backgroundColor: "#7BD4FB", height: "6vh", width: "100vw"}}
        >
          <div className={style.footer} >
            <div className={style.footerLine}></div>
            <small className={style.footerText} style={{ fontWeight: "700" }}>
              © {new Date().getFullYear()}{" "}
              <a
                className={style.footerText + " " + "font-weight-bold"}
                style={{ fontWeight: "700" }}
                target="_blank"
              >
                UConnect
              </a>
            </small>
            <small className={style.footerText}>
              <Nav className="nav-footer justify-content-center justify-content-xl-end .form-inline .custom-control  ">
                <NavItem>
                  <NavLink
                    className={style.footerText}
                    target="_blank"
                  >
                    Privacy Policy
                  </NavLink>
                </NavItem>
                <Nav />

                <NavItem>
                  <NavLink
                    className={style.footerText}
                    target="_blank"
                  >
                    Terms and Conditions
                  </NavLink>
                </NavItem>
              </Nav>
            </small>
            <div className={style.footerLine}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={style.footerMobile}  >
            <div className={style.flexDcol} style={{width:"100", height:"100%"}} >
              <small>
                <NavLink
                  className={style.footerText}
                  target="_blank"
                >
                  Privacy Policy
                </NavLink>
              </small>

              <small>
                <NavLink
                  className={style.footerText}
                  target="_blank"
                >
                  Terms and Conditions
                </NavLink>
              </small>

              <div
                className={style.flexSpaceEvenly}
                style={{
                  width: "100vw",
                }}
              >
                <div className={style.footerLine}></div>
                <small className={style.footerText}>
                  © {new Date().getFullYear()}{" "}
                  <a
                    className={style.footerText + " " + "font-weight-bold"}
                    style={{ fontWeight: "700" }}
                    target="_blank"
                  >
                    UConnect
                  </a>
                </small>
                <div className={style.footerLine}></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AuthFooter;
