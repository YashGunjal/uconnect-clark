import socket from "./SocketBase";

var SocketService = {
  event: function (event, payload) {
    try {
      socket.emit(event, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        ...payload,
      });
    } catch (error) {
      console.error(error);
    }
  },
  
};
export default SocketService;

