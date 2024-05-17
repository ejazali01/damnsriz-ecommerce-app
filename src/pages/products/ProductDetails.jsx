import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Loading.jsx";
import { IoBagHandleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { findId } from "../../helper/id.js";
import { getSingleProduct } from "../../api/product/products.js";
import ProductOverview from "../../components/products/ProductOverview.jsx";
import ProductFeature from "../../components/products/ProductFeature.jsx";
import Error from "../../Error.jsx";

const ProductDetails = () => {
  const params = useParams();
  const productId = findId(params.productId);

  const { data : product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
  });

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
  
  if (window.scrollY ) {
    window.scroll(0, 0); // reset the scroll position to the top left of the document.
  }
  return (
    <>
      <ProductOverview product={product} />
      <ProductFeature product={product} />
    </>
  );
};

export default ProductDetails;
