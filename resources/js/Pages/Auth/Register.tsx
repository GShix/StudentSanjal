import { FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name:"",
        middle_name:"",
        last_name:"",
        dob:"",
        gender:"",
        email :"",
        password:"",
        password_confirmation:""
    });
    const [eye1,setEye1] = useState(false);
    const [eye2,setEye2] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        // <GuestLayout>
        //     <Head title="Register" />

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="name" value="Name" />

        //             <TextInput
        //                 id="name"
        //                 name="name"
        //                 value={data.name}
        //                 className="mt-1 block w-full"
        //                 autoComplete="name"
        //                 isFocused={true}
        //                 onChange={(e) => setData('name', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.name} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 onChange={(e) => setData('email', e.target.value)}
        //                 required
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
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

        //             <TextInput
        //                 id="password_confirmation"
        //                 type="password"
        //                 name="password_confirmation"
        //                 value={data.password_confirmation}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password_confirmation', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password_confirmation} className="mt-2" />
        //         </div>

        //         <div className="flex items-center justify-end mt-4">
        //             <Link
        //                 href={route('login')}
        //                 className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //             >
        //                 Already registered?
        //             </Link>

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Register
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
        <section className="bg-[#1a1a1a] min-h-screen">
        <Head title="Register" />
            <div className="w-full px-5 mx-auto flex  justify-between max-md:flex-col">
                <div className="logo flex flex-col items-center justify-center sm:w-[40%] md:-mt-40">
                    <img className="w-[90%] sm:w-96 lg:w-full" src="/img/logo3.png" alt="StudentSanjal" srcSet="" />
                    <h1 className="text-xl font-semibold tracking-tight text-gray-300 sm:text-xl max-sm:text-center max-sm:mb-2">
                        Welcome to StudentSanjal
                    </h1>
                </div>
                <div className="relative flex flex-col min-w-0 break-words w-full sm:w-1/2 my-4 shadow-lg rounded-lg bg-[#000000] border-0 sm:mr-10">
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-blueGray-400 text-center mt-6 mb-6 font-bold">
                            <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight text-[#C7AE6A]">
                            Create your account
                            </h2>
                        </div>
                        <form onSubmit={submit}>
                            <div className="realtive flex gap-5 mb-4">
                            <div className="relative w-full">
                                <div className="first_name">
                                    <label
                                        className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                        htmlFor="name">First Name
                                    </label>
                                    <input
                                        id='name'
                                        type="text" name="first_name" autoComplete="first_name"
                                        className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={(e) => setData('first_name', e.target.value)}
                                        placeholder="First Name"/>

                                </div>
                            <InputError message={errors.first_name} className="mt-2" />
                            </div>
                            <div className="relative w-full">
                                <div className="middle_name">
                                    <label
                                        className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                        htmlFor="middle_name">Middle Name
                                    </label>
                                    <input
                                        id='middle_name'
                                        type="text" name="middle_name" value={data.middle_name}
                                        className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Middle Name (Optional)" autoComplete="middle_name"
                                        onChange={(e) => setData('middle_name', e.target.value)}/>

                                </div>
                            <InputError message={errors.middle_name} className="mt-2" />
                            </div>
                            </div>
                            <div className="dob flex items-center gap-5">
                                <div className="relative w-full">
                                    <div className="last_name">
                                        <label
                                            className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                            htmlFor="last_name">Last name
                                        </label>
                                        <input
                                            id='last_name'
                                            type="text" name="last_name" value={data.last_name}
                                            className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Last Name" autoComplete="last_name"
                                            onChange={(e) => setData('last_name', e.target.value)}/>

                                    </div>
                                <InputError message={errors.last_name} className="mt-2" />
                                </div>
                                <div className="relative w-full">
                                    <label
                                        className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                        htmlFor="dob">DOB
                                    </label>
                                    <input
                                        id='dob' type="date" name="dob"
                                        className="border-0 px-3 py-2.5 text-gray-800 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={data.dob}
                                        placeholder="DOB" autoComplete="dob"
                                        onChange={(e) => setData('dob', e.target.value)} required/>
                                    <InputError message={errors.dob} className="mt-2" />
                                </div>
                            </div>
                            <div className="relative w-full mb-4 mt-2">
                                    <div className="gender">
                                        <label
                                            className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                            htmlFor="gender">Gender
                                        </label>
                                        <div className="radio-wrapper flex gap-5 text-sx text-[#C7AE6A]">
                                            <div className="radio-item flex items-center text-xs font-semibold">
                                            <label  className="block text-[#C7AE6A] text-xs font-semibold" htmlFor="gender_male">Male</label>
                                                <input
                                                id="gender_male" checked={data.gender === 'M'}
                                                type="radio" name="gender" value="M"
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="form-radio border-1 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150 shadow"/>
                                            </div>
                                            <div className="radio-item flex items-center text-xs font-semibold">
                                            <label  className="block text-[#C7AE6A] text-xs font-semibold" htmlFor="gender_female">Female</label>
                                                <input
                                                id="gender_female" checked={data.gender === 'F'}
                                                type="radio" name="gender" value="F"
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="form-radio border-1 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150 shadow"/>
                                            </div>
                                            <div className="radio-item flex items-center text-xs font-semibold">
                                            <label  className="block text-[#C7AE6A] text-xs font-semibold" htmlFor="gender_other">Other</label>
                                                <input
                                                id="gender_other" checked={data.gender === 'Other'}
                                                type="radio" name="gender" value="Other"
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="form-radio border-1 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150 shadow"/>
                                            </div>
                                    </div>
                                        <InputError message={errors.gender} className="mt-2" />
                                    </div>
                                </div>
                            <div className="relative w-full mb-4">
                                <div className="email">
                                    <label
                                        className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                        htmlFor="email">Email
                                    </label>
                                    <input
                                        type="email" name="email" id='email' value={data.email}
                                        className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-gray-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Email" autoComplete="email"
                                        onChange={(e) => setData('email', e.target.value)} required/>
                                </div>
                                <InputError message={errors.email} className="mt-2"/>
                            </div>
                            <div className="relative w-full mb-4">
                                <label
                                    className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="password">Password</label>
                                <div className="eye flex relative items-center">
                                <input
                                    type={eye1?"text":"password"} name="password" id='password' value={data.password}
                                    className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password" autoComplete="password"
                                    onChange={(e) => setData('password', e.target.value)} required/>
                                    <i className={`${eye1?"ri-eye-fill":"ri-eye-off-fill"} text-[#1a1a1a] absolute right-1 text-xl px-3 cursor-pointer hover:bg-[#c7ae6a] hover:text-white rounded-md`} onClick={()=>setEye1(!eye1)}></i>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="relative w-full mb-4">
                                <label
                                    className="block uppercase text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="password_confirmation">Conform Password</label>
                                <div className="eye flex relative items-center">
                                <input
                                    type={eye2?"text":"password"} name="password_confirmation" id='password_confirmation' value={data.password_confirmation}
                                    className="border-0 px-3 py-2.5 placeholder-gray-600 text-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Confirm Password" autoComplete="password_confirmation"
                                    onChange={(e) => setData('password_confirmation', e.target.value)} required/>
                                    <i className={`${eye2?"ri-eye-fill":"ri-eye-off-fill"} text-[#1a1a1a] absolute right-1 text-xl px-3 cursor-pointer hover:bg-[#c7ae6a] hover:text-white rounded-md`} onClick={()=>setEye2(!eye2)}></i>
                                </div>
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    className="bg-[#C7AE6A] text-white active:bg-[#e3d6b4] text-sm font-bold uppercase px-6 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit">Sign Up
                                </button>
                            </div>
                        </form>

                        <hr className="mt-6 border-b-1 border-gray-600" />
                        <div className="rounded-t mb-0 px-6 pt-4 pb-1">
                            <div className="text-center mb-4">
                                <h6 className="text-[#e3d6b4] text-sm font-bold">
                                   Or Sign Up with
                                </h6>
                            </div>
                            <div className="btn-wrapper text-center">
                                <button
                                    className="bg-gray-300 active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                    type="button">
                                    <img
                                        alt="..."
                                        className="w-5 mr-1"
                                        src="https://demos.creative-tim.com/notus-js/assets/img/github.svg"/>Github
                                </button>
                                <button
                                    className="bg-gray-300 active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                    type="button">
                                    <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>Google
                                </button>
                            </div>
                        </div>
                        <div className="logIn text-center mt-2">
                            <p className="sign-up-label mt-1 text-xs font-normal text-gray-300">Already have an account? <a href= {route('login')} className="underline font-semibold text-sm text-[#e3d6b4]">Log in</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
