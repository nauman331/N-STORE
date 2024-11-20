import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userdata } = useSelector((state) => state.auth);
  const { pathname } = location;

  useEffect(() => {
    switch (true) {
      case pathname === "/":
        navigate("/home", { replace: true });
        break;
      case !token && !pathname.startsWith("/auth") && pathname !== "/home":
        navigate("/auth/login", { replace: true });
        break;
      case token && pathname.startsWith("/auth"):
        navigate("/home", { replace: true });
        break;
      case token && userdata?.isAdmin && !pathname.startsWith("/admin"):
        navigate("/admin", { replace: true });
        break;
      case token && !userdata?.isAdmin && pathname.startsWith("/admin"):
        navigate("/home", { replace: true });
        break;
      default:
        break;
    }
  }, [token, userdata, pathname, navigate]);

  return children;
};

export default ProtectedRoute;
