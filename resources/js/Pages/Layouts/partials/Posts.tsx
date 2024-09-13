import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { FormEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import TimeAgo from '../TimeAgo';
import Modal from '@/Components/Modal';

interface FormData {
    reason_to_remove_post: string;
}

const Posts = () => {
    const { latest_posts, flash } = usePage<PageProps>().props;
    const { user } = usePage<PageProps>().props.auth;

    const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
        reason_to_remove_post: ""
    });

    const [removedPostId, setRemovedPostId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handlePostLoveCount = async (postId: number) => {
        try {
            const response = await axios.get(route('post.updatePostLoveCount', postId));
            if (response.data.success) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    progressStyle: {
                        backgroundColor: "#c7ae6a"
                    }
                });
                const loveCountElement = document.getElementById(`love-count-${postId}`);
                if (loveCountElement) {
                    loveCountElement.textContent = response.data.newLoveCount;
                }
            } else {
                console.error('Failed to update love count.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleRemovePost = (postId: number) => {
        setRemovedPostId(postId);
    };

    const handleUndoRemove = () => {
        setRemovedPostId(null);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('post.destroy', removedPostId), {
            onSuccess: () => {
                setRemovedPostId(null);
            }
        });
    };

    const getProfileLink = (username?: string) => {
        return username ? route('showProfile', username) : route('updateProfile');
    };

    return (
        <>
            {latest_posts.map((post: any) => (
                <div key={post.id} className="post bg-gray-100 mt-4 rounded-xl px-3 py-3 border border-gray-400/50">
                    {removedPostId === post.id ? (
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
                                    <div className="posts-action flex justify-end gap-3">
                                        <div className="post-option-btn rotate-90">
                                            <i className="ri-more-2-fill rotate-180 text-lg cursor-pointer p-1 rounded-md hover:bg-gray-300/60"></i>
                                        </div>
                                        <div className="post-option-btn">
                                            <i className="ri-close-line text-xl cursor-pointer p-[3px] rounded-md hover:bg-gray-300/60" onClick={() => handleRemovePost(post.id)}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="post_description px-1 my-2">
                                <span className="text-gray-700">{post.post_description}</span>
                            </div>
                            <div className="posts-media mt-3 rounded-md flex justify-center border-b-[1.6px] border-t-[1.6px]">
                            {post.media && (
                                <img className="rounded-md cursor-pointer" src={post.media} alt="Users post media" onClick={() => setShowModal(true)} aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal" data-hs-overlay="#hs-scale-animation-modal" /> )}
                            </div>
                            <div className="post-interaction mt-1 px-2">
                                <div className="interaction-counts flex justify-between">
                                    <div className="like-count">
                                        {post.post_love_count && (<i className="ri-heart-3-fill text-gray-100 p-[2px] bg-red-500 rounded-full mr-2 cursor-pointer"></i>)}
                                        <span className="cursor-pointer hover:underline text-sm" id={`love-count-${post.id}`}>{post.post_love_count}</span>
                                    </div>
                                    <div className="comment-count">
                                        <span className="cursor-pointer hover:underline text-sm">1{post.post_comment_count}</span>
                                        <i className="ri-chat-2-line text-gray-800 ml-2 p-[2px] cursor-pointer"></i>
                                    </div>
                                </div>
                                <div className="interaction-btn flex justify-between mt-[2px] py-1 border-b-[1.6px] border-t-[1.6px]">
                                    <div className="like w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                                        <i className="ri-heart-3-line text text-lg"></i>
                                    </div>
                                    <div className="comment w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                                        <i className="ri-chat-2-line text-lg"></i>
                                    </div>
                                    <div className="share w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                                        <i className="ri-share-forward-line text-lg"></i>
                                    </div>
                                </div>
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
                            closeable={true}
                        >
                            <div className="p-6">
                                <img className="rounded-md cursor-pointer w-full object-cover" src={post.media ?? post.media} alt="Post media" onClick={()=>setShowModal(false)} />
                                <p className="mt-4">{post.post_description}</p>
                            </div>
                        </Modal>
                    </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default Posts;
