import type { NextPage } from "next";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Home: NextPage = () => {
  const [socket, _] = useState(() => io());
  const [text, setText] = useState<string>("");
  // const socket = io();
  useEffect(() => {
    socket.on("hello", (data) => {
      console.log(data);
    });
  });
  const emitButtonHandler = () => {
    socket.emit("emit", text);
  };

  return (
    <>
      <input
        type="text"
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button onClick={emitButtonHandler}>Emit!!</button>
    </>
  );
};

export default Home;
