import React from "react";
import { Link } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";

const MenSubCategory = () => {
  const men = [
    {
      name: "Topwear",
    },
    {
      name: "Indian & Festive Wear",
    },
    {
      name: "Bottomwear",
    },
    {
      name: "Innerwear & Sleepwear",
    },
    {
      name: "Footwear",
    },
  ];

  return (
    <>
      <div>
        <ul>
          {men.map((category, index) => (
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

export default MenSubCategory;
