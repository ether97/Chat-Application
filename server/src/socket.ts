import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  CONNECTION: "connection",
};

var messages = <
  { room: string; username: string; message: string; time: string }[]
>[];
var users = <
  {
    userID: string;
    username: string;
    avatar: { icon: string; color: string };
  }[]
>[];
var rooms = <
  {
    roomID: string;
    color: string;
    font: string;
    title: string;
    users: string[];
  }[]
>[];

function socket({ io }: { io: Server }) {
  logger.info("Sockets enabled");

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    io.emit("ARRAY OF USERS", users);
    io.emit("ARRAY OF ROOMS", rooms);
    io.emit("ALL MESSAGES", messages);

    socket.on("ADD_AVATAR", ({ icon, color }) => {
      users.map((user) => {
        if (user.userID === socket.id) {
          user.avatar.icon = icon;
          user.avatar.color = color;
        }
      });
    });

    socket.on("JOIN ROOM", ({ room, currentUser }) => {
      console.log(socket.id);
      rooms.map((_room) => {
        if (_room.roomID === room.roomID) {
          console.log("room users" + _room.users);
          _room.users.push(currentUser);
        }
      });
      socket.emit("JOIN ROOM", room.title);
    });

    socket.on("CREATE_ROOM", ({ color, font, title, currentUser }) => {
      let newUsername = "";
      users.map((user) => {
        if (user.userID === socket.id) {
          newUsername = user.username;
        }
      });
      const room = {
        roomID: newUsername,
        color: color,
        font: font,
        title: title,
        users: [`${currentUser}`],
      };
      rooms.push(room);
      logger.info(`rooms:${rooms}`);
      socket.emit("NEW ROOM", room);
    });

    socket.on("GET_ROOMS", () => {
      logger.info(`newrooms:${rooms}`);

      socket.emit("ALL ROOMS", rooms);
    });

    socket.on("MESSAGE ADDED", ({ room, username, message }) => {
      const time = new Date();
      const newMessage = {
        room: room,
        username: username,
        message: message,
        time:
          `${time.getHours()}` +
          ":" +
          `${time.getMinutes() < 10 ? "0" : ""}` +
          `${time.getMinutes()}`,
      };
      messages.push(newMessage);
      io.emit("MESSAGE", newMessage);
    });

    socket.on("USER ADDED", ({ username, icon, color }) => {
      console.log("rooms" + rooms);
      const user = {
        userID: socket.id,
        username: username,
        avatar: {
          icon: icon,
          color: color,
        },
      };

      users.push(user);

      io.emit("USER ADDED", user);
    });

    // socket.on("disconnect", () => {
    //   io.emit("disconnected", socket.id);
    // });
  });
}

export default socket;
