import { useEffect, useState } from "react";
import "../../assets/stylesheets/cart.scss";
import { useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { showPopup } from "react-popupify";
import CustomPopup from "../../components/admincomponents/CustomPopup";
const cart = () => {
  const token = useSelector((state) => state.auth.token);
  const AuthorizationToken = `Bearer ${token}`;
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");

  const popup = (productId) => {
    setId(productId);
    setTimeout(() => showPopup("customPopupId", { open: true }), 0);
  };

  const getCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/getcart", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const res_data = await response.json();
        setCart(res_data.cart);
        console.log(res_data.cart);
      }
    } catch (error) {
      console.log("Error in getting cart items");
    }
  };

  useEffect(() => {
    getCart();
  }, [token]);

  const removeFromCart = async () => {
    try {
      if (!id) {
        console.log("id is missing");
        return;
      }
      const response = await fetch(
        "http://localhost:3000/api/user/removefromcart",
        {
          method: "POST",
          headers: {
            Authorization: AuthorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        getCart();
      }
    } catch (error) {
      console.log("Error in removing from cart");
    }
  };

  return (
    <>
      <CustomPopup>
        <h5 className="addproduct-heading">
          Are you sure you want to Remove Item from Cart?
        </h5>
        <button className="add-to-cart" onClick={() => removeFromCart()}>
          Remove From Cart
        </button>
      </CustomPopup>
      <h1 className="addproduct-heading">Cart Items</h1>
      <div className="cart-boxes">
        {cart.map((item) => {
          return (
            <div key={item._id} className="cart-box">
              <img src={item.product.image} alt="product image" />
              <div>
                <h4>{item.product.title}</h4>
                <h5>Category: {item.product.category}</h5>
              </div>

              <div className="price">
                <h5>price: {item.product.price * item.quantity} Rs</h5>
                {item.product.discountedprice  && (
                  <h4>
                    discounted price:{" "}
                    {item.product.discountedprice * item.quantity} Rs
                  </h4>
                )}
              </div>
              <div className="delete" onClick={() => popup(item.product._id)}>
                <Trash2 />
              </div>
            </div>
          );
        })}
        <button className="buy-now">BUY NOW</button>
      </div>
    </>
  );
};

export default cart;
