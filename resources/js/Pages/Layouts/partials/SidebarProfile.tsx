

import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

const SidebarProfile = () => {
    const user = usePage<PageProps>().props.auth.user;

  return (
    <div className="user-profile bg-gray-100 hover:bg-gray-100/80 rounded-xl  justify-center flex-col gap-3 leading-tight items-center pb-5 border border-gray-400/50">
        <div className="banner-image h-16 w-full relative flex flex-col justify-center items-center border-b border-gray-400/20">
            <img className="h-full w-full object-cover object-center rounded-t-xl" src="/img/banner.jpg" alt="" srcSet="" />
        <div className="profile-banner-image absolute top-[50%]">
            <div className="chat-icon w-[70px] h-[70px] p-[2px] bg-white rounded-full relative">
                <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-[5px] right-2">
                    <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                </div>
                <img className="object-cover object-center rounded-full w-full h-full cursor-pointer ab" src="/img/lady1.jpg" alt="" />
            </div>
        </div>
        </div>
        <div className="user-details textce flex flex-col flex-wrap mt-14 items-center">
            <a href="/" className="text-base font-semibold  hover:underline">{user.first_name}{" "}{user.username}</a>
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
  )
}

export default SidebarProfile
