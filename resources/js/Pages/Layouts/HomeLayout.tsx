import Dropdown from "@/Components/Dropdown"
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProfileImage from "./partials/ProfileImage";
import BannerImage from "./partials/BannerImage";

const HomeLayout = ({
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

    const getProfileLink = (username?: string):any => {
        if(username){
            return username ? route('showProfile', username) : route('updateProfile');
        }
    };
  return (
    // <h1 className="bg-black h-100px">ljkfsflsj</h1>
    <div className="home bg-gray-400/45">
        <ToastContainer/>
        <div className="fistRow bg-black flex items-center justify-between max-sm:py-2 px-4 sm:px-8"style={{boxShadow:"0px 0px 10px 4px #c7ae6a",position: "sticky",
            top: 0,
            zIndex: 1000}}>
            <div className="col1 flex max-sm:gap-1 max-md:gap-5 gap-12">
                <a className="logo" href={route('home')}>
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
            <div className="col2 flex items-center justify-end gap-5 lg:gap-12">
                <div className="main-navbar flex gap-9 max-md:hidden">
                    <div className="Layout-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-home-7-fill text-base"></i>
                            <span className="block text-xs leading-none">Home</span>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href={route('myNetwork')} className="flex flex-col items-center">
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
                        <a href={route('event.index')} className="flex flex-col items-center">
                        <i className="ri-calendar-event-fill text-base"></i>
                            <span className="block text-xs leading-none">Events</span>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href={route('chat')} className="flex flex-col items-center">
                            <i className="ri-chat-private-line  "></i>
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
                                <a href={route('chat')} className="flex flex-col items-center">
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
                            <ProfileImage image={user.profile_image} />
                            {/* <img className="object-cover object-center rounded-full w-full h-full cursor-pointer" src={user.profile_image} alt="" /> */}
                        </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div className="lastRow sm:gap-4 md:gap-8 mx-4 sm:mx-8 mt-6 relative">
            <div className="firstColumn max-sm:hidden rounded-lg ">
                <div className="user-profile bg-gray-100 hover:bg-gray-100/80 rounded-xl  justify-center flex-col gap-3 leading-tight items-center pb-5 border border-gray-400/50">
                    <div className="banner-image h-16 w-full relative flex flex-col justify-center items-center border-b border-gray-400/20">
                        {/* <img className="h-full w-full object-cover object-center rounded-t-xl" src={user.banner_image} alt="" srcSet="" /> */}
                        <BannerImage image={user.banner_image} className="h-full w-full object-fit object-center rounded-t-xl" />
                    <div className="profile-banner-image absolute top-[50%]">
                        <div className="chat-icon w-[70px] h-[70px] p-[2px] bg-[#c7ae6a] rounded-full">
                        <Link href={getProfileLink(user.username)}>
                            <ProfileImage image={user.profile_image} />
                            {/* <img className="object-cover object-center rounded-full w-full h-full cursor-pointer ab" src={user.profile_image} alt="" /> */}
                        </Link>
                        </div>
                    </div>
                    </div>
                    <div className="user-details textce flex flex-col flex-wrap mt-14 items-center px-2 justify-center text-center">
                        <a href={getProfileLink(user.username)} className="text-base font-semibold  hover:underline">{user.first_name}{" "}{user.middle_name}{" "}{user.last_name}</a>
                        <p className="text-xs mt-1 text-gray-800/70">{user.headline}</p>
                    </div>
                    <div className="user-details textce flex flex-col flex-wrap pt-5 px-5 gap-y-2">
                        <a href="/" className="text-xs font-medium flex justify-between">
                            <span className="text-gray-800/70">Profile viewers</span>
                            <span className="text-[#ae8c2d]">79</span>
                        </a>
                        <a href="/" className="text-xs font-medium flex justify-between">
                            <span className="text-gray-800/70">Profile viewers</span>
                            <span className="text-[#ae8c2d]">10</span>
                        </a>
                    </div>
                </div>
                <div className="siderbar bg-gray-100 px-2.5 py-2 rounded-xl mt-3 border border-gray-400/50">
                    <ul className="flex flex-col">
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/trending.png" alt="" />Trending</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href={route('event.index')}><img className="h-7 w-7 mr-2" src="/img/events.png" alt="" />Events</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/saved.png" alt="" />Saved</a></li>
                    </ul>
                </div>
                <div className="sidebar2 bg-gray-100 px-2.5 py-2 rounded-xl mt-3 mb-2 border border-gray-400/50">
                    <div className="groups">
                        <h2 className="px-2 py-2 hover:underline text-gray-800/70 font-semibold">Your groups</h2>
                        <div className="group-links">
                            <ul className="flex flex-col">
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/tu_logo.png" alt="" srcSet="" />MMC Itians, Npj</a></li>
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/hackathon.png" alt="" />MMC Hackathon 2081</a></li>
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/icon.png" alt="" />Student Sanjal Official</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="midColumn rounded-lg">
                <div className="mobile-down-navbar flex gap-14 md:hidden bg-gray-100 justify-center rounded-xl px-2.5 py-3 mb-4 h-14">
                    <div className="Home-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-home-7-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href={route('myNetwork')} className="flex flex-col items-center">
                            <i className="ri-group-3-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Job-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-group-line text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Events-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href={route('event.index')} className="flex flex-col items-center">
                            {/* <i className="ri-group-line text-[20px] hover:text-2xl"></i> */}
                            <i className="ri-calendar-event-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Notification-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-notification-3-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                </div>

                {/* Stories  */}

                {story}

                {/* What's on your mind  */}

                {whatOnYourMind}

                {/* posts  */}
                <div className="posts mb-5">
                    {children}
                </div>

            </div>
            {(chat|| connectionRequest ||peopleYouMayKnow) && (
                <div className="lastColumn rounded-lg max-md:hidden">

                {/* Chat */}

                {chat}

                {/* Connection Request  */}

                {connectionRequest}


                {/* People you may know */}

                {peopleYouMayKnow}

            </div>
            )}

        </div>
    </div>
  )
}

export default HomeLayout;
