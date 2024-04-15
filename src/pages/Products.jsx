import React from "react";
import ProductCard from "../components/products/ProductCard";
import { getAllProducts } from "../api/product/products";
import { useQuery } from "react-query";
import Loading from "../Loading";
import Error from "../Error";

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <section className="w-full  md:w-10/12  text-gray-600 body-font">
        <div className="container md:px-5  mx-auto">
          <div className="mt-6  grid grid-cols-2 md:gap-x-6 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
