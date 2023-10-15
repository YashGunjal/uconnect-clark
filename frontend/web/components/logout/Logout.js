import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../AppLoaderSlice";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Button
      color="clark-red"
      onClick={(e) => {
        e.preventDefault();
        localStorage.clear();
        dispatch(logoutUser());
        history.push("/");
      }}
    >
      Logout
    </Button>
  );
}
