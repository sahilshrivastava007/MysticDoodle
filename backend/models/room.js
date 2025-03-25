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
  players: []
});

// Create the model
const RoomModel = mongoose.model('Room', roomSchema);

module.exports = RoomModel;