import React, { useEffect, useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { useSelector } from "react-redux";
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





export default  function ChatWindow() {
  const [messages, setMessages]  = useState([])
  const [count, setCount] = useState(1);

    const { user } = useSelector((state) => {
        return state[appLoaderKey];
      });

      useEffect(() => {
        SocketService.sendMessage({message:"messagr from client"})
      }, [socket]);

      const sendMessage = () => {
        socket.emit("send_message", { message: "messagr frpm function"+ Math.random() *5 });
      };

      const getMessages = () => messages
      useEffect(async ()=> {
        console.log("pag refresh")
      },[ count])

      

      useEffect(async ()=> {
        console.log("execution start")
        SocketService.receiveMessage(setMessages, messages, setCount)
        console.log('allmsg',messages);
      },[ socket])

      return (
<div>
  <h3> display message</h3>
  {messages.map((value, index)=>{
    return <p  id={index}> {value}</p>
})}

<Button
          color="clark-red"
          id="toggler"
          style={{
            marginBottom: "1rem",
          }}
          // onClick={sendMessage}
          onClick={() => SocketService.sendMessage({message:"messagr from client" + Math.random() *5})}
        >
          send message
        </Button>
</div>
      )


}