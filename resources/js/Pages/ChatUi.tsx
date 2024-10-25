// import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
// import CleanHomeLayout from './Layouts/CleanHomeLayout';
// import { PageProps } from '@/types';
// import { FormEventHandler, useEffect, useState } from 'react';
// import ProfileImage from './Layouts/partials/ProfileImage';

// interface noteData {
//     title: string;
// }
// interface FormData {
//     text_field?:string;
//     media?:File | null;
//     like?: boolean;
// }
// interface connectedFriend {
//     profile_image: string;
//     first_name: string;
//     middle_name: string;
//     last_name: string;
//     username: string;
//     active_status: string;
// }
// interface noteWalafriend{
//     note:string;
//     profile_image:string;
//     title:string;
// }
// const ChatUi = () => {
//     const { user, latest_note } = usePage<PageProps>().props.auth;

//     const { data: noteData, setData: setNoteData, post: postNote, errors: noteErrors, processing: noteProcessing, recentlySuccessful: noteRecentlySuccessful, setError: setNoteError } = useForm<noteData>({
//         title: '',
//     });

//     const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
//         text_field:'',
//         media:null,
//         like: '',
//     });

//     const showMessageHandle = (friend:any) => {
//         setconnectedFriend(friend);
//         post(route('fetchChats', friend.id));
//         setShowMessage(true);
//         setData({
//             text_field: '',
//             media: null,
//             like: false,
//         });
//     };
//     const { allUsers = [] } = usePage<PageProps>().props;
//     const { chats} = usePage<PageProps>().props;
//     console.log(chats)

//     const [connectedFriend, setconnectedFriend] = useState<connectedFriend | null>(null);

//     const [showNoteCreate, setShowNoteCreate] = useState(false);
//     const [showNoteEdit, setShowNoteEdit] = useState(false);
//     const [showMessage, setShowMessage] = useState(false);

//     const [noteWalafriend,setNoteWalafriend] = useState<noteWalafriend | null>(null);
//     const [showOthersNote,setShowOthersNote] = useState(false);


//     const handleEditNote =() =>{
//         setShowNoteEdit(true);
//         setShowNoteCreate(false);
//         setShowMessage(false);
//         setShowOthersNote(false);
//     }
//     const handleOthersNote =(friend:any) =>{
//         setShowNoteEdit(false);
//         setShowOthersNote(true);
//         setShowNoteCreate(false);
//         setShowMessage(false);
//         setNoteWalafriend(friend);
//     }
//     const handleCreateNote =() =>{
//         setShowNoteEdit(false);
//         setShowNoteCreate(true);
//         setShowMessage(false);
//     }

//     const [showSearchInput,setShowSearchInput] = useState(false);

//     const [otherUsers, setOtherUsers] = useState([]);
//     const [fileURL, setFileURL] = useState<string | null>(null);

//     useEffect(() => {
//         if (data.media) {
//             setFileURL(URL.createObjectURL(data.media));
//         } else {
//             setFileURL(null);
//         }

//         // Cleanup URL object
//         return () => {
//             if (fileURL) URL.revokeObjectURL(fileURL);
//         };
//     }, [data.media]);

//     useEffect(() => {
//         if (user && allUsers.length > 0) {
//             setOtherUsers(allUsers.filter((other:any) => other.id !== user.id));
//         }
//     }, [user, allUsers]);

//     const handleChat = (e:any)=>{
//         e.preventDefault();

//         post(route('chat.send'), {
//             onSuccess: () => {
//                 setData({
//                     text_field: '',
//                     media: null,
//                     like: '',
//                 });
//             },
//             onError: (error) => {
//                 setNoteError('title', error);
//             },
//         });
//     }
//     const handleRemoveFile = () => {
//         setData('media', null);
//     };
//     const storeNote = () => {
//         postNote(route('note.store'), {
//             onSuccess: () => {
//                 setNoteData('title', '');
//                 setShowNoteCreate(false);
//             },
//             onError: (error) => {
//                 setNoteError('title', error);
//             },
//         });
//     };
//     const deleteNote = (latestNote:any) => {
//         router.delete(route('note.destroy',latestNote), {
//             onSuccess: () => {
//                 setNoteData('title', '');
//                 setShowNoteCreate(false);
//                 setShowNoteEdit(false);
//             },
//             onError: (error) => {
//                 setError('title', error);
//             },
//         });
//     };

