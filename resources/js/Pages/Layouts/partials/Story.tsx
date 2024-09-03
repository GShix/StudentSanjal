import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

const Story = () => {
    const user = usePage<PageProps>().props.auth.user;

    console.log(user)
    const stories = [
        {
            profilImage:"/img/manish_grg.jpg",
            storyImage:"/img/manish_grg.jpg",
            connectionName:"Manish Gurung"
        },
        {
            profilImage:"/img/nabin_gm.jpg",
            storyImage:"/img/nabin_gm.jpg",
            connectionName:"Nabin Gharti"
        },
        {
            profilImage:"/img/logo.png",
            storyImage:"/img/event3.jpg",
            connectionName:"Dambar Sing Gharti"
        },
        {
            profilImage:"/img/boy2.jpg",
            storyImage:"/img/event4.jpg",
            connectionName:"Dambar Gharti"
        },
    ]
  return (
    <div className="story-row flex gap-2 overflow-x-hidden rounded-lg">
        <div className="story-add-card w-24 bg-gray-100 rounded-lg h-30">
            <div className="img relative w-24 h-24 flex flex-col items-center">
                <img className="w-full h-full object-cover object-center rounded-t-lg" src="/img/lady1.jpg" alt="Your Photo" srcSet="" />
                <div className="add-btn bg-gray-100 px-[1.2px] py-[1px] rounded-full absolute -bottom-3">
                    <img className="w-6 h-6" src="/img/add-icon.png" alt="" srcSet="" />
                </div>
            </div>
            <div className="title pt-3 pb-2 flex justify-center flex-wrap">
                <span className="tracking-tight text-xs font-medium">Create Story</span>
            </div>
        </div>
        <div className="stories-row h-30 flex gap-2">
            {
                stories.map((storyItem,index)=>(
                <div key={index} className="story-card flex-shrink-0 w-1/3 sm:w-1/2 lg:w-1/4 h-full bg-gray-100 rounded-lg p-2 flex flex-col justify-between cursor-pointer" style={{backgroundImage:`url(${storyItem.storyImage})`,backgroundSize:"cover",backgroundPosition:"center"}}>
                    <div className="user-photo">
                        <img className="w-10 h-10 object-cover object-center rounded-full bg-[#c7ae6a] p-[2.5px]" src={storyItem.profilImage} alt="Your Photo" srcSet="" />
                    </div>
                    <div className="connectionName flex justify-center">
                        <span className="tracking-normal text-xs text-gray-50 font-semibold">{storyItem.connectionName}</span>
                    </div>
                </div>
                ))
            }
        </div>
    </div>
  )
}

export default Story
