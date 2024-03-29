import io from "socket.io-client";

const socket = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transport: ["websocket"],
    rejectUnauthorized: false,
  };
  return io.connect(
    false
      ? "http://localhost:3004"
      : "https://solarity-backend.herokuapp.com",
    options
  );
};
export default socket;
