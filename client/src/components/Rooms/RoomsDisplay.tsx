import Button from "@mui/material/Button";
import { useSockets } from "../../../context/socket.context";

type RoomsDisplayProps = {
  room: {
    roomID: string;
    font: string;
    color: string;
    title: string;
  };
};

export function RoomsDisplay({ room }: RoomsDisplayProps) {
  const {
    rooms,
    usernames,
    socket,
    setShowRooms,
    currentRoom,
    currentUser,
    currentColor,
    currentFont,
  } = useSockets();

  function handleClick() {
    setShowRooms(false);
    socket.emit("JOIN ROOM", { room, currentUser });
  }

  return (
    <Button
      variant="contained"
      sx={{
        color: "white",
        width: "500px",
        backgroundColor: room.color,
        "&:hover": {
          opacity: "0.5",
          backgroundColor: room.color,
        },
      }}
      onClick={() => handleClick()}
    >
      <h1 style={{ fontFamily: room.font }}>{room.title}</h1>
    </Button>
  );
}
