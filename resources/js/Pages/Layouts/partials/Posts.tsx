import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import TimeAgo from '../TimeAgo';
import Modal from '@/Components/Modal';
import ProfileImage from './ProfileImage';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

interface FormData {
    reason_to_remove_post: string;
}

const Posts = () => {
    const { flash ,latest_comment} = usePage<PageProps>().props;
    const { user,savedPosts} = usePage<PageProps>().props.auth;
    // console.log(savedPosts)
    const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
        reason_to_remove_post: ""
    });

    const [showCommentSetting,setShowCommentSetting] = useState(false);
    const [commentId,setCommentId] = useState();
    const [commentOwnerId,setCommentOwnerId] = useState();
    const [postIdToRemove, setPostIdToRemove] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [postMedia, setPostMedia] = useState<string>();
    const [postDescription, setPostDescription] = useState<string>();

    const [activeCommentId, setActiveCommentId] = useState<number | null>(null); // State to track which comment's menu is active

    const handleShowCommentSetting = (commentId: number) => {
        setActiveCommentId(activeCommentId === commentId ? null : commentId); // Toggle menu visibility
    };

    const handleEditComment = (commentId: number) => {
        console.log(`Edit comment ${commentId}`);
    };

    const handleDeleteComment = (commentId: number) => {
        console.log(`Delete comment ${commentId}`);
    };

    const handleHideComment = (commentId: number) => {
        console.log(`Hide comment ${commentId}`);
    };

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

    // const handleShowCommentSetting =(commentId:any,ownerId:any) =>{
    //     setShowCommentSetting(!showCommentSetting);
    //     setCommentId(commentId);
    //     setCommentOwnerId(ownerId);
    // }

    let [latest_posts ,setLatestPosts] = useState([]);
    let [latest_comments,setLatestComments] = useState([]);
    const [postLikedByUser,setPostLikedByUser]=useState([]);
    const loadLatestPost = async ()=>{
        try {
            const response = await axios.get('/posts/showPosts')
            setLatestPosts(response.data.latestPosts);
            setPostLikedByUser(response.data.postLikedByUser);

        } catch (error) {

        }
    }

    useEffect(()=>{
        loadLatestPost();
    },[]);

    // console.log(latest_posts)
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

    const [createComment,setCreateComment] = useState(false);
    const [comment,setComment] = useState('');
    const [allComments,setAllComments] = useState([]);
    const [showAllComments,setShowAllComments] = useState(false);

    const [showPostMenu,setShowPostMenu] = useState(false);
    const [isPostSaved,setIsPostSaved] = useState(false);
    const toggleRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (toggleRef.current && !toggleRef.current.contains(event.target)) {
    //       setShowPostMenu(false);
    //     }
    //   };
    const handleToggle = () => {
        setShowPostMenu((prev) => !prev);
      };

      // Add and clean up event listener for clicks outside
    //   useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //       document.removeEventListener("mousedown", handleClickOutside);
    //     };
    //   }, []);

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

    const showAllCommentHandler = async(postId:number)=>{
        setShowAllComments(!showAllComments);
        try {
            const data ={
                post_id:postId
            }
            const response = await axios.post('/postComment/allComments',data)
           setAllComments(response.data.allComments);
        } catch (error) {
            console.log("Error",error)
        }

    }

    const handleComment =async (postId:number, userId:number) => {
        const data = {
            post_id: postId,
            user_id: userId,
            comment
        }
        try {
            const response = await axios.post('/postComment/commentOnThePost',data);
            if(response.data.success){
                loadLatestPost();
                setShowAllComments(true);
                setCreateComment(false);
                setComment('');
            }
        } catch (error) {
            console.error('Error liking the post', error);
        }
    }

    const handleRemovePost = (postId: number) => {
        setPostIdToRemove(postId);
    };

    const handleUndoRemove = () => {
        setPostIdToRemove(null);
    };

    const isImage = (media: string) => {
        return media.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
    };

    const isVideo = (media: string) => {
        return media.match(/\.(mp4|webm|ogg)$/i);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('post.destroy', postIdToRemove), {
            onSuccess: () => {
                setPostIdToRemove(null);
            }
        });
    };

    const getProfileLink = (username?: string) => {
        return username ? route('showProfile', username) : route('updateProfile');
    };

    return (
        <>
            {latest_posts.map((post: any) => {

                const isLiked = postLikedByUser.some((postLike:any) =>
                    postLike.post_id === post.id && postLike.like_status === 1
                );

                const isSaved = savedPosts.some(
                    (savedPost:any) => savedPost.post_id === post.id
                );
                return (
                    <div key={post.id} className="post bg-gray-100 mt-3 rounded-xl px-3 py-3 border border-gray-400/50">
                        {postIdToRemove === post.id ? (
                            <div className="post-removal">
                                <div className="heading flex justify-between py-2 border-b border-gray-300/80">
                                    <h1 className="text-sm font-medium">Post removed from your feed</h1>
                                    <span className="text-[#b99a45] font-medium cursor-pointer" onClick={handleUndoRemove}>Undo</span>
                                </div>
                                <div className="reason-to-remove flex flex-col gap-3 py-3">
                                    <p className="text-gray-600 text-[12.5px] md:text-[13px]">Tell us more to help improve your feed.</p>
                                    <form onSubmit={submit}>
                                        <div className="remove-reason-form flex flex-col gap-2">
                                            <div className="reason">
                                                <input
                                                    className="w-full rounded-full placeholder:text-xs md:placeholder:text-[13px]"
                                                    type="text"
                                                    name="reason_to_remove_post"
                                                    id="reason_to_remove_post"
                                                    value={data.reason_to_remove_post} // Corrected value
                                                    onChange={(e) => setData("reason_to_remove_post", e.target.value)}
                                                    placeholder="Must enter your reason to remove this post ..."
                                                />
                                            </div>
                                            <div className="remove-btn flex justify-end">
                                                <button className="bg-[#c7ae6a] px-2 py-1 rounded-md hover:text-gray-200 hover:bg-[#1a1a1a]" type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <>
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
                                                <Link href={route('showProfile', post.user.username)}>
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
                                                <i className="ri-more-2-fill rotate-90 block text-xl cursor-pointer  rounded-md hover:bg-gray-300/60" onClick={handleToggle} ref={toggleRef}></i>
                                                {showPostMenu ? (
                                                    <div className="post-menu absolute top-8 w-40 bg-gray-100 right-0 py-2 rounded-md flex flex-col gap-1 border border-gray-300 shadow-md">
                                                        <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2" onClick={()=>handleSavingPost(post.id,post.user.id)}>
                                                            <i className="ri-play-list-add-fill text-xl"></i>
                                                            <span className='text-sm'>{(isSaved || isPostSaved)?"Unsave":"Save"}</span>
                                                        </div>
                                                        <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2">
                                                            <i className="ri-feedback-fill text-xl pl-[1px]"></i>
                                                            <span className='text-sm text-nowrap'>Report post</span>
                                                        </div>
                                                    </div>
                                                ):""}
                                            </div>
                                            <div className="post-option-btn">
                                                <i className="ri-close-line text-xl cursor-pointer rounded-md p-1 hover:bg-gray-300/60" onClick={() => handleRemovePost(post.id)}></i>
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
                                        <div className="comment-count flex items-center cursor-pointer" onClick={()=>showAllCommentHandler(post.id)}>
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
                                        <div className="comment w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer" onClick={()=>setCreateComment(true)}>
                                            <i className="ri-chat-2-line text-lg"></i>
                                        </div>
                                        <div className="share w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                                            <i className="ri-share-forward-line text-lg"></i>
                                        </div>

                                    </div>
                                    {showAllComments && (
                                        <>
                                        {allComments.map((item: any, index: number) => (
                                            <div key={index} className="create-comment flex items-center py-1">
                                                <div className="create-comment flex items-center gap-1 lg:gap-4 py-1 relative">
                                                    <div className="user-profile">
                                                        <ProfileImage image={item?.user.profile_image} className="w-9 h-9 rounded-full object-cover object-fit" />
                                                    </div>
                                                    <div className="comment-box relative border border-gray-200 rounded-full">
                                                        <p className="bg-gray-200 px-2 py-1 rounded-md text-sm text-gray-700">{item?.comment}</p>
                                                    </div>
                                                    <div className="menu relative ml-3">
                                                        <i
                                                            className="ri-more-2-fill cursor-pointer block rotate-90 hover:bg-gray-200 py-1 px-[2px] rounded-md"
                                                            onClick={() => handleShowCommentSetting(item.id)} // Toggle the menu for the clicked comment
                                                        ></i>
                                                    </div>

                                                    {/* Show menu only if activeCommentId matches the current comment */}
                                                    {activeCommentId === item.id && (
                                                        <div className="comment-setting absolute top-0 -right-24 bg-gray-200 py-2 z-50 rounded-md w-auto px-3">
                                                            {/* <i className="ri-close-fill absolute right-1 top-0 hover:cursor-pointer" title='Close'></i> */}
                                                            {item.user.id === user.id ? (
                                                                <div className='flex gap-5'>
                                                                    <i className="ri-edit-2-fill hover:text-[#b99a45] cursor-pointer" title='Edit' onClick={() => handleEditComment(item.id)}></i>
                                                                    {/* <button className='hover:bg-gray-100 w-full px-2 py-1 text-start border-b border-gray-50 rounded-md' onClick={() => handleEditComment(item.id)}>Edit</button> */}
                                                                    <i className="ri-delete-bin-2-fill hover:text-red-600 cursor-pointer" title='Delete' onClick={() => handleDeleteComment(item.id)}></i>
                                                                    {/* <button className='hover:bg-gray-100 w-full px-2 py-1 text-start rounded-md' onClick={() => handleDeleteComment(item.id)}>Delete</button> */}
                                                                </div>
                                                            ) : (
                                                                <div className="hide-comment w-full hover:text-[#b99a45] rounded-sm">
                                                                    <button className='w-full' onClick={() => handleHideComment(item.id)}>
                                                                        <i className="ri-eye-off-fill" title='Hide comment'></i>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        </>
                                    )}


                                    {/* <div className="interaction-btn flex justify-center mt-[2px] py-1 border-b-[1.6px]"> */}
                                        {createComment &&(
                                            <div className="create-comment flex items-center gap-2 lg:gap-4 py-1">
                                                <div className="user-profile w-10">
                                                        <ProfileImage image={user.profile_image} className='w-10 h-10 rounded-full object-cover object-fit'/>
                                                </div>
                                                <div className="comment-box relative border border-gray-200 rounded-full w-86 lg:w-96 h-11">
                                                    <input className='rounded-full w-full h-full' type="text" name="comment" id="comment"
                                                    onChange={(e)=>setComment(e.target.value)}/>
                                                    {comment && (
                                                    <button className='bg-[#c7a36a] hover:bg-[#b99a45] text-gray-100 text-sm rounded-full px-2 py-[2px] absolute right-2 top-2.5 transition-transform ease-out duration-1000' type="submit" onClick={()=>handleComment(post.id,user.id)}>Comment</button>)}
                                                </div>

                                            </div>
                                        )}
                                    {/* </div> */}
                                </div>
                            </>
                        )}

                        {/* Modal */}
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
            )})}
        </>
    );
};

export default Posts;
