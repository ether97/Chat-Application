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
    status: string;
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
    users: { status: string; userID: string; username: string }[];
  }[]
>[];

function socket({ io }: { io: Server }) {
  logger.info("Sockets enabled");

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    io.sockets.emit("ARRAY OF USERS", users);
    io.sockets.emit("ARRAY OF ROOMS", rooms);
    io.sockets.emit("ALL MESSAGES", messages);

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
      let deepCopy = [...rooms];
      const objectCopy = {
        status: "connected",
        userID: socket.id,
        username: currentUser,
      };
      deepCopy.map((_room) => {
        if (_room.title === room.title) {
          const isFound = _room.users.some((element) => {
            if (element.userID === socket.id) {
              return true;
            }
            return false;
          });
          if (!isFound) {
            _room.users.push(objectCopy);
          }
          // _room.users.map((user) => {
          //   if (user.userID !== objectCopy.userID) {
          //     _room.users.push(objectCopy);
          //   }
          // });
        }
      });
      rooms = deepCopy;
      const time = new Date();
      const newMessage = {
        room: room.title,
        username: currentUser,
        message: "_1_",
        time:
          `${time.getHours()}` +
          ":" +
          `${time.getMinutes() < 10 ? "0" : ""}` +
          `${time.getMinutes()}`,
      };
      messages.push(newMessage);
      socket.emit("JOIN ROOM", room.title);
      io.sockets.emit("ARRAY OF ROOMS", rooms);
      io.sockets.emit("ALL MESSAGES", messages);
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
        users: [
          {
            status: "connected",
            userID: socket.id,
            username: currentUser,
          },
        ],
      };
      rooms.push(room);
      console.log(room.users);
      socket.emit("NEW ROOM", room);
    });

    socket.on("LEAVE_ROOM", (currentRoom) => {
      let currentUser = "";
      let deepCopy = [...rooms];
      deepCopy.map((_room) => {
        if (currentRoom === _room.title) {
          _room.users.map((room) => {
            if (room.userID === socket.id) {
              room.status = "left";
            }
          });
          _room.users = _room.users.filter((user) => user.userID !== socket.id);
          console.log(currentRoom + "," + _room.users);
        }
      });
      rooms = deepCopy;
      users.map((user) => {
        if (user.userID === socket.id) {
          currentUser = user.username;
        }
      });
      const time = new Date();
      const newMessage = {
        room: currentRoom,
        username: currentUser,
        message: "_3_",
        time:
          `${time.getHours()}` +
          ":" +
          `${time.getMinutes() < 10 ? "0" : ""}` +
          `${time.getMinutes()}`,
      };
      messages.push(newMessage);
      socket.emit("LEAVE_ROOM", deepCopy);
      io.sockets.emit("ALL MESSAGES", messages);
      io.sockets.emit("ARRAY OF ROOMS", rooms);
    });

    socket.on("GET_ROOMS", () => {
      logger.info(`newrooms:${rooms}`);

      socket.emit("ALL ROOMS", rooms);
    });

    socket.on("AVATAR UPDATED", ({ icon, color }) => {
      users.map((_user) => {
        if (_user.userID === socket.id) {
          _user.avatar.icon = icon;
          _user.avatar.color = color;
        }
      });

      socket.emit("AVATAR UPDATED", users);
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
        status: "connected",
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

    socket.on("disconnect", () => {
      let currentRoom = "";
      let currentUser = "";
      let deepCopy = [...rooms];
      deepCopy.map((room) =>
        room.users.map((_user) => {
          if (_user.userID === socket.id) {
            currentRoom = room.title;
            _user.status = "disconnected";

            // room.users = room.users.filter((user) => user.userID !== socket.id);
          }
        })
      );
      rooms = deepCopy;
      users.map((user) => {
        if (user.userID === socket.id) {
          console.log(
            `array after disconnect: ${user.userID}, ${user.username}`
          );
          currentUser = user.username;
          user.status = "disconnected";
        }
      });
      // users = users.filter((_user) => _user.userID !== socket.id);

      const time = new Date();
      const newMessage = {
        room: currentRoom,
        username: currentUser,
        message: "_2_",
        time:
          `${time.getHours()}` +
          ":" +
          `${time.getMinutes() < 10 ? "0" : ""}` +
          `${time.getMinutes()}`,
      };
      messages.push(newMessage);
      io.sockets.emit("ARRAY OF ROOMS", rooms);
      io.sockets.emit("disconnected", users);
      io.sockets.emit("ALL MESSAGES", messages);
    });
  });
}

export default socket;
