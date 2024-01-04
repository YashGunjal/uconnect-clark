import React, { useEffect, useState } from "react";
import style from "../login/LoginStyle.css";
import Banner from "../login/Banner.jsx";
import MobileBanner from "../login/MobileBanner";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  ResetPasswordKey,
  updateFormData,
  updateValidations,
} from "./ResetPasswordSlice";
import ConfirmationDialog from "../../../../components/confirmationDialog/ConfirmationDialog";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import AuthService from "../../../../../services/AuthService";

import TextField from "../../../../components/textField/TextField";
import { SuccessMessage } from "../../../../components/notification/NotificationHelper";
import { validateEmailAddress } from "../../../../utilities/ValidateEmail.js";

export default function ResetPasswordEmailSubmit() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [isRequestSent, setIsRequestSent] = React.useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (isValidating) {
      checkvalidation();
    }
  }, [email]);

  const checkvalidation = () => {
    let allGood = true;

    if (validateEmailAddress(email)) {
      allGood = false;
      setEmailError(validateEmailAddress(email));
    } else {
      setEmailError("");
    }
    return allGood;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log(" in register handle");
    // SuccessMessage(" Successfully!!", "Email Submit")

    setIsValidating(true);
    if (checkvalidation()) {
      let response = await AuthService.resetPasswordSubmitEmail({
        email: email,
      });
      if (response.status == 200) {
        // SuccessMessage(" Successfully!!", "Email Submit")
        setConfirmationModal(true);
        setIsRequestSent(true)
        // history.push('/auth/login')
      } else {
        ErrorMessage("Couldn't submit!", "Something went wrong!!");
      }
    }
  };

  return (
    <>
      {window.innerWidth < 720 ? <MobileBanner /> : null}

      <div className={style.flexNormal}>
        {window.innerWidth > 720 && <Banner />}

        <div
          className={
            window.innerWidth < 720
              ? style.backgroundStyle + " " + style.flexDcol
              : style.signinSectionStyle + " " + style.flexDcol
          }
        >
          <div
            className={
              window.innerWidth < 720
                ? style.backgroundStyle + " " + style.flexDcol
                : style.signinSectionStyle + " " + style.flexDcol
            }
          >
            <div
              className={
                window.innerWidth > 720
                  ? style.forgotPasswordText
                  : style.forgotPasswordTextMobile
              }
            >
              Trouble Logging In?
            </div>

            <div
              style={{
                width: window.innerWidth > 720 ? "35vw" : "70vw",
                marginTop: "1%",
              }}
            >
               <Form role="form">
                { isRequestSent ?  
                <Label className="font-weight-400 text-md mb-5">  {`We sent an email to ${email} with a link to get back into your account.`} </Label>:
               <>
                <TextField
                  label={
                   "Enter your email Id and we'll send you a link to get back into your account."
                  }
                  placeholder="Your email here"
                  type="email"
                  inputGroupTextEnd={<i className="ni ni-email-83" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={emailError}
                />

                <div>
                  <Button
                    color="clark-red"
                    type="submit"
                    onClick={submitHandle}
                    className={style.btnStyle + " text-white bg-clark-red"}
                    style={{ fontSize: "18px" }}
                    disabled={isRequestSent}
                  >
                    Request password reset
                  </Button>
                </div>
                </>}
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
              </Form>
            </div>
          </div>
        </div>

        <Modal isOpen={confirmationModal}>
          <ModalHeader>Email Submitted</ModalHeader>
          <ModalBody>
            {" "}
            {
              "We have sent reset password link to the given email. The link will expire in 30 minutes.Please check Junk/ as well."
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setConfirmationModal(!confirmationModal)}>
              ok
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
