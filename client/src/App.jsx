import {Routes, Route} from "react-router-dom"
import Auth from "./pages/userpages/auth"
import Home from "./pages/userpages/home"
import Login from "./components/usercomponents/login"
import Register from "./components/usercomponents/register"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      </Route>

      <Route path="/admin" element={""}>
      <Route path="dashboard" element={""} />
      <Route path="addproducts" element={""} />
      <Route path="editproducts" element={""} />
      </Route>

      
    </Routes>
    </>
  )
}

export default App
