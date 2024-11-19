import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { showPopup } from "react-popupify";
import CustomPopup from "./CustomPopup";
import { productdata } from "../../helpers/forms";

const EditProducts = () => {
  const token = useSelector((state) => state.auth.token);
  const authorizationToken = `Bearer ${token}`;
  const [getproducts, setGetproducts] = useState([]);
  const [id, setId] = useState("");
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    discountedprice: "",
    stock: "",
  });

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
        setGetproducts(data.products);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/deleteproduct",
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        }
      );
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        getAllProducts();
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the product and id for debugging
    console.log("Product to update:", product);
    console.log("Product ID before submitting:", id);

    if (!id) {
      alert("Product ID is missing. Please try again.");
      return;
    }

    // Prepare the payload
    const payload = {
      id, // Product ID
      ...product, // Other fields
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/updateproduct",
        {
          method: "PUT",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json", // Send JSON
          },
          body: JSON.stringify(payload),
        }
      );

      const res_data = await response.json();
      console.log("Response from server:", res_data);

      if (response.ok) {
        setProduct({
          title: "",
          category: "",
          price: "",
          discountedprice: "",
          stock: "",
        });
        alert("Product Updated Successfully");
        getAllProducts(); // Refresh product list
      } else {
        alert(res_data.msg || "Failed to update product");
        console.log("Error:", res_data.msg);
      }
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <>
      <h1 className="addproduct-heading">Edit Products</h1>
      <CustomPopup>
        <h5 className="addproduct-heading">
          Fill the Fields which you want to update
        </h5>
        <div className="auth-section">
          <form onSubmit={handleSubmit}>
            {productdata.map(
              (data, index) =>
                data.name !== "productimage" && (
                  <div className="input" key={index}>
                    <span className="icon">{data.icon}</span>
                    <input
                      type={data.type}
                      name={data.name}
                      placeholder={data.placeholder}
                      onChange={handleInput}
                    />
                  </div>
                )
            )}
            <button type="submit">Update Product</button>
          </form>
        </div>
      </CustomPopup>
      <div className="product-cards">
        {getproducts.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="edit">
              {product.discountedprice && (
                <h5>Save {product.price - product.discountedprice} Rs</h5>
              )}
              <span className="edit-icon">
                <Pencil onClick={() => popup(product._id)} />
              </span>
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
              <button onClick={() => handleDelete(product._id)} className="buy">
                DELETE ITEM
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EditProducts;
