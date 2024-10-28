import { FormEventHandler, useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset,recentlySuccessful } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [eye, setEye] = useState(false);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        // <GuestLayout>
        //     <Head title="Log in" />

        //     {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 isFocused={true}
        //                 onChange={(e) => setData('email', e.target.value)}
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="current-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="block mt-4">
        //             <label className="flex items-center">
        //                 <Checkbox
        //                     name="remember"
        //                     checked={data.remember}
        //                     onChange={(e) => setData('remember', e.target.checked)}
        //                 />
        //                 <span className="ms-2 text-sm text-gray-600">Remember me</span>
        //             </label>
        //         </div>

        //         <div className="flex items-center justify-end mt-4">
        //             {canResetPassword && (
        //                 <Link
        //                     href={route('password.request')}
        //                     className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                 >
        //                     Forgot your password?
        //                 </Link>
        //             )}

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Log in
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
        <section className="bg-[#1a1a1a] min-h-screen flex justify-center items-center py-4">
            <Head title="Log in" />
            <div className="w-full lg:w-4/12 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-[#000000] border-0">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-center mt-6 mb-6 font-bold">
                            <img src="/img/logo3.png" alt="Logo" className="mx-auto" />
                            <p className="mt-2 text-center text-sm text-gray-300">
                                Log in to your account
                            </p>
                        </div>
                        <form onSubmit={submit}>
                            <div className="relative w-full mb-4">
                                <label className="block uppercase text-gray-300 text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email" autoComplete="email"
                                    className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={data.email} onChange={(e)=>setData('email',e.target.value)}
                                    placeholder="Email"/>
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="relative w-full mb-4">
                                <label className="block uppercase text-gray-300 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Password
                                </label>
                                <div className="eye flex relative items-center">
                                    <input
                                        type={eye ? "text" : "password"}
                                        name="password"
                                        id="password" autoComplete="current-password"
                                        className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={data.password} onChange={(e)=>setData('password',e.target.value)}
                                        placeholder="Password"/>
                                    <i className={`${eye ? "ri-eye-fill" : "ri-eye-off-fill"} text-[#1a1a1a] absolute right-1 text-xl px-3 cursor-pointer hover:bg-[#c7ae6a] hover:text-white rounded-md`}
                                        onClick={() => setEye(!eye)}
                                    ></i>
                                </div>
                                <InputError message={errors.email} className="mt-2"/>
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        id="customCheckLogin" name='remember'
                                        type="checkbox" checked={data.remember}
                                        onChange={(e)=>setData('remember',e.target.checked)}
                                        className="form-checkbox border-1 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150 shadow"/>
                                    <span className="ml-2 text-sm font-semibold text-gray-300">Remember me</span>
                                </label>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="bg-[#C7AE6A] text-white active:bg-[#e3d6b4] text-sm font-bold uppercase px-6 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit">
                                    Log in
                                </button>
                            </div>
                        </form>
                        <Link className='text-gray-300 text-xs hover:underline' href={route('password.request')}>Forget your password?</Link>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <div className="rounded-t mb-0 px-6 pt-4 pb-1">
                            <div className="text-center mb-3">
                                <h6 className="text-[#e3d6b4] text-sm font-bold">
                                    Or Log in with
                                </h6>
                            </div>
                            <div className="btn-wrapper text-center">
                                <button
                                    className="bg-gray-300 active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded-md outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                    type="button" onClick={() => window.location.href = route('auth.github')}>
                                    <img
                                        alt="..."
                                        className="w-5 mr-1"
                                        src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"/>
                                    Github
                                </button>
                                <a
                                    className="bg-gray-300 active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded-md outline-none focus:outline-none mr-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                    href={route('auth.google')}>
                                    {/* // href='/auth/google'> */}
                                    <img
                                        alt="..."
                                        className="w-5 mr-1"
                                        src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>
                                    Google
                                </a>
                            </div>
                            {route().params.error && (
                                <div className="mt-4 text-red-600">
                                    {route().params.error}
                                </div>
                            )}
                        </div>

                        <div className="signUp text-center">
                            <p className="sign-up-label mt-1 text-xs font-normal text-gray-300">
                                New to StudentSanjal? <a href={route('register')} className="underline font-semibold text-sm text-[#e3d6b4]">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </section>
    );
}
