import axios from "axios";
import ProfileImage from "./ProfileImage"
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

const CreateComment = ({postId}:any) => {

    const {user}= usePage<PageProps>().props.auth;

    let [latest_posts ,setLatestPosts] = useState([]);
    const [createComment,setCreateComment] = useState(false);
    const [postLikedByUser,setPostLikedByUser]=useState([]);
    const [comment,setComment] = useState('');
    const [allComments,setAllComments] = useState([]);
    const [showAllComments,setShowAllComments] = useState(false);
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
  return (
    <div className="create-comment flex items-center gap-2 lg:gap-4 py-1">
        <div className="user-profile w-10">
            <ProfileImage image={user.profile_image} className='w-10 h-10 rounded-full object-cover object-fit'/>
        </div>
        <div className="comment-box relative border border-gray-200 rounded-full w-86 lg:w-96 h-11">
            <input className='rounded-full w-full h-full' type="text" name="comment" id="comment"
            onChange={(e)=>setComment(e.target.value)}/>
            {comment && (
            <button className='bg-[#c7a36a] hover:bg-[#b99a45] text-gray-100 text-sm rounded-full px-2 py-[2px] absolute right-2 top-2.5 transition-transform ease-out duration-1000' type="submit" onClick={()=>handleComment(postId,user.id)}>Comment</button>)}
        </div>

    </div>
  )
}

export default CreateComment
