
const AdminSidebar = () => {
    // function toggleDropdown(id:any) {
    //     var element = document.getElementById(id);
    //     element.classNameList.toggle('hidden');
    // }
  return (
<aside className="left-sidebar">
    <div>
        <div className="brand-logo flex items-center justify-between">
            <a href="{{ route('admin.dashboard') }}" className="flex items-center justify-center space-x-2">
                <img src="{{ asset('assets/backend/logo/logo.svg') }}" className="h-10 w-10" alt="Logo" />
                <h1 className="text-xl font-bold">CMS-Madhesh</h1>
            </a>
            <div className="close-btn xl:hidden block cursor-pointer" id="sidebarCollapse">
                <i className="ti ti-x text-lg"></i>
            </div>
        </div>

        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
                <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">Home</span>
                </li>
                <li className="sidebar-item">
                    <a className="sidebar-link" href="{{ route('admin.dashboard') }}" aria-expanded="false">
                        <span>
                            <i className="ti ti-layout-dashboard"></i>
                        </span>
                        <span className="hide-menu">Dashboard</span>
                    </a>
                </li>
                <li className="nav-small-cap">
                    <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                    <span className="hide-menu">UI COMPONENTS</span>
                </li>

                <li className="sidebar-item">
                    <a className="sidebar-link flex justify-between items-center cursor-pointer" aria-expanded="false"
                        // onclick={toggleDropdown('enterprisesDropdown')}
                        >
                        <span className="flex items-center">
                            <i className="ti ti-building"></i>
                            <span className="hide-menu ml-2">Enterprises</span>
                        </span>
                        <i className="ti ti-chevron-down"></i>
                    </a>
                    <ul id="enterprisesDropdown" className="ml-6 mt-2 space-y-2 hidden">

                     <li>
                            <a className="sidebar-link" href="{{ route('admin.enterprise.index') }}">
                                <i className="ti ti-building"></i> <span>Enterprise</span>
                            </a>
                        </li>
                        <li>
                            <a className="sidebar-link" href="{{ route('admin.enterprisePerson.index') }}">
                                <i className="ti ti-user"></i> <span>Enterprise Person</span>
                            </a>
                        </li>

                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</aside>

  )
}

export default AdminSidebar
