import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropRightLine, RiCloseLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import MenSubCategory from "../mobile/subCategory/MenSubCategory";
import WomenSubCategory from "../mobile/subCategory/MenSubCategory";
import KidsSubCategory from "../mobile/subCategory/MenSubCategory";
import BeautySubCategory from "../mobile/subCategory/MenSubCategory";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { logoutUser } from "../../../api/auth/user";
import { signoutSucess } from "../../../redux/reducers/user/userSlice";
import toast from "react-hot-toast";

const DrawerContent = ({ drawerRef, isOpen, setIsOpen }) => {
  // use selector to fetch logged in user details from redux store
  const currentUser = useSelector((state) => state?.users?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);

  const handleDropdown = (category) => {
    setOpen((prev) => (prev === category ? null : category));
  };

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
      {/* Drawer Content */}
      <div
        ref={drawerRef}
        className="fixed z-30 top-0 left-0 h-screen w-3/4 bg-white shadow-lg transition-all ease-in-out duration-500 "
      >
        {currentUser ? (
          <div className="bg-gray-300 flex flex-col  relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden absolute top-0 right-0  w-8  h-8  text-xl  cursor-pointer "
            >
              <RiCloseLine className="md:hidden text-gray-500 text-xl hover:scale-95 cursor-pointer " />
            </button>
            <div className="w-12 h-12 bg-purple-300 p-2 m-2 rounded-full ">
              <img
                src={currentUser.avatar}
                alt="drawer_image"
                className=" rounded-full "
              />
            </div>
            <div>
              <li className="w-full flex justify-between items-center p-2 hover:bg-gray-300">
                <Link to="/user/profile" className="w-full ">
                  {currentUser.fullName}
                </Link>
                <RiArrowDropRightLine className="text-2xl" />
              </li>
            </div>

            <div className="w-full flex justify-between items-center p-2 hover:bg-gray-300">
              <Link
                to="/admin-dashboard/dashboard"
                className="block py-1 hover:font-semibold hover:underline underline-offset-4 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <RiArrowDropRightLine className="text-2xl" />
            </div>
          </div>
        ) : (
          <div>
            <img
              src="../../../../drawer/drawer_image.webp"
              alt="drawer_image"
            />
          </div>
        )}

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

            {currentUser && (
              <div className="text-sm py-2 border-t ">
                <Link
                  to="/my/profile"
                  className="block p-2 hover:font-semibold hover:text-gray-900"
                >
                  Edit Profile
                </Link>
                <li
                  onClick={handleLogout}
                  disabled={mutation.isPending}
                  className="flex justify-between p-2 hover:font-semibold hover:bg-gray-300 bg-gray-200 hover:text-gray-900 cursor-pointer "
                >
                  Logout
                  <RiArrowDropRightLine className="text-2xl" />
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawerContent;
