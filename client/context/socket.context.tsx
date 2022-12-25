import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import { useContext, createContext, useState } from "react";

type Context = {
  socket: Socket;
  usernames?: {
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
  disconnected: boolean;
  setDisconnected: () => void;
  username?: string;
  rooms: {
    roomID: string;
    color: string;
    font: string;
    title: string;
    users: string[];
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
};

const socket = io(SOCKET_URL);

const SocketContext = createContext({} as Context);

function SocketsProvider(props: any) {
  const [usernames, setUsernames] = useState<
    {
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
      users: string[];
    }[]
  >([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [showRooms, setShowRooms] = useState(false);
  const [showCreateRooms, setShowCreateRooms] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

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

  socket.on("JOIN ROOM", (roomTitle) => {
    setCurrentRoom(roomTitle);
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
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
