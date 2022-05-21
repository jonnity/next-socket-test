import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const emitButtonHandler = () => {
    router.push({ pathname: `/room/${roomId}`, query: { username } });
  };

  return (
    <>
      <p>ユーザー名</p>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <p>ルーム名</p>
      <input
        type="text"
        onChange={(event) => {
          setRoomId(event.target.value);
        }}
      />
      <p>
        <button onClick={emitButtonHandler}>join</button>
      </p>
    </>
  );
};

export default Home;
