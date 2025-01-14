import { Head, Link, useForm, usePage } from "@inertiajs/react"
import { Fragment } from "react/jsx-runtime"
import { FormEventHandler, useState } from "react"
import { PageProps } from "@/types"
import CleanHomeLayout from "../Layouts/CleanHomeLayout";
import Sidebar from "../Layouts/partials/Sidebar";

const Events = () => {
    const {events} = usePage<PageProps>().props;

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
                    <div className="bg-gray-300 px-3 py-2 max-sm:mb-2 rounded-md cursor-pointer hover:bg-[#c7ae6a]">
                        <a href={window.route('event.create')}>
                            <i className="ri-add-circle-fill mr-1"></i>
                            <span>Create</span>
                        </a>
                    </div>
                </div>

                <div className="flex gap-10 items-center text-gray-700 px-2">
                    <div className="filter md:w-1/5 relative px-2">
                        <span>Filter</span>
                    </div>
                    <div className="tabs flex float-right items-center justify-between gap-3 lg:gap-10">
                        <button className="px-3 py-1 hover:text-white bg-[#c7ae6a] rounded-full">All</button>
                        <button className="px-3 py-1 hover:text-white bg-[#c7ae6a] rounded-full">Upcoming</button>
                        <button className="px-3 py-1 hover:text-white bg-[#c7ae6a] rounded-full">Completed</button>
                    </div>
                </div>
                <div className="sm:px-2 grid grid-cols-1 gap-5 mt-4 sm:grid-cols-3 lg:mt-10 lg:gap-x-5 overflow-hidden">
                    {events.map((event:any, index:number) => (
                    <div key={index} className="card w-full hover:bg-[#e3d6b4] rounded-md px-1 pt-1 pb-2 max-sm:flex max-sm:flex-row-reverse items-center justify-between border-2 border-[#C7AE6A] max-sm:mb-3">
                        <div className="card-img max-sm:w-1/4 h-36 overflow-hidden rounded-sm mb-1">
                            <img className='w-full h-full rounded-sm mb-2 object-cover object-fit max-sm:h-[70%] transition-transform hover:scale-105 cursor-pointer' src={event.event_image} alt="" sizes="" srcSet="" />
                        </div>
                        <div className="card-details max-sm:w-[70%]">
                            <Link href={window.route('event.detail',event)}>
                            <h1 className='font-bold text-lg hover:underline flex flex-wrap'>{event.title}</h1>
                            </Link>
                            <p className='font-bold text-sm mt-1 text-gray-600'>Hosted By: {event.host}</p>
                            <div className="date mt-2 text-base px-1 flex">
                                <div className="start-date">
                                    <i className="ri-calendar-schedule-fill mr-2"></i>
                                    <span>{event.start_date}</span>
                                </div>
                                {event.end_date && (
                                <>
                                    <div className="to mx-3 text-gray-700/95">-</div>
                                    <div className="end-date">
                                        <i className="ri-calendar-schedule-fill mr-2"></i>
                                        <span>{event.end_date}</span>
                                    </div>
                                </>
                                )}
                            </div>
                            <div className="flex gap-6 mt-2 px-1">
                                <div className="attendees relative group">
                                    <i className="ri-user-heart-fill mr-2"></i>
                                    <span>{event.attendees?event.attendees:0}</span>
                                    <div className="absolute bottom-full text-nowrap hidden group-hover:block bg-gray-300 bg-opacity-95 text-gray-800 text-xs rounded py-1 px-2">
                                    {event.attendees?event.attendees:0} Attendees
                                    </div>
                                </div>
                                {/* <div className="entry">
                                    <i className="ri-ticket-2-fill mr-2"></i>
                                </div> */}
                                <div className="event_venu flex items-center">
                                    <i className="ri-map-pin-fill text-lg mr-2"></i>
                                    {event.venue ?(
                                        <span className="text-sm">
                                            {event.venue.length>10? `${event.venue.slice(0,5)}`:event.venue}
                                        </span>
                                    ):event.external_event_link? (
                                        <span className="text-sm">
                                            {event.event_type}
                                        </span>
                                    ):""}
                                </div>
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
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default Events
