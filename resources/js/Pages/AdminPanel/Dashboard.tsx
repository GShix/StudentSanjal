import AdminHeader from "./Layouts/AdminHeader"
import AdminSidebar from "./Layouts/AdminSidebar"

const Dashboard = () => {
  return (
    <div>
        <AdminHeader/>
        <AdminSidebar/>
        <div className="dashboard">
            <h1>Hello</h1>
        </div>
    </div>
  )
}

export default Dashboard
