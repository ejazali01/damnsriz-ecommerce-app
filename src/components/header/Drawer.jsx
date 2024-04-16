import React, { useState, useEffect, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import DrawerContent from "./mobile/DrawerContent";

const Drawer = ({ handleDrawer, isDrawerOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close drawer when clicking outside of it
  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden bg-purple-500 w-16  h-14  px-2  text-xl  cursor-pointer"
      >
        {isOpen ? (
          <RiCloseLine className="md:hidden  text-white  text-2xl hover:scale-95 cursor-pointer" />
        ) : (
          <FaBarsStaggered className="md:hidden  text-white  text-2xl hover:scale-95 cursor-pointer" />
        )}
      </button>

      {isOpen && <DrawerContent drawerRef={drawerRef} />}
    </>
  );
};

export default Drawer;