//     const getProfileLink:any = (username?: string, otherUsername?:string,otherId?:number) => {
//         if(username){
//             return username ? route('showProfile', username) : route('updateProfile');
//         }else if(otherUsername) {
//             return otherUsername ?? route('showProfile', otherUsername);
//         } else if(otherId) {
//             return otherId ?? route('showProfileById', otherId)

//         }{
//         }
//     };
//     return (
//         <CleanHomeLayout>
//             <Head title="Chat" />
//             {/* <div className="chat-ui max-h-screen min-h-[85vh] pb-3 -mt-1 grid grid-cols-2 gap-4 relative mt-40"> */}
//             <div className="chat-ui max-h-screen min-h-[85vh] pb-3 -mt-1 grid grid-cols-2 gap-4 relative">
//                 <div className="first-col bg-gray-100 rounded-lg px-4 py-2 h-full">
//                     {/* Header */}
//                     <div className="header flex items-center justify-between">
//                         <div className="profile flex items-center gap-2">
//                             <div className="posts-users-icon w-11 h-11 p-[2.5px] bg-[#c7ae6a] rounded-full relative flex justify-end">
//                                 <Link href={getProfileLink(user.username)}>
//                                     <ProfileImage image={user.profile_image} />
//                                     {/* <img className="object-cover object-bottom rounded-full w-10 h-full" src={user.profile_image} alt="" /> */}
//                                 </Link>
//                                 {user.active_status && <div className="bg-green-500 w-[10px] h-[10px] border-[1.5px] border-white rounded-full absolute bottom-[2px] right-[1px]"></div>}
//                             </div>
//                             <div className="username flex items-center gap-1">
//                                 {(user.username)?user.username:`${user.first_name} ${user.middle_name?user.middle_name:""} ${user.last_name}`}
//                                 <i className="ri-arrow-down-s-line text-xl font-light"></i>
//                             </div>
//                         </div>
//                         <i className="ri-settings-5-fill text-[#b99a45] text-2xl"></i>
//                     </div>

//                     {/* Chat Box */}
//                     <div className="chat-box py-2">
//                         <div className="chat-category flex gap-5 px-2 py-2 border-b-2 border-gray-200 mb-2 text-[15px]">
//                             <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-5 py-1 rounded-full">Inbox</h1>
//                             <h1 className="bg-gray-200/90 cursor-pointer hover:bg-gray-300/80 px-5 py-1 rounded-full">Communities</h1>
//                         </div>

//                         {/* Your note Section */}
//                         <div className="connection-note px-2 py-2 flex gap-6 items-center h-38">
//                             <div className="your flex items-center flex-col max-w-24">
//                                 { (latest_note && latest_note.title)? (
//                                 <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] inline-block mb-[5px] cursor-pointer" onClick={() => handleEditNote()}>
//                                    <span className='text-nowrap text-sm'>
//                                         {latest_note && latest_note.title
//                                         ? latest_note.title.length > 10
//                                             ? `${latest_note.title.slice(0, 10)}...` // Limit to 10 characters
//                                             : latest_note.title
//                                         : 'Note..'}
//                                     </span>
//                                     <div className="absolute rotate-90 top-7 w-0 h-0 border-t-[15px] border-t-white border-r-[15px] border-r-transparent z-99"></div>
//                                 </div>
//                                 ):(
//                                 <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] inline-block mb-1 cursor-pointer" onClick={() => setShowNoteCreate(true)}>
//                                     <span className='text-nowrap text-sm'>{ latest_note?latest_note.title:  'Note..'}</span>
//                                     <div className="absolute rotate-90 top-7 w-0 h-0 border-t-[15px] border-t-white border-r-[15px] border-r-transparent z-99"></div>
//                                 </div>
//                                 )}

//                                 <div className="posts-users-icon w-[70px] h-[70px] rounded-full relative flex justify-end">
//                                     <ProfileImage image={user.profile_image} />
//                                     {/* <img className="object-cover object-bottom rounded-full w-full h-full" src={user.profile_image} alt="" /> */}
//                                 </div>
//                                 <div className="user text-[12.5px] text-gray-500">
//                                     <span>Your note</span>
//                                 </div>
//                             </div>

