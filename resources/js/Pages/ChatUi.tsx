import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import CleanHomeLayout from './Layouts/CleanHomeLayout';
import { PageProps } from '@/types';
import { FormEventHandler, useEffect, useState } from 'react';
import ProfileImage from './Layouts/partials/ProfileImage';

interface FormData {
    title: string;
    message:string;
    image:File | null;
    like_message: string;
}
interface ChatGarneSathi {
    profile_image: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    active_status: string;
    // Add other properties that you expect to exist in chatGarneSathi
}
interface noteWalaSathi{
    note:string;
    profile_image:string;
    title:string;
}
const ChatUi = () => {
    const { user, latest_note } = usePage<PageProps>().props.auth;

    const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
        title: '',
        message:'',
        image:null,
        like_message: '',
    });

    const { allUsers = [] } = usePage<PageProps>().props;

    const [chatGarneSathi, setChatGarneSathi] = useState<ChatGarneSathi | null>(null);

    const [showNoteCreate, setShowNoteCreate] = useState(false);
    const [showNoteEdit, setShowNoteEdit] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    // const [chatGarneSathi,setChatGarneSathi] = useState({});
    const [noteWalaSathi,setNoteWalaSathi] = useState<noteWalaSathi | null>(null);
    const [showOthersNote,setShowOthersNote] = useState(false);

    const showMessageHandle = (sathi:any)=>{
        setShowMessage(true);
        setChatGarneSathi(sathi)
        console.log(sathi,"Sathi")
    }

    const handleEditNote =() =>{
        setShowNoteEdit(true);
        setShowNoteCreate(false);
        setShowMessage(false);
        setShowOthersNote(false);
    }
    const handleOthersNote =(sathi:any) =>{
        setShowNoteEdit(false);
        setShowOthersNote(true);
        setShowNoteCreate(false);
        setShowMessage(false);
        setNoteWalaSathi(sathi);
    }
    const handleCreateNote =() =>{
        setShowNoteEdit(false);
        setShowNoteCreate(true);
        setShowMessage(false);
    }
    // console.log("Note wala sathi",noteWalaSathi)
    // console.log("Ma",user)
    // console.log("Ma",noteWalaSathi.id === user.id )

    const [showSearchInput,setShowSearchInput] = useState(false);

    const [otherUsers, setOtherUsers] = useState([]);

    console.log(otherUsers)

    useEffect(() => {
        if (user && allUsers.length > 0) {
            setOtherUsers(allUsers.filter((other:any) => other.id !== user.id));
        }
    }, [user, allUsers]);

    const submit = () => {
        post(route('note.store'), {
            onSuccess: () => {
                setData('title', '');
                setShowNoteCreate(false);
            },
            onError: (error) => {
                setError('title', error);
            },
        });
    };
    const deleteNote = (latestNote:any) => {
        router.delete(route('note.destroy',latestNote), {
            onSuccess: () => {
                setData('title', '');
                setShowNoteCreate(false);
                setShowNoteEdit(false);
            },
            onError: (error) => {
                setError('title', error);
            },
        });
    };

    const getProfileLink:any = (username?: string, otherUsername?:string,otherId?:number) => {
        if(username){
            return username ? route('showProfile', username) : route('updateProfile');
        }else if(otherUsername) {
            return otherUsername ?? route('showProfile', otherUsername);
        } else if(otherId) {
            return otherId ?? route('showProfileById', otherId)

        }{
        }
    };
    return (
        <CleanHomeLayout>
            <Head title="Chat" />
            {/* <div className="chat-ui max-h-screen min-h-[85vh] pb-3 -mt-1 grid grid-cols-2 gap-4 relative mt-40"> */}
            <div className="chat-ui max-h-screen min-h-[85vh] pb-3 -mt-1 grid grid-cols-2 gap-4 relative">
                {/* Left Column */}
                <div className="first-col bg-gray-100 rounded-lg px-4 py-2 h-full">
                    {/* Header */}
                    <div className="header flex items-center justify-between">
                        <div className="profile flex items-center gap-2">
                            <div className="posts-users-icon w-11 h-11 p-[2.5px] bg-[#c7ae6a] rounded-full relative flex justify-end">
                                <Link href={getProfileLink(user.username)}>
                                    <ProfileImage image={user.profile_image} />
                                    {/* <img className="object-cover object-bottom rounded-full w-10 h-full" src={user.profile_image} alt="" /> */}
                                </Link>
                                {user.active_status && <div className="bg-green-500 w-[10px] h-[10px] border-[1.5px] border-white rounded-full absolute bottom-[2px] right-[1px]"></div>}
                            </div>
                            <div className="username flex items-center gap-1">
                                {(user.username)?user.username:`${user.first_name} ${user.middle_name?user.middle_name:""} ${user.last_name}`}
                                <i className="ri-arrow-down-s-line text-xl font-light"></i>
                            </div>
                        </div>
                        <i className="ri-settings-5-fill text-[#b99a45] text-2xl"></i>
                    </div>

                    {/* Chat Box */}
                    <div className="chat-box py-2">
                        <div className="chat-category flex gap-5 px-2 py-2 border-b-2 border-gray-200 mb-2 text-[15px]">
                            <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-5 py-1 rounded-full">Inbox</h1>
                            <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-5 py-1 rounded-full">Communities</h1>
                        </div>

                        {/* Your note Section */}
                        <div className="connection-note px-2 py-2 flex gap-6 items-center h-38">
                            <div className="your flex items-center flex-col max-w-24">
                                { (latest_note && latest_note.title)? (
                                <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] inline-block mb-[5px] cursor-pointer" onClick={() => handleEditNote()}>
                                   <span className='text-nowrap text-sm'>
                                        {latest_note && latest_note.title
                                        ? latest_note.title.length > 10
                                            ? `${latest_note.title.slice(0, 10)}...` // Limit to 10 characters
                                            : latest_note.title
                                        : 'Note..'}
                                    </span>
                                    <div className="absolute rotate-90 top-7 w-0 h-0 border-t-[15px] border-t-white border-r-[15px] border-r-transparent z-99"></div>
                                </div>
                                ):(
                                <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] inline-block mb-1 cursor-pointer" onClick={() => setShowNoteCreate(true)}>
                                    <span className='text-nowrap text-sm'>{ latest_note?latest_note.title:  'Note..'}</span>
                                    <div className="absolute rotate-90 top-7 w-0 h-0 border-t-[15px] border-t-white border-r-[15px] border-r-transparent z-99"></div>
                                </div>
                                )}

                                <div className="posts-users-icon w-[70px] h-[70px] rounded-full relative flex justify-end">
                                    <ProfileImage image={user.profile_image} />
                                    {/* <img className="object-cover object-bottom rounded-full w-full h-full" src={user.profile_image} alt="" /> */}
                                </div>
                                <div className="user text-[12.5px] text-gray-500">
                                    <span>Your note</span>
                                </div>
                            </div>

                            {/* Others Note */}
                            {otherUsers.map((other: any) => (
                                <div key={other.id} className="others flex items-center flex-col">
                                {Array.isArray(other.note) && other.note.length > 0 && (
                                    <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] mb-[5px] block" onClick={()=>handleOthersNote(other)}>
                                        {other.note[0].title.length > 12
                                            ? `${other.note[0].title.slice(0, 12)}...`  // Limit to 50 characters
                                            : other.note[0].title
                                            }
                                        <div className="absolute b500 top-7 left-[25%] rotate-90 w-0 h-0 border-t-[15px] border-t-white border-r-[15px] border-r-transparent z-99"></div>
                                    </div>
                                )}
                                    <div className={`posts-users-icon w-[70px] h-[70px] rounded-full relative flex justify-end max-w-20 ${(Array.isArray(other.note) && other.note.length) ? 'mt-0' : 'mt-10'}`}>
                                       <Link href={getProfileLink(other.username)}>
                                            <img className="object-cover object-bottom rounded-full w-full h-full" src={other.profile_image} alt={`${other.first_name}'s Profile`} />
                                        </Link>
                                    </div>
                                    <div className="user text-[12.5px] text-gray-500 max-w-28 flex flex-wrap">
                                        <span className="text-nowrap">{other.first_name} {other.last_name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Item */}
                        {otherUsers.map((otherUser:any)=>(
                        <div key={otherUser.id} className="chat-item mt-2" onClick={()=>showMessageHandle(otherUser)}>
                            <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#e3d6b4] rounded-xl flex gap-2 leading-tight items-center">
                                <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
                                    </div>
                                    <img className="object-cover object-center rounded-full w-full h-full" src={otherUser.profile_image} alt="" />
                                </div>
                                <div className="chat-details">
                                    <strong className="text-[13px] font-semibold">{otherUser.first_name} {otherUser.middle_name} {otherUser.last_name}</strong>
                                    <p className="text-[11px]">Good Morning! Sir</p>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="second-col bg-gray-100 rounded-lg h-full">
                    {showNoteCreate && (
                        <div className="share-new-note px-4">
                            <div className="head flex justify-between border-b-2 py-8 border-gray-200 items-center h-10">
                                <button onClick={() => setShowNoteCreate(false)}>
                                    <i className="ri-close-fill text-2xl hover:text-[#b99a45]"></i>
                                </button>
                                <h2 className="font-semibold">New Note</h2>
                                <button
                                    className={`py-2 px-2 rounded-lg ${data.title ? 'hover:bg-[#b99a45] text-black hover:text-white' : 'text-gray-400 cursor-not-allowed'}`}
                                    disabled={!data.title}
                                    onClick={submit}
                                >
                                    Share
                                </button>
                            </div>
                            <div className="flex flex-col justify-center items-center h-96">
                                <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] inline-block mb-1">
                                    <div className="absolute rotate-90 top-[47px] left-[40%] w-3 h-0 border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
                                    <input
                                        value={data.title}
                                        className="border-none rounded-md"
                                        type="text"
                                        name="title"
                                        id="note-title"
                                        placeholder={`${user.first_name}, Share your thoughts...`}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                </div>
                                <div className="profile-image mt-1 w-36 h-36">
                                    <ProfileImage image={user.profile_image}/>
                                    {/* <img className="rounded-full w-full h-full object-cover object-center" src={user.profile_image} alt="" /> */}
                                </div>
                            </div>
                        </div>
                    )}

                    {showNoteEdit && (
                        <div className='absolute left-[25%] top-[12%] z-20'>
                        <div className="flex flex-col justify-center items-center h-80 bg-gray-50 w-72 mt-10 rounded-lg px-2 py-3 relative" style={{ boxShadow:"0 0 5px 5px #d6d6d6" }}>
                            <i className="ri-close-fill absolute top-1 right-2 text-xl cursor-pointer hover:text-[#b99a45]" onClick={()=>setShowNoteEdit(false)}></i>
                            <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2 py-1 inline-block mb-1">
                                <div className="absolute rotate-90 -bottom-2 left-[40%] w-3 h-0 border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
                                <span className='rounded-md'>{latest_note.title}</span>
                            </div>
                            <div className="profile-image mt-1 w-32 h-32">
                                <ProfileImage image={user.profile_image} />
                                {/* <img className="rounded-full w-full h-full object-cover object-center" src={user.profile_image} alt="" /> */}
                            </div>
                            <div className="note-btn w-full mt-4 flex flex-col gap-2 font-medium text-white">
                                <button className='bg-[#c8b37c] w-full rounded-md py-1 hover:bg-[#b99a45]' onClick={handleCreateNote}>Create a new note</button>
                                {/* <form action=""> */}
                                    <button className='bg-gray-50 w-full rounded-md py-1 text-[#b99a45] hover:bg-gray-200' onClick={()=>deleteNote(latest_note)}>Delete note</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                    )}

                    {showOthersNote && noteWalaSathi && (
                        <div className='absolute left-[25%] top-[10%] z-20'>
                        <div className="flex flex-col justify-center items-center h-[300px] bg-gray-50 w-72 mt-10 rounded-lg px-2 py-3 relative" style={{ boxShadow:"0 0 5px 5px #d6d6d6" }}>
                            <i className="ri-close-fill absolute top-1 right-2 text-xl cursor-pointer hover:text-[#b99a45]" onClick={()=>setShowOthersNote(false)}></i>
                            <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2 py-1 inline-block mb-1">
                                <div className="absolute rotate-90 -bottom-2 left-[40%] w-3 h-0 border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
                                <span className='rounded-md px-2'>{noteWalaSathi.note && noteWalaSathi.note.length > 0 && noteWalaSathi.note[0].title}</span>
                            </div>
                            <div className="profile-image mt-1 w-32 h-32">
                                <img className="rounded-full w-full h-full object-cover object-center" src={noteWalaSathi.profile_image} alt="" />
                            </div>
                            <div className="send-message-to-note flex justify-center px-2 mt-5">
                                <input className='text-sm w-full rounded-full' type="text" name="message_to_note" id="message_to_note" placeholder='Send message'/>
                            </div>
                        </div>
                    </div>
                    )}

                    {(showMessage && chatGarneSathi) && (
                    <div className="opern-chatter relative h-full z-10">
                        <div className="header border-b-2 rounded-t-lg border-gray-200 flex items-center justify-between">
                            <div className="chat-profile cursor-pointer px-4 py-2 rounded-t-lg flex gap-2 leading-tight items-center">
                                <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
                                    </div>
                                    <img className="object-cover object-center rounded-full w-full h-full" src={chatGarneSathi.profile_image} alt="" />
                                </div>
                                <div className="chat-details">
                                    <Link href={getProfileLink(chatGarneSathi.username)}>
                                        <strong className="text-sm font-semibold">{chatGarneSathi.first_name} {chatGarneSathi.middle_name} {chatGarneSathi.last_name}</strong>
                                    <p className="text-xs">{chatGarneSathi.active_status?"Active Now":"Offline"}</p></Link>
                                </div>
                            </div>
                            <div className="serachmaa-action flex items-center gap-5">
                                {showSearchInput && (
                                    <div className="search relative flex items-center">
                                        <input className='rounded-full h-8 placeholder:text-sm' type="text" name="search_message" id="" placeholder='Search message'/>
                                        <i className="ri-close-fill absolute right-2 text-lg cursor-pointer rounded-full hover:text-black text-gray-600" onClick={()=>setShowSearchInput(false)}></i>
                                    </div>
                                )}
                                {!showSearchInput && (<i className="ri-search-line text-lg cursor-pointer mr-2 hover:text-gray-600" onClick={()=>setShowSearchInput(true)}></i>)}
                                <i className="ri-close-fill mr-4 text-2xl cursor-pointer rounded-full hover:text-gray-600" onClick={()=>setShowMessage(false)}></i>
                            </div>

                        </div>
                        <div className="footer rounded-b-lg absolute bottom-0 border-t border-b w-full px-10 py-2 flex items-center justify-between">
                            <div className="add flex items-center text-xl gap-4">
                                <i className="ri-add-circle-fill hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer"></i>
                                <label htmlFor="media">
                                    <i className="ri-image-add-fill hover:bg-gray-200 rounded-full px-2 py-[7px] cursor-pointer"></i>
                                        <input
                                            id="media"
                                            name="media"
                                            type="file"
                                            className="sr-only"
                                            // onChange={handleFileChange}
                                        />
                                    </label>
                            </div>
                            <div className="message flex items-center gap-5">
                                <div className="input">
                                    <input
                                    value={data.message} onChange={(e)=>setData('message',e.target.value)}
                                    className='rounded-full placeholder:text-sm w-96' type="text" name="message" id="message" placeholder='Write a message'/>
                                </div>
                                <div className="send-btn">
                                    <svg
                                        viewBox="0 0 12 13"
                                        width="38"
                                        height="38"
                                        fill="currentColor"
                                        className={`rounded-full cursor-pointer p-2 hover:bg-gray-200 ${data.message?"block":'hidden'}`}>
                                        <g fillRule="evenodd" transform="translate(-450 -1073)">
                                            <path d="m458.371 1079.75-6.633.375a.243.243 0 0 0-.22.17l-.964 3.255c-.13.418-.024.886.305 1.175a1.08 1.08 0 0 0 1.205.158l8.836-4.413c.428-.214.669-.677.583-1.167-.06-.346-.303-.633-.617-.79l-8.802-4.396a1.073 1.073 0 0 0-1.183.14c-.345.288-.458.77-.325 1.198l.963 3.25c.03.097.118.165.22.17l6.632.375s.254 0 .254.25-.254.25-.254.25" />
                                        </g>
                                    </svg>
                                    <i className={`cursor-pointer hover:bg-gray-200 rounded-full px-2 py-1 ri-thumb-up-fill text-xl ${!data.message?"block":"hidden"}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </CleanHomeLayout>
    );
};

export default ChatUi;
