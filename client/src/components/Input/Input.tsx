import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import { useSockets } from "../../../context/socket.context";
import { alpha, styled } from "@mui/material/styles";

export function Input() {
  const {
    socket,
    setUsernames,
    usernames,
    currentRoom,
    currentUser,
    currentColor,
    currentFont,
  } = useSockets();

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: currentColor,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: currentColor,
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& label": {
      color: "white",
    },
  });

  const messageRef = useRef<HTMLInputElement>(null);

  function handleSendMessage() {
    const message = messageRef.current?.value;
    if (!message) return;
    // addMessage(message);

    const newMessage = {
      room: currentRoom,
      username: currentUser,
      message: message,
    };
    socket.emit("MESSAGE ADDED", newMessage);

    messageRef.current.value = "";
  }

  function handleEnter(e: React.KeyboardEvent<HTMLDivElement>) {
    const message = messageRef.current?.value;
    if (e.key === "Enter") {
      if (!message) return;

      //   addMessage(message);
      const newMessage = {
        room: currentRoom,
        username: currentUser,
        message: message,
      };
      socket.emit("MESSAGE ADDED", newMessage);

      messageRef.current.value = "";
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        marginBottom: "20px",
        gap: "20px",
      }}
    >
      <CssTextField
        label="SEND MESSAGE..."
        id="custom-css-outlined-input"
        sx={{
          width: "80%",
          fontFamily: currentFont,
          input: { color: currentColor, fontFamily: currentFont },
        }}
        inputRef={messageRef}
        onKeyDown={(e) => handleEnter(e)}
        autoFocus
      />
      <Button
        sx={{
          width: "20%",
          fontFamily: currentFont,
          color: "white",
          backgroundColor: currentColor,
          "&:hover": {
            color: currentColor,
          },
        }}
        onClick={handleSendMessage}
      >
        SEND MESSAGE
      </Button>
    </Box>
  );
}
