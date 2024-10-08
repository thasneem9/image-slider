import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './style.css';

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${url}?page=${page}&limit=${limit}`);
                const data = await res.json();
                if (data) {
                    setImages(data);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [url, page, limit]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="slider-container">
            {loading && <h1>Loading...</h1>}
            {!loading && images.length > 0 && (
                <div className="slider">
                    <button onClick={handlePrev} className="slider-button">
                        <BsArrowLeftCircleFill size={30} />
                    </button>
                    <div className="image-container">
                        <img
                            src={images[currentIndex]?.download_url}
                            alt={`Slide ${currentIndex + 1}`}
                            className="slider-image"
                        />
                    </div>
                    <button onClick={handleNext} className="slider-button">
                        <BsArrowRightCircleFill size={30} />
                    </button>
                </div>
            )}
            <div className="indicator-container">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator-dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
            {!loading && images.length === 0 && <h2>No images found.</h2>}
        </div>
    );
};

export default ImageSlider;
