import { Head, Link, useForm, usePage } from "@inertiajs/react";
import CleanHomeLayout from "./Layouts/CleanHomeLayout"
import { PageProps, User } from "@/types";
import ProfileImage from "./Layouts/partials/ProfileImage";
import { useEffect, useRef, useState } from "react";
import FilePreview from "./Layouts/partials/PreviewFile";
import axios from "axios";
import Echo from "laravel-echo";
import Modal from "@/Components/Modal";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface FormData {
    text_field?:string; media?:File | null;  like?: string;
}

interface ConnectedFriend {
    profile_image: string; first_name: string; middle_name: string; last_name: string; username: string;  active_status: string; id: any;
}
interface ChatsData {
    id: number; sender_id: number; receiver_id: number;
    sender: {
        id: number;
        username: string;
    };
    receiver: {
        id: number;
        username: string;
    };
    text_field?: string; media?: string; created_at: string; updated_at: string;
}

const StartChat = () => {

    const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
        text_field:'',
        media:null,
        like: '',
    });

    const { user,latest_chat,usersYouFollowed } = usePage<PageProps>().props.auth;
    const { otherUsers} = usePage<PageProps>().props;

    const [connectedFriend,setConnectedFriend] = useState<any>();
    const [showMessage,setShowMessage] = useState(false);
    const [showSearchInput,setShowSearchInput] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [modalKoMedia,setModalKoMedia] = useState();
    const [chats,setChats] = useState<ChatsData[]>([]);

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        const newValue = (data.text_field || '') + emojiData.emoji; // Get current value or default to empty string
        setData('text_field', newValue); // Set the new value
        setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
    };

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            const lastMessage = chatContainerRef.current.lastElementChild;
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    const fetchChats = async () => {
        try {
            const response = await axios.get(`fetchChats/${connectedFriend.id}`);
            setChats(response.data.chats);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };
    useEffect(() => {
        if (connectedFriend) {
            fetchChats();
        }
    }, [connectedFriend]);

    const submitChat = (e:any) => {
        e.preventDefault();
        if (!data.text_field && !data.media) return;

        post(window.route('chat.send'), {
            onSuccess: () => {
                setData({
                    text_field: '',
                    media: null,
                    like: '',
                });
                fetchChats();
            },
        });
    };


    const [connectionStatus, setConnectionStatus] = useState('connecting');

    useEffect(() => {
        if (!user?.id) return;

        console.log('Subscribing to channel:', `student-sanjal.${user.id}`);

        const channel = window.Echo.private(`student-sanjal.${user.id}`);

        // Debug subscription
        channel.subscribed(() => {
            console.log('Successfully subscribed to channel');
            setConnectionStatus('connected');
        });

        channel.error((error: any) => {
            console.error('Channel error:', error);
            setConnectionStatus('error');
        });

        channel.listen('ChatSendEvent', (event: any) => {
            console.log('Received message:', event);
            setChats(prev => [...prev, event]);

            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('New Message', {
                    body: event.text_field
                });
            }
        });

        return () => {
            channel.stopListening('ChatSendEvent');
            window.Echo.leave(`student-sanjal.${user.id}`);
        };
    }, [user?.id]);



    const showMessageHandle = async(friend: any) => {
        setConnectedFriend(friend);
        setShowMessage(true);
    };
    const handleModal = (media:any)=>{
        setShowModal(true);
        setModalKoMedia(media);
    }

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);

        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options as any).format(date);
    };

    const handleRemoveFile = () => {
        setData('media', null);
    };

    const [fileURL, setFileURL] = useState<string | null>(null);
    useEffect(() => {
        if (data.media) {
            setFileURL(URL.createObjectURL(data.media));
        } else {
            setFileURL(null);
        }

        return () => {
            if (fileURL) URL.revokeObjectURL(fileURL);
        };
    }, [data.media]);

    const getProfileLink:any = (username?: string, otherUsername?:string,otherId?:number) => {
        if(username){
            return username ? window.route('showProfile', username) : window.route('updateProfile');
        }else if(otherUsername) {
            return otherUsername ?? window.route('showProfile', otherUsername);
        } else if(otherId) {
            return otherId ?? window.route('showProfileById', otherId)
        }
    };

  return (
    <CleanHomeLayout>
        <Head title="Chat" />
            {/* <div className="chat-ui max-h-screen min-h-[85vh] pb-3 -mt-1 grid grid-cols-2 gap-4 relative mt-40"> */}
            <div className="chat-ui min-h-[82vh] pb-3 -mt-1 grid grid-cols-2 gap-4">
                <div className="first-col bg-gray-100 rounded-lg px-4 py-2">
                    {/* Header */}
                <div className=" sticky top-20">
                    <div className="header flex items-center justify-between">
                        <div className="profile flex items-center gap-2">
                            <div className="posts-users-icon w-11 h-11 p-[2.5px] bg-[#c7ae6a] rounded-full relative flex justify-end">
                                <Link href={getProfileLink(user.username)}>
                                    <ProfileImage image={user.profile_image} />
                                    {/* <img className="object-cover object-bottom rounded-full w-10 h-full" src={user.profile_image} alt="" /> */}
                                </Link>
                                {user.active_status ?(<div className="bg-green-500 w-[10px] h-[10px] border-[1.5px] border-white rounded-full absolute bottom-[2px] right-[1px]"></div>):""}
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

                        {/* Chat Item */}
                        {usersYouFollowed.map((otherUser:any)=>(
                        <div key={otherUser.id} className="chat-item mt-2" onClick={()=>showMessageHandle(otherUser)}>
                            <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#e3d6b4] rounded-xl flex gap-2 leading-tight items-center">
                                <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
                                    {otherUser.active_status?(
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
                                    </div>):""}
                                    <img className="object-cover object-center rounded-full w-full h-full" src={otherUser.profile_image} alt="" />
                                </div>
                                <div className="chat-details">
                                    <strong className="text-[13px] font-semibold">{otherUser.first_name} {otherUser.middle_name} {otherUser.last_name}</strong>
                                    {(latest_chat?.sender_id==otherUser.id &&
                                    <span>
                                        {latest_chat.media ? (
                                            <p className="text-[12px]">{`${otherUser.first_name} sent an attachment`}</p>
                                        ):(
                                            <p className="text-[12px]">{latest_chat.text_field??latest_chat.text_field}</p>
                                        )}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>))}
                    </div>
                    </div>
                </div>

                <div className="second-col bg-gray-100 rounded-lg h-">
                    {(showMessage && connectedFriend) && (
                    <div className="open-chatter relative h- z-10">
                        <div className="header border-b-2 rounded-t-lg bg-gray-100 border-gray-200 flex items-center justify-between sticky top-16">
                            <div className="chat-profile cursor-pointer px-4 py-2 rounded-t-lg flex gap-2 leading-tight items-center">
                                <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
                                    {connectedFriend.active_status?(
                                    <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                        <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
                                    </div>):""}
                                    <ProfileImage image={connectedFriend.profile_image} className="object-cover object-center rounded-full w-full h-full"/>
                                    {/* // <img className="" src={connectedFriend.profile_image} alt="" /> */}
                                </div>
                                <div className="chat-details">
                                    <Link href={getProfileLink(connectedFriend.username)}>
                                        <strong className="text-sm font-semibold">{connectedFriend.first_name} {connectedFriend.middle_name} {connectedFriend.last_name}</strong>
                                    <p className="text-xs">{connectedFriend.active_status?"Active Now":"Offline"}</p></Link>
                                </div>
                            </div>
                            <div className="serachmaa-action flex items-center gap-5">
                                {showSearchInput && (
                                    <div className="search relative flex items-center">
                                        <input className='rounded-full h-8 placeholder:text-sm' type="text" name="search_text_field" id="" placeholder='Search text_field'/>
                                        <i className="ri-close-fill absolute right-2 text-lg cursor-pointer rounded-full hover:text-black text-gray-600" onClick={()=>setShowSearchInput(false)}></i>
                                    </div>
                                )}
                                {!showSearchInput && (<i className="ri-search-line text-lg cursor-pointer mr-2 hover:text-gray-600" onClick={()=>setShowSearchInput(true)}></i>)}
                                <i className="ri-close-fill mr-4 text-xl cursor-pointer rounded-full hover:text-gray-600" onClick={()=>setShowMessage(false)}></i>
                            </div>
                        </div>
                        <div className="p-4 border-b">
                            <h2>{connectedFriend.username}</h2>
                            {connectionStatus && <span className="text-green-500 text-sm">Connected</span>}
                        </div>
                        {showEmojiPicker && (
                            <div className="emoji-picker fixed text-sm">
                                {/* <EmojiPicker onEmojiClick={handleEmojiClick}/> */}
                                <EmojiPicker height={300} width={300} onEmojiClick={handleEmojiClick} searchDisabled={true}/>
                            </div>
                        )}
                        <div className="message-items py-2 min-h-96" ref={chatContainerRef}>
                            {chats.map((chat: any) => (
                                <div key={chat.id} className="chat-message-haru px-8">
                                    <div className="message-info">
                                        {chat.sender_id === user.id ? (
                                            <div className="sender-walako-message flex justify-end w-full mb-1">
                                                {/* <span className="font-medium mr-2">You:</span> */}
                                                {(chat.text_field || chat.media) && (
                                                    <span className="mr-2 text-gray-500 text-sm mt-[2px]">{formatTime(chat.created_at)}</span>)}
                                                <div>
                                                    {chat.text_field && <p className="bg-[#c7ae6a] text-white px-3 py-1 rounded-full text-sm">{chat.text_field}</p>}
                                                    {chat.media && <img src={chat.media} alt="Media" className="media-image w-16 h-16 mt-[3px] rounded-md cursor-pointer object-cover" onClick={()=>handleModal(chat.media??chat.media)}/>}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="receiver-walako-message flex justify-start w-full mb-1">
                                                {/* <span className="font-medium mr-2">{chat.sender.username}: </span> */}
                                                <div>
                                                    {chat.text_field && <p className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{chat.text_field}</p>}
                                                    {chat.media && <img src={chat.media} alt="Media" onClick={()=>handleModal(chat.media??chat.media)} className="media-image w-16 h-16 mt-[3px] cursor-pointer object-contain rounded-md"/>}
                                                </div>
                                                {(chat.text_field || chat.media) && (
                                                    <span className="ml-2 text-gray-500 text-sm mt-[5px]">{formatTime(chat.created_at)}</span>)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Modal */}
                        {showModal && (
                        <div className="modal top-10">
                            <Modal
                                show={showModal}
                                onClose={() => setShowModal(false)} // Corrected function syntax
                                maxWidth="md"
                                closeable={true}>
                                <div className="p-6">
                                    <img className="rounded-md cursor-pointer w-full object-cover" src={modalKoMedia ?? modalKoMedia} alt="Post media" onClick={()=>setShowModal(false)} />
                                </div>
                            </Modal>
                        </div>)}

                        <div className="footer rounded-b-lg  sticky bottom-0 border-t-[1.5px] border-b w-full px-10 py-2 bg-gray-100">
                            {data.media && (<FilePreview file={data.media} onRemoveFile={handleRemoveFile}className="custom-class"/>)}
                            <form onSubmit={submitChat} className='flex items-center justify-between'>
                                <div className="add flex items-center text-xl gap-4">
                                    <i className="ri-add-circle-fill hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer"></i>
                                    <label htmlFor="media">
                                        <i className="ri-image-add-fill hover:bg-gray-200 rounded-full px-2 py-[7px] cursor-pointer"></i>
                                            <input
                                                id="media"
                                                name="media"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    if (e.target.files) {
                                                        setData('media', e.target.files[0]);
                                                    }
                                                    }}/>
                                        </label>
                                </div>
                                <div className="text_field flex items-center gap-5">
                                    <div className="input relative flex items-center">
                                        <input onChange={(e)=>setData('text_field',e.target.value)} value={data.text_field}
                                        className='rounded-full placeholder:text-sm w-96' type="text" name="text_field" id="text_field" placeholder='Write a message'/>
                                         <button type="button" className="emoji-button absolute right-3" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                            😀
                                        </button>
                                    </div>
                                    <div className="send-btn">
                                        <button type='submit'>
                                            <i className={`ri-send-plane-fill text-xl rounded-full cursor-pointer px-2 py-1 hover:bg-gray-200 ${(data.text_field || data.media)?"block":'hidden'}`}></i>
                                            <i className={`ri-thumb-up-fill cursor-pointer hover:bg-gray-200 rounded-full px-2 py-1 text-xl ${(!data.text_field && !data.media)?"block":"hidden"}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
    </CleanHomeLayout>
  )
}

export default StartChat
