import Card from "@mui/material/Card";
import { useRef, useEffect } from "react";
import { useSockets } from "../../../context/socket.context";
import { AvatarCheck } from "../AvatarDesign/AvatarCheck";
import { Typography } from "@mui/material";

type MessageProps = {
  username: string;
  message: string;
  time: string;
};

export default function Message({ username, message, time }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const {
    socket,
    usernames,
    messages,
    rooms,
    currentRoom,
    currentFont,
    currentColor,
  } = useSockets();

  let newUsername;
  let icon = "";
  let color = "";
  let status = "";

  usernames?.map((_username) => {
    if (_username.username === username) {
      newUsername = _username.username;
      icon = _username.avatar.icon;
      color = _username.avatar.color;
      status = _username.status;
    }
  });

  useEffect(() => {
    messageRef.current?.scrollIntoView();
    console.log(socket.id);
  }, []);

  return (
    <Card
      ref={messageRef}
      sx={{
        width: "100%",
        minHeight: "70px",
        display: "flex",
        alignItems: "center",
        paddingRight: "20px",
        backgroundColor: "rgba(255,255,255,1)",
        overflow: "auto",
      }}
    >
      {message.includes("_1_") ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            fontFamily: currentFont,
            color: currentColor,
          }}
        >
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            {username} HAS CONNECTED
          </span>
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            &nbsp; : &nbsp;
          </span>
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            {time}
          </span>
        </div>
      ) : message.includes("_2_") ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            {username} HAS DISCONNECTED
          </span>
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            &nbsp; : &nbsp;
          </span>
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            {time}
          </span>
        </div>
      ) : message.includes("_3_") ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            {username} HAS LEFT THE CHAT
          </span>
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            &nbsp; : &nbsp;
          </span>
          <span style={{ fontFamily: currentFont, color: currentColor }}>
            {time}
          </span>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",

              paddingLeft: "20px",
            }}
          >
            <AvatarCheck icon={icon} color={color} status={status} />
            <div
              style={{
                color: currentColor || "#1976d2",
                fontFamily: currentFont,
              }}
            >
              {newUsername}&nbsp; : &nbsp;
            </div>
            <div
              style={{
                color: currentColor || "#1976d2",
                fontFamily: currentFont,
                maxWidth: "850px",
                overflowWrap: "break-word",
              }}
            >
              <Typography sx={{ fontFamily: currentFont }}>
                {message}
              </Typography>
            </div>
          </div>
          <div
            style={{
              color: currentColor || "#1976d2",
              fontFamily: currentFont,
            }}
          >
            {time}
          </div>
        </div>
      )}
    </Card>
  );
}
