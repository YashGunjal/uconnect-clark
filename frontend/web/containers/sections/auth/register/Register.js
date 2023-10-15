import React, { useState, useEffect } from "react";
import style from "../login/LoginStyle.css";
import Banner from "../login/Banner.jsx";
import MobileBanner from "../login/MobileBanner";

import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";
import {
  RegistrationKey,
  updateRegistration,
  updateValidations,
  updatePageStatus,
} from "./RegisterSlice";
import { updateScreenDimension } from "../../../../AppLoaderSlice";

import TextField from "../../../../components/textField/TextField";
import { FormFeedback, FormGroup, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { appLoaderKey } from "../../../../AppLoaderSlice";
import { updateUser } from "../../../../AppLoaderSlice";

import {
  SuccessMessage,
  ErrorMessage,
} from "../../../../components/notification/NotificationHelper";
import AuthService from "../../../../../services/AuthService";
import { useHistory, useParams } from "react-router-dom";

export default function Register() {
  // const { role } = useParams();
  const [role, setRole] = useState("student");
  let history = useHistory();
  const { registration, validations } = useSelector((state) => {
    return state[RegistrationKey];
  });
  const { screenDimension } = useSelector((state) => {
    return state[appLoaderKey];
  });

  const [firstPartComplete, setFirstPageComplete] = useState(false);
  const [passworderror, setError] = useState(false);
  const dispatch = useDispatch();

  const validateEmailAddress = (email) => {
    var re = /\S+@\S+\.\S+/;
    if (email === "") {
      return "Email is required";
    }
    if (!re.test(email)) {
      return "Email format is invalid.";
    }
    if (!email.includes("@clarku.edu")){
      return "Only Clark university registered Email"
    }
  };

  const tagStyle = {
    margin: "8px 6px",
    padding: "10px 19px",
    fontSize: "12px",
    cursor: "pointer",
  };

  useEffect(() => {
    if (validations.isValidating) checkvalidation();
  }, [
    registration.firstName,
    registration.lastName,
    registration.email,
    registration.confirmPassword,
    registration.password,
  ]);

  useEffect(() => {
    dispatch(updateScreenDimension(window.innerWidth));
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  const checkvalidation = () => {
    let allGood = true;

    if (registration.firstName === "") {
      allGood = false;
      dispatch(
        updateValidations({ firstNameError: " First Name is required" })
      );
    } else {
      dispatch(updateValidations({ firstNameError: "" }));
    }
    if (registration.lastName === "") {
      allGood = false;
      dispatch(updateValidations({ lastNameError: " Last Name is required" }));
    } else {
      dispatch(updateValidations({ lastNameError: "" }));
    }

    if (validateEmailAddress(registration.email)) {
      allGood = false;
      dispatch(
        updateValidations({
          emailError: validateEmailAddress(registration.email),
        })
      );
    } else {
      dispatch(updateValidations({ emailError: "" }));
    }
    
    if (registration.password !== registration.confirmPassword) {
      allGood = false;
      
      dispatch(
        updateValidations({ ConfirmPasswordError: "Password Doesn't Match" })
      );
    } else {
      
      dispatch(updateValidations({ ConfirmPasswordError: "" }));
    }
    if (registration.password.length < 8) {
      setError(true);
      allGood = false;
      dispatch(
        updateValidations({
          passwordError: "Password should be altleast 8 character long",
        })
      );
    } else {
      setError(false);
      dispatch(updateValidations({ passwordError: "" }));
    }
    return allGood;
  };


  const registerHandle = async () => {
    dispatch(updateValidations({ isValidating: true }));
    console.log(checkvalidation());
    if (checkvalidation()) {
      console.log("ok to register");
      const response = await AuthService.registerWithCaptcha({
        ...registration,
        role:"student",
      });
      console.log(response);
      if (response?.status == 200) {
        // dispatch(updateRegistration({ encryptedCode: response.data?.token }));
        // setFirstPageComplete(true);
        let userDetail = response.data.data;
        localStorage.setItem("token", response.data.token);
        dispatch(
          updateUser({ ...userDetail, isLoggedIn: true, isUserFetched: true })
        );
        if (userDetail) {
          history.push("/home");
        }
      } else {
        ErrorMessage("Failed!!", "Email already exist");
      }
    }
  };



  return (
    <>
      <div className={style.flexNormal}>
        {window.innerWidth > 720 && <Banner />}
        
          <div
            className={
              window.innerWidth > 720
                ? style.signinSectionStyle + " " + style.flexDcol
                : style.backgroundStyle + " " + style.flexDcol
            }
          >
            {window.innerWidth < 720 ? <MobileBanner /> : null}
            <div className={style.flexDcol}>
              <div
                style={{
                  height: "79vh",
                  // overflow: "scroll",
                  // mobile
                  width: window.innerWidth > 720 ? "" : "70vw",
                }}
              >
                <div
                  className={
                    window.innerWidth > 720
                      ? style.caText
                      : style.caSigninText + " " + style.caMobileWidth
                  }
                  
                >
                  {" "}
                  Create Account{" "}
                </div>


                <div
                  className={
                    window.innerWidth > 720
                      ? style.rowStyle
                      : style.rowStyleMobile
                  }
                  style={{ marginTop: "3vh", 
                  
                  // border:"1px solid red" 
                }}
                >
                  <div
                    className={
                      window.innerWidth > 720
                        ? style.compWidth
                        : style.compWidthMobile
                    }
                    
                  >
                    <TextField
                      label={
                        <div style={{ fontWeight: "400" }}>
                          {" "}
                          First Name<span className={style.starStyle}>
                            *
                          </span>{" "}
                        </div>
                      }
                      placeholder="First Name"
                      type="text"
                      inputGroupTextEnd={<i className="ni ni-single-02" />}
                      value={registration.firstName}
                      onChange={(e) =>
                        dispatch(
                          updateRegistration({ firstName: e.target.value })
                        )
                      }
                      errorMessage={validations.firstNameError}
                    />
                  </div>

                  <div
                    className={
                      window.innerWidth > 720
                        ? style.compWidth
                        : style.compWidthMobile
                    }
                  >
                    <TextField
                      label={
                        <div style={{ fontWeight: "400" }}>
                          {" "}
                          Last Name<span className={style.starStyle}>
                            *
                          </span>{" "}
                        </div>
                      }
                      placeholder="Last Name"
                      type="text"
                      inputGroupTextEnd={<i className="ni ni-single-02" />}
                      value={registration.lastName}
                      onChange={(e) =>
                        dispatch(
                          updateRegistration({ lastName: e.target.value })
                        )
                      }
                      errorMessage={validations.lastNameError}
                    />
                  </div>
                </div>

                <div
                  className={
                    window.innerWidth > 720
                      ? style.rowStyle
                      : style.rowStyleMobile
                  }
                  
                >
                  <div
                    className={
                      window.innerWidth > 720
                        ? style.fullWidth
                        : style.fullWidthMobile
                    }
                   
                  >
                    <TextField
                      label={
                        <div style={{ fontWeight: "400" }}>
                          {" "}
                          {"Email"}
                          <span className={style.starStyle}>*</span>{" "}
                        </div>
                      }
                      placeholder="Your email here"
                      type="email"
                      inputGroupTextEnd={
                        <i className="ni ni-email-83 icon-xs " />
                      }
                      value={registration.email}
                      onChange={(e) =>
                        dispatch(updateRegistration({ email: e.target.value }))
                      }
                      errorMessage={validations.emailError}
                    />
                  </div>
                </div>

                {window.innerWidth > 720 ? (
                  <>
                    <div
                      className={
                        style.rowStyle
                      }
                     
                    >
                      <div
                        className={
                          style.compWidth
                        }
                      >
                        <TextField
                          label={
                            <div style={{ fontWeight: "400" }}>
                              {" "}
                              Password{" "}
                              <span className={style.starStyle}>*</span>{" "}
                            </div>
                          }
                          placeholder="**********"
                          type="password"
                          showPasswordEye
                          value={registration.password}
                          onChange={(e) =>
                            dispatch(
                              updateRegistration({ password: e.target.value })
                            )
                          }
                          errorMessage={validations.passwordError}
                        />
                      </div>

                      <div
                        className={
                          style.compWidth
                        }
                        style={{
                          marginTop:
                              passworderror == true  && "-23px"
                        }}
                      >
                        <TextField
                          label={
                            <div style={{ fontWeight: "400" }}>
                              {" "}
                              Confirm Password
                              <span className={style.starStyle}>*</span>{" "}
                            </div>
                          }
                          placeholder="**********"
                          type="password"
                          showPasswordEye
                          value={registration.confirmPassword}
                          onChange={(e) =>
                            dispatch(
                              updateRegistration({
                                confirmPassword: e.target.value,
                              })
                            )
                          }
                          errorMessage={validations.ConfirmPasswordError}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div  >
                      <div className={style.fullWidthMobile}   >
                        <TextField
                          label={
                            <div style={{ fontWeight: "400" }}>
                              {" "}
                              Password{" "}
                              <span className={style.starStyle}>*</span>{" "}
                            </div>
                          }
                          placeholder="**********"
                          type="password"
                          showPasswordEye
                          value={registration.password}
                          onChange={(e) =>
                            dispatch(
                              updateRegistration({ password: e.target.value })
                            )
                          }
                          errorMessage={validations.passwordError}
                        />
                      </div>

                      <div className={style.fullWidthMobile}>
                        <TextField
                          label={
                            <div style={{ fontWeight: "400" }}>
                              {" "}
                              Confirm Password
                              <span className={style.starStyle}>*</span>{" "}
                            </div>
                          }
                          placeholder="**********"
                          type="password"
                          showPasswordEye
                          value={registration.confirmPassword}
                          onChange={(e) =>
                            dispatch(
                              updateRegistration({
                                confirmPassword: e.target.value,
                              })
                            )
                          }
                          errorMessage={validations.ConfirmPasswordError}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div style={{width:"100%"}} >
                <Button
                  color="clark-red"
                  type="submit"
                  onClick={registerHandle}
                  className={style.btnStyle}
                  style={{ fontSize: "18px", backgroundColor: "#cf2e2e",  }}

                >
                  Sign Up
                </Button>
                </div>

                <div
                  className={style.flexNormal}
                  style={{
                    marginTop: "2%",
                  }}
                >
                  <div
                    className={style.fontW500}
                    style={{
                      marginBottom: "5vh",
                      fontSize: "18px",
                      color: "#172B4D",
                    }}
                  >
                    {" "}
                    Already a member?{" "}
                    <span
                      className={style.signupStyle}
                      // href="#/auth/login"
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/auth/login");
                      }}
                    >
                      {" "}
                      Sign In{" "}
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </>
  );
}
