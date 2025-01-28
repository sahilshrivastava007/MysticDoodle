import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = ({socket,setuser}) => {
  const [roomid,setroomid]=useState("");
  const [checkid,setcheckid]=useState("");
  const navigate=useNavigate();
  const handleCreateroom=(e)=>{
    e.preventDefault();
    const roomdata={
      roomid,
      host:true,
      presenter:true
    }
    setuser=roomdata
    navigate(`/${roomid}`)
    socket.emit("userjoin",roomdata)
  }
  const handleJoinroom=(e)=>{
    e.preventDefault();
    const roomdata={
      roomid,
      host:false,
      presenter:false
    }
    setuser=roomdata
    navigate(`/${checkid}`)
    socket.emit("userjoin",roomdata)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="space-y-8 w-full max-w-md p-4 bg-black sm:w-96">
        {/* Create Room Form */}
        <div className="bg-gray-300 rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Room</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                className="mt-1 block w-full border-4 bg-black text-white rounded-md shadow-sm sm:text-sm"
                value={roomid}
                onChange={(e) => setroomid(e.target.value)} 
                placeholder="Enter room name"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
              <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700">
                Room Code
              </label>
              <input
                type="text"
                id="roomCode"
                value={checkid}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter room code"
                onChange={(e) => setcheckid(e.target.value)} 
              />
            </div>
            <button
            onClick={handleJoinroom}
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
