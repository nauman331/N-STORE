import { Outlet } from "react-router-dom"
import "../../assets/stylesheets/auth.scss"


const auth = () => {
  return (
    <>
    <section className="auth-section">
        <div className="left">
           <h1> Welcome to N-Store!</h1>
           <p>A new era of online shopping!</p>
            </div>
        <div className="right">
           
        <Outlet />
        </div>
    </section>
    </>
  )
}

export default auth