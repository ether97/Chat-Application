import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useRef } from "react";
import { useSockets } from "../../../context/socket.context";
import { alpha, styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

export function Input() {
  const { socket, setUsernames, usernames, currentRoom, currentUser } =
    useSockets();

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
      }}
    >
      <CssTextField
        label="MESSAGE"
        id="custom-css-outlined-input"
        sx={{
          width: "80%",
          fontFamily: "Zen Dots, cursive",
          input: { color: "white" },
        }}
        inputRef={messageRef}
        onKeyDown={(e) => handleEnter(e)}
      />
      <Button
        sx={{ width: "20%", fontFamily: "Zen Dots, cursive" }}
        onClick={handleSendMessage}
      >
        SEND MESSAGE
      </Button>
    </Box>
  );
}
