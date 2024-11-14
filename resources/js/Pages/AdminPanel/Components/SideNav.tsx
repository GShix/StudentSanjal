import { PageProps } from "@/types"
import { usePage } from "@inertiajs/react"

const SideNav = () => {
    const {user} = usePage<PageProps>().props.auth
  return (
<aside className="main-sidebar bg-gray-100 elevation-4 mr-2 -mt-1">
    {/* <!-- Brand Logo --> */}
    <a href="/admin/dashboard" className="brand-link">
        {/* <img src="/img/logo.png" alt="AdminLTE Logo" className="" /> */}
        <span className="text-dark flex justify-center w-full bg-dark py-2 rounded-md">StudentSanjal</span>
        {/* <span className="text-dark flex justify-center mt-2">{user.name}</span> */}
    </a>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
        {/* <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                    aria-label="Search" />
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div> */}

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-4">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <li className="nav-item ">
                    <a href="/admin/dashboard" className="nav-link bg-[#b99a45] text-dark">
                        <i className="nav-icon fas fa-home"></i>
                        <p className="">
                            Dashboard
                        </p>
                    </a>

                </li>
                <li className="nav-item">
                    <a href="pages/widgets.html" className="nav-link">
                        <i className="nav-icon fas fa-calendar"></i>
                        <p>
                            Events
                            <span className="right badge badge-danger">New</span>
                        </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="pages/widgets.html" className="nav-link">
                        <i className="nav-icon fas fa-blog"></i>
                        <p>
                            Posts
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        <i className="nav-icon fas fa-users"></i>
                        <p>
                            Users
                            <i className="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="/admin/allUsers" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>All Users</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/goldVerified" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Gold Verified</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/admin/pendingGoldVerification" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Pending Verifications</p>
                            </a>
                        </li>

                    </ul>
                </li>
                <li className="nav-item">
                    <a href="pages/widgets.html" className="nav-link">
                        <i className="nav-icon fas fa-fire"></i>
                        <p>
                            Feedbacks
                            {/* <span className="right badge badge-danger">New</span> */}
                        </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        <i className="nav-icon fas fa-chart-pie"></i>
                        <p>
                            Reports & Analysis
                            <i className="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>General Elements</p>
                            </a>
                        </li>

                    </ul>
                </li>
                <li className="nav-item">
                    <a href="" className="nav-link">
                        <i className="nav-icon fas fa-sun"></i>
                        <p>
                            Settings
                            <i className="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>General</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Payment</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Security</p>
                            </a>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
    </div>
    {/* <!-- /.sidebar --> */}
</aside>
  )
}

export default SideNav
