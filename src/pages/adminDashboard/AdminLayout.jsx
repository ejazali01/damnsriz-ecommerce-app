import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./dashboardHeader/AdminNavbar";
import { useSelector } from "react-redux";
// import AdminFooter from "./dashboardFooter/AdminFooter";

const AdminLayout = () => {
  const drawer = useSelector((state) => state?.dashboardLayout?.open);
  return (
    <>
      <div className=" w-full flex  ">
        <div
          className={`${
            drawer ? "w-72  " : " w-16 "
          } transition-all ease-in-out duration-300 transform  fixed z-30 left-0 top-0  bg-[#f4f2ee] `}
        >
          <AdminSidebar />
        </div>

        <div className="w-full min-h-screen bg-[#f4f2ee] pl-16 lg:pl-0 ">
          <div className="">
            <AdminNavbar />
          </div>

          <div className="mt-20 xl:max-w-screen-lg lg:max-w-screen-lg 2xl:max-w-screen-xl m-auto">
            <Outlet />
          </div>
        </div>

        {/* <AdminFooter /> */}
      </div>
    </>
  );
};

export default AdminLayout;
