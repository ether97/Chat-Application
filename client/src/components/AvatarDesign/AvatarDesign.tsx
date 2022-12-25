import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Badge from "@mui/material/Badge";
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
import { AvatarIcon } from "./AvatarIcon";
import { AvatarColor } from "./AvatarColor";
import { useSockets } from "./../../../context/socket.context";
import { AvatarCheck } from "./AvatarCheck";

type AvatarProps = {
  icon: React.ReactElement<any>;
  color: string;
};

type AvatarDesignProps = {
  icon: string;
  setIcon: (params: string) => void;
  color: string;
  setColor: (params: string) => void;
};

export function AvatarDesign({
  icon,
  setIcon,
  color,
  setColor,
}: AvatarDesignProps) {
  const { socket } = useSockets();

  function createAvatar({ icon, color }: AvatarProps) {
    socket.emit("ADD_AVATAR", { icon, color });
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        width: "60%",
      }}
    >
      <AvatarIcon setIcon={setIcon} />
      <AvatarColor setColor={setColor} color={color} />
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100px",
          width: "100%",
          backgroundColor: "rgba(255,255,255, 0.5)",
        }}
      >
        <AvatarCheck color={color} icon={icon} />
      </Card>
    </Box>
  );
}
