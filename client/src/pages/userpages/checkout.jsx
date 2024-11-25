import { useState } from "react";
import "../../assets/stylesheets/checkout.scss";
import { proofdata } from "../../helpers/forms";
import { useSelector } from "react-redux";

const Checkout = () => {
  const token = useSelector((state) => state.auth.token);
  const totaldiscountedcartamount = useSelector(
    (state) => state.auth.totaldiscountedcartamount
  );
  const authorizationToken = `Bearer ${token}`;
  const [proof, setProof] = useState({
    image: null,
    tId: "",
    total: totaldiscountedcartamount
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "proofpic") {
      setProof({
        ...proof,
        [name]: e.target.files[0],
      });
    } else {
      setProof({
        ...proof,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append each field to the FormData object
    Object.keys(proof).forEach((key) => {
      formData.append(key, proof[key]);
    });

    try {
      const response = await fetch("http://localhost:3000/api/user/checkout", {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData, // Use FormData instead of JSON
      });

      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        alert("Proof Uploaded");
      } else {
        console.log(res_data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h4 className="addproduct-heading">
        Check Out To get proofs at your homepage
      </h4>
      <div className="checkout">
        <div className="box">
          <h5>Steps to Order an Item</h5>
          <ul>
            <li>
              <span>1</span> Pay <strong>20%</strong> Security Fee
            </li>
            <li>
              <span>2</span> Must added Address in Profile
            </li>
            <li>
              <span>3</span> Upload screenshot proof
            </li>
            <li>
              <span>4</span> Enter Transaction Id
            </li>
            <li>
              <span>5</span> Wait for approval
            </li>
            <li>
              <span>6</span> Recieve at provided address
            </li>
            <li>
              <span>7</span> Give Remaining Payment
            </li>
          </ul>
        </div>

        <div className="box">
          <h5>Steps to Order an Item</h5>
          <ul>
            <li> Total Bill: <strong>{totaldiscountedcartamount}</strong></li>
            <li>
              {" "}
              Security Fee (20%): <strong>{(totaldiscountedcartamount * 20) / 100}</strong>
            </li>
            <li> Account Type: <strong>SADAPAY</strong></li>
            <li> Account Number: <strong>0331-83 888 05</strong></li>
            <li> Account Name: <strong>Muhammad Nauman</strong></li>
          </ul>
        </div>
        <div className="auth-section">
          <form onSubmit={handleSubmit}>
            {proofdata.map((data, index) => (
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
            <button type="submit">Upload proof</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
