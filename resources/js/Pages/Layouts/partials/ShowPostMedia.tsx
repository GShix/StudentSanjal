import Modal from "@/Components/Modal";
import { useState } from "react";

const ShowPostMedia = ({post}:any) => {

    const isImage = (media: string) => {
        return media.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
    };

    const isVideo = (media: string) => {
        return media.match(/\.(mp4|webm|ogg)$/i);
    };

    const [showModal, setShowModal] = useState(false);
    const [postMedia, setPostMedia] = useState<string>();
    const [postDescription, setPostDescription] = useState<string>();
    const handlePostShow = (media:string,description:string)=>{
        setShowModal(true);
        setPostMedia(media);
        setPostDescription(description);
    }
    const closePostShow =()=>{
        setShowModal(false);
        setPostMedia('');
        setPostDescription('');
    }

  return (
    <>
        <div className="posts-media mt-3 rounded-md flex justify-center border-b-[1.6px] border-t-[1.6px] h-80">
            <>
                {isImage(post.media) ? (
                    <img
                        className="rounded-md cursor-pointer object-contain"
                        src={post.media}
                        alt="Post media"
                        onClick={() => handlePostShow(post.media, post.post_description)}
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="hs-scale-animation-modal"
                        data-hs-overlay="#hs-scale-animation-modal"
                    />
                ) : isVideo(post.media) ? (
                    <video
                        className="rounded-t-lg cursor-pointer h-full"
                        src={post.media}
                        controls
                        onClick={() => handlePostShow(post.media, post.post_description)}
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="hs-scale-animation-modal"
                        data-hs-overlay="#hs-scale-animation-modal"
                    />
                ) : null}
            </>
        </div>
        {showModal && (
            <div className="modal top-10">
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)} // Corrected function syntax
                    maxWidth="md"
                    closeable={true}>
                    <div className="p-6">
                        <img className="rounded-md cursor-pointer w-full object-cover" src={postMedia ?? postMedia} alt="Post media" onClick={closePostShow} />
                        <p className="mt-4">{postDescription}</p>
                    </div>
                </Modal>
            </div>
        )}
    </>
  )
}

export default ShowPostMedia
