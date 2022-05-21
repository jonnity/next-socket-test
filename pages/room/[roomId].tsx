import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";

interface Message {
  userName: string;
  content: string;
}
const Room: NextPage = () => {
  const [socket, _] = useState(() => io());
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  const roomId = router.query.roomId;
  const userName = router.query.username;

  useEffect(() => {
    console.log(userName);

    if (!userName) {
      router.push({ pathname: "/" });
      return;
    }
    socket.emit("join", roomId);
    socket.on("message", (data) => {
      setMessageList((prev) => [
        ...prev,
        { userName: data.userName, content: data.content },
      ]);
    });
  }, [roomId]);

  const submitHandler = () => {
    socket.emit("message", {
      roomId: roomId,
      userName: userName,
      content: content,
    });
  };

  return (
    <>
      <h1>messages</h1>
      {messageList.map((message, index) => {
        return <p key={index}>{`${message.content} by ${message.userName}`}</p>;
      })}
      <span>
        <input
          type="text"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button onClick={submitHandler}>送信</button>
      </span>
    </>
  );
};

export default Room;
