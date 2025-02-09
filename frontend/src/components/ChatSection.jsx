import React from 'react';

const ChatSection = () => {
    return (
        <div className="w-full h-[60%]  flex flex-col">
            {/* Chat messages section */}
            <div className="w-full flex-grow bg-amber-950 p-4 text-white">
                testthbhbbm
            </div>

            {/* Input section */}
            <form className="w-full h-[20%] flex border-t border-blue-500 px-6">
                <input 
                    type="text" 
                    className="w-[85%] h-full bg-red-300 border-4 border-black px-3 text-black outline-none"
                    placeholder="guuuuuuuhjjjjuuu"
                />
                <button className="w-[15%] h-full bg-blue-500 text-white font-bold">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatSection;