//                             {/* Others Note */}
//                             {otherUsers.map((other: any) => (
//                                 <div key={other.id} className="others flex items-center flex-col">
//                                 {Array.isArray(other.note) && other.note.length > 0 && (
//                                     <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] mb-[5px] block" onClick={()=>handleOthersNote(other)}>
//                                         {other.note[0].title.length > 12
//                                             ? `${other.note[0].title.slice(0, 12)}...`  // Limit to 50 characters
//                                             : other.note[0].title
//                                             }
//                                         <div className="absolute b500 top-7 left-[25%] rotate-90 w-0 h-0 border-t-[15px] border-t-white border-r-[15px] border-r-transparent z-99"></div>
//                                     </div>
//                                 )}
//                                     <div className={`posts-users-icon w-[70px] h-[70px] rounded-full relative flex justify-end max-w-20 ${(Array.isArray(other.note) && other.note.length) ? 'mt-0' : 'mt-10'}`}>
//                                        <Link href={getProfileLink(other.username)}>
//                                             <img className="object-cover object-bottom rounded-full w-full h-full" src={other.profile_image} alt={`${other.first_name}'s Profile`} />
//                                         </Link>
//                                     </div>
//                                     <div className="user text-[12.5px] text-gray-500 max-w-28 flex flex-wrap">
//                                         <span className="text-nowrap">{other.first_name} {other.last_name}</span>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Chat Item */}
//                         {otherUsers.map((otherUser:any)=>(
//                         <div key={otherUser.id} className="chat-item mt-2" onClick={()=>showMessageHandle(otherUser)}>
//                             <div className="chat-profile cursor-pointer px-2 py-2 bg-gray-100 hover:bg-[#e3d6b4] rounded-xl flex gap-2 leading-tight items-center">
//                                 <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
//                                     <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
//                                         <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
//                                     </div>
//                                     <img className="object-cover object-center rounded-full w-full h-full" src={otherUser.profile_image} alt="" />
//                                 </div>
//                                 <div className="chat-details">
//                                     <strong className="text-[13px] font-semibold">{otherUser.first_name} {otherUser.middle_name} {otherUser.last_name}</strong>
//                                     <p className="text-[11px]">Good Morning! Sir</p>
//                                 </div>
//                             </div>
//                         </div>))}
//                     </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="second-col bg-gray-100 rounded-lg h-full">
//                     {showNoteCreate && (
//                         <div className="share-new-note px-4">
//                             <div className="head flex justify-between border-b-2 py-8 border-gray-200 items-center h-10">
//                                 <button onClick={() => setShowNoteCreate(false)}>
//                                     <i className="ri-close-fill text-2xl hover:text-[#b99a45]"></i>
//                                 </button>
//                                 <h2 className="font-semibold">New Note</h2>
//                                 <button
//                                     className={`py-2 px-2 rounded-lg ${noteData.title ? 'hover:bg-[#b99a45] text-black hover:text-white' : 'text-gray-400 cursor-not-allowed'}`}
//                                     disabled={!noteData.title}
//                                     onClick={storeNote}
//                                 >
//                                     Share
//                                 </button>
//                             </div>
//                             <div className="flex flex-col justify-center items-center h-96">
//                                 <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2.5 py-[6px] inline-block mb-1">
//                                     <div className="absolute rotate-90 top-[47px] left-[40%] w-3 h-0 border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
//                                     <input
//                                         value={noteData.title}
//                                         className="border-none rounded-md"
//                                         type="text"
//                                         name="title"
//                                         id="note-title"
//                                         placeholder={`${user.first_name}, Share your thoughts...`}
//                                         onChange={(e) => setNoteData('title', e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="profile-image mt-1 w-36 h-36">
//                                     <ProfileImage image={user.profile_image}/>
//                                     {/* <img className="rounded-full w-full h-full object-cover object-center" src={user.profile_image} alt="" /> */}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {showNoteEdit && (
//                         <div className='absolute left-[25%] top-[12%] z-20'>
//                         <div className="flex flex-col justify-center items-center h-80 bg-gray-50 w-72 mt-10 rounded-lg px-2 py-3 relative" style={{ boxShadow:"0 0 5px 5px #d6d6d6" }}>
//                             <i className="ri-close-fill absolute top-1 right-2 text-xl cursor-pointer hover:text-[#b99a45]" onClick={()=>setShowNoteEdit(false)}></i>
//                             <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2 py-1 inline-block mb-1">
//                                 <div className="absolute rotate-90 -bottom-2 left-[40%] w-3 h-0 border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
//                                 <span className='rounded-md'>{latest_note.title}</span>
//                             </div>
//                             <div className="profile-image mt-1 w-32 h-32">
//                                 <ProfileImage image={user.profile_image} />
//                                 {/* <img className="rounded-full w-full h-full object-cover object-center" src={user.profile_image} alt="" /> */}
//                             </div>
//                             <div className="note-btn w-full mt-4 flex flex-col gap-2 font-medium text-white">
//                                 <button className='bg-[#c8b37c] w-full rounded-md py-1 hover:bg-[#b99a45]' onClick={handleCreateNote}>Create a new note</button>
//                                 {/* <form action=""> */}
//                                     <button className='bg-gray-50 w-full rounded-md py-1 text-[#b99a45] hover:bg-gray-200' onClick={()=>deleteNote(latest_note)}>Delete note</button>
//                                 {/* </form> */}
//                             </div>
//                         </div>
//                     </div>
//                     )}

