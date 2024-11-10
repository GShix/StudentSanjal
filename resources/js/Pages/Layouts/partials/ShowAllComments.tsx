import { usePage } from "@inertiajs/react";
import ProfileImage from "./ProfileImage"
import { PageProps } from "@/types";
import { useState } from "react";
import axios from "axios";

const ShowAllComments = ({allComments}:any) => {

    const{user} = usePage<PageProps>().props.auth;

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


  return (
    <div>
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
                        <div className="comment-setting absolute top-0 -right-24 bg-gray-200 py-2 z-20 rounded-md w-auto px-3">
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
    </div>
  )
}

export default ShowAllComments
