import React from "react";

const AddCategoriesButton = ({toggleCategories}) => {
  return (
    <>
      {/* modal toggle */}
      <button
        onClick={() => toggleCategories("")}
        id="dropdownActionButton"
        className="inline-flex items-center  gap-2  text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:text-gray-400"
        type="button"
      >
        <span className="sr-only">Add Categories</span>
        Add Categories
        <svg
          className="font-semibold"
          xmlns="http://www.w3.org/2000/svg"
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="gray"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </>
  );
};

export default AddCategoriesButton;
