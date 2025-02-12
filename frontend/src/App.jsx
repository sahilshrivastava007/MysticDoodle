import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Whiteboard from './pages/Whiteboard';
import Home from './pages/Home';
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import WordRandom from './components/WordRandom';
import GameSetting from './components/GameSetting';
import GameNav from './components/GameNav';
import Room from './pages/Room';
const server="http://localhost:3001"
const connectionOption={
  "force new connection":true,
  reconnectionAttempts:"Infinty",
  timeout:10000,
  transports:["websocket"]
}
const socket=io(server,connectionOption);
function App() {
  const [user,setuser]=useState(null);
  // useEffect(()=>{
  //   socket.on("user is joined",(data)=>{
  //     if(data.success){
  //       console.log("userjoin");
  //     }else{
  //       console.log("Not join")
  //     }
  //   })
  // },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  socket={socket} setuser={setuser}/>} />
        <Route path="/:roomid" element={<Room/>} />
        <Route path="/nav" element={<GameNav/>} />
      </Routes>
    </Router>
  );
}

export default App;
