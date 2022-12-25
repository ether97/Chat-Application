import { useSockets } from "../../../context/socket.context";
import { AvatarCheck } from "./../AvatarDesign/AvatarCheck";

type RoomUsers = {
  user: string;
};

export function RoomUsers({ user }: RoomUsers) {
  const { usernames, rooms } = useSockets();
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
        if (_user.username === user) {
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
              />
              <p>{user}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
