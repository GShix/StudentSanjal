import { Head, Link, usePage } from "@inertiajs/react"
import HomeLayout from "./Layouts/HomeLayout"
import { PageProps } from "@/types"
import TimeAgo from "./Layouts/TimeAgo";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

const SavedPost = () => {
    const {user} = usePage<PageProps>().props.auth;
    const {savedPosts} = usePage<PageProps>().props;

    // console.log(savedPosts)

    const [postLikedByUser,setPostLikedByUser]=useState([]);
    const loadLatestPost = async ()=>{
        try {
            const response = await axios.get('/posts/showPosts')
            // setLatestPosts(response.data.latestPosts);
            setPostLikedByUser(response.data.postLikedByUser);

        } catch (error) {

        }
    }

    useEffect(()=>{
        loadLatestPost();
    },[]);
    const [isLiked, setIsLiked] = useState(false);
    const handlePostLike = async (postId:number, userId:number) => {
        const data = {
            post_id: postId,
            user_id: userId,
        }
        try {
            const response = await axios.post('/postLike/isLiked',data);
            setIsLiked(response.data.isLiked);
            loadLatestPost();
        } catch (error) {
            console.error('Error liking the post', error);
        }
    };
    const handlePostShow = (media:string,description:string)=>{
        console.log(media,description);
        // setShowModal(true);
        // setPostMedia(media);
        // setPostDescription(description);
        // console.log(postMedia,postDescription)
    }
    const closePostShow =()=>{
        // setShowModal(false);
        // setPostMedia('');
        // setPostDescription('');
    }
    const isImage = (media: string) => {
        return media.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
    };

    const isVideo = (media: string) => {
        return media.match(/\.(mp4|webm|ogg)$/i);
    };


    const [showPostMenu,setShowPostMenu] = useState(false);
    const [isPostSaved,setIsPostSaved] = useState(false);
    const toggleRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (toggleRef.current && !toggleRef.current.contains(event.target)) {
    //       setShowPostMenu(false);
    //     }
    //   };
    const [openPostId, setOpenPostId] = useState(null);
    const handleToggle = (postId:any) => {
        setOpenPostId(prevPostId => (prevPostId === postId ? null : postId));
        setShowPostMenu((prev) => !prev);
      };
    const handleSavingPost =async(postId:number,postOwnerId:number)=>{
        const data ={
            user_id:user.id,
            post_id:postId,
            owner_id:postOwnerId,
        }
        try {
            const response = await axios.post('/toggleSavePost',data);
            if(response.data.success){
                setShowPostMenu(false);
                setIsPostSaved(response.data.isSaved)
            }
        } catch (error) {
            console.error("Error",error);
        }
    }
    const getProfileLink = (username?: string) => {
        return username ? window.route('showProfile', username) : window.route('updateProfile');
    };
  return (
    <HomeLayout>
        <Head title="Saved"/>
        <ToastContainer/>
        <div>
            <div className="tag">
                <h2 className="ml-2">Your Saved Posts</h2>
            </div>
            {savedPosts.map((post:any)=>(
            <div key={post.id} className="post bg-gray-100 mt-3 rounded-xl px-3 py-3 border border-gray-400/50">
                <div className="posts-user-profile bg-gray-100 rounded-xl flex gap-3 leading-tight items-center h-12">
                    <div className="posts-users-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative flex justify-end">
                        <Link href={getProfileLink(post.user.username)}>
                            <img className="object-cover object-bottom rounded-full w-10 h-full" src={post.user.profile_image} alt="" />
                        </Link>
                        <div className={`${post.user.active_status ? 'block' : 'hidden'} bg-green-500 w-[10px] h-[10px] border-[1.5px] border-white rounded-full absolute bottom-[2px] right-[1px]`}></div>
                    </div>
                    <div className="name-other flex justify-between w-[86%] lg:w-[89%] items-center">
                        <div className="posts-details">
                            <div className="user-name">
                                <Link href={window.route('showProfile', post.user.username)}>
                                    <strong className="text-sm leading-tight font-semibold block hover:underline">{post.user.first_name} {post.user.middle_name} {post.user.last_name}</strong>
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] inline-block">
                                    <TimeAgo date={post.created_at} />
                                </span>
                                <i className="ri-circle-fill text-[3px]"></i>
                                <span className="inline-block"><i className="ri-group-fill text-sm"></i></span>
                            </div>
                        </div>
                        <div className="posts-action flex justify-end gap-3 relative">
                            <div className="post-option-btn">
                                <i className="ri-more-2-fill rotate-90 block text-xl cursor-pointer  rounded-md hover:bg-gray-300/60" onClick={handleToggle(post.id)} ref={toggleRef}></i>
                                {(showPostMenu && openPostId === post.id) ? (
                                    <div className="post-menu absolute top-8 w-40 bg-gray-100 right-0 py-2 rounded-md flex flex-col gap-1 border border-gray-300 shadow-md">
                                        <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2" onClick={()=>handleSavingPost(post.id,post.user.id)}>
                                            <i className="ri-play-list-add-fill text-xl"></i>
                                            <span className='text-sm'>{( isPostSaved)?"Unsave":"Save"}</span>
                                        </div>
                                        <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2">
                                            <i className="ri-feedback-fill text-xl pl-[1px]"></i>
                                            <span className='text-sm text-nowrap'>Report post</span>
                                        </div>
                                    </div>
                                ):""}
                            </div>
                            <div className="post-option-btn">
                                <i className="ri-close-line text-xl cursor-pointer rounded-md p-1 hover:bg-gray-300/60"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post_description px-1 my-2">
                    <span className="text-gray-700">{post.post_description}</span>
                </div>
                <div className="posts-media mt-3 rounded-md flex justify-center border-b-[1.6px] border-t-[1.6px] h-80">
                {post.media && (
                    <>
                        {isImage(post.media) ? (
                            <img
                                className="rounded-md cursor-pointer object-contain"
                                src={post.media}
                                alt="Post media"
                                onClick={() => handlePostShow(post.media, post.post_description)}
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="hs-scale-animation-modal"
                                data-hs-overlay="#hs-scale-animation-modal"
                            />
                        ) : isVideo(post.media) ? (
                            <video
                                className="rounded-t-lg cursor-pointer h-full"
                                src={post.media}
                                controls
                                onClick={() => handlePostShow(post.media, post.post_description)}
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="hs-scale-animation-modal"
                                data-hs-overlay="#hs-scale-animation-modal"
                            />
                        ) : null}
                    </>
                    )}
                </div>
                <div className="post-interaction mt-1 px-2">
                    <div className="interaction-counts flex justify-between">
                        <div className="like-count cursor-pointer hover:bg-red-500">
                            {post.post_like_count ? (<i className="ri-heart-3-fill text-gray-100 p-[2px] bg-red-500 rounded-full mr-2 cursor-pointer"></i>):""}
                            <span className="cursor-pointer hover:underline text-sm" id={`like-count-${post.id}`}>
                                {post.post_like_count <= 0 ? "" : post.post_like_count}
                            </span>
                        </div>
                        <div className="comment-count flex items-center cursor-pointer">
                            <span className="cursor-pointer hover:underline text-sm">{post.post_comment_count}</span>
                            <i className="ri-chat-2-line text-gray-800 ml-2"></i>
                        </div>
                    </div>
                    <div className="interaction-btn flex justify-between mt-[2px] py-1 border-b-[1.6px] border-t-[1.6px]">
                        <div className="like w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer"
                        onClick={()=>handlePostLike(post.id,user.id)}>
                            {/* <i className="ri-heart-3-line text-lg"></i> */}
                            <i className={`${isLiked || postLikedByUser.includes(post.id) ?"ri-thumb-up-fill text-lg":"ri-thumb-up-line"}`}></i>
                        </div>
                        <div className="comment w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                            <i className="ri-chat-2-line text-lg"></i>
                        </div>
                        <div className="share w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                            <i className="ri-share-forward-line text-lg"></i>
                        </div>

                    </div>
                </div>
            </div>
            ))}

        </div>
    </HomeLayout>
  )
}

export default SavedPost
