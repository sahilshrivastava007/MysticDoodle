const mongoose = require('mongoose');

// Define the schema for rooms
const roomSchema = new mongoose.Schema({
  roomid: {
    type: String,
    required: true,
    unique: true
  },
  roomName: {
    type: String,
    required: false
  },
  host: {
    type: String,
    required: true
  },
  presenter: {
    type: String,
    required: false
  },
  players: [{
    type: String // List of player usernames in the room
  }],
});

// Create the model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
