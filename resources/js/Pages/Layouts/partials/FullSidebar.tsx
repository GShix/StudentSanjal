import { Link, usePage } from "@inertiajs/react";
import BannerImage from "./BannerImage"
import { PageProps } from "@/types";
import ProfileImage from "./ProfileImage";

{/* <div className="siderbar bg-gray-100 px-2.5 py-2 rounded-xl mt-3 border border-gray-400/50">
    <ul className="flex flex-col">
        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/trending.png" alt="" />Trending</a></li>
        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/events.png" alt="" />Events</a></li>
        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/saved.png" alt="" />Saved</a></li>
    </ul>
</div> */}


const Sidebar = () => {
     const user = usePage<PageProps>().props.auth.user;

    const getProfileLink = (username?: string):any => {
        if(username){
            return username ? route('showProfile', username) : route('updateProfile');
        }
    };
  return (
    <div>
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
    </div>
  )
}

export default Sidebar
