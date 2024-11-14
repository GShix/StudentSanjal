
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminDashboardLayout from './Layouts/AdminDashboardLayout';

export default function Dashboard({ auth}: PageProps) {
    const { user } = usePage<PageProps>().props.auth;
    const { totalUsers,totalPosts } = usePage<PageProps>().props;
    // console.log(totalUsers)
    return (
        <AdminDashboardLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex gap-x-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-48 flex items-center justify-center py-3">
                        <div className="totalUsers flex flex-col justify-center items-center gap-1">
                            <i className="ri-group-2-fill text-xl mb-1"></i>
                            <p>Total Users:</p>
                            <p>{totalUsers}</p>
                            <Link href='/admin/allUsers'>View</Link>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-48 flex items-center justify-center py-3">
                        <div className="totalUsers flex flex-col justify-center items-center gap-1">
                            <i className="ri-news-fill text-xl mb-1"></i>
                            <p>Total Posts:</p>
                            <p>{totalPosts}</p>
                            <Link href="/admin/allPosts">View</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
}
