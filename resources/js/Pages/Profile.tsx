import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import HomeLayout from './Layouts/HomeLayout';
interface FormData{
    profile_image: File|null;
    banner_image: File|null;
    first_name: string;
    middle_name: string;
    last_name: string;
    username: string;
    headline: string;
    dob: string;
    gender: string;
    email: string;
    active_status: boolean;
    _method:"PATCH"
}
export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<FormData>({
        // profile_image:"",
        // banner_image:"",
        // first_name:"",
        // middle_name:"",
        // last_name:"",
        // username:"",
        // headline:"",
        // dob:"",
        // gender:"",
        // email:"",
        // active_status:"",
        profile_image:  null,
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
        _method:"PATCH"
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
    <HomeLayout>
        <Head title="Profile"/>
        <section className='bg-gray-200 px-4 py-3 rounded-xl'>
            <form onSubmit={submit}>
                <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="profile_image" className="block text-sm font-medium leading-6 text-gray-900">
                        Image
                        </label>
                        <div className="mt-2 flex flex-col items-center gap-x-3 justify-center">
                        <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                        <label
                                htmlFor="profile_image"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Change profile image</span>
                                <input id="profile_image" name="profile_image" type="file" className="sr-only" onChange={(value: File|null)=>setData('profile_image',value)}/>
                            </label>
                        </div>
                        <InputError className="mt-2" message={errors.profile_image} />
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="banner-image" className="block text-sm font-medium leading-6 text-gray-900">
                        Banner image
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="banner_image"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input id="banner_image" name="banner_image" type="file" className="sr-only" onChange={(e: ChangeEventHandler)=>setData('banner_image',e.target.files[0])}/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        </div>
                        <InputError className="mt-2" message={errors.banner_image} />
                    </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                        First name
                        </label>
                        <div className="mt-2">
                            <span>{user.first_name}</span>
                        <input
                            id="first_name"
                            name="first_name"
                            type="text" value={data.first_name} onChange={(e)=>setData('first_name',e.target.value)}
                            autoComplete="first_name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Set new first name'/>
                        </div>
                        <InputError className="mt-2" message={errors.first_name} />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="middle_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Middle name
                        </label>
                        <div className="mt-2">
                            <span>{user.middle_name}</span>
                        <input
                            id="middle_name"
                            name="middle_name"
                            type="text" value={data.middle_name} onChange={(e)=>setData('middle_name',e.target.value)}
                            autoComplete="middle_name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='Set new first name'/>
                        </div>
                        <InputError className="mt-2" message={errors.middle_name} />
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Surname
                        </label>
                        <div className="mt-2">
                            <span>{user.last_name}</span>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text" value={data.last_name} onChange={(e)=>setData('last_name',e.target.value)}
                            autoComplete="last_name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.last_name} />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                        </label>
                        <div className="mt-2">
                            <span>{user.username}</span>
                        <input
                            id="username"
                            name="username"
                            type="text" value={data.username} onChange={(e)=>setData('username',e.target.value)}
                            autoComplete="username"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.username} />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="headline" className="block text-sm font-medium leading-6 text-gray-900">
                        Headline
                        </label>
                        <div className="mt-2">
                            <span>{user.headline}</span>
                        <input
                            id="headline"
                            name="headline"
                            type="text" value={data.headline} onChange={(e)=>setData('headline',e.target.value)}
                            autoComplete="headline"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.headline} />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                        Date of birth
                        </label>
                        <div className="mt-2">
                            <span>{user.dob}</span>
                        <input
                            id="dob"
                            name="dob"
                            type="date" value={data.dob} onChange={(e)=>setData('dob',e.target.value)}
                            autoComplete="dob"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.dob} />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                        Gender
                        </label>
                        <div className="mt-2">
                        <input
                            id="gender"
                            name="gender"
                            type="text" value={data.gender} onChange={(e)=>setData('gender',e.target.value)}
                            autoComplete="gender"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.gender} />
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email" value={data.email} onChange={(e)=>setData('email',e.target.value)}
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Change Active Status
                        </label>
                        <div className="mt-2">
                        <input
                            id="active_status"
                            name="active_status"
                            type="checkbox"
                             onChange={(e)=>setData('active_status',!data.active_status)}

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <InputError className="mt-2" message={errors.active_status} />
                    </div>

                    {/* <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Country
                        </label>
                        <div className="mt-2">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                        </div>
                    </div> */}

                    {/* <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                        </label>
                        <div className="mt-2">
                        <input
                            id="street-address"
                            name="street-address"
                            type="text"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div> */}

                    {/* <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                        </label>
                        <div className="mt-2">
                        <input
                            id="city"
                            name="city"
                            type="text"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div> */}

                    {/* <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                        </label>
                        <div className="mt-2">
                        <input
                            id="region"
                            name="region"
                            type="text"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div> */}

                    {/* <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                        </label>
                        <div className="mt-2">
                        <input
                            id="postal-code"
                            name="postal-code"
                            type="text"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div> */}
                    </div>
                </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Update
                </button>
                </div>
            </form>
        </section>
    </HomeLayout>
    );
}
