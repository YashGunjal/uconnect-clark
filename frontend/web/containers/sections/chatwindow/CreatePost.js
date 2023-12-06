import React, { useEffect, useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../../services/SocketService";
import socket from "../../../../services/SocketBase";
import TextField from "../../../components/textField/TextField";

import {
  Alert,
  List,
  Collapse,
  Button,
  Card,
  Media,
  Form,
  Input,
  CardBody,
  CardHeader,
} from "reactstrap";
import ChatTile from "./chattile/ChatTile";
import { subjectskey } from "../main/SubjectsSlice";
import PostServices from "../../../../services/PostServices";
import { postskey, addNewPostforSubject } from "./PostSlice";
import ChatTile2 from "./chattile/ChatTile2";
import { updatePostAndReplies } from "./PostSlice";
import Loading from "../../../components/loading/Loading";
import { AiFillPlusCircle } from "react-icons/ai";
import ToolTip from "../../../components/toolTip/ToolTip";

export default function CreatePost() {
  const dispatch = useDispatch();

  const [postText, setPostText] = useState("");

  const { selectedSubject } = useSelector((state) => {
    return state[subjectskey];
  });

  //socket related
  // this call goes to post handler under socket
  // useEffect(() => {
  //   SocketService.event("post:create" ,{message: "messagr from client" });
  // }, [socket]);

  const makePost = async () => {
    let payload = {
      subjectId: selectedSubject,
      postContent: postText,
    };
    let reponse = await PostServices.addPost(payload);

    //socket related
    // SocketService.event("post:create" , payload);

    // dispatch(
    //   addNewPostforSubject({ subjectId: selectedSubject, post: reponse.data })
    // );
    setPostText("");
  };

  return (
    <>
      <div>
        <hr className=" hr-less" style={{ marginTop: "0px" }} />

        <Media className="align-items-center">
          <Media body>
            <Form className="d-flex  ml-2">
              <AiFillPlusCircle
                className="mr-2 "
                color="clark-red"
                style={{ fontSize: "57px", color: "#cf2e2e" }}
              />
              <TextField
                // label={"Email"}
                placeholder="Ask a question"
                rows="1"
                formstyle={{ width: "100%" }}
                type="textarea"
                onkeydown={(e) => {
                  console.log(e)
                  if (e.key == "Enter" && postText != "") {
                    makePost();
                  }
                  // else{
                  //   setPostText((previous) => previous + e.key)
                  // }
                }}
                value={postText}
                onChange={(e) => {console.log(e);setPostText(e.target.value)}}
                // errorMessage={validations.emailError}
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
