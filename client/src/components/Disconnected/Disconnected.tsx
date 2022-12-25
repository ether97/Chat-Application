import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSockets } from "./../../../context/socket.context";

export function Disconnected() {
  const { disconnected, setDisconnected } = useSockets();
  return (
    <Modal
      open={disconnected}
      onClose={() => setDisconnected()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{ textAlign: "center", padding: "50px", border: "1px solid black" }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          SERVER MESSAGE
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          A USER HAS DISCONNECTED!
        </Typography>
      </Box>
    </Modal>
  );
}
