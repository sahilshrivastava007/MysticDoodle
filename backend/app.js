const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index_routes = require("./routes/index_routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require('cors');
const { addUser } = require("./utils/users");

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

// Define a schema for room data
// const roomSchema = new mongoose.Schema({
//   roomid: { type: String, required: true, unique: true },
//   roomName: String,
//   host: { type: String, required: true },
//   presenter: String,
//   players: [{ type: String }],
// });

// // Create the Room model
// const Room = mongoose.model("Room", roomSchema);

// Socket.IO connection setup
let imgurl = null, globalroomid = null;
io.on("connection", (socket) => {
  socket.on("userjoin", async (data) => {
    const { roomid, host, presenter, username, roomName, userId } = data;
    globalroomid = roomid;
    socket.join(roomid);
    console.log(data);
    const users = addUser(data);
    console.log(users);
    socket.emit("userisjoined", { success: true ,users});
    socket.broadcast.to(roomid).emit("allUsers", users)
    socket.to(roomid).emit("whiteboardDataResponse", {
      imgsrc: imgurl
    })
  });
  socket.on("whiteboardData", (data) => {
    imgurl = data;
    socket.broadcast.to(globalroomid).emit("whiteboardDataResponse", {
      imgsrc: data
    })
  })
});


// Start the server (using server, not app.listen)
const PORT = process.env.PORT || 3001;  // Backend will run on port 3001
server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});  