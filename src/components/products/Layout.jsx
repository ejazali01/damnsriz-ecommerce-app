import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import Filters from "./Filters";
import ProductPagination from "./ProductPagination";
import Loading from "../../Loading";
import Error from "../../Error";
import { getAllProducts } from "../../api/product/products";
import { useQuery } from "react-query";

const Layout = () => {
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
      <div>
        <Breadcrumb />
        <Filters />
        <div className="flex flex-wrap py-6 border">
          <Sidebar />
          <Outlet />
          <ProductPagination products={products} />
        </div>
      </div>
    </>
  );
};

export default Layout;
