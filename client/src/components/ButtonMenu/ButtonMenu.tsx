import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useSockets } from "../../../context/socket.context";

export function ButtonMenu() {
  const { setShowCreateRooms, setShowRooms, rooms } = useSockets();
  return (
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
          backgroundColor: "rgba(25, 118, 210, 1)",
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
          backgroundColor: "rgba(25, 118, 210, 1)",
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
  );
}
