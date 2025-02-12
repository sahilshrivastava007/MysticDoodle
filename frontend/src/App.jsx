import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Whiteboard from './pages/Whiteboard';
import Home from './pages/Home';
import io from "socket.io-client"
import {  useEffect, useState } from 'react';
const server="http://localhost:3001"
const connectionOption={
  "force new connection":true,
  reconnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"]
}


function App() {
const [user,setuser]=useState(null);
const [socket, setSocket] = useState(null); 
const [users, setUsers] = useState([])

  useEffect(() => {   
     const socketio = io(server, connectionOption);
    setSocket(socketio);
      socketio.on("userisjoined",(data)=>{
        if(data.success){
          console.log("userjoined")

         setUsers(data.users)
         console.log(users)
         
        console.log("joiiinifniif")

        }else{
          console.log("something went wrong");
        }
      })
      socketio.on("allUsers",(data)=>{
        console.log("joiiinifniif")
        setUsers(data);

      })
     return () => {
      
     socketio.close();
     }
   }, [])
 
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  socket={socket} setuser={setuser}/>} />
        <Route path="/:roomid" element={<Whiteboard socket={socket} users={users} />}  />
      </Routes>
    </Router>
  );
}

export default App;
