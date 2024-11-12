
const SideNav = () => {
  return (
<aside className="main-sidebar bg-gray-100 elevation-4 mr-2">
    {/* <!-- Brand Logo --> */}
    <a href="index3.html" className="brand-link">
        {/* <img src="/img/logo.png" alt="AdminLTE Logo" className="" /> */}
        <span className="text-dark flex justify-center">Admin</span>
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
                    <a href="./index.html" className="nav-link bg-[#b99a45] text-dark">
                        <i className="nav-icon fas fa-tachometer-alt"></i>
                        <p className="">
                            Dashboard
                        </p>
                    </a>

                </li>
                <li className="nav-item">
                    <a href="pages/widgets.html" className="nav-link">
                        <i className="nav-icon fas fa-th"></i>
                        <p>
                            Widgets
                            <span className="right badge badge-danger">New</span>
                        </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-users"></i>
                        <p>
                            Users
                            <i className="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="pages/charts/chartjs.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>All Users</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/charts/flot.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Pending Verifications</p>
                            </a>
                        </li>

                    </ul>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-chart-pie"></i>
                        <p>
                            Reports & Analysis
                            <i className="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="pages/forms/general.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>General Elements</p>
                            </a>
                        </li>

                    </ul>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-wrench"></i>
                        <p>
                            Settings
                            <i className="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="pages/tables/simple.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>General</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/tables/data.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Payment</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/tables/jsgrid.html" className="nav-link">
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
