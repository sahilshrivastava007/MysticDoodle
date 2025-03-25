const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index_routes = require("./routes/index_routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const { addUser, getUser, removeUser } = require("./utils/users");

// Initialize dotenv to load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Create an HTTP server to integrate with Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow connections from frontend (Vite React) on port 5173
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", index_routes);

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
});

// Socket.IO connection setup
const roomData = new Map(); // Use a Map to manage room-specific data

io.on("connection", (socket) => {
  socket.on("userjoin", async (data) => {
    const { roomid, host, presenter, username, roomName, userId } = data;
    socket.join(roomid);
    console.log(data);

    const users = addUser(data);
    console.log(users);

    // Notify the user that they have joined
    socket.emit("userisjoined", { success: true, users });

    // Notify all users in the room about the updated user list
    socket.broadcast.to(roomid).emit("allUsers", users);

    // If the user is the presenter, initialize the canvas state
    if (presenter) {
      socket.emit("initialize-canvas", { isPresenter: true });
    } else {
      socket.emit("initialize-canvas", { isPresenter: false });
    }

    // Broadcast the current canvas data to the new user
    if (roomData.has(roomid)) {
      socket.emit("canvas-data-update", { img: roomData.get(roomid) });
    }
  });

  // Handle chat messages
  socket.on("message", (data) => {
    const { message } = data;
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast.to(user.roomid).emit("messageresponse", { message, user: user.username });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user) {
      removeUser(socket.id);
      socket.broadcast.to(user.roomid).emit("userleft", { user: user.username });
    }
  });

  // Handle canvas data updates
  socket.on("canvas-data", (data) => {
    const user = getUser(socket.id); // Get the user object for the current socket
    if (user) {
      const { roomid } = user; // Extract the roomid from the user object
      roomData.set(roomid, data); // Store canvas data for the room
      socket.broadcast.to(roomid).emit("canvas-data-update", { imgsrc: data, roomid }); // Include roomid in the event
    }
  });
});

// Start the server (using server, not app.listen)
const PORT = process.env.PORT || 3001;  // Backend will run on port 3001
server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});