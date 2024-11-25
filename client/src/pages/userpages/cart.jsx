import { useEffect, useState } from "react";
import "../../assets/stylesheets/cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { showPopup } from "react-popupify";
import { NavLink } from "react-router-dom";
import CustomPopup from "../../components/admincomponents/CustomPopup";
import { setTotalDiscountedCartAmount } from "../../store/slices/authSlice";

const Cart = () => {
  const dispatch = useDispatch(); 
  const totaldiscountedcartamount = useSelector((state) => state.auth.totaldiscountedcartamount);
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

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const price = item.product.discountedprice
        ? item.product.discountedprice
        : item.product.price;
      return acc + price * item.quantity;
    }, 0);
    dispatch(
      setTotalDiscountedCartAmount({ totaldiscountedcartamount: total })
    ); 
  }, [cart, dispatch]);

  const removeFromCart = async () => {
    try {
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
        showPopup("customPopupId", { open: false }); 
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
        {cart.length !== 0 ? cart.map((item) => {
          return (
            <div key={item._id} className="cart-box">
              <img src={item.product.image} alt="product image" />
              <div>
                <h4>{item.product.title}</h4>
                <h5>Category: {item.product.category}</h5>
              </div>

              <div className="price">
                <h5>Quantity: {item.quantity} </h5>
                <h5>price: {item.product.price * item.quantity} Rs</h5>
                {item.product.discountedprice && (
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
        }) : <h1 className="addproduct-heading">Your cart is empty</h1>}
        <h5>Total Discounted Bill: {totaldiscountedcartamount} Rs</h5>
        <NavLink to="/checkout" className="buy-now">
          BUY NOW
        </NavLink>
      </div>
    </>
  );
};

export default Cart;
