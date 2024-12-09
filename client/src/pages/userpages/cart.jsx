import { useEffect, useState } from "react";
import "../../assets/stylesheets/cart.scss";
import { useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { showPopup } from "react-popupify";
import CustomPopup from "../../components/admincomponents/CustomPopup";
import Stripe from "react-stripe-checkout";

const Cart = () => {
  const token = useSelector((state) => state.auth.token);
  const AuthorizationToken = `Bearer ${token}`;
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");
  const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(0);

  const showConfirmationPopup = (productId) => {
    setId(productId);
    setTimeout(() => showPopup("customPopupId", { open: true }), 0);
  };

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/getcart", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  useEffect(() => {
    const calculateTotal = () => {
      const total = cart.reduce((acc, item) => {
        const price = item.product.discountedprice || item.product.price;
        return acc + price * item.quantity;
      }, 0);
      setTotalDiscountedAmount(total);
    };
    calculateTotal();
  }, [cart]);

  const removeCartItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/removefromcart", {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
      if (response.ok) {
        await fetchCart();
        showPopup("customPopupId", { open: false });
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleToken = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/checkout", {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: totalDiscountedAmount, token }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Payment Successful:", data);
        setCart([]);
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <CustomPopup>
        <h5 className="popup-heading">Remove Item from Cart?</h5>
        <button className="remove-button" onClick={removeCartItem}>
          Remove
        </button>
      </CustomPopup>
      <h1 className="addproduct-heading">Cart Items</h1>
      <div className="cart-boxes">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item._id} className="cart-box">
              <img src={item.product.image} alt={item.product.title} />
              <div className="item-info">
                <h4>{item.product.title}</h4>
                <h5>Category: {item.product.category}</h5>
              </div>
              <div className="price-info">
                <h5>Quantity: {item.quantity}</h5>
                <h5>Price: {item.product.price * item.quantity} $</h5>
                {item.product.discountedprice && (
                  <h4>
                    Discounted Price: {item.product.discountedprice * item.quantity} $
                  </h4>
                )}
              </div>
              <div className="delete" onClick={() => showConfirmationPopup(item.product._id)}>
                <Trash2 />
              </div>
            </div>
          ))
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </div>
      <div className="center">
      <h5>Total: {totalDiscountedAmount} $</h5>
      <Stripe
        token={handleToken}
        stripeKey="pk_test_51NHdIECOfgM8oTpqt2elwgxv7MAxQhdJx82RBobQ0ikxupGUbUqsXUcjJPj64XOiQwPRcmRsAM4mI7yujZtQUIMA004jY72XSD"
      />
      </div>
    </>
  );
};

export default Cart;
