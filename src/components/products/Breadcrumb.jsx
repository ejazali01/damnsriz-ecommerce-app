import React from "react";
import { NavLink } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <>
      <nav className="container hidden  p-4" aria-label="Breadcrumb">
        <ol className="flex space-x-2 text-gray-500 text-sm">
          <li className="">
            <NavLink
              to="/"
              className={`${(isActive) => isActive ? "text-gray-500" : "" } text-black hover:text-gray-500 text-xs `}
            >
              Home
            </NavLink>
          </li>
          <li>/</li>
          <li className="">
            <NavLink
             to=""
             className={`${(isActive) => isActive ? "text-green-500" : "" } text-black hover:text-gray-500 text-xs`}
            >
              Products
            </NavLink>
          </li>
          <li>/</li>
          <li>
            <NavLink
             to=""
              className={`${(isActive) => isActive ? "text-gray-500" : "" } text-black hover:text-gray-500 text-xs`}
            >
              Category
            </NavLink>
          </li>
          <li>/</li>
          <li>
            <NavLink
              href="#"
              className={`${(isActive) => isActive ? "text-gray-500" : "" } text-black hover:text-gray-500 text-xs`}
            >
              Subcategory
            </NavLink>
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
