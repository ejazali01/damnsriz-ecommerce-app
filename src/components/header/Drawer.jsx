import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";

const Drawer = ({ isDrawerOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {

  }

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed inset-y-0 min-h-screen left-0 w-full bg-transparent   shadow-lg transform overflow-auto  transition-transform ease-in-out duration-500 
        ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer Content */}
        <div className="  bg-white shadow-2xl w-64 h-screen text-left ">
        <div>
            <img src="../../../public/drawer/drawer_image.webp" alt="drawer_image" />
        </div>

          <ul className="text-sm font-semibold text-gray-600 border-b py-6">
            <li className="flex justify-between items-center p-2  hover:bg-gray-200">
              <Link href="#" className="">
                MEN
              </Link>
              <RiArrowDropDownLine className="text-2xl" />
            </li>
            <li className="flex justify-between items-center p-2 hover:bg-gray-200">
              <Link href="#" className=" ">
                WOMEN
              </Link>
              <RiArrowDropDownLine className="text-2xl" />
            </li>
            <li
            onClick={handleDropdown} 
            className="flex justify-between items-center p-2 hover:bg-gray-200 ">
              <Link href="#" className="">
                KIDS
              </Link>
              <RiArrowDropDownLine className="text-2xl" />
            </li>
            <li 
            onClick={handleDropdown}
            className=" flex justify-between items-center p-2 hover:bg-gray-200">
              <Link href="#" className="">
                BEAUTY
              </Link>
              <RiArrowDropDownLine className="text-2xl" />
            </li>
          </ul>

          <div>
            <ul className="text-sm py-6 ">
                <li className="p-2 hover:text-gray-800">
                    <Link href="#" className="">Contact Us</Link>
                </li>

                <li className="p-2 hover:text-gray-800">
                    <Link href="#" className="">FAQs</Link>
                </li>

                <li className="p-2 hover:text-gray-800 ">
                    <Link href="#" className="">Leagals</Link>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
