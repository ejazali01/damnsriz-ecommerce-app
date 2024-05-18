import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import UserRoleEdit from "./UserRoleEdit";
import { setAllUsersdetails } from "../../../redux/reducers/admin/allUsersSlice";
import Loading from "../../../Loading";
import { getAllUsers } from "../../../api/auth/user";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const AllUsersData = () => {
  // fetching all users data from redux store to showing the data
  const allUsersDetails = useSelector((state) => state?.allUsers);
  
  const [togleAction, setTogleAction] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Close the dropdown if clicked outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTogleAction(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 
  
  const toggleAction = () => {
    setTogleAction(!togleAction);
  };

  //keys dont want to show in the table heading
  const excludedKeys = [
    "_id",
    "updatedAt",
    "is_verified",
    "username",
    "avatar",
    "wishlist",
  ];

  // fetching all users Data from backend
  const dispatch = useDispatch();
  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
    staleTime : 6 * 1000
  });

  if (isLoading) {
    return <Loading />;
  }
  // dispatch to redux store
  if (isSuccess) {
    if (users?.data) {
      dispatch(setAllUsersdetails(users?.data));
    }
  }

  if (isError) {
    toast.error(error.response.statusText);
  }

  return (
    <>
      <div className="relative w-full h-screen flex justify-center  md:p-4  lg:p-6  bg-gray-100 ">
        <div className=" text-black  w-full  bg-white p-2 md:px-6   rounded-lg">
          <div className="relative  ">
            {/* -----------------------------------------------------------------------------------------
                ---------------Header search and Action -------------------------
              ----------------------------------------------------------------------------------------- */}

            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap-reverse pb-4 gap-2 lg:gap-0 lg:py-4 bg-white ">
              <div className="relative" ref={dropdownRef}>
                <button
                  id="dropdownActionButton"
                  onClick={toggleAction}
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:text-gray-400"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Action
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {togleAction && (
                  <div
                    id="dropdownAction"
                    className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700"
                      aria-labelledby="dropdownActionButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-1 hover:bg-gray-100"
                        >
                          Reward
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-1 hover:bg-gray-100"
                        >
                          Promote
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-1 hover:bg-gray-100"
                        >
                          Activate account
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete User
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400  "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-1 ps-10 text-sm text-gray-600 border border-gray-300 rounded-lg w-80 bg-gray-50  focus:border-purple-600"
                  placeholder="Search users"
                />
              </div>
            </div>

            {/* -----------------------------------------------------------------------------------------
                ---------------Table Start from here -------------------------
            ----------------------------------------------------------------------------------------- */}

            <table className="w-full min-w-2xl text-xs lg:text-sm text-left rtl:text-right text-gray-800 ">
              {/* Table Haed */}
              {allUsersDetails?.allUsers?.length > 0 && (
                <thead className="text-xs text-gray-600 uppercase bg-gray-300">
                  <tr>
                    {/* Table header for checkbox column */}
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          Select All
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 lg:py-2 lg:px-4 text-left text-xs text-gray-600 font-bold uppercase tracking-wider whitespace-nowrap"
                    >
                      USERS
                    </th>
                    {/* Table headers based on keys of the first user */}
                    {allUsersDetails?.allUsers?.length > 0 &&
                      Object.keys(allUsersDetails?.allUsers[0]).map((key) => {
                        // Check if the key should be excluded
                        if (!excludedKeys.includes(key)) {
                          return (
                            <th
                              key={key}
                              scope="col"
                              className="px-6 py-3 lg:py-2 lg:px-4 text-left text-xs text-gray-600 font-bold uppercase tracking-wider whitespace-nowrap"
                            >
                              {key}
                            </th>
                          );
                        }
                        return null; // Exclude this key from rendering
                      })}
                  </tr>
                </thead>
              )}

              {/* table body */}
              {allUsersDetails?.allUsers?.map((users) => (
                <tbody key={users?._id} className="">
                  <tr className="border-b hover:shadow-md hover:transition-all hover:duration-200 hover:bg-gray-100">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${users?._id}`}
                          type="checkbox"
                          className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${users?._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className=" px-6 py-2">
                      <div className="flex items-center text-gray-700">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={users?.avatar}
                          alt={users?.fullName}
                        />
                        <div className="ps-3">
                          <div className="text-gray-700 font-semibold">
                            {users?.fullName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {users?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{users?.fullName}</td>
                    <td className="px-6 py-4">{users?.email}</td>
                    <td
                      className={`${
                        users?.role === "admin" ? "text-green-500" : ""
                      } px-6 py-4`}
                    >
                      <div className="relative flex items-center">
                        <UserRoleEdit
                          userId={users?._id}
                          initialRole={users?.role}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {users.isBlocked ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      {moment(users?.createdAt).format("ll")}
                    </td>
                    {users?.address?.length > 0 ? (
                      users.address.map((address) => (
                        <td key={address?._id} className="px-6 py-4 md:px-4">
                          <div className="hidden xl:block">
                            {address?.localAddress},
                          </div>
                          <div className="lg:flex flex-wrap">
                            <div className="hidden lg:block">
                              {address?.locality},
                            </div>
                            <div>{address?.state}</div>
                          </div>
                        </td>
                      ))
                    ) : (
                      <td className="px-6 py-4">N/A</td>
                    )}
                  </tr>
                </tbody>
              ))}
            </table>

            {/* table ending */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsersData;
