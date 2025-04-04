
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return <>
    <AdminNavbar />
    <AdminSidebar />
    <div style={{ marginLeft: "200px" }}>
      <Outlet />
    </div>
  </>
}

export default AdminLayout