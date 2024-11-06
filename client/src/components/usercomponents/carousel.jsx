import img from "../../assets/images/logo.jpeg"
import 'react-slideshow-image/dist/styles.css'
import { Zoom } from 'react-slideshow-image';

const carousel = () => {

    const images = [
        img,
        img,
        img,
      ];

  return (

<div className="slide-container">
        <Zoom scale={0.4}>
          {
            images.map((each, index) => <img key={index} style={{width: "100%", height: '80vh'}} src={each} />)
          }
        </Zoom>
      </div>
  )
}

export default carousel