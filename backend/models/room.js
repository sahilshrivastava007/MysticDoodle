const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: { type: [String], default: [] }, // List of user names or IDs
});

module.exports = mongoose.model('Room', roomSchema);
