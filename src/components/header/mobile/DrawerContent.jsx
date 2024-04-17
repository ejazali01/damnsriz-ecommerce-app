import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import MenSubCategory from "../mobile/subCategory/MenSubCategory";
import WomenSubCategory from "../mobile/subCategory/MenSubCategory";
import KidsSubCategory from "../mobile/subCategory/MenSubCategory";
import BeautySubCategory from "../mobile/subCategory/MenSubCategory";

const DrawerContent = ({ drawerRef }) => {
    const [open , setOpen] =  useState(null)

    const handleDropdown = (category) => {
        setOpen((prev) => (prev === category ? null : category));
    }

  return (
    <>
      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className="fixed z-30 top-0 left-0 h-screen w-3/4 bg-white shadow-lg transform transition-transform translate-x-0  ease-out duration-700"
      >
        <div>
          <img
            src="../../../../drawer/drawer_image.webp"
            alt="drawer_image"
          />
        </div>

        <ul className="text-sm font-semibold text-gray-600 border-b py-6">
          <li
            onClick={() => handleDropdown("MEN")}
            className="w-full flex justify-between items-center p-2  hover:bg-purple-300"
          >
            <Link href="#" className="w-full">
              MEN
            </Link>
            <RiArrowDropRightLine
              className={` ${open === "MEN" ? "hidden" : "text-2xl"}`}
            />
            <RiArrowDropDownLine
              className={` ${open === "MEN" ? "text-2xl" : "hidden"}`}
            />
          </li>
          {open === "MEN" && <MenSubCategory />}

          <li
            onClick={() => handleDropdown("WOMEN")}
            className="w-full flex justify-between items-center p-2 hover:bg-purple-300"
          >
            <Link href="#" className="w-full ">
              WOMEN
            </Link>
            <RiArrowDropRightLine
              className={` ${open === "WOMEN" ? "hidden" : "text-2xl"}`}
            />
            <RiArrowDropDownLine
              className={` ${open === "WOMEN" ? "text-2xl" : "hidden"}`}
            />
          </li>
          {open === "WOMEN" && <WomenSubCategory />}

          <li
            onClick={() => handleDropdown("KIDS")}
            className="w-full flex justify-between items-center p-2 hover:bg-purple-300 "
          >
            <Link href="#" className="w-full">
              KIDS
            </Link>
            <RiArrowDropRightLine
              className={` ${open === "KIDS" ? "hidden" : "text-2xl"}`}
            />
            <RiArrowDropDownLine
              className={` ${open === "KIDS" ? "text-2xl" : "hidden"}`}
            />
          </li>
          {open === "KIDS" && <KidsSubCategory />}

          <li
            onClick={() => handleDropdown("BEAUTY")}
            className="w-full flex justify-between items-center p-2 hover:bg-purple-300"
          >
            <Link href="#" className="w-full">
              BEAUTY
            </Link>
            <RiArrowDropRightLine
              className={` ${open === "BEAUTY" ? "hidden" : "text-2xl"}`}
            />
            <RiArrowDropDownLine
              className={` ${open === "BEAUTY" ? "text-2xl" : "hidden"}`}
            />
          </li>

          {open === "BEAUTY" && <BeautySubCategory />}
        </ul>

        <div>
          <ul className="text-sm py-6 ">
            <li className="p-2 hover:text-gray-800">
              <Link href="#" className="">
                Contact Us
              </Link>
            </li>

            <li className="p-2 hover:text-gray-800">
              <Link href="#" className="">
                FAQs
              </Link>
            </li>

            <li className="p-2 hover:text-gray-800 ">
              <Link href="#" className="">
                Leagals
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawerContent;
