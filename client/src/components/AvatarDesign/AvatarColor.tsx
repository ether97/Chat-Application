import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
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
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";

type AvatarColorType = {
  setColor: (params: string) => void;
  color: string;
};

export function AvatarColor({ setColor, color }: AvatarColorType) {
  const [checked, setChecked] = useState(false);
  function handleAvatarColor(newColor: string) {
    if (color !== newColor) {
      setColor(newColor);
    } else {
      setColor("");
    }
    setChecked(!checked);
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
          Choose your color
        </Typography>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Checkbox
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            onClick={() => handleAvatarColor("pink")}
            disabled={color !== "pink" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: purple[800],
              "&.Mui-checked": {
                color: purple[600],
              },
            }}
            onClick={() => handleAvatarColor("purple")}
            disabled={color !== "purple" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: yellow[800],
              "&.Mui-checked": {
                color: yellow[600],
              },
            }}
            onClick={() => handleAvatarColor("yellow")}
            disabled={color !== "yellow" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: amber[800],
              "&.Mui-checked": {
                color: amber[600],
              },
            }}
            onClick={() => handleAvatarColor("amber")}
            disabled={color !== "amber" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: green[800],
              "&.Mui-checked": {
                color: green[600],
              },
            }}
            onClick={() => handleAvatarColor("green")}
            disabled={color !== "green" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: lightGreen[800],
              "&.Mui-checked": {
                color: lightGreen[600],
              },
            }}
            onClick={() => handleAvatarColor("lightGreen")}
            disabled={color !== "lightGreen" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: red[800],
              "&.Mui-checked": {
                color: red[600],
              },
            }}
            onClick={() => handleAvatarColor("red")}
            disabled={color !== "red" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: blue[800],
              "&.Mui-checked": {
                color: blue[600],
              },
            }}
            onClick={() => handleAvatarColor("blue")}
            disabled={color !== "blue" && checked === true ? true : false}
          />
          <Checkbox
            sx={{
              color: cyan[800],
              "&.Mui-checked": {
                color: cyan[600],
              },
            }}
            onClick={() => handleAvatarColor("cyan")}
            disabled={color !== "cyan" && checked === true ? true : false}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}
