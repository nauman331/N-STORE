import AdminNav from "../../components/admincomponents/adminnav"
import {Outlet} from "react-router-dom"

const adminHome = () => {
  return (
    <>
     <AdminNav />
     <div className="admin-outlet">
     <Outlet />
     </div>
     
    </>
  )
}

export default adminHome