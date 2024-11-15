import { Head, Link, useForm, usePage } from "@inertiajs/react";
import HomeLayout from "./Layouts/HomeLayout";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import ProfileImage from "./Layouts/partials/ProfileImage";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface FormData {
    post_description: string;
    media?: File | null;
    _method: "PATCH";
}

const EditPost = () => {
    const user = usePage<PageProps>().props.auth.user;
    const { postToEdit } = usePage<PageProps>().props;

    // Set initial form data from postToEdit
    const { data, setData, post, errors, clearErrors } = useForm<FormData>({
        post_description: postToEdit?.post_description || "",
        media: null,
        _method: "PATCH"
    });

    const [showPostAdd, setShowPostAdd] = useState(true);
    const [showEventAdd, setShowEventAdd] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [fileURL, setFileURL] = useState<string | null>(null);

    // Handle file preview
    useEffect(() => {
        if (data.media) {

            const url = URL.createObjectURL(data.media);
            setFileURL(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setFileURL(null);
        }
    }, [data.media]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData("media", file);
        clearErrors("media");
    };

    const handleRemoveFile = () => {
        setData("media", null);
        setFileURL(null);
        setShowPostAdd(!showPostAdd); // Toggle post add view
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        const newValue = (data.post_description || "") + emojiData.emoji;
        setData("post_description", newValue);
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("post_description", data.post_description);
        if (data.media) formData.append("media", data.media);

        post(window.window.route("post.update", { post: postToEdit.id }), {
            data: formData,
            method:'patch',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onError: () => clearErrors(),
        });
    };

    return (
        <HomeLayout>
            <Head title="Post" />
            <div className="post bg-gray-100 px-4 py-3 rounded-xl min-h-screen relative">
                <div className="h1 text-center font-semibold hover:underline">Edit your Post</div>
                <button className="mt-2 px-[4px] rounded-full bg-gray-200/90 hover:bg-red-500 text-red-500 hover:text-white absolute top-0 right-3">
                    <Link className="" href="/"><i className="ri-close-fill text-xl"></i></Link>
                </button>
                <div className="w-full max-w-md mx-auto my-4 p-4 bg-white rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="user-profile_image h-[50px] w-[50px] bg-[#c7ae6a] rounded-full p-[2px]">
                            <ProfileImage image={user.profile_image} />
                            {/* <img src={user.profile_image} alt="Profile" className="rounded-full w-full h-full bg-[#b99a45] object-cover object-center" /> */}
                        </div>
                        <div className="ml-4">
                            <div className="font-medium text-gray-700">
                                {user.first_name} {user.middle_name} {user.last_name}
                            </div>
                            <div className="post-privacy">
                                <select className="mt-1 block text-xs w-20 py-1 px-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md" defaultValue="public">
                                    <option value="public" className="font-[sans-serif]">Public</option>
                                    <option value="friends" className="font-[sans-serif]">Friends</option>
                                    <option value="only_me" className="font-[sans-serif]">Only Me</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="caption relative">
                        <textarea
                            className="w-full p-2 border-none rounded-lg focus:outline-none focus:ring-1 focus:border-[#c7ae6a] text-sm"
                            rows={2}
                            placeholder={`What's on your mind, ${user.first_name}?`}
                            value={data.post_description}
                            onChange={(e) => setData('post_description', e.target.value)}></textarea>
                        <button type="button" className="emoji-button absolute right-3 top-3 text-xl" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            😀
                        </button>
                        {showEmojiPicker && (
                            <div className="emoji-picker text-sm">
                                {/* <EmojiPicker onEmojiClick={handleEmojiClick}/> */}
                                <EmojiPicker height={300} width={300} onEmojiClick={handleEmojiClick} searchDisabled={true}/>
                            </div>
                        )}
                    </div>
                    {showPostAdd && (
                        <div className="file mt-2 p-2 border border-gray-300 rounded-md relative">
                            {!data.media && (
                                <div className="upload-div">
                                    <i className="ri-close-fill absolute right-4 top-3 text-2xl text-gray-700/90 cursor-pointer bg-white hover:bg-gray-300 px-1 rounded-full" onClick={handleRemoveFile}></i>
                                    <label htmlFor="media" className="flex flex-col items-center cursor-pointer bg-gray-100/50 hover:bg-gray-200/70 rounded-md py-10">
                                        <i className="ri-add-circle-fill mb-2 text-2xl bg-gray-300/90 px-2 py-1 rounded-full"></i>
                                        <span className="font-medium text-gray-400">Add your media, here</span>
                                        <input
                                            id="media"
                                            name="media"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            )}
                            {fileURL && (
                                <div className="show-media relative">
                                    <i className="ri-close-fill absolute right-4 top-3 text-2xl text-gray-700/90 cursor-pointer bg-white hover:bg-gray-300 px-1 rounded-full" onClick={handleRemoveFile}></i>
                                    {data.media?.type.startsWith('image/') ? (
                                        <img src={fileURL} alt="Uploaded preview" className="w-full h-auto rounded-md" />
                                    ) : data.media?.type.startsWith('video/') ? (
                                        <video controls className="w-full h-auto rounded-md">
                                            <source src={fileURL} type={data.media.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <p className="text-gray-500">Unsupported file type</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="post-type flex items-center gap-20 bg-white rounded-md px-2 py-2 mt-2 border border-gray-300">
                        <span className="text-sm font-medium text-gray-700">Select to add</span>
                        <div className="flex gap-5 items-center">
                            <div className="relative group flex justify-center">
                                <i className={`ri-image-add-fill px-2 py-1 rounded-md cursor-pointer ${showPostAdd ? "bg-[#c7ae6a]" : "bg-gray-200"}`}
                                    onClick={() => setShowPostAdd(!showPostAdd)}></i>
                                <div className="absolute bottom-full w-32 mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                                    Add Photo/Video
                                </div>
                            </div>
                            <div className="relative group flex justify-center">
                                <i
                                    className={`ri-calendar-event-fill px-2 py-1 rounded-md cursor-pointer ${showEventAdd ? "bg-[#c7ae6a]" : "bg-gray-200"}`}
                                    onClick={() => setShowEventAdd(!showEventAdd)}
                                ></i>
                                <div className="absolute bottom-full w-20 mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                                    Add Event
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="post-btn">
                        <button
                            className={`mt-4 w-full py-2 text-white rounded-lg ${data.post_description || data.media ? "bg-[#b99a45] hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
                            onClick={submit}
                            disabled={!data.post_description && !data.media}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default EditPost;
