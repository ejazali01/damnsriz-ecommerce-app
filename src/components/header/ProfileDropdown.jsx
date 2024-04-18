import React from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  return (
    <>
      <div className="flex flex-col gap-8 pb-8 border-b">
        <div className=" ">
          <h2 to="" className="font-semibold text-gray-900">
            Welcome
          </h2>
          <h3 to="" className="text-sm text-gray-900">
            To access account and manage orders
          </h3>
        </div>
        <Link
          to="/user/login"
          className="py-2 px-6 border w-full md:w-3/4  text-purple-500 font-bold hover:border-purple-500"
        >
          LOGIN / SIGNUP
        </Link>
      </div>

      <div className="text-sm py-2 border-b">
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        ></Link>
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Order
        </Link>
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Wishlist
        </Link>
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Gift Cards
        </Link>

        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Contact Us
        </Link>
      </div>

      <div className="text-sm py-2">
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Coupon
        </Link>
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Saved Cards
        </Link>
        <Link
          to=""
          className="block py-1 hover:font-semibold hover:text-gray-900"
        >
          Saved Address
        </Link>
      </div>
    </>
  );
};

export default ProfileDropdown;
