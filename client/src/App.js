import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import { NowMembr } from "./NowMember";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showhat, setShowChat] = useState(false);

  // 入室ボタンクリック
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      const data = { username: username, room: room };
      socket.emit("join_room", data);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {/* 入室したらチャット画面表示 */}
      {!showhat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        <div>
          <Chat socket={socket} username={username} room={room} />
          <NowMembr socket={socket} />
        </div>
      )}
    </div>
  );
}

export default App;
