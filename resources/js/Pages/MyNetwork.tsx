import { Head, usePage } from "@inertiajs/react"
import CleanHomeLayout from "./Layouts/CleanHomeLayout"
import Sidebar from "./Layouts/partials/FullSidebar"
import { PageProps } from "@/types";
import ProfileImage from "./Layouts/partials/ProfileImage";
import TimeAgo from "./Layouts/TimeAgo";

const MyNetwork = () => {
    const {user,usersYouFollowed} = usePage<PageProps>().props.auth;
    console.log(usersYouFollowed)
    const getTimeAgo = (date: string) => {
        const now = new Date();
        const connectedTime = new Date(date);
        const diffInSeconds = Math.floor((now.getTime() - connectedTime.getTime()) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(days / 7);

        if (minutes < 60) {
            return `Connected ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (hours < 24) {
            return `Connected ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (days < 7) {
            return `Connected ${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else {
            return `Connected ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        }
    };


  return (
    <CleanHomeLayout>
        <Head title="My Network"/>
        <div className="events-page grid grid-cols-1 md:grid-cols-[repeat(1,.6fr),2fr] gap-5 min-h-screen pb-5">
            <div className="sidebar col-span-full md:col-span-1 md:block hidden">
                <Sidebar/>
            </div>
            <div className="my-network col-span-2 md:col-span-1 bg-gray-100 rounded-lg p-2">
                <h1 className="text-4xl text-center border-b-2 pt-2 pb-3 border-gray-300">Manage your connections</h1>
                <div className="connections  px-2 pt-4 pb-2">
                    {usersYouFollowed.map((user:any)=>(
                        <div key={user.id} className="user flex items-center justify-between max-sm:flex-col mb-2 border-b border-gray-300 pb-2 max-sm:pt-2 px-2 rounded-md hover:bg-gray-200">
                            <div className="user-profile flex max-md:flex-col items-center gap-3">
                                <ProfileImage image={user.profile_image} className="h-20 w-20 rounded-full p-1 object-cover object-center"/>
                                <div className="profile-details">
                                    <h1 className="font-mono flex items-center gap-1">{user.first_name} {user.middle_name} {user.last_name}
                                    <i className={`ri-verified-badge-fill text-[#b99a45] text-base leading-none ${user.account_status=='goldTick'?'block':'hidden'}`}></i></h1>
                                    <p className="text-sm text-gray-600 leading-snug">{user.headline}</p>
                                    <p className="text-xs text-gray-600">{getTimeAgo(user.created_at)}</p>
                                </div>
                            </div>
                            <div className="profile-action flex items-center lg:w-1/4 gap-8 lg:gap-5 max-sm:mt-1">
                                <span className="px-3 py-1 md:py-2 bg-[#c7ae6a] hover:bg-[#b99a45] rounded-md text-gray-900 hover:text-gray-200 font-medium cursor-pointer">Unfollow</span>
                                <span className="px-3 py-1 md:py-2 bg-[#c7ae6a] hover:bg-[#b99a45] rounded-md text-gray-900 hover:text-gray-200 font-medium cursor-pointer">Message</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default MyNetwork
