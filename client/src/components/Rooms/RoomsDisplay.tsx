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
  const { rooms, usernames, socket, setShowRooms, currentRoom, currentUser } =
    useSockets();

  function handleClick() {
    setShowRooms(false);
    socket.emit("JOIN ROOM", { room, currentUser });
  }

  return (
    <Button
      variant="contained"
      sx={{ color: "white" }}
      onClick={() => handleClick()}
    >
      <h1>{room.title}</h1>
    </Button>
  );
}
