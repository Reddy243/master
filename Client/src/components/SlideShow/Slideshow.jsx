import './Slideshow.css';
import { useState } from 'react';
import Mountain from '../../assets/Mountain.png';
import village from '../../assets/village.png';
import temple from '../../assets/temple.png';

function Slideshow() {
    const [slideIndex, setSlideIndex] = useState(1);

    // Next/previous controls
    const plusSlides = (n) => {
        setSlideIndex((prevIndex) => {
            let newIndex = prevIndex + n;
            if (newIndex > 3) newIndex = 1;
            if (newIndex < 1) newIndex = 3;
            return newIndex;
        });
    };

    // Thumbnail image controls
    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    return (
        <>
            <h4 id="slideShowHeading">Our Sample Prints:</h4>
            <div className="slideShow">
                {/* Full-width images with number and caption text */}
                {[Mountain, village, temple].map((image, index) => (
                    <div key={index} className={`mySlides fade ${slideIndex === index + 1 ? 'active' : ''}`}>
                        <div className="numbertext">{index + 1} / 3</div>
                        <img src={image} style={{ width: '100%', height: '100%' }} alt={`Slide ${index + 1}`} />
                        <div className="text">Caption {index + 1}</div>
                    </div>
                ))}

                {/* Next and previous buttons */}
                <a className="prev" onClick={() => plusSlides(-1)}>
                    &#10094;
                </a>
                <a className="next" onClick={() => plusSlides(1)}>
                    &#10095;
                </a>

                {/* The dots/circles */}
                <div className="dots-container">
                    {[1, 2, 3].map((dotIndex) => (
                        <span
                            key={dotIndex}
                            className={`dot ${slideIndex === dotIndex ? 'active' : ''}`}
                            onClick={() => currentSlide(dotIndex)}
                        ></span>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Slideshow;
