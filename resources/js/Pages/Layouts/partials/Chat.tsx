
const Chat = () => {
  return (
    <div className="chat- bg-gray-100 rounded-xl px-3 py-2">
        <div className="title flex items-center justify-between">
            <h2 className="font-semibold">Chat</h2>
            <i className="ri-edit-box-fill text-xl cursor-pointer"></i>
        </div>
        <div className="search px-2 py-2 relative flex items-center">
            <input type="text" name="search" id="" className="rounded-full py-2 pl-9 text-gray-600 text-sm placeholder:text-gray-700/50 relative" placeholder="Search chat"/>
            <i className="ri-search-line text-gray-700/60 absolute left-5 text-lg"></i>
        </div>
        <div className="chat-tab pb-1">
            <div className="order flex gap-5 px-2 py-2 border-b-4 mb-2">
                <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-3 py-1 rounded-full">Inbox</h1>
                <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-3 py-1 rounded-full">Communities</h1>
            </div>
            <div className="chat-item">
                <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl flex gap-3 leading-tight items-center">
                    <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                        <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                            <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                        </div>
                        <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                    </div>
                    <div className="chat-details">
                        <strong className="text-sm font-semibold">Lady Don</strong>
                        <p className="text-xs">Good Morning! Sir</p>
                    </div>
                </div>
            </div>
            <div className="chat-item">
                <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl  flex gap-3 leading-tight items-center">
                    <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                        <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                            <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                        </div>
                        <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                    </div>
                    <div className="chat-details">
                        <strong className="text-sm font-semibold">Lady Don</strong>
                        <p className="text-xs">aaja college janxau</p>
                    </div>
                </div>
            </div>
            <div className="chat-item">
                <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl flex gap-3 leading-tight items-center">
                    <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                        <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                            <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                        </div>
                        <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                    </div>
                    <div className="chat-details">
                        <strong className="text-sm font-semibold">Lady Don</strong>
                        <p className="text-xs">kx khana khaeu ta</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Chat
