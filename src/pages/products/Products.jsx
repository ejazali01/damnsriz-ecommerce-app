import React from "react";
import ProductCard from "../../components/products/ProductCard";
import { useSelector } from "react-redux";


const Products = () => {

   // use selector to fetch logged in user details from redux store
   const products = useSelector((state) => state?.products?.products?.data);
   
  // if (products.isLoading) return <Loading />;
  // if (products.isError) return <Error error={error} />;

  if (window.scrollY ) {
    window.scroll(0, 0); // reset the scroll position to the top left of the document.
  }

  return (
    <>
      <section className="w-full  md:w-10/12  text-gray-600 body-font">
        <div className="container md:px-5  mx-auto">
          <div className="mt-6  grid grid-cols-2 md:gap-x-6 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
            {
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
