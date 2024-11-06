import { Outlet } from "react-router-dom"
import Navbar from "../../components/usercomponents/navbar"
import Footer from "../../components/usercomponents/footer"
import { useEffect } from "react"
import { useDispatch, useSelector} from "react-redux"
import { setCredentials } from "../../store/slices/authSlice"

const home = () => {

  const dispatch = useDispatch();

  const token = useSelector((state)=>state.auth.token);
  const userAuthentication = async () => {
    
    const authorizationToken = `Bearer ${token}`
    try {
        const response = await fetch("http://localhost:3000/api/user/userdata", {
            method: "GET",
            headers:{
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            const data = await response.json();
            dispatch(setCredentials({token:token,userdata: data.userdata}))
            
        }
        
    } catch (error) {
        console.log("error in fetching user data");
    }
    
    }
    useEffect(() => {
      if (token) {
        userAuthentication();
      }
      }, [token]);
  


  return (
    <>
    <Navbar />
    <div className="home">
    <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default home