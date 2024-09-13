import { usePage } from "@inertiajs/react";
import HomeLayout from "./Layouts/HomeLayout";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import TimeAgo from "./Layouts/TimeAgo";
import ProfileImage from "./Layouts/partials/ProfileImage";

const ShowProfile = () => {
//   const user = usePage<PageProps>().props.auth.user;
  const { his_posts,user} = usePage<PageProps>().props;

  console.log(his_posts)
  const [hisPosts, setHisPosts] = useState<any[]>([]);

  useEffect(() => {
    const userPosts = his_posts.filter(post => post.user_id === user.id);
    setHisPosts(userPosts);
  }, [his_posts, user.id]);

//   console.log(hisPosts);

  return (
    <HomeLayout>
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
          <span className="block font-semibold text-lg leading-normal">{user.first_name}{" "}{user.middle_name}{" "}{user.last_name}</span>
          <span className="block text-sm font-normal text-gray-800/90">{user.headline}</span>
          <span className="block text-[13px] font-normal leading-loose text-gray-800/70">{user.address}</span>
          <div className="flex items-center gap-2">
            <span className="inline-block text-gray-800/90 text-sm">100 Followers</span>
            <i className="ri-circle-fill text-[3px]"></i>
            <span className="inline-block text-gray-800/90 text-sm">500+ connection</span>
          </div>
          <span className="text-sm text-gray-900/95">Followed by Amar Khadka</span>
        </div>
        <div className="cta-btn flex gap-3 px-3 py-2.5">
          <button className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] rounded-full">+ Follow</button>
          <button className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] rounded-full">Message</button>
          <button className="px-5 py-1 text-white font-semibold bg-[#c7ae6a] rounded-full">More</button>
        </div>
        <div className="all-activities px-3 py-3 border-t-2">
          <div className="btn flex gap-3">
            <button className="bg-gray-200 hover:bg-black hover:text-white px-3 py-1 rounded-full">Posts</button>
            <button className="bg-gray-200 hover:bg-black hover:text-white px-3 py-1 rounded-full">Comments</button>
          </div>
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
              <div className="posts-media mt-3 rounded-md flex justify-center border-b-[1.6px] border-t-[1.6px]">
                <img className="rounded-md cursor-pointer" src={post.media} alt="Users post media" />
              </div>
              <div className="post-interaction mt-1 px-2">
                <div className="interaction-counts flex justify-between">
                  <div className="like-count">
                    <i className="ri-heart-3-fill text-gray-100 p-[2px] bg-red-500 rounded-full mr-2 cursor-pointer"></i>
                    <span className="cursor-pointer hover:underline text-sm">3</span>
                  </div>
                  <div className="comment-count">
                    <span className="cursor-pointer hover:underline text-sm">3</span>
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
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ShowProfile;
