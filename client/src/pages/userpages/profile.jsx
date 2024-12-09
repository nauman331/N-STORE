import "../../assets/stylesheets/profile.scss";
import { useSelector } from "react-redux";
import { showPopup } from "react-popupify";
import CustomPopup from "../../components/admincomponents/CustomPopup";
import { updateuserdata } from "../../helpers/forms";
import { useState, useEffect } from "react";
import img from "../../assets/images/logo.jpeg";

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    profile: null,
  });
  const [orders, setOrders] = useState([]);
  const userdata = useSelector((state) => state.auth.userdata);
  const token = useSelector((state) => state.auth.token);
  const AuthorizationToken = `Bearer ${token}`;

  const popup = () => {
    showPopup("customPopupId", { open: true });
  };

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/getorders", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const res_data = await response.json();
        const uniqueOrders = Array.from(
          new Set(res_data.orders.map((order) => order._id))
        ).map((id) => res_data.orders.find((order) => order._id === id));
        setOrders(uniqueOrders);
        console.log("Orders fetched:", uniqueOrders);
      }
    } catch (error) {
      console.error("Error in getting orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/updateprofile",
        {
          method: "PUT",
          headers: {
            Authorization: AuthorizationToken,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const res_data = await response.json();
        console.log("Profile Updated:", res_data);

        // Reset form after successful update
        setUser({
          username: "",
          email: "",
          phone: "",
          address: "",
          profile: null,
        });
      } else {
        console.error("Failed to update profile. Status:", response.status);
      }
    } catch (error) {
      console.error("Error in Updating Profile:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "profile") {
      setUser({ ...user, [name]: e.target.files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  return (
    <>
      <CustomPopup>
        <h3 className="addproduct-heading">Update Profile</h3>
        <div className="auth-section">
          <form onSubmit={handleSubmit}>
            {updateuserdata.map((data, index) => (
              <div className="input" key={index}>
                <span className="icon">{data.icon}</span>
                <input
                  type={data.type}
                  name={data.name}
                  placeholder={data.placeholder}
                  onChange={handleInput}
                />
              </div>
            ))}
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </CustomPopup>

      <div className="profile-page">
        {/* User Details Section */}
        <section className="user-details">
          <img
            src={userdata?.profile || img}
            alt="User Profile"
            className="user-avatar"
          />
          <div className="user-info">
            <h3>{userdata?.username || "Guest"}</h3>
            <p>Email: {userdata?.email || "No Email Provided"}</p>
            <button className="btn edit-profile" onClick={popup}>
              Edit Profile
            </button>
          </div>
        </section>

        {/* Orders Section */}
        <section className="orders">
          <h2>Order History</h2>

          <div className="order-item">
            <p>
              <strong>Extra Details</strong>
            </p>
            <p>
              Address:{" "}
              {userdata?.address || "Add address from Edit Profile Button"}
            </p>
            <p>Phone: {userdata?.phone || "Not Provided"}</p>
          </div>

          {orders.map((order) => (
            <div className="order-item" key={order._id}>
              <p>
                <strong>Order ID: {order._id}</strong>
              </p>
              <p>
                {order.reciept && <a href={order.reciept} className="status">
                  Check Receipt Online
                </a>}
              </p>
              <p>Order Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Order Status: {order.status}</p>
              <div className="products">
                {order.products.map((product, index) => (
                  <div key={product._id || index} className="product-item">
                    <img src={product.image} alt={product.title} />
                    <p>
                      <strong>{product.title}</strong>
                    </p>
                    <p>Category: {product.category}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
