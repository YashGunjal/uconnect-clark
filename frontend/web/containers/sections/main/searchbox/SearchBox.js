import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateSearchText, subjectskey } from "../SubjectsSlice";
import TextField from "../../../../components/textField/TextField";

export default function SearchBox() {
  const dispatch = useDispatch();

  const { searchText } = useSelector((state) => {
    return state[subjectskey];
  });

  const resetTextStyle = { 
      height: "0px",
      transform: "translate(-9px, -14px)",
      marginLeft: "auto"
    }

  return (
    <div className="d-flex flex-column">
      <TextField
        // label={""}
        placeholder="Search Posts"
        type="text"
        inputGroupTextEnd={<i className="fas fa-search" />}
        value={searchText}
        onChange={(e) => dispatch(updateSearchText(e.target.value))}
        // errorMessage={validations.emailError}
      />
      {searchText.length  > 2 && <p className="h4 pointer" style={resetTextStyle} onClick={(e) => dispatch(updateSearchText("")) }>Reset Search</p>}
    </div>
  );
}
