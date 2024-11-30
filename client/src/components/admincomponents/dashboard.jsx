import { File } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Editcarousel from "./editcarousel";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const authorizationToken = `Bearer ${token}`;
  const [carouselimage, setCarouselimage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("carouselimage", carouselimage);

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/newcarouselimage",
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
          },
          body: formData,
        }
      );

      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        setCarouselimage(null);
        alert("Carousel Image Uploaded");
      } else {
        console.log(res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  

  return (
    <>
    <h1 className="addproduct-heading">Add Carousel Images</h1>
    <div className="auth-section">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <span className="icon">
            <File />
            </span>
          <input
            type="file"
            name="carouselimage"
            onChange={(e) => setCarouselimage(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <hr style={{marginTop: "2rem"}}/>
    <h1 className="addproduct-heading">Edit Carousel Images</h1>
    <Editcarousel />
    </>
  );
};

export default Dashboard;
