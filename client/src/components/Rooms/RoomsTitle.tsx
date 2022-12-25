import { Box, Card, TextField, Button, Container } from "@mui/material";
import { useRef } from "react";

import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "gray",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
});

type RoomsTitleProps = {
  setTitle: Function;
};

export function RoomsTitle({ setTitle }: RoomsTitleProps) {
  const roomTitleRef = useRef<HTMLInputElement>(null);
  function handleSetRoomTitle() {
    const roomTitle = roomTitleRef.current?.value;
    if (!roomTitle) return;
    // addMessage(message);

    setTitle(roomTitle);

    roomTitleRef.current.value = "";
  }
  function handleEnter(e: React.KeyboardEvent<HTMLDivElement>) {
    const roomTitle = roomTitleRef.current?.value;
    if (e.key === "Enter") {
      if (!roomTitle) return;

      //   addMessage(message);

      setTitle(roomTitle);

      roomTitleRef.current.value = "";
    }
  }

  return (
    <Card
      sx={{
        height: "100px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      <CssTextField
        label="ROOM NAME"
        id="custom-css-outlined-input"
        sx={{
          width: "80%",
          fontFamily: "Zen Dots, cursive",
          input: { color: "black" },
          backgroundColor: "rgba(255,255,255,0.5)",
          margin: "20px 10px 20px 20px",
        }}
        inputRef={roomTitleRef}
        onKeyDown={(e) => handleEnter(e)}
        required
      />
      <Button
        sx={{
          width: "20%",
          fontFamily: "Zen Dots, cursive",
          color: "white",
          margin: "20px 20px 20px 10px",
        }}
        onClick={handleSetRoomTitle}
        variant="contained"
      >
        SET TITLE
      </Button>
    </Card>
  );
}
