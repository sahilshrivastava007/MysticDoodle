const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index_routes = require("./routes/index_routes");
require("dotenv").config();

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

// Middleware to parse JSON requests
app.use(express.json());

// Use routes (index_routes.js should handle other routes)
app.use("/", index_routes);

// Socket.IO connection setup
io.on("connection", (socket) => {
  socket.on("userjoin",(data)=>{
    const {roomid,host,presenter}=data;
    socket.join(roomid);
    socket.emit("user is joined",{success:true})
  })
});

// Start the server (using server, not app.listen)
const PORT = process.env.PORT || 3001;  // Backend will run on port 3001
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
