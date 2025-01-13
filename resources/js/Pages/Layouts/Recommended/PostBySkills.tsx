import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TimeAgo from '../TimeAgo';
import ShowPostMedia from '../partials/ShowPostMedia';
import ShowAllComments from '../partials/ShowAllComments';
import CreateComment from '../partials/CreateComment';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

const PostBySkills = () => {
  const { user,savedPostIds} = usePage<PageProps>().props.auth;
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [remainingPosts, setRemainingPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

// console.log(recommendedPosts)

  const loadPostsBySkills = async (page = 1) => {
    try {
      const response = await axios.get('/recommendation/by-skills', {
        params: { page }, // Pass the current page for pagination
      });
      if (page === 1) {
        setRecommendedPosts(response.data.recommendedPosts);
      }
      setRemainingPosts((prevPosts):any => [
        ...prevPosts,
        ...response.data.remainingPosts.data, // Append new posts
      ]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    loadPostsBySkills();
  }, []);

  // Handle "Show More" functionality
//   const handleShowMore = () => {
//     setCurrentPage((prevPage) => prevPage + 1);
//     loadPostsBySkills(currentPage + 1);
//   };
  const followUser = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    loadPostsBySkills(currentPage + 1);
  };

  const [isLiked, setIsLiked] = useState(false);
  const [allComments,setAllComments] = useState([]);
  const [showAllComments,setShowAllComments] = useState(false);
  const [activePostIdShowComment, setActivePostIdShowComment] = useState(Number);
  const showAllCommentHandler = async(postId:number)=>{
    setActivePostIdShowComment(postId)
    setShowAllComments(!showAllComments);
    try {
        const data ={
            post_id:postId
        }
        const response = await axios.post('/postComment/allComments',data)
       setAllComments(response.data.allComments);
       loadPostsBySkills();
        } catch (error) {
            console.log("Error",error)
        }
    }
    const handlePostLike = async (postId:number, userId:number) => {
        const data = {
            post_id: postId,
            user_id: userId,
        }
        try {
            const response = await axios.post('/postLike/isLiked',data);
            setIsLiked(response.data.isLiked);
            loadPostsBySkills();
        } catch (error) {
            console.error('Error liking the post', error);
        }
    }

    const [createComment,setCreateComment] = useState(false);
    const [activePostIdToComment, setActivePostIdToComment] = useState(Number);
    const handleCreateComment = (postId:number)=>{
        setActivePostIdToComment(postId);
        setCreateComment(true);
    }

    const getProfileLink = (username?: string) => {
        return username ? window.route('showProfile', username) : window.route('updateProfile');
    };

  return (
    <div className="posts-section">
        {recommendedPosts.map((post: any) => {
            // const isSaved = savedPostIds.some(
            //     (savedPost:any) => savedPost.post_id === post.id
            // );
            return (
                <div key={post.id} className="post bg-gray-100 rounded-xl px-3 mt-3 py-3 border border-gray-400/50">
                    <div className="remaining-posts flex justify-between px-1 pb-2 border-b border-gray-300 mb-2">
                        <h2 className='text-sm'>Recommended for you</h2>
                        <div className='options flex gap-4'>
                            <i className="ri-more-2-fill rotate-90 text-xl leading-none"></i>
                            <i className="ri-close-line text-2xl cursor-pointer leading-none rounded-md p-1 hover:bg-gray-300/60" title='Hide' onClick={() => (post.id)}></i>
                        </div>
                    </div>
                    {/* {postIdToRemove === post.id ? (
                        <div className="post-removal">
                            <div className="heading flex justify-between py-2 border-b border-gray-300/80">
                                <h1 className="text-sm font-medium">Post removed from your feed</h1>
                                <span className="text-[#b99a45] font-medium cursor-pointer" onClick={handleUndoRemove}>Undo</span>
                            </div>
                            <PostHideForm/>
                        </div>
                    ) : ( */}
                        {/* <> */}
                            <div className="posts-user-profile bg-gray-100 rounded-xl flex gap-3 leading-tight items-center h-12">
                                <div className="posts-users-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative flex justify-end">
                                    {/* {post.user.profile_image} */}
                                    <Link href={getProfileLink(post.user.username)}>
                                        <img className="object-cover object-bottom rounded-full w-10 h-full" src={post.user.profile_image} alt="" />
                                    </Link>
                                    <div className={`${post.user.active_status ? 'block' : 'hidden'} bg-green-500 w-[10px] h-[10px] border-[1.5px] border-white rounded-full absolute bottom-[2px] right-[1px]`}></div>
                                </div>
                                <div className="name-other flex justify-between w-[86%] lg:w-[89%] items-center">
                                    <div className="posts-details">
                                        <div className="user-name flex items-center gap-x-1">
                                            <Link href={window.route('showProfile', post.user.username)}>
                                                <strong className="text-sm leading-tight font-semibold block hover:underline">{post.user.first_name} {post.user.middle_name} {post.user.last_name}</strong>
                                            </Link>
                                            {/* {user.} */}
                                            <i title="Golden Badge" className={`ri-verified-badge-fill text-[#b99a45] text- leading-none ${post.user.account_status=='goldTick'?'block':'hidden'}`}></i>
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
                                        {/* <div className="post-option-btn">
                                            <i className="ri-more-2-fill rotate-90 block text-xl cursor-pointer  rounded-md hover:bg-gray-300/60" onClick={()=>handlePostMenu(post.id)} ref={toggleRef}></i>
                                            {activePostIdToShowOptions === post.id? (
                                                <>
                                                {showPostMenu ? (
                                                    <div className="post-menu absolute top-8 w-40 z-50 bg-gray-100 right-0 py-2 rounded-md flex flex-col gap-1 border border-gray-300 shadow-md">
                                                        <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2" onClick={()=>handleSavingPost(post.id,post.user.id)}>
                                                            <i className="ri-play-list-add-fill text-xl"></i>
                                                            <span className='text-sm'>{( isPostSaved)?"Unsave":"Save"}</span>
                                                        </div>
                                                        {post.user.id === user.id ? (
                                                        <>
                                                            <Link href={window.window.route('post.edit', { post: post.id })}>
                                                                <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2">
                                                                        <i className="ri-edit-fill text-xl pl-[1px]"></i>
                                                                        <span className='text-sm text-nowrap'>Edit post</span>
                                                                </div>
                                                            </Link>
                                                                <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2" onClick={()=>handleDelete(post.id)}>
                                                                    <i className="ri-delete-bin-2-fill text-xl pl-[1px]"></i>
                                                                    <span className='text-sm text-nowrap'>Delete post</span>
                                                                </div>
                                                        </>):""}
                                                        <div className="save-post flex items-center w-auto gap-2 cursor-pointer hover:bg-gray-300 px-3 py-2">
                                                            <i className="ri-feedback-fill text-xl pl-[1px]"></i>
                                                            <span className='text-sm text-nowrap'>Report post</span>
                                                        </div>
                                                    </div>
                                                ):""}</>
                                            ):""}
                                        </div>*/}
                                        <div className="post-option-btn text-gray-800 hover:cursor-pointer hover:text-[#c7ae6a]">
                                        <i className="ri-add-line text-lg font-semibold"></i>
                                        <button onClick={followUser} className="follow-btn text-md mr-1 font-medium ">
                                            Follow
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="post_description px-1 my-2">
                                <span className="text-gray-700">{post.post_description}</span>
                            </div>
                            {post.media ? (
                                <ShowPostMedia post={post}/>
                            ):""}
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
                                        <i className={`${isLiked ?"ri-thumb-up-fill text-lg":"ri-thumb-up-line"}`}></i>
                                        {/* <i className={`${isLiked || postLikedByUser.includes(post.id) ?"ri-thumb-up-fill text-lg":"ri-thumb-up-line"}`}></i> */}
                                    </div>
                                    <div className="comment w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer" onClick={()=>handleCreateComment(post.id)}>
                                        <i className="ri-chat-2-line text-lg"></i>
                                    </div>
                                    <div className="share w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                                        <i className="ri-share-forward-line text-lg"></i>
                                    </div>

                                </div>
                                {activePostIdShowComment === post.id ? (
                                    <>
                                        {showAllComments && (
                                            <ShowAllComments allComments={allComments}/>
                                        )}
                                    </>
                                ):''}

                                {activePostIdToComment === post.id ? (
                                <>
                                    {createComment &&(
                                        <CreateComment postId={post.id} />
                                    )}
                                </>):""}
                            </div>
                        {/* </> */}
                    {/* )} */}
                </div>
        )})}
    </div>
  );
};

export default PostBySkills;
