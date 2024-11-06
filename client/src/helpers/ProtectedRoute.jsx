import {useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userdata = useSelector((state) => state.auth.userdata);

 
}

export default ProtectedRoute