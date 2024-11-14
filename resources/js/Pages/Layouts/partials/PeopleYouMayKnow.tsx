import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

const PeopleYouMayKnow = () => {
    const {recommendingUsers} = usePage<PageProps>().props.auth;
    // console.log(recommendingUsers);


    const getProfileLink:any = (username?: string, otherUsername?:string,otherId?:number) => {
        if(username){
            return username ? window.route('showProfile', username) : window.route('updateProfile');
        }else if(otherUsername) {
            return otherUsername ?? window.route('showProfile', otherUsername);
        } else if(otherId) {
            return otherId ?? window.route('showProfileById', otherId)

        }{
        }
    };
  return (
    <>
    {recommendingUsers && recommendingUsers.length > 0 &&(
        <div className="connection-recommendation bg-gray-100 rounded-xl border border-gray-400/50">
            <div className="title px-3 py-2.5 flex justify-between">
                <h2 className="font-semibold hover:underline">People you may know</h2>
                <a href="" className="text-sm font-medium px-2 py-1 hover:bg-gray-200 rounded-md">See all</a>
            </div>
            {recommendingUsers.map((user:any)=>(
                <div key={user.id} className="recommendation-item pb-2 border-b-2 border-gray-200">
                <div className="recommendation-profile px-2.5 py-2 bg-gray-100 rounded-xl flex gap-3 leading-tight items-center">
                    <div className="recommendation-icon w-16 h-16 p-[3px] bg-[#c7ae6a] rounded-full max-md:hidden">
                        <img className="object-cover object-center rounded-full w-full h-full" src={user.profile_image} alt="" />
                    </div>
                    <div className="recommendation-details">
                        <p className="recommendation-person-name text-base font-semibold flex items-center gap-1">
                            {user.first_name} {user.middle_name} {user.last_name}
                            <i title="Verified" className={`ri-verified-badge-fill text-[#b99a45] text-base leading-none ${user.account_status=='goldTick'?'block':'hidden'}`}></i>
                        </p>
                        <p className="recommendation-person-headline text-sm text-gray-700/80">{user.headline}</p>
                        <p className="text-xs text-gray-700/80">4 mutual connections</p>
                    </div>
                </div>
                <div className="recommendation-options px-3 flex gap-4 my-1">
                    <button className="bg-[#c7ae6a] px-6 py-2 rounded-full text-white font-semibold hover:bg-[#b99a45] flex items-center" type="submit">
                        <Link href={getProfileLink(user.username)}>
                            <i className="ri-user-add-fill mr-1"></i>
                            Connect
                        </Link>
                    </button>
                </div>
            </div>
            ))}
        </div>)}
    </>
  )
}

export default PeopleYouMayKnow
