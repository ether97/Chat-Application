import { Box, Card, TextField, Button, Container } from "@mui/material";
import { useRef } from "react";
import { useSockets } from "../../../context/socket.context";
import { AvatarDesign } from "../AvatarDesign/AvatarDesign";
import { useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
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

export function UserInput() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [icon, setIcon] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const { socket, currentUser, setCurrentUser, setAvatar, setShowCreateRooms } =
    useSockets();

  function handleSetUsername() {
    const username = usernameRef.current?.value;
    if (!username) return;
    // addMessage(message);
    setCurrentUser(username);
    setAvatar(false);

    socket.emit("USER ADDED", { username, icon, color });

    usernameRef.current.value = "";
  }

  function updateAvatar() {
    // addMessage(message);
    setAvatar(false);
    setShowCreateRooms(false);
    socket.emit("AVATAR UPDATED", { icon, color });
  }

  function handleEnter(e: React.KeyboardEvent<HTMLDivElement>) {
    const username = usernameRef.current?.value;
    if (e.key === "Enter") {
      if (!username) return;

      //   addMessage(message);
      setCurrentUser(username);
      setAvatar(false);

      socket.emit("USER ADDED", { username, icon, color });

      usernameRef.current.value = "";
    }
  }
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {!currentUser && (
        <Card
          sx={{
            height: "100px",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            backgroundColor: "#1976d2",
          }}
        >
          <CssTextField
            label="USERNAME"
            id="custom-css-outlined-input"
            sx={{
              width: "80%",
              fontFamily: "Zen Dots, cursive",
              input: { color: "white" },
            }}
            inputRef={usernameRef}
            onKeyDown={(e) => handleEnter(e)}
          />
        </Card>
      )}
      <AvatarDesign
        icon={icon}
        setIcon={setIcon}
        color={color}
        setColor={setColor}
      />
      {!currentUser ? (
        <Button
          sx={{ width: "60%", fontFamily: "Zen Dots, cursive", color: "white" }}
          onClick={handleSetUsername}
          variant="contained"
        >
          CREATE USER
        </Button>
      ) : (
        <Button
          sx={{ width: "60%", fontFamily: "Zen Dots, cursive", color: "white" }}
          onClick={updateAvatar}
          variant="contained"
        >
          UPDATE AVATAR
        </Button>
      )}
    </Container>
  );
}
