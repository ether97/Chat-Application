import Box from "@mui/material/Box";
import { useSockets } from "../../../context/socket.context";
import { AvatarCheck } from "../AvatarDesign/AvatarCheck";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { RoomUsers } from "./RoomUsers";

export function RoomsInfo() {
  const {
    currentRoom,
    rooms,
    usernames,
    currentUser,
    currentColor,
    currentFont,
    socket,
  } = useSockets();

  let roomUsers: { username: string; icon: string; color: string }[] = [];

  let filtered: {
    roomID: string;
    color: string;
    font: string;
    title: string;
    users: { userID: string; username: string }[];
  }[] = [];

  filtered = rooms.filter((room) => room.title === currentRoom);
  // filtered.map((room) =>
  //   room.users.map((user) => {
  //     usernames?.map((_user) => {
  //       if (user.username === _user.username) {
  //         roomUsers.push({
  //           username: user.username,
  //           icon: _user.avatar.icon,
  //           color: _user.avatar.color,
  //         });
  //       }
  //     });
  //   })
  // );
  return (
    <Box
      sx={{
        position: "absolute",
        left: "20px",
        top: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        fontFamily: currentFont,
        width: "300px",
        color: "white",
      }}
    >
      <Card
        sx={{ backgroundColor: currentColor, width: "100%", padding: "10px" }}
      >
        <h1
          style={{
            fontFamily: currentFont,
            color: "white",
            textAlign: "center",
          }}
        >
          {currentRoom}
        </h1>
      </Card>
      {usernames?.map((user, index) => {
        if (user.userID === socket.id) {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontFamily: currentFont,
              }}
            >
              <AvatarCheck
                color={user.avatar.color}
                icon={user.avatar.icon}
                status={user.status}
              />
              <p style={{ fontFamily: currentFont }}>
                {user.username}&nbsp;(you)
              </p>
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
          color: "white",
        }}
      >
        {rooms.map((room) =>
          room.users.map((_user) => {
            if (room.title === currentRoom) {
              return <RoomUsers user={_user} />;
            }
          })
        )}
      </div>
    </Box>
  );
}