//                     {showOthersNote && noteWalafriend && (
//                         <div className='absolute left-[25%] top-[10%] z-20'>
//                         <div className="flex flex-col justify-center items-center h-[300px] bg-gray-50 w-72 mt-10 rounded-lg px-2 py-3 relative" style={{ boxShadow:"0 0 5px 5px #d6d6d6" }}>
//                             <i className="ri-close-fill absolute top-1 right-2 text-xl cursor-pointer hover:text-[#b99a45]" onClick={()=>setShowOthersNote(false)}></i>
//                             <div className="relative bg-white text-gray-500 rounded-lg shadow-lg px-2 py-1 inline-block mb-1">
//                                 <div className="absolute rotate-90 -bottom-2 left-[40%] w-3 h-0 border-t-[15px] border-t-white border-r-[10px] border-r-transparent"></div>
//                                 <span className='rounded-md px-2'>{noteWalafriend.note && noteWalafriend.note.length > 0 && noteWalafriend.note[0].title}</span>
//                             </div>
//                             <div className="profile-image mt-1 w-32 h-32">
//                                 <img className="rounded-full w-full h-full object-cover object-center" src={noteWalafriend.profile_image} alt="" />
//                             </div>
//                             <div className="send-text_field-to-note flex justify-center px-2 mt-5">
//                                 <input className='text-sm w-full rounded-full' type="text" name="text_field_to_note" id="text_field_to_note" placeholder='Send text_field'/>
//                             </div>
//                         </div>
//                     </div>
//                     )}

//                     {(showMessage && connectedFriend) && (
//                     <div className="opern-chatter relative h-full z-10">
//                         <div className="header border-b-2 rounded-t-lg border-gray-200 flex items-center justify-between">
//                             <div className="chat-profile cursor-pointer px-4 py-2 rounded-t-lg flex gap-2 leading-tight items-center">
//                                 <div className="chat-icon w-11 h-11 p-[2px] bg-[#c7ae6a] rounded-full relative">
//                                     <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
//                                         <div className="active-status h-[6px] w-[6px] bg-green-500 rounded-full"></div>
//                                     </div>
//                                     <img className="object-cover object-center rounded-full w-full h-full" src={connectedFriend.profile_image} alt="" />
//                                 </div>
//                                 <div className="chat-details">
//                                     <Link href={getProfileLink(connectedFriend.username)}>
//                                         <strong className="text-sm font-semibold">{connectedFriend.first_name} {connectedFriend.middle_name} {connectedFriend.last_name}</strong>
//                                     <p className="text-xs">{connectedFriend.active_status?"Active Now":"Offline"}</p></Link>
//                                 </div>
//                             </div>
//                             <div className="serachmaa-action flex items-center gap-5">
//                                 {showSearchInput && (
//                                     <div className="search relative flex items-center">
//                                         <input className='rounded-full h-8 placeholder:text-sm' type="text" name="search_text_field" id="" placeholder='Search text_field'/>
//                                         <i className="ri-close-fill absolute right-2 text-lg cursor-pointer rounded-full hover:text-black text-gray-600" onClick={()=>setShowSearchInput(false)}></i>
//                                     </div>
//                                 )}
//                                 {!showSearchInput && (<i className="ri-search-line text-lg cursor-pointer mr-2 hover:text-gray-600" onClick={()=>setShowSearchInput(true)}></i>)}
//                                 <i className="ri-close-fill mr-4 text-2xl cursor-pointer rounded-full hover:text-gray-600" onClick={()=>setShowMessage(false)}></i>
//                             </div>

