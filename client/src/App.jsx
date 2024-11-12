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


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} >
      <Route path="home" element={<Home />} />
      <Route path="profile" element={""} />
      <Route path="cart" element={""} />
      <Route path="checkout" element={""} />
      </Route>


      <Route path="/auth" element={<Auth />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      </Route>

      <Route path="/admin" element={<AdminHome />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="addproducts" element={<AddProduct />} />
      <Route path="editproducts" element={""} />
      <Route path="orderedproducts" element={""} />
      </Route>

      
    </Routes>
    </>
  )
}

export default App
