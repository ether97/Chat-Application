import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ElderlyIcon from "@mui/icons-material/Elderly";
import { useSockets } from "../../../context/socket.context";

type UserListProps = {
  socketID: string;
};

export function UserList({ socketID }: UserListProps) {
  const { friend, setFriend, usernames, total } = useSockets();
  // console.log(usernames);
  console.log(total);

  function handleSetFriend(friend: string) {
    setFriend(friend);
  }
  return (
    <Box>
      <nav aria-label="main mailbox folders">
        <List>
          {usernames?.map((username, index) => (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleSetFriend(username.username)}
                disabled={socketID === username.userID}
              >
                <ListItemIcon>
                  <ElderlyIcon />
                </ListItemIcon>
                <ListItemText primary={username.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
