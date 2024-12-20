import { useState } from "react"
import { NavLink } from "react-router-dom";
import { logindata } from "../../helpers/forms";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

const login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email : "",
    password : "",
  
  })
  
  const HandleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    setUser({
        ...user,
        [name]: value
    })
    
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
    
        const res_data = await response.json();
    
        if (response.ok) {
          setUser({
            email: "",
            password: "",
          });
    
          console.log(res_data.message);
          dispatch(setCredentials({ token: res_data.token}));

        } else {
          console.log(res_data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    

return (   
    <>
      <h1>Login to your Account!</h1>
      <h5>Don't have an Account? <NavLink to='/auth/register'>Register</NavLink></h5>
      <form onSubmit={handleSubmit}>
      {
  logindata.map((data, index) => {
return (
  <div className="input" key={index}>
          <span className="icon">
          {data.icon}
        </span>
        <input type={data.type} name={data.name} 
        placeholder={data.placeholder}
        onChange={HandleInput}
        />
        </div>
)})}

        <button type="submit">Login</button>
      </form>
      </>
  )
}

export default login