import { useState } from "react";
import { Link } from "react-router-dom";

const TripPost = ({ id, title, description, images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
      {/* Trip Details Section */}
      <div className="mb-6">
        <Link to={`/user/trip/${id}`}>
          <h3 className="text-2xl font-semibold text-[#05A8AA] hover:text-[#DC602E] transition-colors duration-200 cursor-pointer">
            {title}
          </h3>
        </Link>
        <div className="h-1 bg-gray-300 w-10 my-2"></div>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Responsive Slideshow Section */}
      <div className="relative w-full overflow-hidden rounded-lg">
        {images.length > 0 && (
          <img
            src={`${import.meta.env.VITE_EXPRESS_SERVER_URL}${
              images[currentIndex]
            }`}
            alt={`Trip Image ${currentIndex + 1}`}
            className="w-full h-auto object-contain transition-opacity duration-700 ease-in-out"
          />
        )}

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 text-gray-700 font-bold px-3 py-2 rounded-full shadow-md"
              onClick={prevSlide}
            >
              &#10094;
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-80 text-gray-700 font-bold px-3 py-2 rounded-full shadow-md"
              onClick={nextSlide}
            >
              &#10095;
            </button>
          </>
        )}

        {/* Image Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-white"
              } cursor-pointer`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        <button className="bg-blue-600 text-white py-2 px-6 text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
          Comment
        </button>
        <button className="bg-green-500 text-white py-2 px-6 text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">
          Like
        </button>
        <button className="bg-yellow-500 text-white py-2 px-6 text-sm font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300">
          Rate
        </button>
      </div>
    </div>
  );
};

export default TripPost;
