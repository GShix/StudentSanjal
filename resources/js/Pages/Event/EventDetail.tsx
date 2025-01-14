import { Head, Link, usePage } from "@inertiajs/react"
import CleanHomeLayout from "../Layouts/CleanHomeLayout"
import { PageProps } from "@/types"

const EventDetail = () => {
    const {event,host,user,alreadyRegistered} = usePage<PageProps>().props;
    // console.log(user,host.id)
  return (
    <CleanHomeLayout>
        <Head title={event.title}/>
        <div className="event-detail bg-gray-200 rounded-md min-h-screen flex flex-col justify-between">
            <div className="event-profile px-4 md:px-6 pt-4 bg-gray-50 rounded-t-md">
                <h1 className="md:px-4 text-3xl max-sm:text-xl font-semibold">{event.title}</h1>
                <div className="user-profile mt-4 flex gap-2 border-b border-gray-300 pb-4">
                    <div className="image h-14 w-14">
                        <img className="h-14 w-14 object-cover rounded-full" src={event.host_image} alt="" />
                    </div>
                    <div className="name">
                        <h1>Hosted by</h1>
                        <h1 className="font-medium leading-tight">{event.host}</h1>
                    </div>
                </div>
            </div>
            <div className="description grid grid-cols-[repeat(1,1fr),.5fr] gap-x-2 gap-y-2 px-4 md:px-6 pt-8 mb-5">
                <div className="1 col-span-full md:col-span-1">
                    <div className="event-image">
                        <img className="w-[90%]" src={event.event_image} alt="" />
                    </div>
                </div>
                <div className="2 col-span-full md:col-span-1 w-80">
                    <div className="groups flex gap-3 p-4 bg-gray-50 rounded-md">
                        <div className="group-image">
                            <img className="h-12" src={event.event_image} alt="" />
                        </div>
                        <div className="title">
                            <h1 className="font-medium text-sm">MMCITians(Official)</h1>
                            <p className="text-gray-500 text-sm">Public group</p>
                        </div>
                    </div>
                    <div className="event-details bg-gray-50 mt-3 px-3 py-4 rounded-md">
                        <div className="date flex items-center">
                            <i className="ri-time-fill text-lg mr-2"></i>
                            <span className="text-sm">{new Date(event.start_date).toDateString()}</span>
                            <span className="text-sm">{(event.start_time)}</span>
                        </div>
                        {event.event_type==="virtual"?(
                            <div className="virtual-event text-sm flex items-start">
                                <i className="ri-live-fill text-lg mr-2"></i>
                                <div className="type">
                                    <h1 className="">Virtual event</h1>
                                    <p className="text-xs text-gray-600">Link visible for attendees</p>
                                </div>
                            </div>
                        ):(
                        <div className="">
                            <div className="physical-event text-sm gap-2 flex items-center">
                                <i className="ri-ticket-2-fill text-lg"></i>
                                <span>Physical event</span>
                            </div>
                            <div className="type flex items-center">
                                <i className="ri-map-pin-fill text-lg mr-2"></i>
                                <span className="text-sm">{event.venue}</span>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className="event_link flex gap-3 py-4 px-3 mt-3 bg-gray-50 rounded-md">
                        <div className="link">
                            <div className="link-icon flex items-center gap-2">
                                <i className="ri-external-link-fill text-lg"></i>
                                <h1 className="font-medium text-sm">Event Link</h1>
                            </div>
                            <Link href={event.external_event_link} className="text-gray-500 text-sm underline flex-wrap">{event.external_event_link}</Link>
                        </div>
                    </div>
                </div>
                <div className="description mt-5">
                    <h1 className="font-medium text-xl">Event Description: </h1> <p>{event.description}</p>
                </div>
            </div>
            <div className="footer sm:h-20 bg-gray-50 px-6 py-2 border-t border-gray-300">
                <div className="event-header sm:flex justify-between items-center">
                    <div className="header max-sm:flex items-center gap-2">
                        <h1 className="text-sm sm:text-lg">{event.start_date}</h1>
                        <h1 className="sm:text-xl font-medium">{event.title}</h1>
                    </div>
                    <div className="entry-type max-sm:flex gap-3 items-center">
                        <p>{event.entry_type=='free'?"Free":"Paid"}</p>
                        <span className="text-sm">{event.entry_type==='paid'?`Rs. ${event.entry_fee}`:""}</span>
                    </div>
                    <div className="footer-btn flex items-center gap-4 max-sm:mt-1">
                        <button className="px-4 py-[6.1px] sm:py-2 max-sm:text-sm border-[2px] outline-[#c7ae6a] rounded-md hover:bg-gray-200">Share</button>
                        <div className="div max-sm:text-sm">
                            {(host.id===user.id)?
                                <Link href={window.route('event.edit',event)} className="px-4 py-2 bg-[#c7ae6a] rounded-md hover:bg-[#b99a45] tracking-wider">Edit</Link>
                            :(
                                alreadyRegistered?(
                                    <p className="bg-[#b99a45] px-4 py-2 rounded-md">Joined</p>
                                ):(
                                <Link href={window.route('event.join',event)} className="px-4 py-2 bg-[#c7ae6a] rounded-md hover:bg-[#b99a45] tracking-wider">Join</Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default EventDetail
