import 'react-slideshow-image/dist/styles.css';
import { Zoom } from 'react-slideshow-image';
import { useEffect, useState } from "react";

const Carousel = () => {
  const [images, setImages] = useState([]); 

  const getCarousel = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/getcarousel", {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        setImages(data.carousel);
      }
    } catch (error) {
      console.log("Error in getting carousel");
    }
  };

  useEffect(() => {
    getCarousel();
  }, []);

  return (
    <div className="slide-container">
      <Zoom scale={0.4}>
        {
          images.map((each) => (
            <img
              key={each._id} 
              className='carousel-image'
              src={each.carouselImage}
              alt={each.title}
            />
          ))
        }
      </Zoom>
    </div>
  );
};

export default Carousel;
