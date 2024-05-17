import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { IoIosClose } from "react-icons/io";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

const ImagePreview = ({ setIsPreview, images, thumbnail, isPreview }) => {
  return (
    <>
      <div className="bg-white w-full  lg:w-3/4 flex justify-center h-full mt-4 absolute z-10">
        {/* Close button */}
        <div className="absolute inline-block hover:bg-gray-200 border-2 right-0">
          <span
            onClick={() => setIsPreview(false)}
            className="text-4xl md:text-6xl text-gray-400 hover:text-gray-700"
          >
            <IoIosClose />
          </span>
        </div>

        {/* Carousel container */}
        <div className="w-3/4 mt-4 relative ">
          {/* Carousel component */}
          <Carousel
            dynamicHeight={true}
            emulateTouch={true}
            showIndicators={false}
            swipeable={true}
            showStatus={false}
            infiniteLoop={true}
            className="flex flex-col-reverse text-center"
            renderArrowPrev={(clickHandler, hasPrev) => {
              return (
                <div
                  className={`${
                    hasPrev ? "absolute" : "hidden"
                  } top-40 md:top-60 bottom-0 left-0 flex justify-center items-center p-3 opacity-20 md:opacity-80 bg-gray-300 w-12 h-12 hover:opacity-100 cursor-pointer z-20`}
                  onClick={clickHandler}
                >
                  <FaCaretLeft className="w-9 h-9 text-white" />
                </div>
              );
            }}
            renderArrowNext={(clickHandler, hasNext) => {
              return (
                <div
                  className={`${
                    hasNext ? "absolute" : "hidden"
                  } top-40 md:top-60 bottom-0 right-0 flex justify-center items-center p-3 opacity-20 md:opacity-80 bg-gray-300 w-12 h-12 hover:opacity-100 cursor-pointer z-20`}
                  onClick={clickHandler}
                >
                  <FaCaretRight className="w-9 h-9 text-white" />
                </div>
              );
            }}
          >
            {thumbnail && (
              <div>
                <img
                  className="object-contain  w-full max-h-[600px]"
                  src={
                    thumbnail
                      ? URL.createObjectURL(thumbnail)
                      : "../../../../dashboard/create-product/product_default_Image.png"
                  }
                  alt={thumbnail.name}
                />
                <p className="legend flex flex-col">
                  <span>Thumbnail Image</span>
                  {thumbnail.name.split(".")[0]}
                </p>
              </div>
            )}

            {images &&
              images?.map((image, index) => (
                <div key={index} className="">
                  <img
                    className="object-contain  w-full max-h-[600px]"
                    src={URL.createObjectURL(image)}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
