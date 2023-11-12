import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../AppLoaderSlice";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

export default function Login() {
  const history = useHistory();

  return (
    <Button
      color="clark-red"
      onClick={(e) => {
        history.push("/auth/login");
      }}
    >
      Login
    </Button>
  );
}
