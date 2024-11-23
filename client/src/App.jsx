import {Routes, Route} from "react-router-dom"
import Auth from "./pages/userpages/auth"
import HomePage from "./pages/userpages/home"
import Login from "./components/usercomponents/login"
import Register from "./components/usercomponents/register"
import Home from "./components/usercomponents/home"
import AdminHome from "./pages/adminpages/adminHome"
import AddProduct from "./components/admincomponents/addproduct"
import ProtectedRoute from "./helpers/ProtectedRoute"
import Dashboard from "./components/admincomponents/dashboard"
import Editproducts from "./components/admincomponents/editproducts"
import Cart from "./pages/userpages/cart"
import "react-popupify/dist/bundle.css";
import Profile from "./pages/userpages/profile"
import Checkout from "./pages/userpages/checkout"


function App() {

  return (
    <>
      <ProtectedRoute>
    <Routes>
      <Route path="/" element={<HomePage />} >
      <Route path="home" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      </Route>


      <Route path="/auth" element={<Auth />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      </Route>

      <Route path="/admin" element={<AdminHome />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="addproducts" element={<AddProduct />} />
      <Route path="editproducts" element={<Editproducts />} />
      <Route path="orderedproducts" element={""} />
      </Route>
    </Routes>
      </ProtectedRoute>
    </>
  )
}

export default App
