
export default function Feature(){
    const features =[
        {
            icon:"ri-account-pin-box-fill",
            title:"Seamless Profile Setup",
            description:"Join the community effortlessly with quick account creation and college ID verification, ensuring a secure space for genuine connections."
        },
        {
            icon:"ri-question-answer-fill",
            title:"Dynamic Q&A Hub",
            description:"Dive into engaging discussions, ask questions, and share knowledge with peers to enhance your learning experience."
        },
        {
            icon:"ri-stackshare-fill",
            title:"Effortless Content Sharing",
            description:"Share your insights, academic resources, and ideas with just a click, inspiring others and contributing to a rich community of learners."
        },
        {
            icon:"ri-calendar-event-fill",
            title:"Exciting Virtual Events",
            description:"Participate in or host virtual events to connect with fellow students, expand your network, and grow both academically and professionally."
        }
    ]
    return (
        <section className="py-5 pt-14 bg-white mb-10 px-5 flex justify-center">
            <div className="mx-auto">
                <div className="text-center">
                    <div className="inline-flex justify-center px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                        <p className="text-xs font-semibold tracking-widest text-white uppercase">Largest Online Student Community</p>
                    </div>
                    <div className="feature flex justify-center">
                        <h2 className="mt-3 text-2xl font-bold leading-normal text-black sm:text-3xl lg:text-4xl sm:max-w-[50%] w-full">Explore, Engage, and Grow with StudentSanjal</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-4 lg:mt-12 lg:gap-x-12 max-sm:p-4">
                    {features.map((feature,index)=>(
                        <div key={index} className="feature-item transition-all duration-200  rounded-md" style={{boxShadow:"0px 0px 10px 2px #e3d6b4"}}>
                        <div className="feature-box py-5 px-4 flex flex-col items-center text-center hover:text-[#c7ae6a] cursor-pointer">
                            <i className={`${feature.icon} text-4xl px-2.5 py-2 bg-[#1a1a1a] text-[#e3d6b4] rounded-full`}></i>
                            <h3 className="mt-8 text-2xl font-semibold ">{feature.title}</h3>
                            <p className="mt-4 text-sm max-w-[80%] text-gray-600">{feature.description}</p>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </section>
    )
}
