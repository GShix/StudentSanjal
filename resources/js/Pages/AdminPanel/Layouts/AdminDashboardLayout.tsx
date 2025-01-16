import NavTop from "../Components/NavTop"
import SideNav from "../Components/SideNav"
import '../../../../../public/adminlte/dist/css/adminlte.min.css'
import { Head, usePage } from "@inertiajs/react"
import { toast, ToastContainer } from "react-toastify"
import { PageProps } from "@/types"
import { useEffect } from "react"

const AdminDashboardLayout = ({children}:any) => {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                progressStyle:{
                    backgroundColor:"#c7ae6a"
                }
            });
        }
    }, [flash.success]);
  return (
    // <div>AdminDashboardLayout</div>
    <div className="hold-transition sidebar-mini layout-fixed">
        <ToastContainer/>
        <div className="wrapper">
            <NavTop/>
            <SideNav/>
            <div className="content-wrapper">
                {children}
            </div>

            <footer className="main-footer text-gray-900">
                <strong className="text-sm">Copyright &copy; <a href="#" className="text-[#b99a45]">dambarsing.tech </a></strong>
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
