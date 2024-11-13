import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../../assets/stylesheets/admincards.scss";

const EditCarousel = () => {
    const token = useSelector((state) => state.auth.token);
    const authorizationToken = `Bearer ${token}`;
    const [images, setImages] = useState([]);

    const getCarousel = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/getcarousel", {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setImages(data.carousel);
            }
        } catch (error) {
            console.log("Error in getting carousel", error);
        }
    };

    const handleDelete = async (imageId) => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/deletecarousel", {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: imageId }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Carousel image deleted successfully!", data);
                getCarousel();  
            } else {
                const errorText = await response.text();
                console.error("Failed to delete image. Status:", response.status, "Response:", errorText);
            }
        } catch (error) {
            console.log("Error in deleting image", error);
        }
    };
    

    useEffect(() => {
        getCarousel();
    }, []);

    return (
        <div className="admin-carousel-images">
            {images.map((each) => (
                <div className="admin-carousel-image" key={each._id}>
                    <img
                        className="carousel-image"
                        src={each.carouselImage}
                        alt={each.title}
                    />
                    <button 
                        type="button" 
                        onClick={() => handleDelete(each._id)}
                    >
                        <Trash2 />DELETE
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EditCarousel;
