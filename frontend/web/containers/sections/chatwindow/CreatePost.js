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

  // socket related
//   useEffect(() => {
//     SocketService.sendMessage({ message: "messagr from client" });
//   }, [socket]);

//   const sendMessage = () => {
//     socket.emit("send_message", {
//       message: "messagr frpm function" + Math.random() * 5,
//     });
//   };


//   useEffect(async () => {
//     console.log("execution start");
//     SocketService.receiveMessage(setMessages, messages, setCount);
//     console.log("allmsg", messages);
//   }, [socket]);

  const makePost = async () => {
    let reponse = await PostServices.addPost({
      subjectId: selectedSubject,
      postContent: postText,
    });
    console.log(" new Post", reponse.data, reponse);

    dispatch(
      addNewPostforSubject({ subjectId: selectedSubject, post: reponse.data })
    );
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
                placeholder="Create Post"
                rows="1"
                formstyle={{ width: "100%" }}
                type="textarea"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
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
