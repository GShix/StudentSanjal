import { Head, usePage } from "@inertiajs/react"
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout"
import { PageProps } from "@/types";
import { Link, Option } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm";
import Dropdown from "@/Components/Dropdown";
import { Select } from "@headlessui/react";
import SelectInput from "../Components/SelectInput";
import { useState } from "react";
import { AccountStatus } from '../../../enums/AccountStatus';
import { getEnumOptions } from '../../../lib/utils';
import axios from "axios";

const ViewUser = () => {
    const user = usePage<PageProps>().props.user[0];
    // console.log(user)
    const options = getEnumOptions(AccountStatus);
    const [selectedOption, setSelectedOption] = useState<string>(user?.account_status); // State to store selected value

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    };
    const changeStatus =async()=>{
        const data = {selectedOption,userId:user.id};
        try {
            const response = await axios.post('/admin/user/account_status',data)
        } catch (error) {

        }
    }
  return (
    <AdminDashboardLayout>
        <Head title={user.first_name} />
        <section className='bg-gray-200 p-4 rounded-lg lg:mx-10'>
        <div className="p-2 sm:p-4 bg-gray-50 shadow rounded-lg px-4">
            <div className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">{user.first_name}'s Profile Information</h2>
                <div className="mt-5 lg:mt-0 md:flex items-center justify-evenly gap-4  sm:grid-cols-6 md:px-10">
                    <div className="col-span-full flex gap-x-2 justify-between w-full">
                        <div className="">
                            <label htmlFor="profile_image" className="block text-sm font-medium leading-6 text-gray-900 lg:text-center">
                                Profile Image
                            </label>
                            <div className="old-profile-image h-20 w-20 rounded-full p-1 bg-[#c7ae6a] ">
                                <img className='w-full h-full rounded-full object-cover object-center' src={user?user.profile_image:""}  alt="" srcSet="" />
                            </div>
                        </div>
                        <div className="vertical-border hidden md:block bg-gray-100  w-1"></div>
                        <div className="col-span-full max-md:mt-2">
                            <label htmlFor="banner_image" className="block text-sm font-medium leading-6 text-gray-900 lg:text-center">
                                Banner image
                            </label>
                            <div className="old-profile-image h-20 mt-1 md:mt-2.5 bg-gray-100 rounded-md p-2 border-2 border-[#c7ae6a]">
                                    <img className='w-full h-full object-fit' src={user?user.banner_image:''} alt="" srcSet="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pb-10 max-sm:pb-5">
                    <div className="mt-10 max-sm:mt-2 grid grid-cols-1 gap-x-6 gap-y-4 lg:gap-y-4 sm:grid-cols-6">
                        <div className="md:col-span-2 col-span-full">
                            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <p>{user.first_name}</p>
                        </div>
                        <div className="md:col-span-2 col-span-full">
                            <label htmlFor="middle_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Middle name
                            </label>
                            <p>{user.middle_name}</p>
                        </div>
                        <div className="md:col-span-2 col-span-full">
                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Surname
                            </label>
                            <p>{user.last_name}</p>
                        </div>
                        <div className="md:col-span-2 col-span-full">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <p>{user.username}</p>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label htmlFor="headline" className="block text-sm font-medium leading-6 text-gray-900">
                                Headline
                            </label>
                            <p>{user.headline}</p>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                Date of birth
                            </label>
                            <p>{user.dob}</p>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </label>
                            <p>{user.gender}</p>
                        </div>
                        <div className="md:col-span-2 col-span-full">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <p>{user.email}</p>
                        </div>
                        <div className="col-span-full">
                            <div className="mt-2 md:mt-9 flex gap-x-3 items-center">
                                <label htmlFor="active_status" className="text-sm font-medium leading-6 text-gray-900">
                                Skills*
                                </label>
                                {/* {user.skills.map((skill:any,index:number)=>(
                                    <p>{skill.name}</p>
                                ))} */}
                            </div>
                        </div>
                        <div className="md:col-span-2 col-span-full">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                                Verification Status
                            </label>
                            <p>{user.account_status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-4 sm:p-8 bg-gray-50 shadow rounded-lg mt-4">
            <div className={`md:col-span-2 col-span-full ${user.student_verification?'h-80':'h-20'}`}>
                <label htmlFor="id_card_photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Uploaded Document
                </label>
                {
                    user.student_verification && user.student_verification.id_card_photo ? (
                        <img src={user.student_verification.id_card_photo} className="h-full" alt="ID Card" />
                    ) : (
                        '--'
                    )
                }
            </div>
        </div>
        <div className="p-4 sm:p-8 bg-gray-50 shadow rounded-lg mt-4">
            <h2 className="text-lg mb-3">Student Verification</h2>
            <select value={selectedOption} onChange={handleChange} className="w-full rounded-md mb-2 font-[poppins]">
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="font-[poppins]">
                    {option.label}
                    </option>
                ))}
            </select>
            {/* <p>Selected Option: {selectedOption}</p> Display the selected option */}
            <PrimaryButton onClick={changeStatus}>
                Save
            </PrimaryButton>
        </div>
      </section>
    </AdminDashboardLayout>
  )
}

export default ViewUser
