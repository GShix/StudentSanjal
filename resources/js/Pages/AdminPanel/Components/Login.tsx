
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

const Login = () => {

    const { data, setData, post, processing, errors, reset,recentlySuccessful } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [eye, setEye] = useState(false);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(window.route('admin.store'), {
            onFinish: () => reset('password'),
        });
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Head title='Login'/>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">StudentSanjal Admin Portal</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email',e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password',e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
