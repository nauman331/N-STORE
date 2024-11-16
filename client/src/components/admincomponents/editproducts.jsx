import { Pencil, Trash2 } from 'lucide-react';
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { showPopup } from 'react-popupify'
import CustomPopup from './customPopup';


const editproducts = () => {
    const token = useSelector((state) => state.auth.token);
    const authorizationToken = `Bearer ${token}`;
    const [products, setProducts] = useState([]); 
    const popup = () => showPopup('customPopupId', { open: true })

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


  const handleDelete = async (productId) => {
try {
  if (!window.confirm("Are you sure you want to delete this product?")) {
    return;
  }
  const response = await fetch("http://localhost:3000/api/admin/deleteproduct", {
    method: "DELETE",
    headers: {
      Authorization: authorizationToken,
      "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: productId }),
  })
  if (response.ok) {
    const data = await response.json();
    console.log("Product deleted successfully!", data);
    getAllProducts();  
  }
} catch (error) {
  console.log(error)
}
  }



  return (
    <>
    <h1 className="addproduct-heading">Edit Products</h1>
    <CustomPopup>
      
    </CustomPopup>
    <div className="product-cards">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="edit">
            {
              product.discountedprice ? <h5>Save {product.price - product.discountedprice} Rs</h5> : ""
            }
            <span className='edit-icon' onClick={popup}>
            <Pencil />
            </span>
         
            </div>
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
              <button onClick={() => handleDelete(product._id)} className="buy"> DELETE ITEM <Trash2 /> </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default editproducts