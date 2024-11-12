import NavTop from "../Components/NavTop"
import SideNav from "../Components/SideNav"
import '../../../../../public/adminlte/dist/css/adminlte.min.css'
import { Head } from "@inertiajs/react"

const AdminDashboardLayout = ({children}:any) => {
  return (
    // <div>AdminDashboardLayout</div>
    <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
            <NavTop/>
            <SideNav/>
            <div className="content-wrapper">
                {children}
            </div>

            <footer className="main-footer">
                <strong className="text-sm">Copyright &copy; <a href="https://adminlte.io">Admin.io </a></strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b className="text-sm">Version</b> 1.2.1
                </div>
            </footer>
        </div>
    </div>
  )
}

export default AdminDashboardLayout
