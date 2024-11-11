import { useState } from "react";
import { productdata } from "../../helpers/forms";
import { useSelector} from "react-redux"

const AddProduct = () => {
    const token = useSelector((state)=>state.auth.token);
    const authorizationToken = `Bearer ${token}`
    const [product, setProduct] = useState({
        title: "",
        category: "",
        price: "",
        discountedprice: "",
        image: null,
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // For image input, set the file to the state
        if (name === 'image') {
            setProduct({
                ...product,
                [name]: e.target.files[0] // Set the selected file
            });
        } else {
            setProduct({
                ...product,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        // Append each field to the FormData object
        Object.keys(product).forEach(key => {
            formData.append(key, product[key]);
        });

        try {
            const response = await fetch('http://localhost:3000/api/admin/newproduct', {
                method: 'POST',
                headers:{
                    Authorization: authorizationToken
                },
                body: formData // Use FormData instead of JSON
            });

            const res_data = await response.json();
            console.log(res_data);
            if (response.ok) {
                
                setProduct({
                    title: "",
                    category: "",
                    price: "",
                    discountedprice: "",
                    image: null,
                });
                alert("Product Uploaded");
            } else {
                console.log(res_data.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="addproduct-heading">Add Product</h1>
        <div className="auth-section">
            <form onSubmit={handleSubmit}>
                {productdata.map((data, index) => (
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
                <button type="submit">Add Product</button>
            </form>
            </div>
        </>
    );
};

export default AddProduct;
