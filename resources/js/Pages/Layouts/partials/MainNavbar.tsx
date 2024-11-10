import Dropdown from "@/Components/Dropdown"
import React, { useState } from 'react'

const MainNavbar = () => {

    const [searchInput, setSearchInput] = useState(false);

  return (
    <>
        <div className="main-navbar flex gap-9 max-md:hidden">
            <div className="Home-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                <a href="/" className="flex flex-col items-center">
                    <i className="ri-home-7-fill text-base"></i>
                    <span className="block text-xs leading-none">Home</span>
                </a>
            </div>
            <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                <a href="/" className="flex flex-col items-center">
                    <i className="ri-group-3-fill text-base"></i>
                    <span className="block text-xs leading-none">My Network</span>
                </a>
            </div>
            <div className="Job-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                <a href="/" className="flex flex-col items-center">
                    <i className="ri-group-line text-base"></i>
                    <span className="block text-xs leading-none">Jobs</span>
                </a>
            </div>
            <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                <a href="/" className="flex flex-col items-center">
                    <i className="ri-chat-private-line text-base "></i>
                    <span className="block text-xs leading-none">Chat</span>
                </a>
            </div>
            <div className="Notification-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                <a href="/" className="flex flex-col items-center">
                    <i className="ri-notification-3-fill text-base"></i>
                    <span className="block text-xs leading-none">Notifications</span>
                </a>
            </div>
        </div>
        {
            !searchInput && (
                <div className="mobile-navbar md:hidden flex gap-5">
                    <div className="Chat-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-chat-private-line text-base max-sm:text-3xl hover:text-clip"></i>
                            <span className="block text-sm leading-none max-sm:hidden">Chat</span>
                        </a>
                    </div>
                </div>
            )
        }

        <div className="profile text-white text-[34px] max-sm:text-3xl flex items-center flex-row-reverse">
            <div className="user-icon p-1 bg-gray-600 rounded-full hover:bg-gray-500">
            <Dropdown>
                <Dropdown.Trigger>
                <div className="chat-icon w-10 h-10 p-[3px] bg-[#c7ae6a] rounded-full relative">
                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                        <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                    </div>
                    <img className="object-cover object-center rounded-full w-full h-full cursor-pointer" src="/img/lady1.jpg" alt="" />
                </div>
                    {/* <img className="object-cover object-center rounded-full w-10 h-10 cursor-pointer" src={"/img/lady1.jpg"} alt="" /> */}
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link href={window.route('profile.edit')}>Profile</Dropdown.Link>
                    <Dropdown.Link href={window.route('logout')} method="post" as="button">
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
            </div>
        </div>
    </>
  )
}

export default MainNavbar
