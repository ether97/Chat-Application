import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { useContext, createContext, useState } from "react";

type Context = {
  socket: Socket;
  usernames?: {
    status: string;
    userID: string;
    username: string;
    avatar: { icon: string; color: string };
  }[];
  setUsernames: () => void;
  messages?: {
    room: string;
    username: string;
    message: string;
    time: string;
  }[];
  setMessages: () => void;
  username?: string;
  rooms: {
    roomID: string;
    color: string;
    font: string;
    title: string;
    users: { status: string; userID: string; username: string }[];
  }[];
  setRooms: () => void;
  currentRoom: string;
  setCurrentRoom: (params: string) => void;
  showRooms: boolean;
  setShowRooms: (params: boolean) => void;
  showCreateRooms: boolean;
  setShowCreateRooms: (params: boolean) => void;
  currentUser: string;
  setCurrentUser: (params: string) => void;
  currentFont: string;
  currentColor: string;
  setCurrentFont: (params: string) => void;
  setCurrentColor: (params: string) => void;
  avatar: boolean;
  setAvatar: (params: boolean) => void;
};

const socket = io(SOCKET_URL);

const SocketContext = createContext({} as Context);

function SocketsProvider(props: any) {
  const [usernames, setUsernames] = useState<
    {
      status: string;
      userID: string;
      username: string;
      avatar: { icon: string; color: string };
    }[]
  >([]);
  const [messages, setMessages] = useState<
    { room: string; username: string; message: string; time: string }[]
  >([]);
  const [disconnected, setDisconnected] = useState(false);
  const [rooms, setRooms] = useState<
    {
      roomID: string;
      color: string;
      font: string;
      title: string;
      users: { status: string; userID: string; username: string }[];
    }[]
  >([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [showRooms, setShowRooms] = useState(false);
  const [showCreateRooms, setShowCreateRooms] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentColor, setCurrentColor] = useState("#1976d2");
  const [currentFont, setCurrentFont] = useState("Zen Dots, cursive");
  const [avatar, setAvatar] = useState(true);

  socket.on("MESSAGE", (message) => {
    setMessages([...messages, message]);
  });

  socket.on("USER ADDED", (user) => {
    setUsernames([...usernames, user]);
  });

  socket.on("ARRAY OF USERS", (array) => {
    setUsernames(array);
  });
  socket.on("ARRAY OF ROOMS", (rooms) => {
    setRooms(rooms);
  });

  socket.on("ALL ROOMS", (rooms) => {
    setRooms([rooms]);
  });

  socket.on("UPDATE_ROOMS", (rooms) => {
    setRooms([rooms]);
  });

  socket.on("JOIN ROOM", (roomTitle) => {
    rooms.map((_room) => {
      if (_room.title === roomTitle) {
        setCurrentColor(_room.color);
        setCurrentFont(_room.font);
      }
    });
    setCurrentRoom(roomTitle);
  });

  socket.on("LEAVE_ROOM", (rooms) => {
    setRooms(rooms);
    setCurrentRoom("");
    setCurrentColor("");
    setCurrentFont("");
  });

  socket.on("ALL MESSAGES", (messages) => {
    setMessages(messages);
  });

  socket.on("NEW ROOM", (room) => {
    setCurrentRoom(room.title);
    setRooms([
      ...rooms,
      {
        roomID: room.roomID,
        color: room.color,
        font: room.font,
        title: room.title,
        users: [room.users],
      },
    ]);
    setCurrentColor(room.color);
    setCurrentFont(room.font);
  });

  socket.on("connected", (message) => {
    const date = new Date();
    setMessages((previous) => [
      ...messages,
      {
        room: currentRoom,
        username: socket.id,
        message: "USER CONNECTED",
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);
  });

  socket.on("disconnected", (users) => {
    console.log(`array on frontend after disconnect: ${users}`);
    setUsernames(users);
  });

  socket.on("AVATAR UPDATED", (users) => {
    setUsernames(users);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        usernames,
        setUsernames,
        messages,
        setMessages,
        disconnected,
        setDisconnected,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        showRooms,
        setShowRooms,
        showCreateRooms,
        setShowCreateRooms,
        currentUser,
        setCurrentUser,
        currentFont,
        currentColor,
        setCurrentColor,
        setCurrentFont,
        avatar,
        setAvatar,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
