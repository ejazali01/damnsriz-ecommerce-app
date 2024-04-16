import React from "react";
import { Link } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";

const WomenSubCategory = () => {
  const women = [
    {
      name: "Indian & Fusion Wear",
    },
    {
      name: "Western Wear",
    },
    {
      name: "Footwear",
    },
    {
      name: "Lingerie & Sleepwear",
    },
    {
      name: "Beauty & Personal Care",
    },
  ];

  return (
    <>
      <div>
        <ul>
          {women.map((category, index) => (
            <li
              key={index}
              className="w-full flex justify-between items-center py-2 pl-4 pr-2 hover:bg-purple-300"
            >
              <Link href="#" className="w-full text-gray-600 font-normal">
                {category.name}
              </Link>
              <RiArrowDropRightLine className="text-2xl" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WomenSubCategory;
