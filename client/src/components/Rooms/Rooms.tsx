import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useSockets } from "../../../context/socket.context";
import { CardContent, Chip } from "@mui/material";
import { RoomsColor } from "./RoomsColor";
import { RoomsFont } from "./RoomsFont";
import Button from "@mui/material/Button/Button";
import { RoomsTitle } from "./RoomsTitle";

export function Rooms() {
  const [font, setFont] = React.useState("Zen Dots, cursive");
  const [color, setColor] = React.useState("gray");
  const [title, setTitle] = React.useState("Room Title");

  const { socket, setShowCreateRooms, currentUser } = useSockets();

  function handleAddRoom() {
    console.log(color, font);
    socket.emit("CREATE_ROOM", { color, font, title, currentUser });
    setShowCreateRooms(false);
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
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "rgba(255,255,255, 0.5)",
          gap: "10px",
          height: "100px",
        }}
      >
        <CardContent>
          <Chip
            label={title}
            size="medium"
            variant="filled"
            sx={{
              "& .MuiChip-label": {
                fontFamily: font,
                fontSize: "2rem",
                color: "white",
                height: "50px",
                lineHeight: "50px",
              },
              backgroundColor: color,
              textAlign: "center",
              padding: "20px",
              lineHeight: "2rem",
              width: "500px",
            }}
          />
        </CardContent>
      </Card>
      <RoomsColor setColor={setColor} />
      <RoomsFont setFont={setFont} />
      <RoomsTitle setTitle={setTitle} />
      <Button
        variant="contained"
        sx={{
          width: "300px",
          borderRadius: "20px",
          fontFamily: "Zen Dots",
          fontSize: "1rem",
        }}
        onClick={handleAddRoom}
        disabled={title === "Room Title" ? true : false}
      >
        Create Room
      </Button>
    </Box>
  );
}
