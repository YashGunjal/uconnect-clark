import React, { useEffect, useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../../services/SocketService";
import socket from "../../../../services/SocketBase";

import {
  Alert,
  List,
  Collapse,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import ChatTile from "./chattile/ChatTile";
import { subjectskey } from "../main/SubjectsSlice";
import PostServices from "../../../../services/PostServices";
import { postskey } from "./PostSlice";
import ChatTile2 from "./chattile/ChatTile2";
import { updatePostAndReplies } from "./PostSlice";
import Loading from "../../../components/loading/Loading";

export default function ChatWindow() {
  const dispatch =useDispatch();
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setLoading] = useState(false)

  const { selectedSubject } = useSelector((state) => {
    return state[subjectskey];
  });

  const { postsBySubjects } = useSelector((state) => {
    return state[postskey];
  });

  // updating post, fetching post

  useEffect(async () => {
    setLoading(true)
    let response = await PostServices.getPostbySubject(selectedSubject);
    dispatch(
      updatePostAndReplies({
        post: { [selectedSubject]: response.post },
        reply: response.replies,
      })
    );
    setLoading(false)
  }, [selectedSubject]);

  useEffect(()=>{ },[postsBySubjects])

  // socket related
  useEffect(() => {
    SocketService.sendMessage({ message: "messagr from client" });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", {
      message: "messagr frpm function" + Math.random() * 5,
    });
  };

  const getMessages = () => messages;
  useEffect(async () => {
    console.log("pag refresh");
  }, [count]);

  useEffect(async () => {
    console.log("execution start");
    SocketService.receiveMessage(setMessages, messages, setCount);
    console.log("allmsg", messages);
  }, [socket]);

  return (
    <div style={{ overflowY: "scroll", overflowX: "clip", height: "73vh" }}>
      {isLoading ? <Loading />: 
      <>
      {postsBySubjects?.[selectedSubject]?.map((post) => (
        <ChatTile post={post} />
        ))}
      <ChatTile2 />
      <ChatTile2 />
        </>
      }

      {/* <h3> display message</h3>
      {messages.map((value, index) => {
        return <p id={index}> {value}</p>;
      })}

      <Button
        color="clark-red"
        id="toggler"
        style={{
          marginBottom: "1rem",
        }}
        // onClick={sendMessage}
        onClick={() =>
          SocketService.sendMessage({
            message: "messagr from client" + Math.random() * 5,
          })
        }
      >
        send message
      </Button> */}
    </div>
  );
}
