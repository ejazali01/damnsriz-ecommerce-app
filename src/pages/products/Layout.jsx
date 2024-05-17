import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/products/Sidebar";
import Breadcrumb from "../../components/products/Breadcrumb";
import Filters from "../../components/products/Filters";
import ProductPagination from "../../components/products/ProductPagination";
import Loading from "../../Loading";
import Error from "../../Error";
import { getAllProducts } from "../../api/product/products";
import { useQuery } from "react-query";
import { setAllProducts } from "../../redux/reducers/product/productSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <Loading />;
  if (isSuccess) {
    dispatch(setAllProducts(products));
  }
  if (isError) return <Error error={error} />;
  return (
    <>
      <div>
        <Breadcrumb />
        <Filters />
        <div className="flex flex-wrap py-6 border">
          <Sidebar />
          <Outlet />
          {/* <ProductPagination products={products} /> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
