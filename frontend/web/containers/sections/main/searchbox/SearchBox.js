import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateSearchText,subjectskey } from "../SubjectsSlice";
import TextField from "../../../../components/textField/TextField";


export default function SearchBox() {
    const dispatch = useDispatch();

    const { searchText } = useSelector((state) => {
        return state[subjectskey];
      });

    return(
        <TextField
        // label={""}
        placeholder="Search Posts"
        type="text"
        inputGroupTextEnd={<i className="fas fa-search" />}
        value={searchText}
        onChange={(e) =>
            dispatch(updateSearchText(e.target.value ))
        }
        // errorMessage={validations.emailError}
    />


    )


}