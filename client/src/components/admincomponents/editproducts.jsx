import { Trash2 } from 'lucide-react';
import React from 'react'
import { useSelector, useState, useEffect } from 'react-redux';

const editproducts = () => {
    const token = useSelector((state) => state.auth.token);
    const authorizationToken = `Bearer ${token}`;
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


  const handleDelete = (productId) => {

  }

  return (
    <>
    <h1 className="addproduct-heading">Edit Products</h1>
    <div className="cards">
        {products.map((product) => (
          <div className="card" key={product.id}>
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
              <button onClick={handleDelete()} className="buy"> Add to Cart <Trash2 /> </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default editproducts