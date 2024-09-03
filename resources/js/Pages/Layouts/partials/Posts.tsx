


import React from 'react'

const Posts = () => {
    const posts =[
        {
            name:"Nabin Gharti",
            content:"/img/nabin_gm.jpg"
        },
        {
            name:"Amar Khadka",
            content:"/img/amar_kk.jpg"
        },
        {
            name:"Manish Gurung",
            content:"/img/manish_grg.jpg"
        },
        {
            name:"Dambar Sing Gharti",
            content:"/img/dambar_gm.jpg"
        },
        {
            name:"Dambar Sing Gharti",
            content:"/img/dambar_gm.jpg"
        },
    ]
  return (
    <>
        {
            posts.map((post,index)=>(
            <div key={index} className="post bg-gray-100 mt-4 rounded-xl px-3 py-3 border border-gray-400/50">
                <div className="posts-user-profile bg-gray-100 rounded-xl flex gap-3 leading-tight items-center h-12">
                    <div className="posts-users-icon w-11 h-11 p-[2.5px] bg-[#c7ae6a] rounded-full">
                        <img className="object-cover object-bottom rounded-full w-10 h-full" src={post.content} alt="" />
                    </div>
                    <div className="name-other flex justify-between w-[86%] items-center">
                        <div className="posts-details">
                            <div className="user-name">
                                <strong className="text-sm leading-tight font-semibold block">{post.name}</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] inline-block">4m</span>
                                <i className="ri-circle-fill text-[3px]"></i>
                                <span className="inline-block"><i className="ri-group-fill text-sm"></i></span>
                            </div>
                        </div>
                        <div className="posts-action flex justify-end gap-4">
                            <i className="ri-more-2-fill rotate-90 text-lg cursor-pointer p-1 rounded-md hover:bg-gray-300/60"></i>
                            <i className="ri-close-line rotate-90 text-xl cursor-pointer p-[3px] rounded-md hover:bg-gray-300/60"></i>
                        </div>
                    </div>
                </div>
                <div className="posts-content mt-3 rouned-md flex justify-center border-b-[1.6px] border-t-[1.6px]">
                    <img className="rounded-md cursor-pointer" src={post.content} alt="Users post content" srcSet="" />
                </div>
                <div className="post-interaction mt-1 px-2">
                    <div className="interaction-counts flex justify-between">
                        <div className="like-count">
                            <i className="ri-heart-3-fill text-gray-100 p-[2px] bg-red-500 rounded-full mr-2 cursor-pointer"></i>
                            <span className="cursor-pointer hover:underline text-sm">2</span>
                        </div>
                        <div className="comment-count">
                            <span className="cursor-pointer hover:underline text-sm">3</span>
                            <i className="ri-chat-2-line text-gray-800 ml-2 p-[2px] cursor-pointer"></i>
                        </div>
                    </div>
                    <div className="interaction-btn flex justify-between mt-[2px] py-1 border-b-[1.6px] border-t-[1.6px]">
                        <div className="like w-[30%] flex justify-center hover:bg-gray-300 rounded-md cursor-pointer">
                            <i className="ri-thumb-up-line text-lg hover:ri-thumb-up-fill"></i>
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
            ))
        }
    </>
  )
}

export default Posts
