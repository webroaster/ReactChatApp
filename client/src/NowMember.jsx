import React, { useState } from "react";

export const NowMembr = ({ socket, username, room }) => {
  const [memberList, setMemberList] = useState([]);

  socket.on("join_result", (data) => {
    console.log(data[0]);
    for (let i = 0; i < data.length; i++) {
      const cur = data[i].name;
      setMemberList((list) => [...list, cur]);
      console.log(memberList);
    }
  });

  return (
    <>
      <p>現在のメンバー一覧</p>
      <div>
        <ul>
          {memberList.map((member) => {
            return <li>{member}</li>;
          })}
        </ul>
      </div>
    </>
  );
};
