import InputError from '@/Components/InputError';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { PageProps } from '@/types';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import HomeLayout from './Layouts/HomeLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    useEffect(() => {
        if (data.dob) {
            validateAge(data.dob);
        }
    }, [data.dob]); // Validate DOB on change

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


    useEffect(() => {
        if (recentlySuccessful) {
          toast.success('Profile updated successfully!');
        }
      }, [recentlySuccessful]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!errors.dob) {
        post(route('profile.update'));
    }
  };

  const today = new Date();
  const maxDate = today.toISOString().split('T')[0];

  return (
    <HomeLayout>
      <Head title="Profile" />
      <section className='bg-gray-200 px-4 py-3 rounded-xl'>
        <form onSubmit={submit} encType="multipart/form-data">
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

                <div className="col-span-full">
                  <label htmlFor="banner_image" className="block text-sm font-medium leading-6 text-gray-900">
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
                {/* First Name */}
                <div className="sm:col-span-3">
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
                <div className="sm:col-span-3">
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
                <div className="sm:col-span-3">
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
                <div className="sm:col-span-3">
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
                <div className="col-span-full">
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
                <div className="col-span-full">
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
                <div className="col-span-full">
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
                <div className="sm:col-span-4">
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
        <ToastContainer />
      </section>
    </HomeLayout>
  );
}
