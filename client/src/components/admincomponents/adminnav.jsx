import { NavLink } from "react-router-dom";
import "../../assets/stylesheets/leftnav.scss";
import {
  LayoutDashboard,
  PencilRuler,
  ShoppingBag,
  SquarePlus,
  X,
  Menu,
  LogOut
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logOut } from "../../store/slices/authSlice";

const adminnav = () => {
  const [open, setOpen] = useState(false);
  const userdata = useSelector((state)=>state.auth.userdata)
  const dispatch = useDispatch();
  return (
    <>
    <header className="admin-header">
    <h3>{userdata ? userdata.username : "Guest"}</h3>
          {open ? <X onClick={(()=>setOpen(false))} className="toggler"/> : <Menu onClick={(()=>setOpen(true))} className="toggler"/>}
    </header>
    <aside className={open ? "open-adminnav" : "close-adminnav"}>
      <NavLink to="/admin/dashboard" className="dash-link">
        <LayoutDashboard />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/admin/addproducts" className="dash-link">
        <SquarePlus />
        <span>Add Products</span>
      </NavLink>
      <NavLink to="/admin/editproducts" className="dash-link">
        <PencilRuler />
        <span>Edit Products</span>
      </NavLink>
      <NavLink to="/admin/orderedproducts" className="dash-link">
        <ShoppingBag />
        <span>Ordered Products</span>
      </NavLink>
      <h5 className="dash-link" onClick={(()=>dispatch(logOut()))}>
        <LogOut />
        <span>Log Out</span>
      </h5>
    </aside>
    </>
  );
};

export default adminnav;
