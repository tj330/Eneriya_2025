const { io } = require("socket.io-client");
const socket = io("https://mesh-api-vdr4.onrender.com");
export default socket 