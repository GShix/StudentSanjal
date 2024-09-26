import { Head, Link, useForm, usePage } from "@inertiajs/react"
import CleanHomeLayout from "./Layouts/CleanHomeLayout"
import Sidebar from "./Layouts/partials/FullSidebar"
import { Fragment } from "react/jsx-runtime"
import { FormEventHandler, useState } from "react"
import { PageProps } from "@/types"

interface FormData {
    event_image: File | null;
    title: string;
    host: string;
    start_date: string;
    end_date: string;
    entry_type: string;
    event_type: string;
    venue: string;
    entry_fee?:number;
}
const Events = () => {
    const {events} = usePage<PageProps>().props;

    const { data, setData, post,reset, errors, processing, recentlySuccessful,setError } = useForm<FormData>({
        event_image: null,
        title:"",
        host:"",
        start_date:"",
        end_date:"",
        entry_type:"",
        event_type:"",
        venue:"",
        entry_fee:0
      });
      const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
          setData('event_image', file);

          // Create a FileReader to generate the preview URL
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviewUrl(reader.result as string); // Store the URL for image preview
          };
          reader.readAsDataURL(file); // Read the image file
        }
      };

    const [createEvent,setCreatEvent] = useState(false);
    const [showEvents,setShowEvents] = useState(true);
    const [cancelBtn,setCancelBtn] = useState(false);
    const [createBtn,setCreateBtn] = useState(true);

    const handleCreateBtn = () =>{
        setShowEvents(false);
        setCreatEvent(true);
        setCancelBtn(true);
        setCreateBtn(false);
    }

    const handleCancelBtn = () =>{
        setCreateBtn(true);
        setShowEvents(true);
        setCreatEvent(false);
        setCancelBtn(false);
        reset();
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data)
        post(route('event.store'));

    };

  return (
    <CleanHomeLayout>
        <Head title="Events"/>
        <div className="events-page grid grid-cols-1 md:grid-cols-[repeat(1,.6fr),2fr] gap-5 min-h-screen pb-5">
            <div className="sidebar md:col-span-1 md:block hidden">
                <Sidebar/>
            </div>
            <div className="events bg-gray-100 rounded-lg p-2 h-full col-span-2 md:col-span-1">
                <h1 className="text-4xl text-gray-800 text-center mt-1 border-b-2 pb-2 border-gray-300 mb-1">Events</h1>
                <div className="add-your-event w-full flex justify-end px-2">
                    {createBtn && (
                    <div className="bg-gray-300 px-3 py-2 max-sm:mb-2 rounded-md cursor-pointer hover:bg-[#c7ae6a]" onClick={handleCreateBtn}>
                        <i className="ri-add-circle-fill mr-1"></i>
                        <span>Create</span>
                    </div>)}

                    {cancelBtn && (
                    <div className="text-gray-50 px-2 py-1 rounded-md cursor-pointer bg-red-500  hover:bg-[#c7ae6a]" onClick={handleCancelBtn}>
                        <span>
                            <i className="ri-close-circle-fill text-xl"></i>
                        </span>
                    </div>)}
                </div>
                {createEvent && (
                    <div className="create-form items-center mt-1 bg-white rounded-md mx-2 border-2 border-[#c7ae6a]">
                        <h1 className="text-xl text-center w-full bg-[#c7ae6a] p-2 rounded-t-sm text-gray-50 font-medium">Create your Event</h1>
                        <form onSubmit={submit} encType="multipart/form-data">
                            <div className="form mt-2 grid grid-cols-1 gap gap-y-4 lg:gap-y-4 sm:grid-cols-2 p-4">
                                <div className="event_image col-span-full md:col-span-1 mb-2">
                                    <label className='font-medium text-sm' htmlFor="event_image">Event Image:<sup className="text-red-500">*</sup></label>
                                    <div className="image flex gap-20">
                                        <input className="ml-2 h-9 mt-1 text-sm" type="file" name="event_image" id="event_image" onChange={handleImageChange}/>
                                    </div>
                                    <p className="text-red-500 text-xs">{errors.event_image}</p>
                                </div>
                                <div className="image-preview h-20 col-span-full md:col-span-1 mb-5">
                                    <label htmlFor="">Image Preview:</label>
                                    {imagePreviewUrl ? (
                                        <img className="h-full w-fit mt-1" src={imagePreviewUrl} alt="Image Preview" />
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
                                <div className="host col-span-full md:col-span-1">
                                    <label className='font-medium text-sm' htmlFor="host">Host:<sup className="text-red-500">*</sup></label>
                                    <input className="ml-2 h-9 rounded-md text-sm" type="text" name="host" id="host" placeholder="Hosted by"
                                    value={data.host}
                                    onChange={(e)=>setData('host',e.target.value)}/>
                                </div>
                                <div className="start_date md:col-span-1 col-span-full">
                                    <label className='font-medium text-sm' htmlFor="start_date">Start date:<sup className="text-red-500">*</sup></label>
                                    <input className="ml-2 h-9 rounded-md text-xs" type="date" name="start_date" id="start_date" placeholder="Event start date"
                                    value={data.start_date}
                                    onChange={(e)=>setData('start_date',e.target.value)}/>
                                </div>
                                <div className="end_date md:col-span-1 col-span-full">
                                    <label className='font-medium text-sm' htmlFor="end_date">End date:<sup className="text-red-500">*</sup></label>
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
                                {data.event_type && (
                                <div className="venue">
                                    <label className="font-medium text-sm" htmlFor="venue">Venue:<sup className="text-red-500">*</sup></label>
                                    <input className="ml-2  h-9 rounded-md text-sm" type="text" name="venue" id="venue" placeholder="Venue"
                                    value={data.venue}
                                    onChange={(e)=>setData('venue',e.target.value)}/>
                                </div>)}
                                <div className="submit-btn col-span-full flex justify-end">
                                    <button type="submit" className="px-4 py-2 bg-[#c7ae6a] text-gray-900 rounded-md hover:text-white hover:bg-[#b99a45] font-medium">Create event</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                {showEvents && !createEvent && (
                <div className="flex gap-10 items-center text-gray-700 px-2">
                    <div className="filter md:w-1/5 relative px-2">
                        <span>Filter</span>
                    </div>
                    <div className="tabs flex float-right items-center justify-between gap-3 lg:gap-10">
                        <button className="px-3 py-1 hover:text-white bg-[#c7ae6a] rounded-full">All</button>
                        <button className="px-3 py-1 hover:text-white bg-[#c7ae6a] rounded-full">Upcoming</button>
                        <button className="px-3 py-1 hover:text-white bg-[#c7ae6a] rounded-full">Completed</button>
                    </div>
                </div>)}
                {showEvents && (
                <div className="sm:px-2 grid grid-cols-1 gap-5 mt-4 sm:grid-cols-3 lg:mt-10 lg:gap-x-5 overflow-hidden">
                    {events.map((event:any, index:number) => (
                    <div key={index} className="card w-full hover:bg-[#e3d6b4] rounded-md px-1 pt-1 pb-2 max-sm:flex max-sm:flex-row-reverse items-center justify-between border-2 border-[#C7AE6A] max-sm:mb-3">
                        <div className="card-img max-sm:w-1/4 h-36 overflow-hidden rounded-sm mb-1">
                            <img className='w-full h-full rounded-sm mb-2 object-cover object-fit max-sm:h-[70%] transition-transform hover:scale-105 cursor-pointer' src={event.event_image} alt="" sizes="" srcSet="" />
                        </div>
                        <div className="card-details max-sm:w-[70%]">
                            <Link href={route('event.detail',event.title)}>
                            <h1 className='font-bold text-lg hover:underline flex flex-wrap'>{event.title}</h1>
                            </Link>
                            <p className='font-bold text-sm mt-1 text-gray-600'>Hosted By: {event.host}</p>
                            <div className="date mt-2 text-base px-1">
                                <i className="ri-calendar-schedule-fill mr-2"></i>
                                <span>{event.start_date}</span>
                            </div>
                            <div className="flex gap-6 mt-2 px-1">
                                <div className="attendees">
                                    <i className="ri-user-heart-fill mr-2"></i>
                                    <span>{event.attendees?event.attendees:0}</span>
                                </div>
                                {/* <div className="entry">
                                    <i className="ri-ticket-2-fill mr-2"></i>
                                    </div> */}
                                <div className="entry">
                                    <i className="ri-ticket-2-fill mr-2"></i>
                                    {event.entry_type==="paid" ? (
                                        <span className="text-sm">Entry fee: Rs.{event.entry_fee}</span>
                                    ):(
                                        <span>{event.entry_type}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>)}
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default Events
