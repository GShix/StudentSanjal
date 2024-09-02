import Dropdown from "@/Components/Dropdown"
import { usePage } from "@inertiajs/react";
import { useState } from "react"

const Home = () => {

    const [searchInput, setSearchInput] = useState(false);

    const { user } = usePage().props.auth;
    console.log(user)
    const stories = [
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
        {
            profilImage:"/img/boy2.jpg",
            storyImage:"/img/event4.jpg",
            connectionName:"Dambar Gharti"
        },
    ]
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
            name:"Dambar Sing Gharti",
            content:"/img/dambar_gm.jpg"
        },
    ]
  return (
    <div className="home bg-gray-300/80 h-[2000px] w-full">
        <div className="fistRow bg-black flex items-center justify-between max-sm:py-2 px-4 sm:px-8"style={{boxShadow:"0px 0px 10px 4px #c7ae6a"}}>
            <div className="col1 flex max-sm:gap-1 max-md:gap-5 gap-12">
                <div className="col1">
                    <img className="w-56 sm:w-58 sm:h-16" src="/img/Home_logo.png" alt="" srcSet="" />
                </div>
                <div className="search-btn relative flex items-center max-w-[60%]">
                    {searchInput &&
                    (
                    <div className="smallSearch md:hidden relative flex items-center max-sm:w-[97%]">
                        <input type="text" name="search" id="" className="rounded-full max-sm:py-[6px] py-2 pl-10 text-gray-600 text-[12.5px] placeholder:text-gray-700/50 w-full" placeholder="Search StudentSanjal"/>
                        <i className="ri-close-fill absolute text-[#b99a45] font-semibold text-2xl right-2 cursor-pointer hover:text-gray-600" onClick={()=>setSearchInput(!searchInput)}></i>
                    </div>
                    )}
                    <i className="ri-search-line absolute left-2  max-sm:text-base text-lg rounded-full max-md:text-gray-200 px-[5px] sm:px-[6px] py-[1px] max-md:cursor-pointer max-md:bg-[#b99a45] md:hidden" onClick={()=>setSearchInput(!searchInput)}></i>
                    <div className="bigSearch max-md:hidden flex items-center">
                        <input type="text" name="search" id="" className="w-96 rounded-full py-2 pl-9 text-gray-600 text-sm placeholder:text-gray-700/50" placeholder="Search StudentSanjal"/>
                        <i className="ri-search-line text-gray-700/60 absolute left-3 text-lg rounded-full"></i>
                    </div>
                </div>
            </div>
{/*
            <div className="col2 flex-center w-[35%] max-md:w-10 max-sm:hidden">

            </div> */}
            <div className="col2 flex items-center justify-end gap-4">
                {
                    !searchInput && (
                        <>
                        <div className="chat-btn">
                            <button className="text-gray-800 bg-gray-700 max-sm:p-1 p-[5.6px] rounded-full" type="submit" >
                                {/* <img className="h-7 w-7 mr-2" src="/img/chat.png" alt="" /> */}
                                <img className="h-8 w-8" src="/img/chat.png" alt="" />
                            </button>
                        </div>
                        <div className="notification-btn">
                            <button className="text-gray-800 bg-gray-700 max-sm:p-1 p-[5.6px] rounded-full" type="submit" >
                                {/* <img className="h-7 w-7 mr-2" src="/img/chat.png" alt="" /> */}
                                <img className="h-8 w-8" src="/img/notification.png" alt="" />
                            </button>
                        </div>
                        </>
                    )
                }

                <div className="menu&profile text-white text-[34px] max-sm:text-3xl">
                    <i className="ri-menu-fill md:hidden cursor-pointer"></i>
                    <div className="user-icon p-1 bg-gray-600 rounded-full max-md:hidden  hover:bg-gray-500">
                    <Dropdown>
                        <Dropdown.Trigger>
                        <div className="chat-icon w-10 h-10 p-[3px] bg-[#c7ae6a] rounded-full relative">
                            <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                            </div>
                            <img className="object-cover object-center rounded-full w-full h-full cursor-pointer" src="/img/lady1.jpg" alt="" />
                        </div>
                            {/* <img className="object-cover object-center rounded-full w-10 h-10 cursor-pointer" src={"/img/lady1.jpg"} alt="" /> */}
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div className="lastRow grid grid-cols-3 gap-8 mx-8 mt-6 mb-5">
            <div className="firstColumn max-sm:hidden rounded-lg">
                <div className="user-profile px-2.5 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl flex gap-3 leading-tight items-center">
                    <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                        <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                            <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                        </div>
                        <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                    </div>
                    <div className="user-details">
                        <strong className="text-sm font-semibold">{user.first_name}</strong>
                        <p className="text-xs">{user.username}</p>
                        <p className="text-xs">{user.headline}</p>
                    </div>
                </div>
                <div className="siderbar bg-gray-100 px-2.5 py-2 rounded-xl mt-3">
                    <ul className="flex flex-col">
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/feed.png" alt="" srcSet="" />Feed</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/mynetwork.png" alt="" />My Network</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/chat.png" alt="" />Chat</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/groups.png" alt="" />Groups</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/video.png" alt="" />Video</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/events.png" alt="" />Events</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/saved.png" alt="" />Saved</a></li>
                    </ul>
                </div>
                <div className="sidebar2 bg-gray-100 px-2.5 py-2 rounded-xl mt-3 mb-2">
                    <div className="groups">
                        <h2 className="px-2 py-2 hover:underline text-gray-800/70 font-semibold">Your groups</h2>
                        <div className="group-links">
                            <ul className="flex flex-col">
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-1" src="/img/feed.png" alt="" srcSet="" />Feed</a></li>
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-1" src="/img/mynetwork.png" alt="" />My Network</a></li>
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-1" src="/img/chat.jpg" alt="" />Chat</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="midColumn rounded-lg">
                <div className="story-row flex gap-2 overflow-x-hidden rounded-lg">
                    <div className="story-add-card w-24 bg-gray-100 rounded-lg h-30">
                        <div className="img relative w-24 h-24 flex flex-col items-center">
                            <img className="w-full h-full object-cover object-center rounded-t-lg" src="/img/lady1.jpg" alt="Your Photo" srcSet="" />
                            <div className="add-btn bg-gray-100 p-[1px] rounded-full absolute -bottom-3">
                                <img className="w-6 h-6" src="/img/add-icon.png" alt="" srcSet="" />
                            </div>
                        </div>
                        <div className="title pt-3 pb-2 flex justify-center flex-wrap">
                            <span className="tracking-tight text-xs font-medium">Create Story</span>
                        </div>
                    </div>
                    {/* Connection's Stories  */}
                    <div className="stories-row h-30 flex gap-2">
                        {
                            stories.map((story,index)=>(
                            <div key={index} className="story-card flex-shrink-0 w-1/3 sm:w-1/2 lg:w-1/4 h-full bg-gray-100 rounded-lg p-2 flex flex-col justify-between cursor-pointer" style={{backgroundImage:`url(${story.storyImage})`,objectFit:"cover",objectPosition:""}}>
                                <div className="user-photo">
                                    <img className="w-10 h-10 object-cover object-center rounded-full bg-[#c7ae6a] p-[2.5px]" src={story.profilImage} alt="Your Photo" srcSet="" />
                                </div>
                                <div className="connectionName flex justify-center">
                                    <span className="tracking-normal text-xs text-gray-100 font-medium">{story.connectionName}</span>
                                </div>
                            </div>
                            ))
                        }
                    </div>

                </div>
                <div className="what-in-your-min mt-5 bg-gray-100 rounded-xl flex justify-between gap-2.5 px-2.5 py-4">
                    <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                        <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                            <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                        </div>
                        <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                    </div>
                    <div className="post-container w-[87%]">
                        <div className="textarea mr-1">
                            <textarea className="w-full rounded-xl p-2 text-gray-600 text-sm border-none h-12 lg:h-16 placeholder:text-gray-700/60" typeof="text" name="What's on your mind?" id="" placeholder="What's on your mind?"></textarea>
                        </div>
                        <div className="post-type h-4 mt-3 flex gap-4 items-center">
                            <div className="photo flex items-center gap-2 "><img className="h-4" src="/img/post-photo.png" alt="" srcSet="" /><span className="text-sm font-medium text-gray-700/60">Photo</span></div>
                            <div className="video flex items-center gap-2 "><img className="h-4" src="/img/post-video.png" alt="" srcSet="" /><span className="text-sm font-medium text-gray-700/60">Video</span></div>
                            <div className="poll flex items-center gap-2 "><img className="h-5" src="/img/post-poll.png" alt="" srcSet="" /><span className="text-sm font-medium text-gray-700/60">Poll</span></div>
                        </div>
                    </div>
                </div>
                <div className="posts">
                    {
                        posts.map((post,index)=>(
                        <div key={index} className="post bg-gray-100 mt-4 rounded-xl px-3 py-3">
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

                </div>
            </div>
            <div className="lastColumn rounded-lg max-md:hidden">
                <div className="chat- bg-gray-100 rounded-xl px-3 py-2">
                    <div className="title flex items-center justify-between">
                        <h2 className="font-semibold">Chat</h2>
                        <i className="ri-edit-box-fill text-xl cursor-pointer"></i>
                    </div>
                    <div className="search px-2 py-2 relative flex items-center">
                        <input type="text" name="search" id="" className="rounded-full py-2 pl-9 text-gray-600 text-sm placeholder:text-gray-700/50 relative" placeholder="Search chat"/>
                        <i className="ri-search-line text-gray-700/60 absolute left-5 text-lg"></i>
                    </div>
                    <div className="chat-tab pb-1">
                        <div className="order flex gap-5 px-2 py-2 border-b-4 mb-2">
                            <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-3 py-1 rounded-full">Inbox</h1>
                            <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-3 py-1 rounded-full">Communities</h1>
                        </div>
                        <div className="chat-item">
                            <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl flex gap-3 leading-tight items-center">
                                <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                                    </div>
                                    <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                                </div>
                                <div className="chat-details">
                                    <strong className="text-sm font-semibold">Lady Don</strong>
                                    <p className="text-xs">Good Morning! Sir</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-item">
                            <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl  flex gap-3 leading-tight items-center">
                                <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                                    </div>
                                    <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                                </div>
                                <div className="chat-details">
                                    <strong className="text-sm font-semibold">Lady Don</strong>
                                    <p className="text-xs">aaja college janxau</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-item">
                            <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#c7ae6a] rounded-xl flex gap-3 leading-tight items-center">
                                <div className="chat-icon w-12 h-12 p-[3px] bg-[#c7ae6a] rounded-full relative">
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                                    </div>
                                    <img className="object-cover object-center rounded-full w-full h-full" src="/img/lady1.jpg" alt="" />
                                </div>
                                <div className="chat-details">
                                    <strong className="text-sm font-semibold">Lady Don</strong>
                                    <p className="text-xs">kx khana khaeu ta</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="con-request-contain mt-3">
                    <div className="title">
                        <h2 className="font-semibold px-1">Connection requests</h2>
                    </div>
                    <div className="request-item bg-gray-100 rounded-xl mt-1 pb-4 pt-2">
                        <div className="request-profile px-2.5 py-2 bg-gray-100 rounded-xl flex gap-3 leading-tight items-center">
                            <div className="request-icon w-16 h-16 p-[3px] bg-[#c7ae6a] rounded-full max-md:hidden">
                                <img className="object-cover object-center rounded-full w-full h-full" src="/img/boy1.jpg" alt="" />
                            </div>
                            <div className="request-details">
                                <span className="request-person-name text-base font-semibold block">Boy1 Don</span>
                                <span className="request-person-headline block text-sm text-gray-700/80">Laravel Developer | React JS</span>
                                <p className="text-xs text-gray-700/80">4 mutual connections</p>
                            </div>
                        </div>
                        <div className="request-options px-3 flex gap-4 mt-1">
                            <button className="bg-red-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-red-600" type="submit">Ignore</button>
                            <button className="bg-[#c7ae6a] px-6 py-2 rounded-full text-white font-semibold hover:bg-[#b99a45]" type="submit">Accept</button>
                        </div>
                    </div>
                    <div className="request-item bg-gray-100 rounded-xl mt-2.5 pb-4 pt-2">
                        <div className="request-profile px-2.5 py-2 bg-gray-100 rounded-xl flex gap-3 leading-tight items-center">
                            <div className="request-icon w-16 h-16 p-[3px] bg-[#c7ae6a] rounded-full max-md:hidden">
                                <img className="object-cover object-center rounded-full w-full h-full" src="/img/boy2.jpg" alt="" />
                            </div>
                            <div className="request-details">
                                <span className="request-person-name text-base font-semibold block">Boy2 Don</span>
                                <span className="request-person-headline text-sm block text-gray-700/80">UI/UX Designer</span>
                                <p className="text-xs text-gray-700/80">4 mutual connections</p>
                            </div>
                        </div>
                        <div className="request-options px-3 flex gap-4 mt-1">
                            <button className="bg-red-500 px-6 py-2 rounded-full text-white font-semibold hover:bg-red-600" type="submit">Igone</button>
                            <button className="bg-[#c7ae6a] px-6 py-2 rounded-full text-white font-semibold hover:bg-[#b99a45]" type="submit">Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