//                         </div>
//                         {chats.map((chat:any) => (
//                             <div key={chat.id} className="chat-message-haru h-20 w-full bg-gray-100 px-10 py-2">
//                                 {/* Display chat details */}
//                                 <div className="message-info">
//                                     {/* Conditionally show sender or receiver message based on who is sending */}
//                                     {chat.sender_id === user.id ? (
//                                         <div className="sender-message float-right">
//                                             <p>You: {chat.text_field}</p>
//                                             {chat.media && <img src={chat.media} alt="Media" className="media-image w-12 h-12" />}
//                                         </div>
//                                     ) : (
//                                         <div className="receiver-message float-left">
//                                             <p>{chat.receiver.username}: {chat.text_field}</p>
//                                             {chat.media && <img src={chat.media} alt="Media" className="media-image w-12 h-12" />}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}

//                         <div className="footer rounded-b-lg absolute bottom-0 border-t-[1.5px] border-b w-full px-10 py-2 ">
//                         {data.media && (
//                             <div className="div relative w-20 h-20 flex items-center justify-center">
//                                 <i className="ri-close-fill absolute -right-[2px] -top-2.5 text-xl text-gray-700/90 cursor-pointer hover:text-red-500 rounded-full" onClick={handleRemoveFile}></i>
//                                 <div className="show-media h-14 w-14">
//                                     {data.media?.type.startsWith('image/') ? (
//                                         <img src={fileURL} alt="Uploaded preview" className="w-full h-full rounded-md object-cover" />
//                                     ) : data.media?.type.startsWith('video/') ? (
//                                         <video controls className="w-full h-auto rounded-md">
//                                             <source src={fileURL} type={data.media.type} />
//                                             Your browser does not support the video tag.
//                                         </video>
//                                     ) : (
//                                         <p className="text-gray-500">Unsupported file type</p>
//                                     )}
//                                 </div>
//                             </div>
//                             )}
//                             <form onSubmit={handleChat} className='flex items-center justify-between'>
//                                 <div className="add flex items-center text-xl gap-4">
//                                     <i className="ri-add-circle-fill hover:bg-gray-200 rounded-full px-2 py-1 cursor-pointer"></i>
//                                     <label htmlFor="media">
//                                         <i className="ri-image-add-fill hover:bg-gray-200 rounded-full px-2 py-[7px] cursor-pointer"></i>
//                                             <input
//                                                 id="media"
//                                                 name="media"
//                                                 type="file"
//                                                 className="sr-only"
//                                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                                     if (e.target.files) {
//                                                         setData('media', e.target.files[0]);
//                                                     }
//                                                     }}/>
//                                         </label>
//                                 </div>
//                                 <div className="text_field flex items-center gap-5">
//                                     <div className="input">
//                                         <input onChange={(e)=>setData('text_field',e.target.value)} value={data.text_field}
//                                         className='rounded-full placeholder:text-sm w-96' type="text" name="text_field" id="text_field" placeholder='Write a text_field'/>
//                                     </div>
//                                     <div className="send-btn">
//                                         <button type='submit'>
//                                             <i className={`ri-send-plane-fill text-xl rounded-full cursor-pointer px-2 py-1 hover:bg-gray-200 ${(data.text_field || data.media)?"block":'hidden'}`}></i>
//                                             <i className={`ri-thumb-up-fill cursor-pointer hover:bg-gray-200 rounded-full px-2 py-1 text-xl ${(!data.text_field && !data.media)?"block":"hidden"}`} onChange={()=>setData('like',true)}></i>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     )}
//                 </div>
//             </div>
//         </CleanHomeLayout>
//     );
// };

// export default ChatUi;
