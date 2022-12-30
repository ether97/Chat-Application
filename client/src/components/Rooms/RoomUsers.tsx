import { useSockets } from "../../../context/socket.context";
import { AvatarCheck } from "./../AvatarDesign/AvatarCheck";

type RoomUsers = {
  user: {
    userID: string;
    username: string;
  };
};

export function RoomUsers({ user }: RoomUsers) {
  const { usernames, rooms, currentFont } = useSockets();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        background: "transparent",
      }}
    >
      {usernames?.map((_user) => {
        if (_user.userID === user.userID) {
          console.log(`${user.username}`);
          return (
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AvatarCheck
                icon={_user.avatar.icon}
                color={_user.avatar.color}
                status={_user.status}
              />
              <p style={{ fontFamily: currentFont }}>{user.username}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
