import { Head, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import { PageProps } from "@/types";

const GoldVerified = () => {
    const { goldVerified,csrf_token  } = usePage<PageProps>().props;

    return (
        <AdminDashboardLayout>
            <Head title="All Users" />
            <div className="goldVerified px-2">
                <div className="container full-container py-1 flex flex-col gap-4">
                    <div className="card flex items-center py-1 mx-1">
                        <nav className="w-full flex items-center justify-between" aria-label="Global">
                            <ul className="icon-nav flex items-center gap-4">
                                <li className="relative xl:hidden">
                                    <a
                                        className="text-xl icon-hover cursor-pointer text-heading"
                                        id="headerCollapse"
                                        data-hs-overlay="#application-sidebar-brand"
                                        aria-controls="application-sidebar-brand"
                                        aria-label="Toggle navigation"
                                        href="#">
                                        <i className="ti ti-menu-2 relative z-1"></i>
                                    </a>
                                </li>

                                <li className="relative">
                                    <nav className="w-full rounded-md" aria-label="breadcrumb">
                                        <ol className="list-reset ms-4 flex">
                                            <li>
                                                <a
                                                    href={window.route("admin.dashboard")}
                                                    className="motion-reduce:transition-none-none text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition motion-reduce:transition-none">
                                                    Home
                                                </a>
                                            </li>
                                            <li>
                                                <span className="mx-2 text-black/60">/</span>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="motion-reduce:transition-none-none text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition motion-reduce:transition-none">
                                                    Users
                                                </a>
                                            </li>
                                            <li>
                                                <span className="mx-2 text-black/60">/</span>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="motion-reduce:transition-none-none text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition motion-reduce:transition-none">
                                                    Gold Verified
                                                </a>
                                            </li>
                                        </ol>
                                    </nav>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-lg-12 overflow-hidden d-flex align-items-stretch">
                        <div className="card w-100">
                            <div className="card-body p-2">
                                <h5 className="card-title fw-semibold mb-4">User</h5>
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr className="border border-1">
                                                <th>
                                                    <h6 className="fw-semibold mb-0">S.No.</h6>
                                                </th>
                                                <th className="border-right-1">
                                                    <h6 className="fw-semibold mb-0">Profile Image</h6>
                                                </th>
                                                <th className="border-right-1">
                                                    <h6 className="fw-semibold mb-0">Username</h6>
                                                </th>
                                                <th className="border-right-1">
                                                    <h6 className="fw-semibold mb-0">Email</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Action</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {goldVerified && goldVerified.map((user:any, index:number) => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <h6>{index + 1}</h6>
                                                    </td>
                                                    <td>
                                                        <img className="mb-1 w-20" src={user.profile_image ?? ''} alt="User Photo" />
                                                    </td>
                                                    <td>
                                                        <h6>{user.username ?? ''}</h6>
                                                    </td>
                                                    <td>
                                                        <h6>{user.email ?? ''}</h6>
                                                    </td>
                                                    <td>
                                                        <div className="action gap-2 flex items-center">
                                                            <a href={window.route("admin.viewUser", user.id)}>
                                                                <i title="view" className="ri-eye-fill text-[18px] text-white hover:bg-black bg-[#b99a45] p-2 rounded-full"></i>
                                                            </a>

                                                            <form action={window.route("admin.dashboard", user)} method="POST" className="inline-block">
                                                                <input type="hidden" name="_method" value="DELETE" />
                                                                <input type="hidden" name="_token" value={csrf_token as string} />
                                                                <button type="submit">
                                                                    <i className="ri-delete-bin-2-fill text-[18px] text-white hover:bg-black bg-red-500 p-2 rounded-full"></i>
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default GoldVerified;
