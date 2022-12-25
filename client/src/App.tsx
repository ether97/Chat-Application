import { useSockets } from "../context/socket.context";
import { Container, Modal, Box, Typography, Button } from "@mui/material";
import { Input } from "./components/Input/Input";
import Message from "./components/Message/Message";
import { Disconnected } from "./components/Disconnected/Disconnected";
import { UserInput } from "./components/UserInput/UserInput";

import { Rooms } from "./components/Rooms/Rooms";
import { RoomsDisplay } from "./components/Rooms/RoomsDisplay";
import { useState, useEffect } from "react";
import { RoomsInfo } from "./components/Rooms/RoomsInfo";

function App() {
  const {
    messages,
    disconnected,
    setDisconnected,
    usernames,
    socket,
    rooms,
    currentRoom,
    showRooms,
    setShowRooms,
    showCreateRooms,
    setShowCreateRooms,
    setCurrentRoom,
  } = useSockets();

  let check;
  let newUsername;

  usernames?.map((username) => {
    if (username.userID === currentRoom) {
      newUsername = username.username;
    }
  });

  usernames?.map((username) => {
    if (socket.id === username.userID) {
      check = true;
    }
  });

  console.log(usernames);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        overflow: "auto",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "rgba(255,255,255,0.3)",
      }}
    >
      {!check && <UserInput />}

      {check && !showRooms && !showCreateRooms && currentRoom === "" && (
        <Box
          sx={{
            display: "flex",
            height: "200px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Button
            onClick={() => {
              setShowCreateRooms(true);
            }}
            sx={{
              width: "300px",
              borderRadius: "20px",
              fontFamily: "Zen Dots",
              fontSize: "1.5rem",
              backgroundColor: "rgba(25, 118, 210, 0.5)",
              color: "white",
              "&&: hover": {
                color: "black",
              },
            }}
          >
            Create Room
          </Button>
          <Button
            onClick={() => {
              setShowRooms(true);
            }}
            sx={{
              width: "300px",
              borderRadius: "20px",
              fontFamily: "Zen Dots",
              fontSize: "1.5rem",
              backgroundColor: "rgba(25, 118, 210, 0.5)",
              color: "white",
              "&&: hover": {
                color: "black",
              },
            }}
            disabled={rooms.length === 0 ? true : false}
          >
            Join Room
          </Button>
        </Box>
      )}

      {showCreateRooms && <Rooms />}

      {showRooms &&
        rooms.map((room, index) => {
          console.log("hi" + room);
          return <RoomsDisplay key={index} room={room} />;
        })}

      {currentRoom !== "" && (
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
              setCurrentRoom("");
            }}
            variant="contained"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontFamily: "Zen Dots",
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
      )}
      {/* {check && <UserList socketID={socket.id} />} */}
      {currentRoom !== "" && <Input />}

      {disconnected && <Disconnected />}
    </Container>
  );
}

export default App;
