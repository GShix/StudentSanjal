
const SideNav = () => {
  return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <a href="index3.html" className="brand-link">
        <img src="/img/logo.png" alt="AdminLTE Logo" className="brand-image elevation-3"
            style={{ opacity: ".8" }} />
        <span className="brand-text font-weight-light">Admin</span>
    </a>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
        {/* <!-- SidebarSearch Form --> */}
        <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                    aria-label="Search" />
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                {/* <!-- Add icons to the links using the .nav-icon className
       with font-awesome or any other icon font library --> */}
                <li className="nav-item ">
                    <a href="./index.html" className="nav-link active">
                        <i className="nav-icon fas fa-tachometer-alt"></i>
                        <p>
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
                        <i className="nav-icon fas fa-building"></i>
                        <p>
                            Properties
                            <i className="fas fa-angle-left right"></i>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="pages/layout/top-nav.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>All Properties</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Add New</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="pages/layout/boxed.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Pending Approval</p>
                            </a>
                        </li>

                    </ul>
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
                        <i className="nav-icon fas fa-dollar-sign"></i>
                        <p>
                            Transactions
                        </p>
                    </a>

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
