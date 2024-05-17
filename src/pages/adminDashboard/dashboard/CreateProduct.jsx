import React from "react";
import CreateProductForm from "../../../components/dashboard/create-product/CreateProductForm";

const CreateProduct = () => {
  if (window.scrollY ) {
    window.scroll(0, 0); // reset the scroll position to the top left of the document.
  }
  return (
    <>
      <CreateProductForm />
    </>
  );
};

export default CreateProduct;
