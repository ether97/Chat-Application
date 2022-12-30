import Avatar from "@mui/material/Avatar";
import FaceIcon from "@mui/icons-material/Face";
import { useState } from "react";

import MoodBadIcon from "@mui/icons-material/MoodBad";
import SickIcon from "@mui/icons-material/Sick";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import Face3Icon from "@mui/icons-material/Face3";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Face5Icon from "@mui/icons-material/Face5";

import {
  pink,
  blue,
  yellow,
  green,
  red,
  amber,
  cyan,
  lightGreen,
  purple,
} from "@mui/material/colors";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

type AvatarCheckProps = {
  color: string;
  icon: string;
  status?: string;
};

export function AvatarCheck({ color, icon, status }: AvatarCheckProps) {
  const SHADES = {
    DISCONNECTED: 300,
    CONNECTED: 800,
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor:
        status === "left"
          ? "#b70000"
          : status === "disconnected"
          ? "#808080"
          : "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation:
          status === "connected" ? "ripple 1.2s infinite ease-in-out" : "",
        border: status === "connected" ? "1px solid currentColor" : "",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar
        sx={{
          bgcolor:
            color === "pink"
              ? status === "connected"
                ? pink[800]
                : pink[200]
              : color === "blue"
              ? status === "connected"
                ? blue[800]
                : blue[200]
              : color === "yellow"
              ? status === "connected"
                ? yellow[800]
                : yellow[200]
              : color === "red"
              ? status === "connected"
                ? red[800]
                : red[200]
              : color === "green"
              ? status === "connected"
                ? green[800]
                : green[200]
              : color === "lightGreen"
              ? status === "connected"
                ? lightGreen[800]
                : lightGreen[200]
              : color === "purple"
              ? status === "connected"
                ? purple[800]
                : purple[200]
              : color === "amber"
              ? status === "connected"
                ? amber[800]
                : amber[200]
              : color === "cyan"
              ? status === "connected"
                ? cyan[800]
                : cyan[200]
              : "",
          height: "40px",
          width: "40px",
        }}
      >
        {icon === "MoodBadIcon" ? (
          <MoodBadIcon />
        ) : icon === "SickIcon" ? (
          <SickIcon />
        ) : icon === "SentimentVeryDissatisfiedIcon" ? (
          <SentimentVeryDissatisfiedIcon />
        ) : icon === "SentimentNeutralIcon" ? (
          <SentimentNeutralIcon />
        ) : icon === "SentimentDissatisfiedIcon" ? (
          <SentimentDissatisfiedIcon />
        ) : icon === "FaceIcon" ? (
          <FaceIcon />
        ) : icon === "Face3Icon" ? (
          <Face3Icon />
        ) : icon === "EmojiEmotionsIcon" ? (
          <EmojiEmotionsIcon />
        ) : icon === "Face5Icon" ? (
          <Face5Icon />
        ) : (
          <FaceIcon />
        )}
      </Avatar>
    </StyledBadge>
  );
}
