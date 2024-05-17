import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { LoaderIcon } from "react-hot-toast";
// import useLogoutMutation from "../auth/Logout";
import { useMutation } from "react-query";
import { logoutUser } from "../../api/auth/user";
import {  signoutSucess } from "../../redux/reducers/user/userSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  // use selector to fetch logged in user details from redux store
  const user = useSelector((state) => state?.users?.currentUser);
  // console.log()
  const navigate = useNavigate();

  // logout user functionality using react-query

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,

    onSuccess: (data) => {
      navigate("/");
      toast.success(data?.message);
      dispatch(signoutSucess());
    },
    onError: (error) => {
      toast.error(error?.response?.statusText);
    },
  });

  // const mutation = useLogoutMutation();

  const handleLogout = async () => {

      await mutation.mutateAsync();
   
  };

  return (
    <>
      {user ? (
        <div className="border-b py-2 ">
          <Link to="/my/profile">
            <div className=" py-2 ">
              <h1 className="text-md font-semibold text-gray-700">{`Helllo ${user.fullName}`}</h1>
              <h2 className="text-sm text-gray-600">{user.email}</h2>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/dashboard"
            className="block py-1 hover:font-semibold hover:underline underline-offset-4 hover:text-gray-900"
          >
            Dashboard
          </Link>
        </div>
      ) : (
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
      )}

      <div className="text-sm py-2 border-b">
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

      <div className="text-sm py-2 ">
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

      {user && (
        <div className="text-sm py-2 border-t ">
          <Link
            to=""
            className="block py-1 hover:font-semibold hover:text-gray-900"
          >
            Edit Profile
          </Link>
          <li
            onClick={handleLogout}
            disabled={mutation.isLoading}
            className="block py-1 hover:font-semibold hover:text-gray-900 cursor-pointer "
          >
            Logout
          </li>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
