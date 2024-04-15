import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductCarousel = ({ product }) => {
  return (
    <>
      <Carousel  
      autoPlay={true} 
      showThumbs={false}
      autoFocus={true}
      showArrows={false}
      showStatus={false}
      stopOnHover={false}
      infiniteLoop={true}
      transitionTime={150}
      >
        {product?.images.map((image, index) => (
          <div key={index} className="h-72 bg-gray-100" >
            <img
              alt="ecommerce"
              className="object-contain object-top max-w-lg h-full block "
              src={image}
            />
            {/* <p className="legend">Legend 1</p> */}
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
