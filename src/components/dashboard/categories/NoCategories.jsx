import React from "react";
import AddCategoriesButton from "./AddCategoriesButton";
import { MdOutlineCategory } from "react-icons/md";

const NoCategories = ({ toggleCategories }) => {
  return (
    <>
      <div className="bg-gray-200 w-full min-h-[72vh] flex justify-center items-center rounded-md">
        <div className="relative w-full flex flex-col justify-center items-center  ">
          <MdOutlineCategory className="text-gray-400 absolute w-full text-8xl h-56 opacity-20  bg-white opacity font-black" />

          <h1 className="text-gray-400 font-bold text-4xl lg:p-3 p-2">
            No Categories
          </h1>
          <h3 className="text-gray-500 py-1 text-sm">Click to add  new categories</h3>
          <div className="z-10">
            <AddCategoriesButton toggleCategories={toggleCategories} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoCategories;
