import { Head, usePage } from "@inertiajs/react"
import CleanHomeLayout from "./Layouts/CleanHomeLayout"
import Sidebar from "./Layouts/partials/FullSidebar"
import { PageProps } from "@/types";
import ProfileImage from "./Layouts/partials/ProfileImage";

const MyNetwork = () => {
    const {user,usersYouFollowed} = usePage<PageProps>().props.auth;
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
                            <div className="user-profile flex max-md:flex-col items-center">
                                <ProfileImage image={user.profile_image} className="h-20 w-20 rounded-full p-1"/>
                                <h1 className="font-mono">{user.first_name} {user.middle_name} {user.last_name}</h1>
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
