import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { LuTags } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineGift } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { drawerClose, drawerOpen } from "../../redux/reducers/layoutSlice";
import { MdOutlineCategory } from "react-icons/md";




const AdminSidebar = () => {
  const theme = useTheme();
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  const dispatch = useDispatch();
  const open = useSelector((state) => state?.dashboardLayout?.open);

  const handleTooltipOpen = (text) => {
    setTooltip(text);
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "block";
    }
  };

  const handleTooltipClose = (text) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = "none";
    }
  };

  const handleDrawerOpen = () => {
    dispatch(drawerOpen());
  };

  const handleDrawerClose = () => {
    dispatch(drawerClose());
  };

  return (
    <div className={` z-30 shadow-md flex bg-white h-screen rounded-lg `}>
      <div className="">
        {/*------------------------------------------------------------------/
        /--------------------Drawer  header ---------------------------- /
        /------------------------------------------------------------------*/}
        <div className="flex p-2 w-full ">
          <div className="flex justify-center items-center">
            {open && (
              <div className="font-semibold text-md text-center overflow-hidden  mr-10 ">
                Welcome Admin
              </div>
            )}
          </div>
          {/*  */}
          {open && theme.direction ? (
            <IconButton onClick={handleDrawerClose}>
              <img
                className="w-6 h-6 rounded-full"
                src="../../../dashboard/fast-backward.gif"
                alt="fast-backward"
              />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <img
                className="w-6 h-6 rounded-full"
                src="../../../dashboard/fast-forward.gif"
                alt="fast-forward"
              />
            </IconButton>
          )}
        </div>
        <Divider />

        {/*------------------------------------------------------------------/
        /-------------------- Dashboard List ---------------------------- /
        /------------------------------------------------------------------*/}
        <div className=" w-full py-4">
          <div
            onMouseEnter={() => handleTooltipOpen("dashboard")}
            onMouseLeave={() => handleTooltipClose("dashboard")}
            className="flex relative w-full "
          >
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center w-full gap-6 hover:scale-105  transition-all duration-300  rounded cursor-pointer m-1 text-gray-900"
                        : ` bg-gray-300  flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1  `
                    }`
                  : " hover:text-gray-900  transition-all duration-300 hover:bg-gray-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <RxDashboard className={`text-xl m-3 hover:scale-105 `} />
              {open && <span>Dashboard</span>}
            </NavLink>

            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "dashboard" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Dashboard
              </div>
            )}
          </div>

          {/* All Users */}
          <div
            onMouseEnter={() => handleTooltipOpen("allUsers")}
            onMouseLeave={() => handleTooltipClose("allUsers")}
            className="flex relative w-full "
          >
            <NavLink
              to="all-users"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <FaUsers className="text-xl m-3 hover:scale-105 " />
              {open && <span>All Users</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "allUsers" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                All Users
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleTooltipOpen("allOrders")}
            onMouseLeave={() => handleTooltipClose("allOrders")}
            className="flex relative w-full "
          >
            <NavLink
              to="all-orders"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <FiShoppingBag className="text-xl m-3 hover:scale-105 " />
              {open && <span>All Orders</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "allOrders" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                All Orders
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleTooltipOpen("allProducts")}
            onMouseLeave={() => handleTooltipClose("allProducts")}
            className="flex relative w-full "
          >
            <NavLink
              to="all-products"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <MdOutlineInventory2 className="text-xl m-3 hover:scale-105 " />
              {open && <span>All Products</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "allProducts" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                All Products
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleTooltipOpen("createProduct")}
            onMouseLeave={() => handleTooltipClose("createProduct")}
            className="flex relative w-full "
          >
            <NavLink
              to="create-product"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300 flex items-center  w-full gap-6 hover:scale-105  transition-all duration-300 rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900 hover:bg-gray-300 flex items-center  w-full gap-6  transition-all duration-300 rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <MdOutlineCreateNewFolder className="text-xl m-3 hover:scale-105 " />
              {open && <span>Create Product</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "createProduct" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Create Product
              </div>
            )}
          </div>

          {/* All categories */}
          <div
            onMouseEnter={() => handleTooltipOpen("allCategories")}
            onMouseLeave={() => handleTooltipClose("allCategories")}
            className="flex relative w-full "
          >
            <NavLink
              to="all-categories"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <MdOutlineCategory className="text-xl m-3 hover:scale-105 " />
              {open && <span>All Categories</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "allCategories" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                All Categories
              </div>
            )}
          </div>

          {/* all events */}
          <div
            onMouseEnter={() => handleTooltipOpen("allEvents")}
            onMouseLeave={() => handleTooltipClose("allEvents")}
            className="flex relative w-full "
          >
            <NavLink
              to="all-events"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <LuTags className="text-xl m-3 hover:scale-105 " />
              {open && <span>All Events</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "allEvents" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                All Events
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleTooltipOpen("createEvents")}
            onMouseLeave={() => handleTooltipClose("createEvents")}
            className="flex relative w-full "
          >
            <NavLink
              to="create-event"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <AiOutlineFileAdd className="text-xl m-3 hover:scale-105 " />
              {open && <span>Create Event</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "createEvents" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Create Events
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleTooltipOpen("discountCodes")}
            onMouseLeave={() => handleTooltipClose("discountCodes")}
            className="flex relative w-full "
          >
            <NavLink
              to="discount-codes"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <AiOutlineGift className="text-xl m-3 hover:scale-105 " />
              {open && <span>Discount Codes</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "discountCodes" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Discount Codes
              </div>
            )}
          </div>
        </div>

        <Divider />
        {/* payment */}
        <div className="">
          <div
            onMouseEnter={() => handleTooltipOpen("withdrawMoney")}
            onMouseLeave={() => handleTooltipClose("withdrawMoney")}
            className="flex relative w-full "
          >
            <NavLink
              to="withdraw-money"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  transition-all duration-300 flex items-center w-full gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  transition-all duration-300 hover:bg-gray-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <CiMoneyBill className="text-xl m-3 hover:scale-105 " />
              {open && <span className="">Withdraw Money</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "withdrawMoney" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Withdraw Money
              </div>
            )}
          </div>

          <div
            onMouseEnter={() => handleTooltipOpen("refunds")}
            onMouseLeave={() => handleTooltipClose("refunds")}
            className="flex relative w-full "
          >
            <NavLink
              to="refunds"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  transition-all duration-300 hover:bg-gray-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <HiOutlineReceiptRefund className="text-xl m-3 hover:scale-105 " />
              {open && <span>Refunds</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "refunds" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Refunds
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* settings */}

        <div className="">
          <div
            onMouseEnter={() => handleTooltipOpen("settings")}
            onMouseLeave={() => handleTooltipClose("settings")}
            className="flex relative w-full "
          >
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive
                  ? `${
                      open
                        ? "bg-gray-300  flex items-center  w-full  transition-all duration-300 gap-6 hover:scale-105  rounded cursor-pointer m-1 text-gray-900"
                        : "bg-gray-300 flex items-center  w-full text-purple-700 gap-6 hover:scale-105  rounded cursor-pointer m-1 "
                    }`
                  : "hover:text-gray-900  hover:bg-gray-300  transition-all duration-300 flex items-center  w-full gap-6  rounded cursor-pointer m-1 text-gray-500"
              }
            >
              <IoSettingsOutline className="text-xl m-3 hover:scale-105 " />
              {open && <span>Settings</span>}
            </NavLink>
            {/* <!-- Tooltip Container (Initially Hidden) --> */}
            {tooltip === "settings" && (
              <div
                ref={tooltipRef}
                className="absolute z-30  bg-gray-300 w-32 text-center -right-16 top-4  text-black text-xs rounded p-1  transform translate-x-1/2  opacity-96 transition-opacity duration-500 "
              >
                Settings
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
