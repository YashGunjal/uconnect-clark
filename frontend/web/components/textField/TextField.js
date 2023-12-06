import React, { useState } from "react";
import { AiOutlineEye, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  FormFeedback,
  FormGroup,
  Label,
  FormText,
  Input,
  InputGroupText,
  InputGroup,
} from "reactstrap";

export default function TextField({
  label,
  placeholder,
  errorMessage,
  onChange,
  value,
  note,
  inputGroupText,
  inputGroupTextEnd,
  onkeydown,
  type,
  size,
  disabled = false,
  required,
  labelWeight = "400",
  formstyle

}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focus, setfocuse] = useState(false);

  const toggle = () => {
    setShowPassword(!showPassword);
  };

  const change = () => {
    setfocuse(!focus);
  };

  return (
    <FormGroup style={{ marginBottom: "0px", ...formstyle }}>
      {label && (
        <Label style={{ color: "#172B4D", fontWeight:`${labelWeight}` }}>
          {label} {required && <span style={{ color: "#FF3333" }}>*</span>}
        </Label>
      )}

      <InputGroup
        className={inputGroupText || (inputGroupTextEnd && "input-group-merge")}
      >
        {inputGroupText && (
          <InputGroupText
            style={{
                borderRight: "0px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                borderColor: errorMessage
                  ? "#FF3333"
                  : focus == true
                  ? "#4682B4"
                  : "",
              }
            }
          >
            {inputGroupText}
          </InputGroupText>
        )}
        <Input
          value={value}
          type={showPassword ? "text" : type}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onkeydown}
          invalid={errorMessage}
          disabled={disabled}
          onFocus={change}
          onBlur={change}
          bsSize={size}
          style={{ color: "#172B4D", fontSize:"1rem", 
          // border: "1px solid  #172B4D80"
         }}
        />

        {inputGroupTextEnd && (
          <InputGroupText
            style={{
              borderLeft: "0px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderColor: errorMessage
                ? "#FF3333"
                : focus == true
                ? "#4682B4"
                : "",
              color: focus == true ? "#172B4D" : "rgba(23, 43, 77, 0.5)",
            }}
            onFocus={() => setfocuse(true)}
            onBlur={() => setfocuse(false)}
          >
            {inputGroupTextEnd}
          </InputGroupText>
        )}

        {type === "password" && (
          <InputGroupText
            style={{
              borderLeft: "0px",
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderColor: errorMessage
                ? "#FF3333"
                : focus == true
                ? "#4682B4"
                : "",
            }}
          >
            {showPassword ? (
              <AiFillEye  color="#172B4D" size={18} onClick={toggle} />
            ) : (
              <AiFillEyeInvisible color="grey" size={18} onClick={toggle} />
            )}
          </InputGroupText>
        )}

        {errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
        {note && <FormText>{note}</FormText>}
      </InputGroup>
    </FormGroup>
  );
}
