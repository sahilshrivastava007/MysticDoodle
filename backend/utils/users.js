let users=[];
 const addUser=({username,userId,roomid,host,presenter})=>{
    const user={username,userId,roomid,host,presenter};
    console.log("user info---->",user)
    users.push(user);
    console.log(username,userId,roomid,host,presenter)
    console.log("array--->",users)
    return users.filter((user) => user.roomid === roomid); 
}
 const removeUser=({id})=>{
    return users.filter((user) => user.roomid === roomid); 

    return users;
}
const getUser = (id) => {
    return users.find((user) => user.userId === id); 
};
const getUserInRoom = (roomid) => {
    return users.filter((user) => user.roomid === roomid);
};

module.exports={addUser,removeUser,getUser,getUserInRoom}