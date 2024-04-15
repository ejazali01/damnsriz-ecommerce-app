import React from "react";
import MenCategory from "./MenCategory";
import WomenCategory from "./WomenCategory";
import KidsCategory from "./KidsCategory";
import BeautyCategory from "./BeautyCategory";

const ProductDropdown = ({ isOpen }) => {
  return (
    <>
      {isOpen === "MEN" && <MenCategory />}
      {isOpen === "WOMEN" && <WomenCategory />}
      {isOpen === "KIDS" && <KidsCategory />}
      {isOpen === "BEAUTY" && <BeautyCategory />}
    </>
  );
};

export default ProductDropdown;
