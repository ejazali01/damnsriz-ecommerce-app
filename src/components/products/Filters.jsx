import React from "react";

const Filters = () => {
  return (
    <>
      <div className="container hidden md:flex mt-6 gap-44">
        <div className="">
          <h1 className="text-2xl font-semibold pl-4 py-4 ">FILTERS</h1>
        </div>

        <div className="w-full flex justify-between">
          <div>
            <ol className="flex text-sm ">
              <li className=" pl-4 py-4 ">Bundles</li>
              <li className=" pl-4 py-4 ">Country Of Origin</li>
              <li className=" pl-4 py-4 ">Size</li>
            </ol>
          </div>

          <div className=" w-1/4 px-4 ">
            <div className=" border flex">
              <label
                htmlFor="sortBy"
                className="mt-1 py-2 px-3 w-1/2 text-sm font-normal text-gray-500"
              >
                Sort By :
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="mt-1 w-full py-2 px-3 bg-white rounded-none shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option className="w-full p-2 " value="latest">Latest</option>
                <option value="name-asc">New Arival (A-Z)</option>
                <option value="name-desc">Best Seller (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
