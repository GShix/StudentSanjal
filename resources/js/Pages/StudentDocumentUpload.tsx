import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import CleanHomeLayout from "./Layouts/CleanHomeLayout";
import InputError from "@/Components/InputError";

interface FormData {
    id_card_photo?: File | null;
    expires_on:number | string;
    user_id?:number|string;
}
const StudentDocumentUpload = () => {

    const user = usePage<PageProps>().props.auth.user;
    const { data, setData, post,errors, clearErrors } = useForm<FormData>({
        id_card_photo: null,
        expires_on:"",
        user_id:user.id,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('id_card_photo', file);
        clearErrors('id_card_photo');
    };

    const handleRemoveFile = () => {
        setData('id_card_photo', null);
    };

    const [fileURL, setFileURL] = useState<string | null>(null);
    useEffect(() => {
        if (data.id_card_photo) {
            setFileURL(URL.createObjectURL(data.id_card_photo));
        } else {
            setFileURL(null);
        }

        return () => {
            if (fileURL) URL.revokeObjectURL(fileURL);
        };
    }, [data.id_card_photo]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        post(window.window.route('student.verify.store'), {
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
                        {!data.id_card_photo && (
                            <div className="upload-div">
                                <i className="ri-close-fill absolute right-4 top-3 text-2xl text-gray-700/90 cursor-pointer bg-white hover:bg-gray-300 px-1 rounded-full" onClick={handleRemoveFile}></i>
                                <label htmlFor="id_card_photo" className="flex flex-col items-center cursor-pointer bg-gray-100/50 hover:bg-gray-200/70 rounded-md py-10">
                                    <i className="ri-add-circle-fill mb-2 text-2xl bg-gray-300/90 px-2 py-1 rounded-full"></i>
                                    <span className="font-medium text-gray-400">Add your Student ID Card, here</span>
                                    <input
                                        id="id_card_photo"
                                        name="id_card_photo"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        )}
                        {fileURL && (
                            <div className="show-id_card_photo relative">
                                <i className="ri-close-fill absolute right-4 top-3 text-2xl text-gray-700/90 cursor-pointer bg-white hover:bg-gray-300 px-1 rounded-full" onClick={handleRemoveFile}></i>
                                {data.id_card_photo?.type.startsWith('image/') ? (
                                    <img src={fileURL} alt="Uploaded preview" className="w-full h-auto rounded-md" />
                                ) : data.id_card_photo?.type.startsWith('video/') ? (
                                    <video controls className="w-full h-auto rounded-md">
                                        <source src={fileURL} type={data.id_card_photo.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <p className="text-gray-500">Unsupported file type</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-2 col-span-full mt-2">
                            <label htmlFor="expires_on" className="block text-sm font-medium leading-6 text-gray-900">
                                Expiry Date
                            </label>
                            <div className="mt-2">
                                <input
                                id="expires_on"
                                name="expires_on"
                                type="date"
                                value={data.expires_on}
                                onChange={(e) => setData('expires_on', e.target.value)}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Your card expiry date'/>
                            </div>
                            <InputError className="mt-2" message={errors.expires_on} />

                        </div>
                    <div className="post-btn">
                        <button
                            className={`mt-4 w-full py-2 text-white rounded-lg ${ data.id_card_photo ? "bg-[#b99a45] hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
                            onClick={submit}
                            disabled={!data.id_card_photo}>
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
