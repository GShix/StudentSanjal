import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { PageProps } from '@/types';
import { toast, ToastContainer } from 'react-toastify';
import CleanHomeLayout from './Layouts/CleanHomeLayout';
import UpdatePasswordForm from './Profile/Partials/UpdatePasswordForm';
import DeleteUserForm from './Profile/Partials/DeleteUserForm';
import PrimaryButton from '@/Components/PrimaryButton';
import Skills from './Layouts/partials/Skills';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';


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
  skill_id?:number[];
  _method: "PATCH";
}
const MIN_AGE = 14;

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
  const user = usePage<PageProps>().props.auth.user;
  const {flash}= usePage<PageProps>().props;
  const {skills =[]}= usePage<PageProps>().props;
//   console.log(skills)

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
    skill_id: Array.isArray(user?.skill_id) ? user.skill_id : [],
    active_status: user?.active_status || false,
    _method: "PATCH"
  });

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

    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = { ...data, skill_id: JSON.stringify(data.skill_id) };

        if (!errors.dob) {
            post(route('profile.update'));
        }
    };

  const [searchInput, setSearchInput] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState(
    skills.filter((skill: { id: number }) => {
      const skillIds = Array.isArray(user?.skill_id)
        ? user.skill_id
        : typeof user?.skill_id === 'number'
          ? [user.skill_id] // If it's a single number, wrap it in an array
          : [];  // If it's neither, return an empty array

      return skillIds.includes(skill.id);  // Now skillIds is guaranteed to be an array of numbers
    })
  );

  const [skillOptions] = useState(skills);

  const onSelectSkills = (selectedList: { id: number }[]) => {
    const selectedSkillIds = selectedList.map((skill) => skill.id);
    setData('skill_id', selectedSkillIds); // Set the selected skill IDs to form data
  };

  const onRemoveSkill = (selectedList: { id: number }[]) => {
    const selectedSkillIds = selectedList.map((skill) => skill.id);
    setData('skill_id', selectedSkillIds); // Update the skill_id when a skill is removed
  };

  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  useEffect(() => {
      let bannerObjectUrl: string | null = null;
      let profileObjectUrl: string | null = null;

      if (data.banner_image instanceof File) {
          bannerObjectUrl = URL.createObjectURL(data.banner_image);
          setBannerUrl(bannerObjectUrl);
      } else if (typeof data.banner_image === 'string') {
          setBannerUrl(data.banner_image); // Use as URL if it's a string
      } else {
          setBannerUrl(null);
      }

      if (data.profile_image instanceof File) {
          profileObjectUrl = URL.createObjectURL(data.profile_image);
          setProfileUrl(profileObjectUrl);
      } else if (typeof data.profile_image === 'string') {
          setProfileUrl(data.profile_image); // Use as URL if it's a string
      } else {
          setProfileUrl(null);
      }

      // Cleanup function to revoke object URLs
      return () => {
          if (bannerObjectUrl) URL.revokeObjectURL(bannerObjectUrl);
          if (profileObjectUrl) URL.revokeObjectURL(profileObjectUrl);
      };
  }, [data.banner_image, data.profile_image]);


  return (
   <CleanHomeLayout>
      <Head title="Profile" />
      <section className='bg-gray-200 p-4 rounded-lg lg:mx-10'>
        <div className="p-2 sm:p-4 bg-gray-50 shadow rounded-lg">
            <form onSubmit={submit} encType="multipart/form-data">
            <div className="">
                <div className="border-b border-gray-900/10">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-5 lg:mt-0 md:flex items-center justify-evenly gap-6  sm:grid-cols-6 md:px-10">
                    <div className="col-span-full">
                        <label htmlFor="profile_image" className="block text-sm font-medium leading-6 text-gray-900 lg:text-center">
                            Profile Image
                        </label>
                        <div className="mt-2 flex flex-col items-center gap-y-3 justify-center">
                            <div className="old-profile-image  rounded-full p-1 bg-[#c7ae6a] ">
                                <img className='w-20 h-20 rounded-full object-cover object-center' src={user?user.profile_image:data.profile_image} alt="" srcSet="" />
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
                            <label htmlFor="banner_image" className="block text-sm font-medium leading-6 text-gray-900 lg:text-center">
                                Banner image
                            </label>
                            <div className="old-profile-image h-20 mt-1 md:mt-2.5 bg-gray-100 rounded-md p-2 border-2 border-[#c7ae6a]">
                                    <img className='w-full h-full object-fit' src={user?user.banner_image:data.banner_image} alt="" srcSet="" />
                            </div>
                            <div className="mt-2 flex justify-center rounded-lg px-6 max-sm:py-2 py-4">
                                <div className="text-center">
                                    <label
                                    htmlFor="banner_image"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[#c7ae6a] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#1a1a1a] focus-within:ring-offset-2 hover:text-[#b99a45] mt-2 px-2 py-1">
                                    <span>Upload a new Banner Image</span>
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

                <div className="border-b border-gray-900/10 pb-10 max-sm:pb-5">
                    <div className="mt-10 max-sm:mt-2 grid grid-cols-1 gap-x-6 gap-y-4 lg:gap-y-8 sm:grid-cols-6">
                        {/* First Name */}
                        <div className="md:col-span-2 col-span-full">
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
                                placeholder='Set new first name'/>
                            </div>
                            <InputError className="mt-2" message={errors.first_name} />
                        </div>

                        {/* Middle Name */}
                        <div className="md:col-span-2 col-span-full">
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
                            placeholder='Set new middle name'/>
                        </div>
                        <InputError className="mt-2" message={errors.middle_name} />
                        </div>

                        {/* Last Name */}
                        <div className="md:col-span-2 col-span-full">
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
                        <div className="md:col-span-2 col-span-full">
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
                            placeholder='Set new username' required
                            />
                        </div>
                        <InputError className="mt-2" message={errors.username} />
                        </div>

                        {/* Headline */}
                        <div className="col-span-full md:col-span-2">
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
                        <div className="col-span-full md:col-span-2">
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
                            autoComplete="birthday"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.dob} />
                        </div>

                        {/* Gender */}
                        <div className="col-span-full md:col-span-2">
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option value='' disabled>Select</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="Other">Other</option>
                            </select>
                        </div>
                        <InputError className="mt-2" message={errors.gender} />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2 col-span-full">
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

                        <div className="col-span-full">
                            <div className="mt-2 md:mt-9 flex gap-x-3 items-center">
                                <label htmlFor="active_status" className="text-sm font-medium leading-6 text-gray-900">
                                Skills*
                                </label>
                                <Multiselect
                                    className='w-full'
                                    options={skills}
                                    displayValue="name"
                                    selectedValues={selectedSkills}
                                    onSelect={onSelectSkills}
                                    onRemove={onRemoveSkill}
                                    placeholder="Select your skills"/>
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="col-span-full md:col-span-2">
                        <div className="mt-2 md:mt-9 flex gap-x-3 items-center">
                            <label htmlFor="active_status" className="text-sm font-medium leading-6 text-gray-900">
                            Active status
                            </label>
                            <input
                            id="active_status"
                            name="active_status"
                            type="checkbox"
                            checked={data.active_status}
                            onChange={(e) => setData('active_status', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#b99a45] focus:ring-black"
                            />
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 lg:my-4 flex items-center justify-end gap-x-6">
                <Link href='/'>
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
                </button></Link>
                <PrimaryButton disabled={processing}>Update Profile</PrimaryButton>
            </div>
            </form>
        </div>

        <div className="p-4 sm:p-8 bg-gray-50 shadow rounded-lg mt-4">
            <UpdatePasswordForm className="max-w-xl" />
        </div>

        <div className="p-4 sm:p-8 bg-gray-50 shadow rounded-lg mt-4">
            <DeleteUserForm className="max-w-xl" />
        </div>
      </section>
    </CleanHomeLayout>
  );
}
