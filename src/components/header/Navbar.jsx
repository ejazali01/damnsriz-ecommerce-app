import React, { useState, useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import ProductDropdown from "./ProductDropdown";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";
import { FaBarsStaggered } from "react-icons/fa6";
import Drawer from "./Drawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [isOpenProfile, setIsOpenProfile] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to handle mouse enter event
  const handleMouseEnter = (menu, profile) => {
    // console.log( menu,profile)
    if (menu) {
      setIsOpen(menu);
    } else {
      setIsOpenProfile(profile);
    }
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setIsOpen(null);
    setIsOpenProfile(null);
  };

  // mobile schreen
  // handle dialog

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log('toggle');
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full flex z-50 bg-[#ffff] text-gray-600 body-font  shadow-sm">
        {/* Brand logo */}
        <div className="flex items-center md:px-2 w-full  md:w-2/12 ">
        <button
            onClick={handleDrawer}
            className="md:hidden bg-purple-500 w-16  h-14  px-2  text-xl  cursor-pointer"
            // className="flex overflow-auto transition-all ease-in-out duration-300"
            // onClick={() => setIsDrawerOpen(false)}
          >
            <Drawer isDrawerOpen={isDrawerOpen} />
            <FaBarsStaggered
            onClick={() => setIsDrawerOpen(false)}
            // onClick={handleDrawer}
            className="md:hidden  text-white  text-2xl hover:scale-95 cursor-pointer"
            />
          </button>

          <NavLink
            to="/"
            className="w-full flex p-2 lg:p-0 justify-center lg:justify-start title-font font-medium items-center text-gray-900  md:mb-0"
          >
            <span className="ml-3 text-xl">Damnsruz</span>
          </NavLink>
        </div>

          {/* ----------------------------******both*****--------------------------------------- */}
        <div className=" container mx-auto  md:flex flex-wrap  flex-col md:flex-row  items-center">

          {/* pages */}
          <div className="relative md:w-2/3 hidden  md:flex flex-wrap  flex-col md:flex-row items-center">
            <nav className="md:mr-auto md:ml-4  md:pl-4 md:border-l md:border-gray-400	flex gap-2 flex-wrap items-center text-base justify-center">
              <NavLink
                onMouseEnter={() => handleMouseEnter("MEN")}
                onMouseLeave={handleMouseLeave}
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 hover:text-gray-900 font-semibold p-4"
                    : `relative   hover:text-gray-900 font-semibold p-4 hov `
                }
              >
                {isOpen === "MEN" && (
                  <span
                    className={`absolute  w-full h-1 bottom-0 left-1 bg-purple-500`}
                  ></span>
                )}
                MEN
              </NavLink>

              <NavLink
                onMouseEnter={() => handleMouseEnter("WOMEN")}
                onMouseLeave={handleMouseLeave}
                to="/about-us"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500  hover:text-gray-900 font-semibold p-4"
                    : `relative  hover:text-gray-900 font-semibold p-4`
                }
              >
                {isOpen === "WOMEN" && (
                  <span
                    className={`absolute  w-full h-1 bottom-0 left-1 bg-pink-500 `}
                  ></span>
                )}
                WOMEN
              </NavLink>

              <NavLink
                onMouseEnter={() => handleMouseEnter("KIDS")}
                onMouseLeave={handleMouseLeave}
                to="/kids"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 hover:text-gray-900 font-semibold p-4"
                    : `relative   hover:text-gray-900 font-semibold p-4 hov `
                }
              >
                {isOpen === "KIDS" && (
                  <span
                    className={`absolute  w-full h-1 bottom-0 left-1 bg-orange-500`}
                  ></span>
                )}
                KIDS
              </NavLink>

              <NavLink
                onMouseEnter={() => handleMouseEnter("BEAUTY")}
                onMouseLeave={handleMouseLeave}
                to="/beauty"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-500  hover:text-gray-900 font-semibold p-4"
                    : `relative  hover:text-gray-900 font-semibold p-4`
                }
              >
                {isOpen === "BEAUTY" && (
                  <span
                    className={`absolute  w-full h-1 bottom-0 left-1 bg-sky-500 `}
                  ></span>
                )}
                BEAUTY
              </NavLink>
            </nav>

            {/* searchbar */}

            <div className=" lg:w-[450px] ">
              <SearchBar />
            </div>

            {isOpen && (
              <div
                onMouseEnter={() => handleMouseEnter(isOpen)} // Keep dropdown open when mouse enters the dropdown itself
                onMouseLeave={handleMouseLeave}
                className="bg-white border flex shadow-sm border-gray-200 px-4  absolute top-[55px] left-0 w-full z-10"
              >
                <ProductDropdown isOpen={isOpen} />
              </div>
            )}
          </div>

          {/* ----------------------------***********--------------------------------------- */}

          {/* cart wishlist & authentication */}
          <div className="relative flex items-center md:pl-20 gap-2 font-semibold">
            <NavLink
              onMouseEnter={() => handleMouseEnter(null, "PROFILE")}
              onMouseLeave={handleMouseLeave}
              to="/user-profile"
              className="mr-5 p-2 flex flex-col justify-center items-center hover:text-gray-900 font-semibold"
            >
              <FaRegUser className="text-xl font-semibold" />
              <span className="font-normal text-xs">Profile</span>
              {isOpenProfile === "PROFILE" && (
                <span
                  className={`absolute  w-1/4 h-1 bottom-0 left-18 bg-purple-500 `}
                ></span>
              )}
            </NavLink>

            <NavLink
              to="/wishlist"
              className="mr-5 p-2 flex flex-col justify-center items-center hover:text-gray-900 "
            >
              <FaRegHeart className="text-xl font-semibold" />
              <span className="font-normal text-xs">Wishlist</span>
            </NavLink>

            <NavLink
              to="/cart"
              className="mr-5 p-2 flex flex-col justify-center items-center hover:text-gray-900 font-semibold"
            >
              <IoBagOutline className="text-xl font-extrabold text-purple-600" />
              <span className="font-normal text-xs">Cart</span>
            </NavLink>

            {isOpenProfile && (
              <div
                onMouseEnter={() => handleMouseEnter(null, isOpenProfile)} // Keep dropdown open when mouse enters the dropdown itself
                onMouseLeave={handleMouseLeave}
                className="bg-white font-normal shadow-md border text-gray-500 border-gray-200 p-4 absolute top-[52px] lg:-left-0 w-full z-10"
              >
                {isOpenProfile === "PROFILE" && <ProfileDropdown />}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
