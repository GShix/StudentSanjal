import { Head } from "@inertiajs/react"
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout"

const AllUsers = () => {
  return (
    <AdminDashboardLayout>
        <Head title="All Users"/>
        <div className="allUsers">
            <h1>Users</h1>
        </div>
    </AdminDashboardLayout>
  )
}

export default AllUsers
