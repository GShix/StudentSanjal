import { ReactNode } from "react";

interface AdminDashboardLayoutProps {
    children: ReactNode;
}
const AdminDashboardLayout = ({children}:AdminDashboardLayoutProps) => {
    const toggleDropdown = (id: string) => {
        const element: any = document.getElementById(id);
        element.classList.toggle('hidden');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside id="sidebar" className="bg-gray-800 text-white w-52 xl:w-64 min-h-screen">
                <div className="p-4 flex items-center justify-between">
                    <a href="#" className="flex items-center space-x-2">
                        <img src="/img/Home_logo.png" className="h-12 xl:h-14" alt="StudentSanjal Logo" />
                    </a>
                </div>
                <nav className="mt-8">
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-600 transition-colors">
                            <a href="/dashboard" className="flex items-center space-x-2">
                                <i className="ti ti-layout-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="px-4 py-2 active:bg-gray-600 transition-colors">
                            <a
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleDropdown('studentsDropdown')}
                            >
                                <span className="flex items-center space-x-2">
                                    <i className="ti ti-user"></i>
                                    <span>Students</span>
                                </span>
                                <i className="ti ti-chevron-down"></i>
                            </a>
                            <ul id="studentsDropdown" className="pl-4 hidden">
                                <li className="py-2">
                                    <a href="/students/all" className="block text-gray-300 hover:text-white active:bg-gray-500">All Students</a>
                                </li>
                                <li className="py-2">
                                    <a href="/students/add" className="block text-gray-300 hover:text-white active:bg-gray-500">Add Student</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Navbar */}
                <header className="bg-white shadow mx-2">
                    <div className="flex justify-between p-4">
                        <div>
                            <button className="xl:hidden text-blue-900" onClick={() => toggleDropdown('sidebar')}>
                                <i className="ri-menu-fill text-2xl"></i>
                            </button>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div className="relative">
                                <button onClick={() => toggleDropdown('notifications')} className="relative text-gray-700">
                                    <i className="ri-notification-2-fill"></i>
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                                </button>
                                <div id="notifications" className="hidden absolute right-0 bg-white shadow-lg rounded-lg p-4 mt-2 w-64">
                                    <p className="text-sm">No new notifications</p>
                                </div>
                            </div>
                            <div className="relative">
                                <button onClick={() => toggleDropdown('profileDropdown')} className="relative">
                                    <img src="/img/add-icon.png" className="h-10 w-10 rounded-full" alt="Profile" />
                                </button>
                                <div id="profileDropdown" className="hidden absolute right-0 bg-white shadow-lg rounded-lg p-4 mt-2 w-48">
                                    <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</a>
                                    <a href="/logout" className="block px-4 py-2 text-red-500 hover:bg-red-100">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <section className="p-4">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default AdminDashboardLayout;
