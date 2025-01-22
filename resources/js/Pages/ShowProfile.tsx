import { Head, Link, usePage } from "@inertiajs/react";
import HomeLayout from "./Layouts/HomeLayout";
import { PageProps } from "@/types";
import React, { useEffect, useState } from "react";
import TimeAgo from "./Layouts/TimeAgo";
import ProfileImage from "./Layouts/partials/ProfileImage";
import axios from "axios";
import Modal from "@/Components/Modal";

const ShowProfile = () => {

    const authUser = usePage<PageProps>().props.auth.user;
    const { his_posts,user,following,followers, totalFollowers, totalConnections,firstTwoFollowers,remainingCount,userSkills} = usePage<PageProps>().props;

    const [hisPosts, setHisPosts] = useState<any[]>([]);

    useEffect(() => {
    if (his_posts && user) {
        const userPosts = his_posts.filter((post: any) => post.user_id === user.id);
        setHisPosts(userPosts);
    }
    }, [his_posts, user]);


    const [isFollowing, setIsFollowing] = useState(false);
    const userId = user.id;

    useEffect(() => {
        const checkFollowingStatus = async () => {
        try {
            const response = await axios.get(`/followStatus/${userId}`);
            setIsFollowing(response.data.isFollowing);
        } catch (error) {
            console.log('Error checking follow status', error);
        }
        };
        checkFollowingStatus();
    }, [userId]);

    const toggleFollow = async () => {
        try {
        const response = await axios.get(`/toggleFollow/${userId}`);
        setIsFollowing(response.data.isFollowing);
        } catch (error) {
        console.log('Error following/unfollowing user', error);
        }
    }
    const isImage = (media: string) => {
        return media.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
    };

    const isVideo = (media: string) => {
        return media.match(/\.(mp4|webm|ogg)$/i);
    };

    const [showModal, setShowModal] = useState(false);
    const [postMedia, setPostMedia] = useState<string>();
    const [postDescription, setPostDescription] = useState<string>();

    const handlePostShow = (media:string,description:string)=>{
        console.log(media,description);
        setShowModal(true);
        setPostMedia(media);
        setPostDescription(description);
        // console.log(postMedia,postDescription)
    }
    const closePostShow =()=>{
        setShowModal(false);
        setPostMedia('');
        setPostDescription('');
    }

  return (
    <HomeLayout>
        <Head title={`${user.first_name}'s Profile`} />
      <div className="show-profile bg-gray-100 rounded-lg mb-10">
        <div className="image relative flex justify-start">
          <div className="banner_image rounded-t-lg h-24 w-full">
            <img
              className="rounded-t-lg h-full w-full object-fit md:object-fit"
              src={user.banner_image}
              alt=""
            />
          </div>
          <div className="profile_image absolute w-28 h-28 top-10 bg-gray-100 rounded-full p-1 left-3">
            <ProfileImage image={user.profile_image}/>
            {/* <img className="w-full rounded-full" src={user.profile_image} alt="" /> */}
          </div>
        </div>
        <div className="intro mt-16 px-3">
          <span className="font-semibold text-lg leading-normal flex items-center gap-1">{user.first_name}{" "}{user.middle_name}{" "}{user.last_name}
            <i title="Golden Badge" className={`ri-verified-badge-fill text-[#b99a45] text-base leading-none ${user.account_status=='goldBadge'?'block':'hidden'}`}></i>
          </span>
          <span className="block text-sm font-normal text-gray-800/90">{user.headline}</span>
          <span className="block text-[13px] font-normal leading-loose text-gray-800/70">{user.address}</span>
          <div className="flex items-center gap-2">
            <h1 className="inline-block text-gray-800/90 text-sm">{totalFollowers} Followers</h1>
            <i className="ri-circle-fill text-[3px]"></i>
            <h1 className="inline-block text-gray-800/90 text-sm">{totalConnections} Connections</h1>
          </div>
          {followers?.length > 0 && (
            // <span className="text-sm text-gray-900/95">{followerText}</span>
            <h1 className="text-sm text-gray-900/95">
                Followed by{' '}
                {remainingCount <=0 ? (
                <>
                    {firstTwoFollowers.map((follower:any, index:number) => (
                        <span key={follower.id}>
                            <Link href={follower.username} className="font-medium">{follower.first_name}</Link>
                            {index < firstTwoFollowers.length - 1 ? ' and ' : ''}
                        </span>
                    ))}
                </>):
                (<>
                    {firstTwoFollowers.map((follower:any, index:number) => (
                        <span key={follower.id}>
                            <Link href={follower.username} className="font-medium">{follower.first_name}</Link>
                            {index < firstTwoFollowers.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                    {` and ${remainingCount} others`}
                </>)}
            </h1>

            )}
        </div>

        {authUser.id !==user.id && ( <div className="cta-btn flex gap-3 px-3 py-2.5">
            {/* <button className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] hover:bg-[#b99a45] rounded-full"
            onClick={() => handleFollowBtn(user.id)}>
            {followed ? "Following" : "+ Follow"}
            </button> */}
            <>
            <button onClick={toggleFollow} className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] hover:bg-[#b99a45] rounded-full">{isFollowing ? "Following":"Follow"}
            </button>
            <Link href={window.route('chatss.start',user.id)}>
                <button className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] hover:bg-[#b99a45] rounded-full">Message</button>
            </Link>
            <button className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] hover:bg-[#b99a45] rounded-full">More</button>
            </>
        </div>)}

        {userSkills.length!==0 ? (
        <div className="skills px-3 py-3 border-t-2">
            <strong className="font-semibold leading-none text-base">{`${user.first_name}'s Skills:`}</strong>
            <p className="flex gap-2 flex-wrap">
                {userSkills.map((skill:any,index:number)=>(
                    <div key={skill.id} >
                        <span className="text-sm leading-tight">{skill.name}</span>
                        {index < userSkills.length - 1 ? ', ' : ''}
                    </div>
                ))}
            </p>
        </div>):""}

        <div className="all-activities px-3 py-3 border-t-2 mt-2">
          <div className="btn flex gap-3">
            <button className="bg-gray-200 hover:bg-black hover:text-white px-3 py-1 rounded-full">Posts</button>
            <button className="bg-gray-200 hover:bg-black hover:text-white px-3 py-1 rounded-full">Comments</button>
          </div>
          <div className="border-b-2 border-gray-200/50 pb-3"></div>
          {(hisPosts.length ===0)?(
              <p className="text-lg my-10 text-center font-medium">No posts available</p>
          ):(
            <>
                {hisPosts.map((post: any) => (
                <div key={post.id} className="post bg-gray-100 mt-4 rounded-xl px-3 py-3 border border-gray-400/50">
                    <div className="posts-user-profile bg-gray-100 rounded-xl flex gap-3 leading-tight items-center h-12">
                    <div className="posts-users-icon w-11 h-11 p-[2.5px] bg-[#c7ae6a] rounded-full">
                        <img
                        className="object-cover object-bottom rounded-full w-10 h-full"
                        src={user.profile_image}
                        alt=""
                        />
                    </div>
                    <div className="name-other flex justify-between w-[86%] lg:w-[89%] items-center">
                        <div className="posts-details">
                        <div className="user-name">
                            <strong className="text-sm leading-tight font-semibold block">
                            {user.first_name} {user.middle_name} {user.last_name}
                            </strong>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] inline-block">
                            <TimeAgo date={post.created_at}/>
                            </span>
                            <i className="ri-circle-fill text-[3px]"></i>
                            <span className="inline-block">
                            <i className="ri-group-fill text-sm"></i>
                            </span>
                        </div>
                        </div>
                        <div className="posts-action flex justify-end gap-3">
                        <div className="post-option-btn rotate-90">
                            <i className="ri-more-2-fill rotate-180 text-lg cursor-pointer p-1 rounded-md hover:bg-gray-300/60"></i>
                        </div>
                        <div className="post-option-btn">
                            <i className="ri-close-line text-xl cursor-pointer p-[3px] rounded-md hover:bg-gray-300/60"></i>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="post_description px-1 my-2">
                    <span className="text-gray-700">{post.post_description}</span>
                    </div>
                    {post.media && (
                    <div className="posts-media mt-3 rounded-md flex justify-center border-b-[1.6px] border-t-[1.6px] h-80">
                        {isImage(post.media) ? (
                            <img
                                className="rounded-md cursor-pointer h-full w-fit"
                                src={post.media}
                                alt="Post media"
                                onClick={() => handlePostShow(post.media, post.post_description)}
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="hs-scale-animation-modal"
                                data-hs-overlay="#hs-scale-animation-modal"/>
                        ) : isVideo(post.media) ? (
                            <video
                                className="rounded-md cursor-pointer h-full w-fit"
                                src={post.media}
                                controls
                                onClick={() => handlePostShow(post.media, post.post_description)}
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="hs-scale-animation-modal"
                                data-hs-overlay="#hs-scale-animation-modal"/>
                        ) : null}
                    </div>)}
                    <div className="post-interaction mt-1 px-2">
                    <div className="interaction-counts flex justify-between">
                        <div className="like-count">
                        <i className="ri-heart-3-fill text-gray-100 p-[2px] bg-red-500 rounded-full mr-2 cursor-pointer"></i>
                        <span className="cursor-pointer hover:underline text-sm">{post.post_like_count}</span>
                        </div>
                        <div className="comment-count">
                        <span className="cursor-pointer hover:underline text-sm">{post.post_comment_count}</span>
                        <i className="ri-chat-2-line text-gray-800 ml-2 p-[2px] cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="interaction-btn flex justify-between mt-[2px] py-1 border-b-[1.6px] border-t-[1.6px]">
                        <div className="like w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                        <i className="ri-heart-3-line text-lg"></i>
                        </div>
                        <div className="comment w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                        <i className="ri-chat-2-line text-lg"></i>
                        </div>
                        <div className="share w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                        <i className="ri-share-forward-line text-lg"></i>
                        </div>
                    </div>
                    </div>
                    {showModal && (
                        <div className="modal top-10">
                            <Modal
                                show={showModal}
                                onClose={() => setShowModal(false)} // Corrected function syntax
                                maxWidth="md"
                                closeable={true}>
                                <div className="p-6">
                                    <img className="rounded-md cursor-pointer w-full object-cover" src={postMedia ?? postMedia} alt="Post media" onClick={closePostShow} />
                                    <p className="mt-4">{postDescription}</p>
                                </div>
                            </Modal>
                        </div>
                        )}
                </div>
                ))}
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ShowProfile;
