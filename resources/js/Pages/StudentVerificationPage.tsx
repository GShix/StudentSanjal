import { Head, usePage } from "@inertiajs/react"
import CleanHomeLayout from "./Layouts/CleanHomeLayout"
import { PageProps } from "@/types"
import ProfileImage from "./Layouts/partials/ProfileImage"
import PrimaryButton from "@/Components/PrimaryButton"

const StudentVerificationPage = () => {
    const {user} = usePage<PageProps>().props.auth

    const features =[
        {
            title:"A verified badge",
            description:"Your connections can trust that you're a real person sharing your real stories.",
            icon:'ri-verified-badge-line'
        },
        {
            title:"Increased account protection",
            description:"Your connections can trust that you're a real person sharing your real stories.",
            icon:'ri-shield-check-line'
        },
        {
            title:"Access to premium event",
            description:"Your connections can trust that you're a real person sharing your real stories.",
            icon:'ri-lock-star-line'
        },
    ]
  return (
    <CleanHomeLayout>
        <Head title="Verify"/>
        <div className="verify-page bg-gray-100 min-h-screen py-4 rounded-md">
            <div className="heading">
                <h1 className="sm:text-3xl font-semibold text-center">Build trust with StudentSanjal Verified Profiles</h1>
            </div>
            <div className="user-profile flex flex-col items-center justify-center mt-4 gap-y-1 px-2">
                <div className="image relative rounded-full">
                    <ProfileImage image={user.profile_image} className="w-20 h-20 object-cover rounded-full"/>
                    <img src="/img/icon.png" className="absolute h-7 w-7 top-[50px] -right-[3px] rounded-full p-[2px] bg-white"/>
                </div>
                <div className="name flex gap-2 items-center">
                    <h2 className="">{user.first_name} {user.middle_name} {user.last_name}</h2>
                    {/* <img src="/img/gold_tick.png" className="h-6 items-center"/> */}
                    <i className="ri-verified-badge-fill text-[#b99a45] text-2xl"></i>
                </div>
                <div className="features">
                    {features.map((feature:any ,index)=>(
                        <div className="ul mt-4 flex gap-x-2 items-start">
                            <i className ={`${ feature.icon } text-gray-800 bg-transparent text-3xl`}></i>
                            <div className="details flex-col items-center">
                                <h2 className="text-base">{feature.title}</h2>
                                <p className="text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="next-btn mt-3">
                    <a href="/students/verify/uploads" title="Next" className="w-80 flex justify-center text-whiteinline-flex items-center px-4 py-2 bg-[#b99a45] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#1a1a1a] focus:bg-gray-900 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c7ae6a] focus:ring-offset-2 transition ease-in-out duration-150">
                        Next
                    </a>
                </div>
            </div>
        </div>
    </CleanHomeLayout>
  )
}

export default StudentVerificationPage
