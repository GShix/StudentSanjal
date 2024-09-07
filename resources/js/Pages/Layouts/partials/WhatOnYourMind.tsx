import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

const WhatOnYourMind = () => {
    const user = usePage<PageProps>().props.auth.user;

  return (
    <div className="what-on-your-min bg-gray-100 rounded-xl flex justify-between gap-2.5 px-2.5 py-4 border border-gray-400/50">
        <div className="chat-icon w-12 h-12 p-[2px] bg-[#c7ae6a] rounded-full relative">
            <img className="object-cover object-center rounded-full w-full h-full" src={user.profile_image} alt="" />
        </div>
        <div className="post-container w-[87%]">
            <div className="textarea mr-1">
                <textarea className="w-full rounded-lg p-2 text-gray-600 bg-gray-300/50 text-sm border-none h-12 lg:h-16 placeholder:text-gray-700/60" typeof="text" name="What's on your mind?" id="" placeholder="What's on your mind?"></textarea>
            </div>
            <div className="post-type h-4 mt-3 flex lg:gap-16 md:gap-12 gap-6 items-center">
                <Link href={route('post.index')} className="flex items-center gap-1 md:gap-2 hover:bg-gray-200 rounded-md px-1 sm:px-2 py-1">
                    <img className="h-4" src="/img/post-photo.png" alt="" srcSet="" />
                    <span className="max-sm:text-xs text-sm font-medium text-gray-700/60">Media</span>
                </Link>
                <Link href="" className="flex items-center gap-1 md:gap-2 hover:bg-gray-200 rounded-md px-1 sm:px-2 py-1">
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
