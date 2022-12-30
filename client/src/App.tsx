import { useSockets } from "../context/socket.context";
import { Container } from "@mui/material";
import { Input } from "./components/Input/Input";
import { UserInput } from "./components/UserInput/UserInput";

import { Rooms } from "./components/Rooms/Rooms";
import { RoomsDisplay } from "./components/Rooms/RoomsDisplay";

import { TopLeftCurrentUser } from "./components/TopLeftCurrentUser/TopLeftCurrentUser";
import { ButtonMenu } from "./components/ButtonMenu/ButtonMenu";
import { MessagesRoom } from "./components/MessagesRoom/MessagesRoom";

function App() {
  const {
    usernames,
    socket,
    rooms,
    currentRoom,
    showRooms,
    showCreateRooms,
    currentUser,
    avatar,
  } = useSockets();

  let check;

  usernames?.map((username) => {
    if (socket.id === username.userID) {
      check = true;
    }
  });

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
        backgroundColor: "rgba(255,255,255,0.2)",
      }}
    >
      {avatar && <UserInput />}

      {currentUser && !currentRoom && <TopLeftCurrentUser />}

      {currentUser &&
        !showRooms &&
        !showCreateRooms &&
        currentRoom === "" &&
        !avatar && <ButtonMenu />}

      {showCreateRooms && <Rooms />}

      {showRooms &&
        rooms.map((room, index) => {
          console.log("hi" + room);
          return <RoomsDisplay key={index} room={room} />;
        })}

      {currentRoom !== "" && <MessagesRoom />}

      {currentRoom !== "" && <Input />}
    </Container>
  );
}

export default App;
