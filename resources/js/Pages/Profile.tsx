import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { PageProps } from '@/types';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import HomeLayout from './Layouts/HomeLayout';
import { profile } from 'console';
import Dropdown from '@/Components/Dropdown';
import { toast, ToastContainer } from 'react-toastify';


interface FormData {
  profile_image: File | null;
  banner_image: File | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  headline: string;
  dob: string;
  gender: string;
  email: string;
  active_status: boolean;
  _method: "PATCH";
}
const MIN_AGE = 14;

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
  const user = usePage<PageProps>().props.auth.user;
  const {flash}= usePage<PageProps>().props;

  const { data, setData, post, errors, processing, recentlySuccessful,setError } = useForm<FormData>({
    profile_image: null,
    banner_image: null,
    first_name: user?.first_name || "",
    middle_name: user?.middle_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    headline: user?.headline || "",
    dob: user?.dob || "",
    gender: user?.gender || "",
    email: user?.email || "",
    active_status: user?.active_status || false,
    _method: "PATCH"
  });
  console.log(data.profile_image);

    useEffect(() => {
        if (data.dob) {
            validateAge(data.dob);
        }
    }, [data.dob]); // Validate DOB on change
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                progressStyle:{
                    backgroundColor:"#c7ae6a"
                }
            });
        }
    }, [flash.success]);

    const validateAge = (dob: string) => {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDifference = today.getMonth() - dobDate.getMonth();
        const dayDifference = today.getDate() - dobDate.getDate();

        if (
            age < MIN_AGE ||
            (age === MIN_AGE && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
        ) {
            setError('dob', 'Your age must be at least 14 years old.');
        } else {
            setError('dob', '');
        }
    };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!errors.dob) {
        post(route('profile.update'));
    }
  };

  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];

  const [searchInput, setSearchInput] = useState(false);

  return (
    // <HomeLayout>
    //   <Head title="Profile" />
    //   <section className='bg-gray-200 px-4 py-3 rounded-xl'>
    //     <form onSubmit={submit} encType="multipart/form-data">
    //       <div className="">
    //         <div className="border-b border-gray-900/10">
    //           <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
    //           <p className="mt-1 text-sm leading-6 text-gray-600">
    //             This information will be displayed publicly so be careful what you share.
    //           </p>

    //           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //             <div className="col-span-full">
    //               <label htmlFor="profile_image" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Image
    //               </label>
    //               <div className="mt-2 flex flex-col items-center gap-y-3 justify-center">
    //                 <div className="old-profile-image  rounded-full p-1 bg-[#c7ae6a] ">
    //                     <img className='w-20 h-20 rounded-full object-cover object-center' src={user?user.profile_image:data.profile_image} alt="" srcset="" />
    //                 </div>
    //                 <label
    //                   htmlFor="profile_image"
    //                   className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c7ae6a] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1a1a1a] focus-within:ring-offset-2 hover:text-[#b99a45] mt-2 px-2 py-1">
    //                   <span>Choose new Profile Image</span>
    //                   <input
    //                     id="profile_image"
    //                     name="profile_image"
    //                     type="file"
    //                     className="sr-only"
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //                       if (e.target.files) {
    //                         setData('profile_image', e.target.files[0]);
    //                       }
    //                     }}
    //                   />
    //                 </label>
    //               </div>
    //               <InputError className="mt-2" message={errors.profile_image} />
    //             </div>

    //             <div className="col-span-full">
    //               <label htmlFor="banner_image" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Banner image
    //               </label>
    //               <div className="old-profile-image h-20 mt-1 bg-gray-100 rounded-md p-2 border-2 border-[#c7ae6a]">
    //                     <img className='w-full h-full object-contain' src={user?user.banner_image:data.banner_image} alt="" srcset="" />
    //                 </div>
    //               <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 max-sm:py-5 py-10">
    //                 <div className="text-center">
    //                   <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
    //                   <div className="mt-2 text-sm leading-6 text-gray-600">
    //                     <label
    //                       htmlFor="banner_image"
    //                       className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c7ae6a] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1a1a1a] focus-within:ring-offset-2 hover:text-[#b99a45] mt-2 px-2 py-1">
    //                       <span>Upload a new banner</span>
    //                       <input
    //                         id="banner_image"
    //                         name="banner_image"
    //                         type="file"
    //                         className="sr-only"
    //                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //                           if (e.target.files) {
    //                             setData('banner_image', e.target.files[0]);
    //                           }
    //                         }}
    //                       />
    //                     </label>
    //                   </div>
    //                 </div>
    //               </div>
    //               <InputError className="mt-2" message={errors.banner_image} />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="border-b border-gray-900/10 pb-12 max-sm:pb-5">
    //           <div className="mt-10 max-sm:mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //             {/* First Name */}
    //             <div className="sm:col-span-3">
    //               <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
    //                 First name
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="first_name"
    //                   name="first_name"
    //                   type="text"
    //                   value={data.first_name}
    //                   onChange={(e) => setData('first_name', e.target.value)}
    //                   autoComplete="given-name"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   placeholder='Set new first name'
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.first_name} />
    //             </div>

    //             {/* Middle Name */}
    //             <div className="sm:col-span-3">
    //               <label htmlFor="middle_name" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Middle name
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="middle_name"
    //                   name="middle_name"
    //                   type="text"
    //                   value={data.middle_name}
    //                   onChange={(e) => setData('middle_name', e.target.value)}
    //                   autoComplete="additional-name"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   placeholder='Set new middle name'
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.middle_name} />
    //             </div>

    //             {/* Last Name */}
    //             <div className="sm:col-span-3">
    //               <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Surname
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="last_name"
    //                   name="last_name"
    //                   type="text"
    //                   value={data.last_name}
    //                   onChange={(e) => setData('last_name', e.target.value)}
    //                   autoComplete="family-name"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   placeholder='Set new surname'
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.last_name} />
    //             </div>

    //             {/* Username */}
    //             <div className="sm:col-span-3">
    //               <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Username
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="username"
    //                   name="username"
    //                   type="text"
    //                   value={data.username}
    //                   onChange={(e) => setData('username', e.target.value)}
    //                   autoComplete="username"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   placeholder='Set new username'
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.username} />
    //             </div>

    //             {/* Headline */}
    //             <div className="col-span-full">
    //               <label htmlFor="headline" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Headline
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="headline"
    //                   name="headline"
    //                   type="text"
    //                   value={data.headline}
    //                   onChange={(e) => setData('headline', e.target.value)}
    //                   autoComplete="headline"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   placeholder='Set new headline'
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.headline} />
    //             </div>

    //             {/* Date of Birth */}
    //             <div className="col-span-full">
    //               <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Date of birth
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="dob"
    //                   name="dob"
    //                   type="date"
    //                   value={data.dob}
    //                   max={maxDate}
    //                   onChange={(e) => setData('dob', e.target.value)}
    //                   autoComplete="bday"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.dob} />
    //             </div>

    //             {/* Gender */}
    //             <div className="col-span-full">
    //               <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Gender
    //               </label>
    //               <div className="mt-2">
    //                 <select
    //                   id="gender"
    //                   name="gender"
    //                   value={data.gender}
    //                   onChange={(e) => setData('gender', e.target.value)}
    //                   autoComplete="sex"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //                 >
    //                   <option value='' disabled>Select</option>
    //                   <option value="M">Male</option>
    //                   <option value="F">Female</option>
    //                   <option value="Other">Other</option>
    //                 </select>
    //               </div>
    //               <InputError className="mt-2" message={errors.gender} />
    //             </div>

    //             {/* Email */}
    //             <div className="sm:col-span-4">
    //               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Email address
    //               </label>
    //               <div className="mt-2">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   value={data.email}
    //                   onChange={(e) => setData('email', e.target.value)}
    //                   autoComplete="email"
    //                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                   placeholder='Set new email'
    //                 />
    //               </div>
    //               <InputError className="mt-2" message={errors.email} />
    //             </div>

    //             {/* Active Status */}
    //             <div className="col-span-full">
    //               <div className="mt-2 flex gap-x-3">
    //                 <input
    //                   id="active_status"
    //                   name="active_status"
    //                   type="checkbox"
    //                   checked={data.active_status}
    //                   onChange={(e) => setData('active_status', e.target.checked)}
    //                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
    //                 />
    //                 <label htmlFor="active_status" className="text-sm font-medium leading-6 text-gray-900">
    //                   Active status
    //                 </label>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="mt-6 flex items-center justify-end gap-x-6">
    //         <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
    //           Cancel
    //         </button>
    //         <button
    //           type="submit"
    //           className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //           disabled={processing}
    //         >
    //           Save
    //         </button>
    //       </div>
    //     </form>
    //   </section>
    // </HomeLayout>
    <div className="home bg-gray-400/45">
        <Head title="Profile" />
        <ToastContainer/>
        <div className="fistRow bg-black flex items-center justify-between max-sm:py-2 px-4 sm:px-8"style={{boxShadow:"0px 0px 10px 4px #c7ae6a",position: "sticky",
            top: 0,
            zIndex: 1000}}>
            <div className="col1 flex max-sm:gap-1 max-md:gap-5 gap-12">
                <a className="logo" href={route('home')}>
                    <img className="w-56 sm:w-58 sm:h-16" src="/img/Home_logo.png" alt="" srcSet="" />
                </a>
                <div className="search-btn relative flex items-center max-w-[60%]">
                    {searchInput &&
                    (
                    <div className="smallSearch md:hidden relative flex items-center max-sm:w-[97%]">
                        <input type="text" name="search" id="" className="rounded-md max-sm:py-[6px] py-2 text-gray-600 text-[12.5px] placeholder:text-gray-700/50 w-full" placeholder="Search StudentSanjal"/>
                        <i className="ri-close-fill absolute text-[#b99a45] font-semibold text-2xl right-2 cursor-pointer hover:text-gray-600" onClick={()=>setSearchInput(!searchInput)}></i>
                    </div>
                    )}
                    {!searchInput &&
                    <i className="ri-search-line absolute left-2  max-sm:text-base text-lg rounded-full max-md:text-gray-200 px-[5px] sm:px-[6px] py-[1px] max-md:cursor-pointer max-md:bg-[#b99a45] md:hidden" onClick={()=>setSearchInput(!searchInput)}></i>
                    }

                    <div className="bigSearch max-md:hidden flex items-center">
                        <input type="text" name="search" id="" className="rounded-md border-transparent py-2 pl-8 text-gray-600 text-sm bg-[#EDF3F8] placeholder:text-gray-700/50 w-40" placeholder="Search StudentSanjal"/>
                        <i className="ri-search-line text-gray-700/60 absolute left-2 text-lg rounded-full"></i>
                    </div>
                </div>
            </div>
            <div className="col2 flex items-center justify-end gap-5 lg:gap-12">
                <div className="main-navbar flex gap-9 max-md:hidden">
                    <div className="Layout-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-home-7-fill text-base"></i>
                            <span className="block text-xs leading-none">Home</span>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-group-3-fill text-base"></i>
                            <span className="block text-xs leading-none">My Network</span>
                        </a>
                    </div>
                    <div className="Job-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-group-line text-base"></i>
                            <span className="block text-xs leading-none">Jobs</span>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-chat-private-line text-base "></i>
                            <span className="block text-xs leading-none">Chat</span>
                        </a>
                    </div>
                    <div className="Notification-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-notification-3-fill text-base"></i>
                            <span className="block text-xs leading-none">Notifications</span>
                        </a>
                    </div>
                </div>
                {
                    !searchInput && (
                        <div className="mobile-navbar md:hidden flex gap-5">
                            <div className="Chat-btn bg-transparent text-gray-200 hover:text-[#c7ae6a]">
                                <a href="/" className="flex flex-col items-center">
                                    <i className="ri-chat-private-line text-base max-sm:text-3xl hover:text-clip"></i>
                                    <span className="block text-sm leading-none max-sm:hidden">Chat</span>
                                </a>
                            </div>
                        </div>
                    )
                }

                <div className="profile text-white text-[34px] max-sm:text-3xl flex items-center flex-row-reverse">
                    <div className="user-icon p-1 bg-gray-600 rounded-full hover:bg-gray-500">
                    <Dropdown>
                        <Dropdown.Trigger>
                        <div className="chat-icon w-10 h-10 p-[3px] bg-[#c7ae6a] rounded-full relative">
                            <div className="active-status p-[2px] bg-gray-100 absolute rounded-full bottom-0 right-1">
                                <div className="active-status h-2 w-2 bg-green-500  rounded-full"></div>
                            </div>
                            <img className="object-cover object-center rounded-full w-full h-full cursor-pointer" src={user.profile_image} alt="" />
                        </div>
                            {/* <img className="object-cover object-center rounded-full w-10 h-10 cursor-pointer" src={"/img/lady1.jpg"} alt="" /> */}
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div className="lastRow-updateProfile grid grid-cols-2 sm:gap-4  md:gap-8 mx-4 sm:mx-8 mt-6 mb-5 relative">
            <div className="firstColumn max-sm:hidden rounded-lg">
                <div className="user-profile bg-gray-100 hover:bg-gray-100/80 rounded-xl  justify-center flex-col gap-3 leading-tight items-center pb-5 border border-gray-400/50">
                    <div className="banner-image h-16 w-full relative flex flex-col justify-center items-center border-b border-gray-400/20">
                        <img className="h-full w-full object-cover object-center rounded-t-xl" src={user.banner_image} alt="" srcSet="" />
                    <div className="profile-banner-image absolute top-[50%]">
                        <div className="chat-icon w-[70px] h-[70px] p-[2px] bg-[#c7ae6a] rounded-full">
                        <Link href={route('showProfile',user.username)}>
                            <img className="object-cover object-center rounded-full w-full h-full cursor-pointer ab" src={user.profile_image} alt="" /></Link>
                        </div>
                    </div>
                    </div>
                    <div className="user-details textce flex flex-col flex-wrap mt-14 items-center px-2 justify-center text-center">
                        <a href={route('showProfile',user.username)} className="text-base font-semibold  hover:underline">{user.first_name}{" "}{user.middle_name}{" "}{user.last_name}</a>
                        <p className="text-xs mt-1 text-gray-800/70">{user.headline}</p>
                    </div>
                    <div className="user-details textce flex flex-col flex-wrap pt-5 px-5 gap-y-2">
                        <a href="/" className="text-xs font-medium flex justify-between">
                            <span className="text-gray-800/70">Profile viewers</span>
                            <span className="text-[#ae8c2d]">79</span>
                        </a>
                        <a href="/" className="text-xs font-medium flex justify-between">
                            <span className="text-gray-800/70">Profile viewers</span>
                            <span className="text-[#ae8c2d]">10</span>
                        </a>
                    </div>
                </div>
                <div className="siderbar bg-gray-100 px-2.5 py-2 rounded-xl mt-3 border border-gray-400/50">
                    <ul className="flex flex-col">
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/trending.png" alt="" />Trending</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-7 w-7 mr-2" src="/img/events.png" alt="" />Events</a></li>
                        <li><a className="flex items-center font-medium px-2 py-3 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/saved.png" alt="" />Saved</a></li>
                    </ul>
                </div>
                <div className="sidebar2 bg-gray-100 px-2.5 py-2 rounded-xl mt-3 mb-2 border border-gray-400/50">
                    <div className="groups">
                        <h2 className="px-2 py-2 hover:underline text-gray-800/70 font-semibold">Your groups</h2>
                        <div className="group-links">
                            <ul className="flex flex-col">
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/tu_logo.png" alt="" srcSet="" />MMC Itians, Npj</a></li>
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/hackathon.png" alt="" />MMC Hackathon 2081</a></li>
                                <li><a className="flex items-center font-medium px-2 py-2 hover:bg-[#c7ae6a] rounded-xl" href=""><img className="h-6 w-6 mr-2" src="/img/icon.png" alt="" />Student Sanjal</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="midColumn rounded-lg">
                <div className="mobile-down-navbar flex gap-14 md:hidden bg-gray-100 justify-center rounded-xl px-2.5 py-3 mb-4 h-14">
                    <div className="Home-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-home-7-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Mynetwork-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-group-3-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Job-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-group-line text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                    <div className="Notification-btn bg-transparent text-gray-600 hover:text-[#c7ae6a]">
                        <a href="/" className="flex flex-col items-center">
                            <i className="ri-notification-3-fill text-[20px] hover:text-2xl"></i>
                        </a>
                    </div>
                </div>

                <section className='bg-gray-200 px-6 max-sm:px-4 mb-8 py-3 rounded-xl'>
                    <form onSubmit={submit} encType="multipart/form-data">
                    <div className="">
                        <div className="border-b border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-5 md:flex justify-evenly gap-6  sm:grid-cols-6 md:px-10">
                            <div className="col-span-full">
                            <label htmlFor="profile_image" className="block text-sm font-medium leading-6 text-gray-900">
                               Profile Image
                            </label>
                            <div className="mt-2 flex flex-col items-center gap-y-3 justify-center">
                                <div className="old-profile-image  rounded-full p-1 bg-[#c7ae6a] ">
                                    <img className='w-20 h-20 rounded-full object-cover object-center' src={user?user.profile_image:data.profile_image} alt="" srcset="" />
                                </div>
                                <label
                                htmlFor="profile_image"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c7ae6a] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1a1a1a] focus-within:ring-offset-2 hover:text-[#b99a45] mt-2 px-2 py-1">
                                <span>Choose new Profile Image</span>
                                <input
                                    id="profile_image"
                                    name="profile_image"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files) {
                                        setData('profile_image', e.target.files[0]);
                                    }
                                    }}
                                />
                                </label>
                            </div>
                            <InputError className="mt-2" message={errors.profile_image} />
                            </div>

                            <div className="vertical-border hidden md:block bg-gray-100 h-60 w-1"></div>

                            <div className="col-span-full max-md:mt-2">
                            <label htmlFor="banner_image" className="block text-sm font-medium leading-6 text-gray-900">
                                Banner image
                            </label>
                            <div className="old-profile-image h-20 mt-1 bg-gray-100 rounded-md p-2 border-2 border-[#c7ae6a]">
                                    <img className='w-full h-full object-contain' src={user?user.banner_image:data.banner_image} alt="" srcset="" />
                                </div>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 max-sm:py-2 py-4">
                                <div className="text-center">
                                    <label
                                    htmlFor="banner_image"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c7ae6a] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1a1a1a] focus-within:ring-offset-2 hover:text-[#b99a45] mt-2 px-2 py-1">
                                    <span>Upload a new banner</span>
                                    <input
                                        id="banner_image"
                                        name="banner_image"
                                        type="file"
                                        className="sr-only"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.files) {
                                            setData('banner_image', e.target.files[0]);
                                        }
                                        }}
                                    />
                                    </label>
                                </div>
                            </div>
                            <InputError className="mt-2" message={errors.banner_image} />
                            </div>
                        </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12 max-sm:pb-5">
                        <div className="mt-10 max-sm:mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* First Name */}
                            <div className="col-span-full md:col-span-3">
                            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Set new first name'
                                />
                            </div>
                            <InputError className="mt-2" message={errors.first_name} />
                            </div>

                            {/* Middle Name */}
                            <div className="col-span-full md:col-span-3">
                            <label htmlFor="middle_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Middle name
                            </label>
                            <div className="mt-2">
                                <input
                                id="middle_name"
                                name="middle_name"
                                type="text"
                                value={data.middle_name}
                                onChange={(e) => setData('middle_name', e.target.value)}
                                autoComplete="additional-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Set new middle name'
                                />
                            </div>
                            <InputError className="mt-2" message={errors.middle_name} />
                            </div>

                            {/* Last Name */}
                            <div className="col-span-full md:col-span-3">
                            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Surname
                            </label>
                            <div className="mt-2">
                                <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Set new surname'
                                />
                            </div>
                            <InputError className="mt-2" message={errors.last_name} />
                            </div>

                            {/* Username */}
                            <div className="col-span-full md:col-span-3">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                id="username"
                                name="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                autoComplete="username"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Set new username'
                                />
                            </div>
                            <InputError className="mt-2" message={errors.username} />
                            </div>

                            {/* Headline */}
                            <div className=" col-span-full md:col-span-3">
                            <label htmlFor="headline" className="block text-sm font-medium leading-6 text-gray-900">
                                Headline
                            </label>
                            <div className="mt-2">
                                <input
                                id="headline"
                                name="headline"
                                type="text"
                                value={data.headline}
                                onChange={(e) => setData('headline', e.target.value)}
                                autoComplete="headline"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Set new headline'
                                />
                            </div>
                            <InputError className="mt-2" message={errors.headline} />
                            </div>

                            {/* Date of Birth */}
                            <div className=" col-span-full md:col-span-3">
                            <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                Date of birth
                            </label>
                            <div className="mt-2">
                                <input
                                id="dob"
                                name="dob"
                                type="date"
                                value={data.dob}
                                max={maxDate}
                                onChange={(e) => setData('dob', e.target.value)}
                                autoComplete="bday"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <InputError className="mt-2" message={errors.dob} />
                            </div>

                            {/* Gender */}
                            <div className=" col-span-full md:col-span-3">
                            <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </label>
                            <div className="mt-2">
                                <select
                                id="gender"
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                autoComplete="sex"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                <option value='' disabled>Select</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="Other">Other</option>
                                </select>
                            </div>
                            <InputError className="mt-2" message={errors.gender} />
                            </div>

                            {/* Email */}
                            <div className=" col-span-full md:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder='Set new email'
                                />
                            </div>
                            <InputError className="mt-2" message={errors.email} />
                            </div>

                            {/* Active Status */}
                            <div className="col-span-full">
                            <div className="mt-2 flex gap-x-3">
                                <input
                                id="active_status"
                                name="active_status"
                                type="checkbox"
                                checked={data.active_status}
                                onChange={(e) => setData('active_status', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="active_status" className="text-sm font-medium leading-6 text-gray-900">
                                Active status
                                </label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={processing}
                        >
                        Save
                        </button>
                    </div>
                    </form>
                </section>

            </div>

        </div>
    </div>
  );
}
