import { Head, useForm, usePage } from "@inertiajs/react"
import CleanHomeLayout from "../Layouts/CleanHomeLayout"
import Sidebar from "../Layouts/partials/Sidebar"
import { PageProps } from "@/types";
import { FormEventHandler, useState } from "react";

interface FormData {
    event_image: File | null;
    title: string;
    description: string;
    host_image: File | null;
    host: string;
    start_date: string;
    end_date: string;
    entry_type: string;
    event_type: string;
    address: string;
    venue: string;
    external_event_link: string;
    entry_fee?:number;
    _method:"PATCH"
}

const Edit = () => {
    const {event} = usePage<PageProps>().props;

    // console.log(event)
    const { data, setData, post,reset, errors, processing, recentlySuccessful,setError } = useForm<FormData>({
        event_image: null,
        title:event?.title || "",
        description:event?.description || "",
        host_image: null,
        host:event?.host || "",
        start_date:event?.start_date || "",
        end_date:event?.end_date || "",
        entry_type:event?.entry_type || "",
        event_type:event?.event_type || "",
        address:event?.address || "",
        venue:event?.venue || "",
        external_event_link:event?.external_event_link || "",
        entry_fee:event?.entry_fee || 0,
        _method:"PATCH"
        });

    const [eventImagePreviewUrl, setEventImagePreviewUrl] = useState<string | null>(null);
    const handleEventImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
        setData('event_image', file);

        // Create a FileReader to generate the preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
        setEventImagePreviewUrl(reader.result as string); // Store the URL for image preview
        };
        reader.readAsDataURL(file); // Read the image file
    }
    };
    const [hostImagePreviewUrl, setHostImagePreviewUrl] = useState<string | null>(null);
    const handleHostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
        setData('host_image', file);

        // Create a FileReader to generate the preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
        setHostImagePreviewUrl(reader.result as string); // Store the URL for image preview
        };
        reader.readAsDataURL(file); // Read the image file
    }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // console.log(data)
        post(window.route('event.update',event));

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
                        <div className="form mt-2 grid grid-cols-1 gap gap-y-4 lg:gap-y-4 sm:grid-cols-2 p-4">
                            <div className="event_image col-span-full md:col-span-1 mb-2">
                                <label className='font-medium text-sm' htmlFor="event_image">Event Image:<sup className="text-red-500">*</sup></label>
                                <div className="image flex gap-20">
                                    <input className="ml-2 h-9 mt-1 text-sm w-40" type="file" name="event_image" id="event_image" onChange={handleEventImageChange}/>
                                </div>
                                <p className="text-red-500 text-xs">{errors.event_image}</p>
                            </div>
                            <div className="image-preview h-20 col-span-full md:col-span-1 mb-5">
                                <label htmlFor="">Image Preview:</label>
                                {eventImagePreviewUrl ? (
                                    <img className="h-full w-fit mt-1" src={eventImagePreviewUrl} alt="Image Preview" />
                                ) : (
                                    <p className="text-sm">No image selected</p> // Fallback if no image is selected
                                )}
                            </div>
                            <div className="title col-span-full md:col-span-1">
                                <label className='font-medium text-sm' htmlFor="title">Title:<sup className="text-red-500">*</sup></label>
                                <input className="ml-2 h-9 rounded-md text-sm" type="text" name="title" id="title" placeholder="Enter event title"
                                value={data.title}
                                onChange={(e)=>setData('title',e.target.value)}/>
                            </div>

                            <div className="description col-span-full ">
                                <label className='font-medium text-sm' htmlFor="description">Event Description:<sup className="text-red-500">*</sup></label> <br></br>
                                <textarea className="ml-2 rounded-md text-sm w-80 md:w-1/2"  name="description" rows={5} id="description" placeholder="Enter event description"
                                value={data.description}
                                onChange={(e)=>setData('description',e.target.value)}/>
                            </div>

                            <div className="host_image col-span-full md:col-span-1 mb-2">
                                <label className='font-medium text-sm' htmlFor="host_image">Host Image:<sup className="text-red-500">*</sup></label>
                                <div className="image flex gap-20">
                                    <input className="ml-2 h-9 mt-1 text-sm w-40" type="file" name="host_image" id="host_image" onChange={handleHostImageChange}/>
                                </div>
                                <p className="text-red-500 text-xs">{errors.host_image}</p>
                            </div>
                            <div className="image-preview h-20 col-span-full md:col-span-1 mb-5">
                                <label htmlFor="">Image Preview:</label>
                                {hostImagePreviewUrl ? (
                                    <div className="h-full w-20">
                                        <img className="h-full w-full mt-1 rounded-full" src={hostImagePreviewUrl} alt="Image Preview" />
                                    </div>
                                ) : (
                                    <p className="text-sm">No image selected</p> // Fallback if no image is selected
                                )}
                            </div>
                            <div className="host col-span-full md:col-span-1">
                                <label className='font-medium text-sm' htmlFor="host">Host:<sup className="text-red-500">*</sup></label>
                                <input className="ml-2 h-9 rounded-md text-sm" type="text" name="host" id="host" placeholder="Hosted by"
                                value={data.host}
                                onChange={(e)=>setData('host',e.target.value)}/>
                            </div>
                            <br></br>
                            <div className="start_date md:col-span-1 col-span-full">
                                <label className='font-medium text-sm' htmlFor="start_date">Start date:<sup className="text-red-500">*</sup></label>
                                <input className="ml-2 h-9 rounded-md text-xs" type="date" name="start_date" id="start_date" placeholder="Event start date"
                                value={data.start_date}
                                onChange={(e)=>setData('start_date',e.target.value)}/>
                            </div>
                            <div className="end_date md:col-span-1 col-span-full">
                                <label className='font-medium text-sm' htmlFor="end_date">End date:</label>
                                <input className="ml-2 h-9 rounded-md text-xs" type="date" name="end_date" id="end_date"
                                value={data.end_date}
                                onChange={(e)=>setData('end_date',e.target.value)}/>
                            </div>
                            <div className="entry_type md:col-span-1 col-span-full flex gap-2 items-center">
                                <label className='text-sm font-medium' htmlFor="entry_type">Entry Type:<sup className="text-red-500">*</sup></label>
                                <div className="entry-type flex gap-2">
                                    <div className="free">
                                        <input type="radio" name="entry_type" id="free" value='free'
                                        checked={data.entry_type === "free"}
                                        onChange={(e)=>setData('entry_type',e.target.value)}/>
                                        <label className='text-sm ml-1' htmlFor="free">Free</label>
                                    </div>
                                    <div className="paid">
                                        <input type="radio" name="entry_type" id="paid" value='paid'
                                        checked={data.entry_type === "paid"}
                                        onChange={(e)=>setData('entry_type',e.target.value)}/>
                                        <label htmlFor="paid" className="ml-1 text-sm">Paid</label>
                                    </div>
                                </div>
                            </div>
                            {data.entry_type ==="paid" ?(
                                <div className="fee-if-paid md:col-span-1 col-span-full">
                                    <label className="text-sm font-medium mr-2" htmlFor="entry_fee">Entry Fee:<sup className="text-red-500">*</sup></label>
                                    <input className="text-sm h-9 rounded-md" type="number" name="entry_fee" id="entry_fee" min={0} placeholder="Enter entry fee"
                                    value={data.entry_fee}
                                    onChange={(e)=>setData('entry_fee',parseFloat(e.target.value))}/>
                                </div>
                            ):""}
                            <div className="event_type md:col-span-1 col-span-full flex gap-2 items-center">
                                <label className="font-medium text-sm" htmlFor="event_type">Event Type:<sup className="text-red-500">*</sup></label>
                                <div className="event-type flex gap-2">
                                    <div className="virtual">
                                        <input type="radio" name="event_type" id="virtual" value='virtual'
                                        checked={data.event_type === "virtual"}
                                        onChange={(e)=>setData('event_type',e.target.value)}/>
                                        <label htmlFor="virtual" className="ml-1 text-sm">Virtual</label>
                                    </div>
                                    <div className="physical">
                                        <input type="radio" name="event_type" id="physical" value='physical'
                                        checked={data.event_type === "physical"}
                                        onChange={(e)=>setData('event_type',e.target.value)}/>
                                        <label htmlFor="physical" className="ml-1 text-sm">Physical</label>
                                    </div>
                                </div>
                            </div>
                            {data.event_type==='physical' ?(
                            <>
                                <div className="address">
                                    <label className="font-medium text-sm" htmlFor="venue">Address:<sup className="text-red-500">*</sup></label>
                                    <input className="ml-2  h-9 rounded-md text-sm" type="text" name="address" id="address" placeholder="E.g. city, district"
                                    value={data.address}
                                    onChange={(e)=>setData('address',e.target.value)}/>
                                </div>
                                <div className="venue">
                                    <label className="font-medium text-sm" htmlFor="venue">Venue:<sup className="text-red-500">*</sup></label>
                                    <input className="ml-2  h-9 rounded-md text-sm" type="text" name="venue" id="venue" placeholder="E.g. floor number, room number, etc."
                                    value={data.venue}
                                    onChange={(e)=>setData('venue',e.target.value)}/>
                                </div>
                            </>
                            ):(
                            <div className="external_event_link">
                                <label className="font-medium text-sm" htmlFor="external_event_link">External event link:<sup className="text-red-500">*</sup></label>
                                <input className="ml-2  h-9 rounded-md text-sm" type="text" name="external_event_link" id="external_event_link" placeholder="Venue"
                                value={data.external_event_link}
                                onChange={(e)=>setData('external_event_link',e.target.value)}/>
                            </div>
                            )}
                            <div className="submit-btn col-span-full flex gap-5 justify-end mt-3">
                                <a href={window.route('event.index')} className="px-4 py-2 bg-red-500 text-gray-900 rounded-md hover:text-white hover:bg-gr font-medium">Cancel</a>
                                <button type="submit" className="px-4 py-2 bg-[#c7ae6a] text-gray-900 rounded-md hover:text-white hover:bg-[#b99a45] font-medium">Update event</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default Edit
