import { ClipboardType, File } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const authorizationToken = `Bearer ${token}`;
  const [title, setTitle] = useState("");
  const [carouselimage, setCarouselimage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("carouselimage", carouselimage);

    if (title) {
      formData.append("title", title);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/newcarouselimage",
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
          },
          body: formData, // Use FormData instead of JSON
        }
      );

      const res_data = await response.json();
      console.log(res_data);
      if (response.ok) {
        settitle("");
        setCarouselimage(null);
        alert("Carousel Image Uploaded");
      } else {
        console.log(res_data.msg);
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
        <div className="input">
          <span className="icon">
          <ClipboardType />
          </span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title (Optional)"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <hr style={{marginTop: "2rem"}}/>
    </>
  );
};

export default Dashboard;
