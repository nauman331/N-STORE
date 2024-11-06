import React, { useEffect, useState } from 'react';
import Carousel from './carousel';
import "../../assets/stylesheets/products.scss";

const Home = () => {
  const [products, setProducts] = useState([]); // Set initial state as an empty array

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
      <div className="cards">
        {products.map((product) => (
          <div className="card" key={product.id}>
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
              <a href="#" className="buy">Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
