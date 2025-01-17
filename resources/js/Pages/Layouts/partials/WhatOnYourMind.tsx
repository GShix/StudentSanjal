import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import ProfileImage from "./ProfileImage";

const WhatOnYourMind = () => {
    const user = usePage<PageProps>().props.auth.user;

  return (
    <div className="what-on-your-mind bg-gray-100 rounded-xl flex justify-between gap-2.5 px-2.5 py-4 border border-gray-400/50">
        <div className="chat-icon w-12 h-12 p-[2px] bg-[#c7ae6a] rounded-full relative">
            {/* <img className="object-cover object-center rounded-full w-full h-full" src={user.profile_image} alt="" /> */}
            <ProfileImage image={user.profile_image} className="cursor-auto w-full h-full object-cover rounded-full"/>
        </div>
        <div className="post-container w-[87%]">
            <div className="textarea mr-1  border-b pb-2.5 border-gray-300">
                <Link href={window.route('post.index')}>
                    <button className="w-full text-start rounded-full py-2 px-4 text-gray-600 bg-gray-200 hover:bg-gray-300/70 border-[1px] border-gray-400/50 text-sm h-12 lg:h-12 placeholder:text-gray-700/60" name="What's on your mind?" id="">{`What's on your mind, ${user.first_name}?`}</button>
                </Link>
            </div>
            <div className="post-type h-4 mt-3 flex lg:gap-16 md:gap-12 gap-6 items-center">
                <Link href={window.route('post.index')} className="flex items-center gap-1 md:gap-2 hover:bg-gray-200 rounded-md px-1 sm:px-2 py-1">
                    <img className="h-4" src="/img/post-photo.png" alt="" srcSet="" />
                    <span className="max-sm:text-xs text-sm font-medium text-gray-700/60">Media</span>
                </Link>
                <Link href={window.route('event.create')} className="flex items-center gap-1 md:gap-2 hover:bg-gray-200 rounded-md px-1 sm:px-2 py-1">
                    <img className="h-5" src="/img/events.png" alt="" srcSet="" />
                    <span className="max-sm:text-xs text-sm font-medium text-gray-700/60">Event</span>
                </Link>
                <Link href="" className="flex items-center gap-1 md:gap-2 hover:bg-gray-200 rounded-md px-1 sm:px-2 py-1">
                    <img className="h-4" src="/img/write_article.png" alt="" srcSet="" />
                    <span className="max-sm:text-xs text-sm font-medium text-gray-700/60">Write article</span>
                </Link>
            </div>
        </div>
    </div>

  )
}

export default WhatOnYourMind
