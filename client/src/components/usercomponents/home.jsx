import React, { useEffect, useState } from 'react';
import Carousel from './carousel';
import "../../assets/stylesheets/products.scss";
import {ShoppingCart} from "lucide-react"

const Home = () => {
  const [products, setProducts] = useState([]); 

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/getproducts", {
        method: 'GET',
      });
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

  return (
    <>
      <Carousel />
      <div className="product-cards">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {
              product.discountedprice ? <h5>Save {product.price - product.discountedprice} Rs</h5> : ""
            }
            
            <div className="imgBox">
              <img src={product.image} alt={product.title} className="product-image" />
            </div>

            <div className="contentBox">
              <h3>{product.title}</h3>
              <h2 className="price">
                {product.discountedprice ? (
                  <>
                    <span className="discounted-price">{product.discountedprice} Rs</span>
                    <span className="original-price">{product.price} Rs</span>
                  </>
                ) : (
                  <>{product.price} Rs</>
                )}
              </h2>
              <a href='/home' className="buy"> Add to Cart <ShoppingCart /></a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
