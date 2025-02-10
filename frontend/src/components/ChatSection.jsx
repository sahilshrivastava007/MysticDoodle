import React, { useEffect, useRef, useState } from 'react';

const ChatSection = ({ socket }) => {
    const [chat, setChat] = useState([]);
    const [message, setmessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("wii")

        if (message.trim() !== '') {
            socket.emit("message", { message });
            setChat([...chat, { message, user: "you" }])
        }
    }
    useEffect(() => {
        console.log(socket)
        socket?.on("messageresponse", (data) => {
            setChat([...chat, data])
        })


    }, [socket,chat])

    return (
        <div className="w-[80vw] h-[60vh] bg-orange-300  ">
            {/* Chat messages section */}
            <div className="w-full  bg-gray-400 p-4 text-white h-[80%] overflow-y-scroll overflow-x-hidden">
                {
                    chat.map((msg, index) => {
                        return (<p className='w-full break-words' key={index}>
                            {msg.user}:{msg.message}

                        </p>)
                    })
                }
            </div>
            <form onSubmit={(e) => { handleSubmit(e) }} className='border-2 border-white  h-[17%] m-2  flex'>
                <input onChange={(e) => {
                    console.log(e.target.value)
                    setmessage(e.target.value);
                }} value={message} className='bg-red-500 w-full' placeholder='jojine' />
                <button type='submit' className='bg-blue-600 text-center text-white w-full text-2xl'>send</button>
            </form>





        </div>
    );
};

export default ChatSection;
