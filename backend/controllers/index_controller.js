const RoomModel = require("../models/room");

module.exports.index_control=function(req,res){
    res.send("hey")
}
module.exports.checkroom=async(req,res)=>{
    console.log(req.body)
    const roomid=req.body.id;
    const {username}=req.body;
    const {socketid}=req.body;
    const room=await RoomModel.findOne(roomid);
    console.log(room)
    if(!room){
        return res.json({success:false});
    }
    room.players.push({username,socketid})
   await room.save()
   console.log("done")
    return res.json({success:true});
    
}
module.exports.makeroom=async(req,res)=>{
    console.log(req.body)
    const roomid=req.body.id;
    const {username}=req.body;
    const {socketid}=req.body;
    const room=await RoomModel.findOne(roomid);
    console.log(room)
    if(!room){
        return res.json({success:false});
    }
    room.players.push({username,socketid})
   await room.save()
   console.log("done")
    return res.json({success:true});
    
}
