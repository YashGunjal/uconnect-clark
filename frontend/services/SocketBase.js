import io from "socket.io-client";
import getConfig from './../constants/Config';

console.log(getConfig().REACT_BASE_URL, "  base url");

const socket = io.connect(getConfig().REACT_BASE_URL);

export default socket;