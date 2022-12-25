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

type AvatarCheckProps = {
  color: string;
  icon: string;
};

export function AvatarCheck({ color, icon }: AvatarCheckProps) {
  return (
    <Avatar
      sx={{
        bgcolor:
          color === "pink"
            ? pink[800]
            : color === "blue"
            ? blue[800]
            : color === "yellow"
            ? yellow[800]
            : color === "red"
            ? red[800]
            : color === "green"
            ? green[800]
            : color === "lightGreen"
            ? lightGreen[800]
            : color === "purple"
            ? purple[800]
            : color === "amber"
            ? amber[800]
            : color === "cyan"
            ? cyan[800]
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
  );
}
