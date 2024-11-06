import { NavLink } from "react-router-dom";
import "../../assets/stylesheets/leftnav.scss";
import {
  LayoutDashboard,
  PencilRuler,
  ShoppingBag,
  SquarePlus,
  X,
  Menu
} from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

const adminnav = () => {
  const [open, setOpen] = useState(false);
  const userdata = useSelector((state)=>state.auth.userdata)
  return (
    <>
    <header className="admin-header">
    <h3>{userdata.username}</h3>
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
    </aside>
    </>
  );
};

export default adminnav;
