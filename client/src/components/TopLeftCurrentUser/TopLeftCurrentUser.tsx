import { Button, Divider } from "@mui/material";
import { AvatarCheck } from "../AvatarDesign/AvatarCheck";
import { useSockets } from "../../../context/socket.context";

export function TopLeftCurrentUser() {
  const { currentFont, usernames, socket, setAvatar } = useSockets();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: currentFont,
        position: "absolute",
        left: "20px",
        top: "20px",
      }}
    >
      {usernames?.map((user) => {
        if (user.userID === socket.id) {
          return (
            <Button
              sx={{ display: "flex", gap: "10px" }}
              onClick={() => setAvatar(true)}
            >
              <AvatarCheck
                color={user.avatar.color}
                icon={user.avatar.icon}
                status={user.status}
              />
              <p style={{ fontFamily: currentFont }}>
                {user.username}&nbsp;(you)
              </p>
            </Button>
          );
        }
      })}
    </div>
  );
}
