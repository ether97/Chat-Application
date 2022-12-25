import Card from "@mui/material/Card";
import { useRef, useEffect } from "react";
import { useSockets } from "../../../context/socket.context";

import MoodBadIcon from "@mui/icons-material/MoodBad";
import SickIcon from "@mui/icons-material/Sick";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Face5Icon from "@mui/icons-material/Face5";
import Avatar from "@mui/material/Avatar";

import {
  pink,
  blue,
  yellow,
  green,
  red,
  purple,
  amber,
  lightGreen,
  cyan,
} from "@mui/material/colors";
import { AvatarCheck } from "../AvatarDesign/AvatarCheck";

type MessageProps = {
  username: string;
  message: string;
  time: string;
};

export default function Message({ username, message, time }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const { socket, usernames, messages } = useSockets();

  let newUsername;
  let icon = "";
  let color = "";
  let disconnect = "";

  usernames?.map((_username) => {
    if (_username.username === username) {
      newUsername = _username.username;
      icon = _username.avatar.icon;
      color = _username.avatar.color;
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
        height: "70px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      {message === "USER DISCONNECTED" ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#1976d2" }}>{newUsername} DISCONNECTED</span>
          <span style={{ color: "#1976d2" }}>&nbsp; : &nbsp;</span>
          <span style={{ color: "#1976d2" }}>{time}</span>
        </div>
      ) : message === "USER CONNECTED" ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#1976d2" }}>{newUsername} CONNECTED</span>
          <span style={{ color: "#1976d2" }}>&nbsp; : &nbsp;</span>
          <span style={{ color: "#1976d2" }}>{time}</span>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <AvatarCheck icon={icon} color={color} />
            <div>{newUsername}&nbsp; : &nbsp;</div>
            <div style={{ color: "black" }}>{message}</div>
          </div>
          <div style={{ color: "#1976d2" }}>{time}</div>
        </div>
      )}
    </Card>
  );
}
