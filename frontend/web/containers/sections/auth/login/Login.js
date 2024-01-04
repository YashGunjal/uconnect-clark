import React, { useEffect, useState } from "react";
import Banner from "./Banner.jsx";
import style from "./LoginStyle.css";
import MobileBanner from "../login/MobileBanner";

import {
  Button,
  Form,
} from "reactstrap";
import {
  LoginKey,
  updateLogin,
  updateValidations,
} from "./LoginSlice";
import TextField from "../../../../components/textField/TextField";
import { useSelector, useDispatch } from "react-redux";
import { appLoaderKey } from "../../../../AppLoaderSlice";
import { useHistory } from "react-router-dom";
import AuthService from "../../../../../services/AuthService";
import { updateUser } from "../../../../AppLoaderSlice";
import { Redirect, useLocation } from "react-router-dom";
import { validateEmailAddress } from "../../../../utilities/ValidateEmail.js";

export default function Login() {
  let history = useHistory();
  const { login, validations, confirmationModal, } = useSelector(
    (state) => {
      return state[LoginKey];
    }
  );
  const { screenDimension, user } = useSelector((state) => {
    return state[appLoaderKey];
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (validations.isValidating) {
      checkvalidation();
    }
  }, [login.email, login.password]);

  const checkvalidation = () => {
    let allGood = true;

    if (validateEmailAddress(login.email)) {
      allGood = false;
      dispatch(
        updateValidations({
          emailError: validateEmailAddress(login.email),
        })
      );
    } else {
      dispatch(updateValidations({ emailError: "" }));
    }
    if (login.password.length === 0) {
      allGood = false;
      dispatch(
        updateValidations({
          passwordError: "Please enter password",
        })
      );
    } else {
      dispatch(updateValidations({ passwordError: "" }));
    }
    return allGood;
  };

  if (user.isLoggedIn == true) {
    return <Redirect to="/home" />;
  }

  const loginHandle = async (e) => {
    e.preventDefault();
    dispatch(updateValidations({ isValidating: true }));
    if (checkvalidation()) {
      let response = await AuthService.login(login);
      if (response.status === 204) {
        dispatch(
          updateValidations({
            passwordError: (
              <div className="text-center pt-2"> Email/Password Incorrect</div>
            ),
          })
        );
      } else if (response.status === 200) {
        let userDetail = response.data.data;
        dispatch(
          updateUser({ ...userDetail, isLoggedIn: true, isUserFetched: true })
        );
        if (userDetail) {
          history.push("/home");
        }
      } else {
        dispatch(updateValidations({ passwordError: "Something went wrong" }));
      }
    }
  };

  return (
    <>
      <div className={style.flexNormal}>
        {window.innerWidth > 720 && <Banner />}

        <>
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
                  Sign In
                </div>
                <Form
                  role="form"
                  className={
                    window.innerWidth < 720
                      ? style.mobileForm + " " + style.maxwidthMobile
                      : style.formDemensions + " " + style.maxwidth
                  }
                  style={{ marginTop: "3%" }}
                >

                  <TextField
                    label={"Email"}
                    placeholder="Your email here"
                    type="email"
                    inputGroupTextEnd={<i className="ni ni-email-83" />}
                    value={login.email}
                    onChange={(e) =>
                      dispatch(updateLogin({ email: e.target.value }))
                    }
                    errorMessage={validations.emailError}
                  />

                  <TextField
                    label={"Password"}
                    placeholder="Password"
                    type="password"
                    value={login.password}
                    showPasswordEye
                    onChange={(e) =>
                      dispatch(updateLogin({ password: e.target.value }))
                    }
                    errorMessage={validations.passwordError}
                  />

                  <div
                    className={
                      style.flexEndNormal + " " + style.forgotPasswordstyle
                    }
                  >
                    <div
                      style={{ fontSize: "18px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        history.push("/auth/reset-password");
                      }}
                    >
                      Forgot Password?
                    </div>
                  </div>

                  <div className={style.flexNormal}>
                    <Button
                      color="clark-red"
                      type="submit"
                      onClick={loginHandle}
                      className={style.btnStyle + " bg-clark-red"}
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      Sign In
                    </Button>
                  </div>

                  <div
                    className={style.flexNormal}
                    style={{
                      marginTop: "1.5%",
                    }}
                  >
                    <small className={style.smallText}>
                      {" "}
                      Don't have an account?{" "}
                      <span
                        className={style.signupStyle}
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/auth/register");
                        }}
                      >
                        {" "}
                        Sign Up{" "}
                      </span>{" "}
                    </small>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
