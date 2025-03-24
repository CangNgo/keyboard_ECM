import React, { useState, useEffect } from 'react';
import Image from './Image'; // Import component Image

interface Slide {
  id: number;
  imageUrl: string;
  title: string;
}

interface SlideshowProps {
  slides: Slide[];
  interval?: number;
  className?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({ slides, interval = 5000, className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(slideInterval);
  }, [interval, slides.length]);

  return (
    <div className={`relative w-[936px] h-[234px] bg-gray-200 ${className} rounded-t-lg overflow-hidden`}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Thay thế thẻ <img> bằng <Image> */}
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2">
            {slide.title}
          </div>
        </div>
      ))}

      {/* Nút tròn nhỏ ở dưới */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'} focus:outline-none`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
