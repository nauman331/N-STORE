import React, { useEffect, useState } from "react";
import Carousel from "./carousel";
import "../../assets/stylesheets/products.scss";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { showPopup } from "react-popupify";
import CustomPopup from "../admincomponents/CustomPopup";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [id, setId] = useState("")
  const token = useSelector((state) => state.auth.token);
  const authorizationToken = `Bearer ${token}`;
  const navigate = useNavigate();

  const popup = (productId) => {
    setId(productId);
    setTimeout(() => showPopup("customPopupId", { open: true }), 0); 
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/getproducts",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products); // Update products state with fetched data
      }
    } catch (error) {
      console.log("Error in fetching all products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = async () => {
    try {
      if(!token){
        alert("Not Logged In! Login First")
        navigate("/auth/login");
        return;
      }
      const response = await fetch("http://localhost:3000/api/user/addtocart", {
        method: "PUT",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({productId: id, quantity}),
      });
      if (response.ok) {
        const res_data = await response.json();
        showPopup("customPopupId", { open: false });
        console.log(res_data);
      }
    } catch (error) {
      console.log("Error in Adding to cart");
    }
  };

  return (
    <>
      <Carousel />
      <CustomPopup>
      <h5 className="addproduct-heading">
          Select The Quantity of Product
        </h5>
        <div className="select-quantity">
          <button onClick={()=>quantity !== 1 && setQuantity(quantity - 1)}>-</button>
          <h4>{quantity}</h4>
          <button onClick={()=>setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart" onClick={()=>addToCart()}>Add To Cart</button>
      </CustomPopup>
      <div className="product-cards">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="edit">
              {product.discountedprice ? (
                <h5>Save {product.price - product.discountedprice} Rs</h5>
              ) : (
                ""
              )}
              {product.stock && product.stock > 0 ? (
                <h6 className="stock">Remaining: {product.stock}</h6>
              ) : (
                <h6 className="no-stock">Stock Ended</h6>
              )}
            </div>
            <div className="imgBox">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>

            <div className="contentBox">
              <h3>{product.title}</h3>
              <h2 className="price">
                {product.discountedprice ? (
                  <>
                    <span className="discounted-price">
                      {product.discountedprice} Rs
                    </span>
                    <span className="original-price">{product.price} Rs</span>
                  </>
                ) : (
                  <>{product.price} Rs</>
                )}
              </h2>
              <button onClick={() => popup(product._id)} className="buy">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
