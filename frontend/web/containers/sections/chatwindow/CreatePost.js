import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../../../components/textField/TextField";

import {
  Button,
  Card,
  Media,
  Form,
} from "reactstrap";
import ChatTile from "./chattile/ChatTile";
import { subjectskey } from "../main/subjects/SubjectsSlice";
import PostServices from "../../../../services/PostServices";
import { AiFillPlusCircle } from "react-icons/ai";
import ToolTip from "../../../components/toolTip/ToolTip";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const { selectedSubject } = useSelector((state) => {
    return state[subjectskey];
  });

  const makePost = async (event) => {
    event.preventDefault();
    let payload = {
      subjectId: selectedSubject,
      postContent: postText,
    };
    let reponse = await PostServices.addPost(payload);
    setPostText("");
  };

  return (
    <>
      <div
        className="bg-white"
        style={{
          position: "-webkit-sticky",
          position: "sticky",
          bottom: 0,
        }}
      >
        <hr className=" hr-less" style={{ marginTop: "0px" }} />

        <Media className="align-items-center">
          <Media body>
            <Form className="d-flex  ml-2">
              <AiFillPlusCircle
                className="mr-2 clark-color"
                color="clark-red"
                style={{ fontSize: "57px", }}
              />
              <TextField
                placeholder="Ask a question"
                rows="1"
                formstyle={{ width: "100%" }}
                type="textarea"
                onkeydown={(e) => {
                  if (e.key == "Enter" && postText != "") {
                    makePost(e);
                  }
                }}
                value={postText}
                onChange={(e) => {
                  setPostText(e.target.value);
                }}
              />
              <ToolTip
                id={"newpostbutton"}
                infoText={postText == "" ? "Ask a question" : "Click to Post"}
              />
              <Button
                color="clark-red"
                className="btn-icon avatar-lg rounded-circle "
                id={"newpostbutton"}
                style={{
                  marginLeft: "0.8rem",
                }}
                onClick={postText != "" && makePost}
              >
                <span className="btn-inner--icon">
                  <i
                    class="fas fa-chevron-right"
                    style={{
                      fontSize: "30px",
                    }}
                  ></i>
                </span>
              </Button>
            </Form>
          </Media>
        </Media>
      </div>
    </>
  );
}
