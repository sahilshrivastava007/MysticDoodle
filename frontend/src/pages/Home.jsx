import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Home = ({ socket, setuser }) => {
  const [roomid, setroomid] = useState('');
  const [roomName, setroomName] = useState('');
  const [checkid, setcheckid] = useState('');
  const [username, setusername] = useState('');
  const [userplayname, setuserplayname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const navigate = useNavigate();

  const generateIds = () => {
    const idd = Math.random().toString(36).substring(2, 8).toUpperCase();
    setroomid(idd);
    
  };
  
  const generateUserID = (username = "") => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base36
    const randomStr = Math.random().toString(36).substring(2, 8); // Random string
    const userPart = username ? username.substring(0, 4).toLowerCase() : "usr"; // Take first 4 letters of username
    
    return `${userPart}-${timestamp}-${randomStr}`;
  };
  

  

  const handleCreateroom = (e) => {
    e.preventDefault();
  
    if (!username.trim()) {
      setErrorMessage('Please enter a username');
      return;
    }
  
    if (!roomid.trim()) {
      setErrorMessage('Please generate a room ID');
      return;
    }
  
    setErrorMessage('');
  
    const roomdata = {
      roomid,
      host: true,  // Indicating that the user is the host
      presenter: true,
      username,
      roomName,
      userId:socket.id
    };
  
   
  console.log(roomdata)
  setuser(roomdata);
    // Emit 'userjoin' event to create the room
    socket.emit('userjoin', roomdata);
    navigate(`/${roomid}`);
  
    // Listen for the response from the server
   
    
  };
  
  const handleJoinroom =async (e) => {
    e.preventDefault();
    console.log("clickedd")
  
    if (!userplayname.trim()) {
      setErrorMessage1('Please enter a username');
      return;
    }
  
    if (!checkid.trim()) {
      setErrorMessage1('Please enter a room code');
      return;
    }
  
    setErrorMessage('');
 
  
    const roomdata = {
      roomid: checkid,
      host: false,
      presenter: false,
      username: userplayname,  // Ensure this matches the value from your input
      roomName: "",
      userId:socket.id  // Room name if provided
    };
    setuser(roomdata);
    // Emit 'userjoin' event to create the room
    socket.emit('userjoin', roomdata);
    navigate(`/${checkid}`);
  
  
   
  }
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="space-y-8 w-full max-w-md p-4 bg-black sm:w-96">
        {/* Create Room Form */}
        <div className="bg-gray-300 rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Room</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full border-4 bg-black text-white rounded-md shadow-sm sm:text-sm"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                className="mt-1 block w-full border-4 bg-black text-white rounded-md shadow-sm sm:text-sm"
                value={roomName}
                onChange={(e) => setroomName(e.target.value)}
                placeholder="Enter room name"
                required
              />
            </div>
            <div>
              <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">
                Room ID
              </label>
              <input
                type="text"
                id="roomId"
                className="mt-1 block w-full border-4 bg-black text-white rounded-md shadow-sm sm:text-sm"
                value={roomid}
                readOnly
                placeholder="Generated room ID"
              />
              <button
                onClick={generateIds}
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              >
                Generate
              </button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
              onClick={handleCreateroom}
            >
              Create Room
            </button>
          </form>
        </div>

        {/* Join Room Form */}
        <div className="bg-gray-300 rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Room</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="userplayname" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="userplayname"
                className="mt-1 block w-full border-4 bg-black text-white rounded-md shadow-sm sm:text-sm"
                value={userplayname}
                onChange={(e) => setuserplayname(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="checkid" className="block text-sm font-medium text-gray-700">
                Room Code
              </label>
              <input
                type="text"
                id="checkid"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={checkid}
                onChange={(e) => setcheckid(e.target.value)}
                placeholder="Enter room code"
                required
              />
            </div>
            {errorMessage1 && <p className="text-red-500 text-sm mt-2">{errorMessage1}</p>}
            <button
              onClick={handleJoinroom}
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-4"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
