import { useState } from "react"
import { NavLink } from "react-router-dom";
import {registerdata} from "../../helpers/forms"

const register = () => {
const [user, setUser] = useState({
  username : "",
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
  const response = await fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
  })

  const res_data = await response.json();
  console.log(res_data)
  if(response.ok){
      setUser({
          username : "",
          email : "",
          password : "",
      })
      alert("Registered successfuly")
  }else{
      alert(error)
  }
  console.log(response);
} catch (error) {
  console.log(error)
}


}

return (   
    <>
      <h1>Create a new Account!</h1>
      <h5>Already have an Account? <NavLink to='/auth/login'>Login</NavLink></h5>
      <form onSubmit={handleSubmit}>

{
  registerdata.map((data, index) => {
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
        <button type="submit">Register</button>
      </form>
      </>
  )
}

export default register