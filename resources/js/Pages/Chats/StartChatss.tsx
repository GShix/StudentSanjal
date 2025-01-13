import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import ProfileImage from "../Layouts/partials/ProfileImage";
import { Link } from "lucide-react";
import Modal from "@/Components/Modal";
import FilePreview from "../Layouts/partials/PreviewFile";
import ChatsLayout from "./ChatsLayout";

interface FormData {
    text_field?:string; media?:File | null;  like?: string;
}

interface RequestedUser {
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


const StartChatss = () => {
    const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
        text_field:'',
        media:null,
        like: '',
    });

    const { latest_chat,usersYouFollowed,user} = usePage<PageProps>().props.auth;
    const { otherUsers,chats} = usePage<PageProps>().props;

    const  requestedUser = usePage<PageProps>().props.requestedUser;
    const connectedUser = requestedUser[0];

    // console.log(connectedUser)
    const [showMessage,setShowMessage] = useState(true);
    const [showSearchInput,setShowSearchInput] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [modalKoMedia,setModalKoMedia] = useState();

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

    // const fetchChats = async () => {
    //     try {
    //         const response = await axios.get(`fetchChats/${connectedFriend.id}`);
    //         setChats(response.data.chats);
    //     } catch (error) {
    //         console.error("Error fetching chats:", error);
    //     }
    // };
    // useEffect(() => {
    //     if (connectedFriend) {
    //         fetchChats();
    //     }
    // }, [connectedFriend]);

    const submitChat = (e:any) => {
        e.preventDefault();
        if (!data.text_field && !data.media) return;

        post(window.route('chatss.send'), {
            onSuccess: () => {
                setData({
                    text_field: '',
                    media: null,
                    like: '',
                });
                // fetchChats();
            },
        });
    };


    // const [connectionStatus, setConnectionStatus] = useState('connecting');

    // useEffect(() => {
    //     if (!user?.id) return;

    //     console.log('Subscribing to channel:', `student-sanjal.${user.id}`);

    //     const channel = window.Echo.private(`student-sanjal.${user.id}`);

    //     // Debug subscription
    //     channel.subscribed(() => {
    //         console.log('Successfully subscribed to channel');
    //         setConnectionStatus('connected');
    //     });

    //     channel.error((error: any) => {
    //         console.error('Channel error:', error);
    //         setConnectionStatus('error');
    //     });

    //     channel.listen('ChatSendEvent', (event: any) => {
    //         console.log('Received message:', event);
    //         setChats(prev => [...prev, event]);

    //         if ('Notification' in window && Notification.permission === 'granted') {
    //             new Notification('New Message', {
    //                 body: event.text_field
    //             });
    //         }
    //     });

    //     return () => {
    //         channel.stopListening('ChatSendEvent');
    //         window.Echo.leave(`student-sanjal.${user.id}`);
    //     };
    // }, [user?.id]);


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
    <ChatsLayout>
        <Head title="Chats"/>
        {(connectedUser && showMessage) && (
        <div className="open-chatter relative h-100 z-10">
            <div className="header border-b-2 rounded-t-lg bg-gray-100 border-gray-200 flex items-center justify-between sticky top-16">
                <div className="chat-profile cursor-pointer px-4 py-2 rounded-t-lg flex gap-2 leading-tight items-center">
                    <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
                        {connectedUser.active_status?(
                        <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                            <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
                        </div>):""}
                        <ProfileImage image={connectedUser.profile_image} className="object-cover object-center rounded-full w-full h-full"/>
                    </div>
                    <div className="chat-details">
                        {/* <Link href={getProfileLink(connectedUser.username)}> */}
                            <strong className="text-sm font-semibold">
                                {connectedUser.first_name} {connectedUser.middle_name || ''} {connectedUser.last_name}
                            </strong>
                            <p className="text-xs">
                                {connectedUser.active_status ? "Active Now" : "Offline"}
                            </p>
                        {/* </Link> */}
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
            {showEmojiPicker && (
                <div className="emoji-picker fixed text-sm">
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
    </ChatsLayout>
  )
}

export default StartChatss
