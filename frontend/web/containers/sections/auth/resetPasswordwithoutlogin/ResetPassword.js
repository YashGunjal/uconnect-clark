import React, { useEffect, useState } from "react";
import style from "../register/Register.style.css";
import { Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  //   InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col, } from "reactstrap";
import {
  ResetPasswordKey,
  updateFormData,
  updateValidations,
} from "./ResetPasswordSlice";
import Banner from "../login/Banner.jsx";
import MobileBanner from "../login/MobileBanner.js";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import AuthService from "../../../../../services/AuthService";

import { SuccessMessage , ErrorMessage} from "../../../../components/notification/NotificationHelper"
import { useParams } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import { logoutUser } from "../../../../AppLoaderSlice"
import TextField from "../../../../components/textField/TextField";


export default function ResetPassword() {
  const { token } = useParams();
  let history = useHistory();
  const { formData, validations } = useSelector((state) => {
    return state[ResetPasswordKey];
  });
  const  [loading, setLoading] = useState(true);
  const  [tokenError, setTokenError] = useState(null);

  const dispatch = useDispatch();
  console.log("stoer," ,formData, validations)
  const validateEmailAddress = (email) => {
    var re = /\S+@\S+\.\S+/;
    if (email === "") {
      return "Email is required";
    }
    if (!re.test(email)) {
      return "Email format is invalid.";
    }
  };

  useEffect(async () => {
    if (token){
      console.log("made validation call")
     let response = await AuthService.getresetTokencontent({token:token})
     console.log(response," call return resp")
     if(response?.status == 200){
      dispatch(updateFormData({ email: response.data.email }))
      setLoading(false)
     }
     else{
      console.log(" set 1")
      setTokenError("Invalid or Expired Link")
     }
    }
    else {
      setTokenError("Invalid Reset Password link")
    }
  },[])


  useEffect(() => {
    if (validations.isValidating) {
      checkvalidation();
    }
  }, [
    formData.email,
    formData.password,
  ]);

  const checkvalidation = () => {
    let allGood = true;

    if (validateEmailAddress(formData.email)) {
      allGood = false;
      dispatch(
        updateValidations({
          emailError: validateEmailAddress(formData.email),
        })
      );
    } else {
      dispatch(updateValidations({ emailError: "" }));
    }
    if (formData.password.length < 8) {
      allGood = false;
      dispatch(
        updateValidations({
          passwordError: "Password should be altleast 8 character long",
        })
      );
    } else {
      dispatch(updateValidations({ passwordError: "" }));
    }

    if (formData.password  !==  formData.confirmPassword) {
      allGood = false;
      dispatch(
        updateValidations({
          confirmPasswordError: "Password Doen't Match",
        })
      );
    } else {
      dispatch(updateValidations({ confirmPasswordError: "" }));
    }
    return allGood;
  };


  const registerHandle = async (e) => {
    e.preventDefault();
    console.log(" in register handle")
    dispatch(updateValidations({ isValidating: true }));
    if (checkvalidation()) {
      console.log("ok to register");
      let response = await AuthService.resetPasswordWithEmail({email:formData.email, newPassword:formData.password});
      if (response.status == 200) {
        localStorage.clear()
        dispatch(logoutUser())
        SuccessMessage(" Successfully!!", "Password Changed")
        history.push('/auth/login')
        dispatch(updateFormData({
          email:"",
          password:"",
          confirmPassword:""
      }))
      }
      else {
        ErrorMessage("Couldn't Change!","Something went wrong!!")
      }
    }
  };

  return (
    <>
    {
      tokenError && ErrorMessage(tokenError)
    }
    <div className={style.flexNormal}>
        {window.innerWidth > 720 && <Banner />}
    <div
              className={
                window.innerWidth < 720
                  ? style.backgroundStyle + " " + style.flexDcol
                  : ""
              }
            >
              {window.innerWidth < 720 ? <MobileBanner /> : null}

              <div
                className={
                  window.innerWidth < 720
                    ? style.mobileViewHeight + " " + style.flexDcol
                    : style.signinSectionStyle + " " + style.flexDcol
                }
                
              >
                <div
                  className={
                    window.innerWidth > 720
                      ? style.flexDcol + " " + style.maxwidth
                      : style.flexDcol + " " + style.maxwidthMobile
                  }
                 
                >
                  <div
                    className={
                      window.innerWidth > 720
                        ? style.signinTextFont
                        : style.signinMobileText
                    }
                  >
                    Reset password
                  </div>
              <Form role="form"
               className={
                window.innerWidth < 720
                  ? style.mobileForm + " " + style.maxwidthMobile
                  : style.formDemensions + " " + style.maxwidth
              }
              style={{marginTop:"3%"}}>
                <TextField
                label={"Email"}
                  placeholder="Email"
                  type="email"
                  inputGroupTextEnd={<i className="ni ni-email-83" />}
                  value={formData.email}
                  disabled
                  onChange={(e) =>
                    dispatch(updateFormData({ email: formData.email }))
                  }
                  errorMessage={validations.emailError}
                />
                <TextField
                label={"New Password"}
                  placeholder="Enter a new password"
                  type="password"
                  value={formData.password}
                 
                  onChange={(e) =>
                    dispatch(updateFormData({ password: e.target.value }))
                  }
                  errorMessage={validations.passwordError}
                />
                <TextField
                label={"Confirm Password"}
                  placeholder="Re-enter password"
                  type="password"
                  value={formData.confirmPassword}
                 
                  onChange={(e) =>
                    dispatch(updateFormData({ confirmPassword: e.target.value }))
                  }
                  errorMessage={validations.confirmPasswordError}
                />
                <div className="text-center">
                  <Button className={style.btnStyle + " text-white bg-clark-red"} color="info" type="submit" onClick={registerHandle} >
                    Submit
                  </Button>
                </div>
              </Form>
              </div>
           
              <div
                      className={style.flexNormal}
                      style={{
                        marginTop: "1.5%",
                      }}
                    >
                      <small className={style.smallText}>
                        {" "}
                        Already a member?{" "}
                        <span
                          className={style.signupStyle}
                          onClick={(e) => {
                            e.preventDefault();
                            history.push("/auth/login");
                          }}
                        >
                          {" "}
                          Sign In{" "}
                        </span>{" "}
                      </small>
                    </div>
          </div>
          </div>
       
    </div>
  </>
  );
}
