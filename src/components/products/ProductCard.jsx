import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import slugify from "slugify";
import { FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [ishover, setIsHover] = useState(null);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(null);
  };

  // word count for product title
  const wordCount = (str, count) => {
    const trimmedStr = str.trim();
    const words = trimmedStr.split(/\s+/);
    const selectedWords = words.slice(0, count);
    const result = selectedWords.join(" ");

    return `${result}...`;
  };
  return (
    <>
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative"
      >
        {ishover ? (
          <div className="relative shadow-md top-0 left-0">
            <div
              className="border md:border-none  "
              //  className="w-1/2  lg:w-[19%] md:w-1/2 border  md:m-1 md:my-2 p-2 "
            >
              <Link
                to={`${slugify(product.title, { trim: true, lower: true })}-${
                  product.id
                }`}
                className=" "
              >
                <ProductCarousel product={product} />
              </Link>

              <div className="absolute  w-full  -bottom-24 p-2 -mt-4 ">
                <Link to="" className="flex justify-center items-center focus:border-purple-500 hover:border-purple-500 gap-3 text-gray-900 text-sm border py-1 px-3 rounded-sm  font-normal tracking-widest title-font mb-1">
                  <FaRegHeart className="text-md font-semibold" />
                  <span className="">Wishlist</span>
                </Link>
                <h2 className="text-black title-font text-sm font-normal ">
                  {wordCount(product.title, 5)}
                </h2>
                <p className="mt-1 font-semibold">{`$${product.price}`}</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`border md:border-none   `}
            //  className="w-1/2  lg:w-[19%] md:w-1/2 border  md:m-1 md:my-2 p-2 "
          >
            <Link
              to={`${slugify(product.title, { trim: true, lower: true })}-${
                product.id
              }`}
              className=" "
            >
              <div className="h-72 bg-gray-100">
                <img
                  alt={product.title}
                  className="object-contain object-top  h-full block "
                  src={product.thumbnail}
                />
              </div>
            </Link>
            <div className="p-2 ">
              <h3 className="text-gray-900 text-xs font-semibold tracking-widest title-font mb-1">
                {product.brand.toUpperCase()}
              </h3>
              <h2 className="text-black title-font text-sm font-normal ">
                {wordCount(product.title, 5)}
              </h2>
              <p className="mt-1 font-semibold">{`$${product.price}`}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
