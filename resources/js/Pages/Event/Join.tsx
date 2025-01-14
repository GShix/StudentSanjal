import { Head, useForm, usePage } from "@inertiajs/react"
import CleanHomeLayout from "../Layouts/CleanHomeLayout"
import Sidebar from "../Layouts/partials/Sidebar"
import { PageProps } from "@/types";
import { FormEventHandler, useState } from "react";

interface FormData {
    payment_screenshoot: File | null;
    full_name: string;
    email: string;
    phone:string;
}

const Join = () => {
    const {event} = usePage<PageProps>().props;
    const {user} = usePage<PageProps>().props.auth;

    const { data, setData, post,reset, errors, processing, recentlySuccessful,setError } = useForm<FormData>({
        payment_screenshoot: null,
        full_name:user?.first_name ||"",
        email: user?.email || "",
        phone:""
        });

    const [paymentScreenshootUrl, setPaymentScreenshootUrl] = useState<string | null>(null);
    const handlePaymentScreenshoot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
        setData('payment_screenshoot', file);

        // Create a FileReader to generate the preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPaymentScreenshootUrl(reader.result as string); // Store the URL for image preview
        };
        reader.readAsDataURL(file); // Read the image file
    }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(window.route('event.register',event));

    };

  return (
    <CleanHomeLayout>
        <Head title="Create Event"/>
        <div className="events-page grid grid-cols-1 md:grid-cols-[repeat(1,.6fr),2fr] gap-5 min-h-screen pb-5">
            <div className="sidebar md:col-span-1 md:block hidden">
                <Sidebar/>
            </div>
            <div className="events bg-gray-100 rounded-lg p-2 h-full col-span-2 md:col-span-1">
                {/* <h1 className="text-4xl text-gray-800 text-center mt-1 border-b-2 pb-2 border-gray-300 mb-1">Create your Event</h1> */}
                <div className="create-form items-center mt-1 bg-white rounded-md mx-2 border-2 border-[#c7ae6a] relative">
                    <h1 className="text-xl text-center w-full bg-[#c7ae6a] p-2 rounded-t-sm text-gray-50 font-medium">Create your Event</h1>
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="form mt-2 grid grid-cols-1 gap gap-y-4 lg:gap-y-6 sm:grid-cols-2 p-4">
                            <div className="full_name col-span-full md:col-span-1">
                                <label className='font-medium text-sm' htmlFor="full_name">Full Name:<sup className="text-red-500">*</sup></label>
                                <input className="ml-2 h-9 rounded-md text-sm" type="text" name="full_name" id="full_name" placeholder="Enter event full name"
                                value={data.full_name}
                                onChange={(e)=>setData('full_name',e.target.value)}/>
                            </div>

                            <div className="email col-span-full ">
                                <label className='font-medium text-sm' htmlFor="email">Email:<sup className="text-red-500">*</sup></label>
                                <input type="email" className="ml-2 rounded-md text-sm w-80 md:w-1/2"  name="email" id="email" placeholder="Enter event email"
                                value={data.email}
                                onChange={(e)=>setData('email',e.target.value)}/>
                            </div>

                            <div className="phone col-span-full ">
                                <label className='font-medium text-sm' htmlFor="phone">Phone:</label>
                                <input type="tel" className="ml-2 rounded-md text-sm w-80 md:w-1/2"  name="phone" id="phone" placeholder="Enter event phone"
                                value={data.phone}
                                onChange={(e)=>setData('phone',e.target.value)}/>
                            </div>
                            {event.entry_type ==="paid" ?(
                            <>
                                <div className="payment_screenshoot col-span-full md:col-span-1 mb-2">
                                    <label className='font-medium text-sm' htmlFor="payment_screenshoot">Screenshoot of Payment:<sup className="text-red-500">*</sup></label>
                                    <div className="image flex gap-20">
                                        <input className="ml-2 h-9 mt-1 text-sm w-40" type="file" name="payment_screenshoot" id="payment_screenshoot" onChange={handlePaymentScreenshoot}/>
                                    </div>
                                    <p className="text-red-500 text-xs">{errors.payment_screenshoot}</p>
                                </div>
                                <div className="image-preview h-20 col-span-full md:col-span-1 mb-5">
                                    <label htmlFor="">Image Preview:</label>
                                    {paymentScreenshootUrl ? (
                                        <img className="h-full w-fit mt-1" src={paymentScreenshootUrl} alt="Image Preview" />
                                    ) : (
                                        <p className="text-sm">No image selected</p> // Fallback if no image is selected
                                    )}
                                </div>
                            </>
                            ):""}

                            <div className="submit-btn col-span-full flex gap-5 justify-end">
                                <a href={window.route('event.detail',event)} className="px-4 py-2 bg-red-500 text-gray-900 rounded-md hover:text-white hover:bg-gr font-medium">Cancel</a>
                                <button type="submit" className="px-4 py-2 bg-[#c7ae6a] text-gray-900 rounded-md hover:text-white hover:bg-[#b99a45] font-medium">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default Join
