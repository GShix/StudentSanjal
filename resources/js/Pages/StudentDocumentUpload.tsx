import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import CleanHomeLayout from "./Layouts/CleanHomeLayout";

interface FormData {
    idCard?: File | null;
    expiresOn:Date | string;
}
const StudentDocumentUpload = () => {

    const user = usePage<PageProps>().props.auth.user;
    const { data, setData, post,errors, clearErrors } = useForm<FormData>({
        idCard: null,
        expiresOn:""
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('idCard', file);
        clearErrors('idCard');
    };

    const handleRemoveFile = () => {
        setData('idCard', null);
    };

    const [fileURL, setFileURL] = useState<string | null>(null);
    useEffect(() => {
        if (data.idCard) {
            setFileURL(URL.createObjectURL(data.idCard));
        } else {
            setFileURL(null);
        }

        return () => {
            if (fileURL) URL.revokeObjectURL(fileURL);
        };
    }, [data.idCard]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.idCard) formData.append('idCard', data.idCard);

        post(window.window.route('post.store'), {
            data: formData,
            onError: () => {
                clearErrors();
            },
        });
    };
  return (
    <CleanHomeLayout >
        <Head title="Uploads"/>
        <div className="post bg-gray-100 px-4 py-3 rounded-xl min-h-screen relative">
            <div className="h1 text-center font-semibold hover:underline">Upload your Document</div>
            <div className="w-full max-w-md mx-auto my-4 p-4 bg-white rounded-lg shadow-md border border-gray-100">
                <div className="caption relative">
                    <div className="file mt-2 p-2 border border-gray-300 rounded-md relative">
                        {!data.idCard && (
                            <div className="upload-div">
                                <i className="ri-close-fill absolute right-4 top-3 text-2xl text-gray-700/90 cursor-pointer bg-white hover:bg-gray-300 px-1 rounded-full" onClick={handleRemoveFile}></i>
                                <label htmlFor="idCard" className="flex flex-col items-center cursor-pointer bg-gray-100/50 hover:bg-gray-200/70 rounded-md py-10">
                                    <i className="ri-add-circle-fill mb-2 text-2xl bg-gray-300/90 px-2 py-1 rounded-full"></i>
                                    <span className="font-medium text-gray-400">Add your Student ID Card, here</span>
                                    <input
                                        id="idCard"
                                        name="idCard"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        )}
                        {fileURL && (
                            <div className="show-idCard relative">
                                <i className="ri-close-fill absolute right-4 top-3 text-2xl text-gray-700/90 cursor-pointer bg-white hover:bg-gray-300 px-1 rounded-full" onClick={handleRemoveFile}></i>
                                {data.idCard?.type.startsWith('image/') ? (
                                    <img src={fileURL} alt="Uploaded preview" className="w-full h-auto rounded-md" />
                                ) : data.idCard?.type.startsWith('video/') ? (
                                    <video controls className="w-full h-auto rounded-md">
                                        <source src={fileURL} type={data.idCard.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <p className="text-gray-500">Unsupported file type</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="post-btn">
                        <button
                            className={`mt-4 w-full py-2 text-white rounded-lg ${ data.idCard ? "bg-[#b99a45] hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
                            onClick={submit}
                            disabled={!data.idCard}>
                            Sumbit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default StudentDocumentUpload
