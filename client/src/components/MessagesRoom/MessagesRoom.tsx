import { Box, Button } from "@mui/material";
import { useSockets } from "../../../context/socket.context";
import Message from "../Message/Message";
import { RoomsInfo } from "../Rooms/RoomsInfo";

export function MessagesRoom() {
  const {
    currentRoom,
    socket,
    setCurrentRoom,
    currentColor,
    currentFont,
    messages,
  } = useSockets();
  return (
    <Box
      sx={{
        maxHeight: "80vh",
        overflow: "auto",
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      <RoomsInfo />
      <Button
        onClick={() => {
          console.log(currentRoom);
          socket.emit("LEAVE_ROOM", currentRoom);
          setCurrentRoom("");
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontFamily: currentFont,
          color: "white",
          backgroundColor: currentColor,
          width: "200px",
        }}
      >
        Leave Room
      </Button>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "20px",
          flexDirection: "column",
          backgroundColor: "transparent",
        }}
      >
        {messages?.map((message, index) => {
          console.log(message);
          if (message.room === currentRoom) {
            return (
              <Message
                key={index}
                message={message.message}
                time={message.time}
                username={message.username}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
}
