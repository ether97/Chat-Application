import Box from "@mui/material/Box";
import { useSockets } from "../../../context/socket.context";
import { AvatarCheck } from "../AvatarDesign/AvatarCheck";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { RoomUsers } from "./RoomUsers";

export function RoomsInfo() {
  const { currentRoom, rooms, usernames, currentUser } = useSockets();

  const filtered = rooms.filter((room) => room.title === currentRoom);
  return (
    <Box
      sx={{
        position: "absolute",
        left: "20px",
        top: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>{currentRoom}</h1>
      {usernames?.map((user, index) => {
        if (user.username === currentUser) {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <AvatarCheck color={user.avatar.color} icon={user.avatar.icon} />
              <p>{user.username}</p>
            </div>
          );
        }
      })}
      <Divider />
      <div
        style={{
          display: "flex",
          gap: "20px",
          background: "transparent",
          flexDirection: "column",
        }}
      >
        {filtered.map((room) =>
          room.users.map((user) => {
            return <RoomUsers user={user} />;
          })
        )}
      </div>
    </Box>
  );
}
