import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { pink, blue, yellow, green, red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import MoodBadIcon from "@mui/icons-material/MoodBad";
import SickIcon from "@mui/icons-material/Sick";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Face5Icon from "@mui/icons-material/Face5";

type AvatarIconType = {
  setIcon: (params: string) => void;
};

export function AvatarIcon({ setIcon }: AvatarIconType) {
  function handleAvatarIcon(icon: string) {
    setIcon(icon);
  }
  return (
    <Card sx={{ width: "100%", backgroundColor: "rgba(255,255,255, 0.5)" }}>
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontFamily: "Zen Dots, cursive", textAlign: "center" }}
        >
          Choose your avatar
        </Typography>
        <CardActions sx={{}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              size="small"
              onClick={() => handleAvatarIcon("MoodBadIcon")}
            >
              <MoodBadIcon />
            </Button>
            <Button size="small" onClick={() => handleAvatarIcon("SickIcon")}>
              <SickIcon />
            </Button>
            <Button
              size="small"
              onClick={() => handleAvatarIcon("SentimentVeryDissatisfiedIcon")}
            >
              <SentimentVeryDissatisfiedIcon />
            </Button>
            <Button
              size="small"
              onClick={() => handleAvatarIcon("SentimentNeutralIcon")}
            >
              <SentimentNeutralIcon />
            </Button>
            <Button
              size="small"
              onClick={() => handleAvatarIcon("SentimentDissatisfiedIcon")}
            >
              <SentimentDissatisfiedIcon />
            </Button>
            <Button size="small" onClick={() => handleAvatarIcon("FaceIcon")}>
              <FaceIcon />
            </Button>
            <Button size="small" onClick={() => handleAvatarIcon("Face3Icon")}>
              <Face3Icon />
            </Button>
            <Button
              size="small"
              onClick={() => handleAvatarIcon("EmojiEmotionsIcon")}
            >
              <EmojiEmotionsIcon />
            </Button>
            <Button size="small" onClick={() => handleAvatarIcon("Face5Icon")}>
              <Face5Icon />
            </Button>
          </div>
        </CardActions>
      </CardContent>
    </Card>
  );
}
