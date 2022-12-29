import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
// console.log(process.env.MONGOOS_URL);

import express from "express";
import mongoose from "mongoose";
// import { Server } from "socket.io"; //! SOCKET.IO
// import { createServer } from "http";

import bodyParser from "body-parser"; //! Middleware
import cors from "cors";

import helmet from "helmet";
import morgan from "morgan";

// !-------------DEPENDIES FOR_IMAGES
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// !------ ROUTES
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import conversationRoute from "./Routes/ConversationRoute.js";
import messageRoute from "./Routes/MessageRoute.js";

// !===================
const app = express();

//!------- to serve images inside public folder
app.use(express.static("public"));
app.use("/images", express.static("images"));

const MONGOOS_ATLES_URL = process.env.MONGOOS_URL;
const PORT = process.env.PORT || 5000;

//!------- Configuration to save file in public/images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log("directory-name 👉️", __dirname);

//!------ to serve image on client side
app.use("/images", express.static(path.join(__dirname, "public/images")));

// !------ middleware
app.use(express.json()); // IF you don't have bodyParser dependency
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// !------ USEAGE OF ROUTES
app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/upload", UploadRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
// !----------------------------
// STATIC_FILES;
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: { origin: "*" },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   //when ceonnect
//   console.log("a user connected.");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });

//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

// httpServer.listen(PORT01, () => {
//   console.log(`Socket.IO server Running on PORT: ${PORT01}`);
// });

// !------MONGO_DB CONNECTION
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(MONGOOS_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`SERVER running on PORT http://localhost:${PORT}/`);
//     });
//   })
//   .catch((error) => console.log(error.message));

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGOOS_ATLES_URL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER running on PORT http://localhost:${PORT}/`);
  });
});
