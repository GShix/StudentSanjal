import Dropdown from "@/Components/Dropdown"
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProfileImage from "./partials/ProfileImage";

const CleanHomeLayout = ({
    story,
    whatOnYourMind,
    chat,
    connectionRequest,
    peopleYouMayKnow,
    children,
}:PropsWithChildren<{
    story?:ReactNode,
    whatOnYourMind?:ReactNode,
    chat?:ReactNode,
    connectionRequest?:ReactNode,
    peopleYouMayKnow?:ReactNode
}>) => {

    const [searchInput, setSearchInput] = useState(false);

    const user = usePage<PageProps>().props.auth.user;
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                progressStyle:{
                    backgroundColor:"#c7ae6a"
                }
            });
        }
    }, [flash.success]);

  return (
    <div className="home bg-gray-400/45 min-h-screen">
        <ToastContainer/>
        <div className="clean-fistRow bg-black flex items-center justify-between max-sm:py-2 px-4 sm:px-8"style={{position: "sticky",
            top: 0,
            zIndex: 1000}}>
            <div className="clean-col1 flex max-sm:gap-1 max-md:gap-5 gap-12">
                <a className="logo" href={window.route('home')}>
                    <img className="w-56 sm:w-60 sm:h-16" src="/img/Home_logo.png" alt="" srcSet="" />
                </a>
                <div className="search-btn relative flex items-center max-w-[60%]">
                    {searchInput &&
                    (
                    <div className="smallSearch md:hidden relative flex items-center max-sm:w-[97%]">
                        <input type="text" name="search" id="" className="rounded-md max-sm:py-[6px] py-2 text-gray-600 text-[12.5px] placeholder:text-gray-700/50 w-full" placeholder="Search StudentSanjal"/>
                        <i className="ri-close-fill absolute text-[#b99a45] font-semibold text-2xl right-2 cursor-pointer hover:text-gray-600" onClick={()=>setSearchInput(!searchInput)}></i>
                    </div>
                    )}
                    {!searchInput &&
                    <i className="ri-search-line absolute left-2  max-sm:text-base text-lg rounded-full max-md:text-gray-200 px-[5px] sm:px-[6px] py-[1px] max-md:cursor-pointer max-md:bg-[#b99a45] md:hidden" onClick={()=>setSearchInput(!searchInput)}></i>
                    }

                    <div className="bigSearch max-md:hidden flex items-center">
                        <input type="text" name="search" id="" className="rounded-md border-transparent py-2 pl-8 text-gray-600 text-sm bg-[#EDF3F8] placeholder:text-gray-700/50" placeholder="Search StudentSanjal"/>
                        <i className="ri-search-line text-gray-700/60 absolute left-2 text-lg rounded-full"></i>
                    </div>
                </div>
            </div>
            <div className="clean-col2 flex items-center justify-end gap-5 lg:gap-12">
                <div className="main-navbar flex gap-9 max-md:hidden">
                    <div className="Layout-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-home-7-fill text-base"></i>
                            <span className="block text-xs leading-none">Home</span>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href={window.route('myNetwork')} className="flex flex-col items-center">
                            <i className="ri-group-3-fill text-base"></i>
                            <span className="block text-xs leading-none">My Network</span>
                        </a>
                    </div>
                    {/* <div className="Job-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-group-line text-base"></i>
                            <span className="block text-xs leading-none">Jobs</span>
                        </a>
                    </div> */}
                    <div className="Events-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href={window.route('event.index')} className="flex flex-col items-center">
                            <i className="ri-calendar-event-fill text-base"></i>
                            <span className="block text-xs leading-none">Events</span>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href={window.route('chatss')} className="flex flex-col items-center">
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
                                <a href={window.route('chatss')} className="flex flex-col items-center">
                                    <i className="ri-chat-private-line text-base max-sm:text-3xl hover:text-clip"></i>
                                    <span className="block text-sm leading-none max-sm:hidden">Chat</span>
                                </a>
                            </div>
                        </div>
                    )
                }

                <div className="profile text-white text-[34px] max-sm:text-3xl flex items-center flex-row-reverse">
                    <div className="user-icon p-1 rounded-full hover:bg-gray-700">
                    <Dropdown>
                        <Dropdown.Trigger>
                        <div className="chat-icon w-10 h-10 p-[3px] bg-[#c7ae6a] rounded-full relative">
                        {user.active_status?(
                            <div className="active-status p-[1.5px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
                            </div>):""}
                            <ProfileImage image={user.profile_image} className="object-cover object-center rounded-full w-full h-full cursor-pointer"/>
                        </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="profile-modal">
                                <div className="chat-icon flex items-center gap-2 mx-2.5 pt-[5px] pb-2 border-b border-gray-400 mb-1">
                                    <div className="image w-10 h-10 rounded-full">
                                        <ProfileImage image={user.profile_image} className="object-cover object-center rounded-full w-full h-full cursor-pointer"/>
                                    </div>
                                    <div className="fullname text-gray-900">
                                        <p className="text-sm text-nowrap">{user.first_name} {user.middle_name} {user.last_name}</p>
                                    </div>
                                </div>
                                <Dropdown.Link href={window.route('profile.edit')} className="mt-2 ">
                                    <i className="ri-settings-4-fill mr-2 bg-gray-300 p-[6px] rounded-full"></i>
                                    Profile Setting
                                </Dropdown.Link>
                                <Dropdown.Link href={window.route('logout')} method="post" as="button" className="mt-1">
                                    <i className="ri-logout-box-r-fill mr-2 bg-gray-300 p-[6px] rounded-full"></i>
                                    Log Out
                                </Dropdown.Link>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div className="clean-lastRow mx-6 sm:mx-8 mt-5 pb-5 relative">
            <div className="clean-Column rounded-lg">
                <div className="mobile-down-navbar flex gap-14 md:hidden bg-gray-100 justify-center rounded-xl px-2.5 py-3 mb-3 h-14">
                    <div className="Home-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center group relative">
                            <i className="ri-home-7-fill text-[20px] hover:scale-110"></i>
                            <p className="text-xs hidden group-hover:block absolute -top-2.5">Home</p>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center group relative">
                            <i className="ri-group-3-fill text-[20px] hover:scale-110"></i>
                            <p className="text-xs hidden group-hover:block absolute -top-2.5 text-nowrap">My Network</p>
                        </a>
                    </div>
                    <div className="Job-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center group relative">
                            <i className="ri-group-line text-[20px] hover:scale-110"></i>
                            <p className="text-xs hidden group-hover:block absolute -top-2.5">Groups</p>
                        </a>
                    </div>
                    <div className="Events-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href={window.route('event.index')} className="flex flex-col items-center group relative">
                            {/* <i className="ri-group-line text-[20px] hover:scale-110"></i> */}
                            <i className="ri-calendar-event-fill text-[20px] hover:scale-110"></i>
                            <p className="text-xs hidden group-hover:block absolute -top-2.5">Events</p>
                        </a>
                    </div>
                    <div className="Notification-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center group relative">
                            <i className="ri-notification-3-fill text-[20px] hover:scale-110"></i>
                            <p className="text-xs hidden group-hover:block absolute -top-2.5">Notification</p>
                        </a>
                    </div>
                </div>

                {/* Stories  */}

                {story}


                {/* posts  */}
                <div className="main flex-grow">
                    {children}
                </div>

            </div>

        </div>
    </div>
  )
}

export default CleanHomeLayout;
