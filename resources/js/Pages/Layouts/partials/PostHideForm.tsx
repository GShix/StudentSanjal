import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface FormData {
    reason_to_remove_post: string;
}

const PostHideForm = () => {

    const { data, setData, post, errors, processing, recentlySuccessful, setError } = useForm<FormData>({
        reason_to_remove_post: ""
    });

    const [postIdToRemove, setPostIdToRemove] = useState<number | null>(null);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(window.route('post.hide', postIdToRemove), {
            onSuccess: () => {
                setPostIdToRemove(null);
            }
        });
    };


  return (
    <div className="reason-to-remove flex flex-col gap-3 py-3">
        <p className="text-gray-600 text-[12.5px] md:text-[13px]">Tell us more to help improve your feed.</p>
        <form onSubmit={submit}>
            <div className="remove-reason-form flex flex-col gap-2">
                <div className="reason">
                    <input
                        className="w-full rounded-full placeholder:text-xs md:placeholder:text-[13px]"
                        type="text"
                        name="reason_to_remove_post"
                        id="reason_to_remove_post"
                        value={data.reason_to_remove_post} // Corrected value
                        onChange={(e) => setData("reason_to_remove_post", e.target.value)}
                        placeholder="Must enter your reason to remove this post ..."
                    />
                </div>
                <div className="remove-btn flex justify-end">
                    <button className="bg-[#c7ae6a] px-2 py-1 rounded-md hover:text-gray-200 hover:bg-[#1a1a1a]" type="submit">Submit</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default PostHideForm
