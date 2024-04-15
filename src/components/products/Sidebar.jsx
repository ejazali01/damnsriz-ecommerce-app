import React, { useState } from "react";

const Sidebar = () => {

  // color
  const initialColors = [
    {
      color: "Red",
      product_qty: 20,
      color_code: "bg-red-500",
    },
    {
      color: "Green",
      product_qty: 20,
      color_code: "bg-green-500",
    },
    {
      color: "Yellow",
      product_qty: 20,
      color_code: "bg-yellow-500",
    },
    {
      color: "Purple",
      product_qty: 20,
      color_code: "bg-purple-500",
    },
  ];
  const [displayedColors, setDisplayedColors] = useState(initialColors.slice(0, 2));
  const [showMore, setShowMore] = useState(false);

  const handleMoreColors = () => {
    setDisplayedColors(initialColors); // Show all colors
    setShowMore(true); // Set showMore state to true
  }

  // discount

  const discountRange = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%"]

  return (
    <div className="hidden md:block p-4 md:w-2/12  bg-gray-100 text-gray-900 ">
      {/* category */}
      <div className="border-b w-full py-2">
        <h1 className="w-full font-semibold text-gray-700 py-2">CATEGORIES</h1>
        <div className="flex gap-2  items-center py-1">
          <input
            type="checkbox"
            name=""
            className="form-checkbox h-4 w-4"
            value="false"
          />
          <div className="flex  items-center">
            <h2 className="text-sm text-gray-700 font-normal">Shirts</h2>
            <h4 className="text-xs text-gray-500">(546)</h4>
          </div>
        </div>

        <div className="w-full flex gap-2  items-center py-1">
          <input
            type="checkbox"
            name=""
            className="form-checkbox h-4 w-4  "
            value="false"
          />
          <div className="flex  items-center">
            <h2 className="text-sm text-gray-700 font-normal">Tshirts</h2>
            <h4 className="text-xs text-gray-500">(1006)</h4>
          </div>
        </div>
      </div>
      {/* brand */}

      <div className="border-b w-full py-2">
        <h1 className="w-full font-semibold text-gray-700 py-2">BRAND</h1>
        <div className="flex gap-2  items-center py-1">
          <input
            type="checkbox"
            name=""
            className="form-checkbox h-4 w-4"
            value="false"
          />
          <div className="flex  items-center">
            <h2 className="text-sm text-gray-700 font-normal">ROADSTER</h2>
            <h4 className="text-xs text-gray-500">(986)</h4>
          </div>
        </div>

        <div className="w-full flex gap-2  items-center py-1">
          <input
            type="checkbox"
            name=""
            className="form-checkbox h-4 w-4 "
            value="false"
          />
          <div className="flex  items-center">
            <h2 className="text-sm text-gray-700 font-normal">WRONG</h2>
            <h4 className="text-xs text-gray-500">(1206)</h4>
          </div>
        </div>
      </div>

      {/* price */}

      <div className="border-b w-full py-2">
        <h1 className="w-full font-semibold text-gray-700 py-2">PRICE</h1>
        <div className="flex gap-2  items-center py-1">
          <input
            type="checkbox"
            name=""
            className="form-checkbox h-4 w-4"
            value="false"
          />

          <div className="flex  items-center">
            <h2 className="text-sm text-gray-700 font-normal">Rs. 168</h2>
            <span className="px-2 text-sm text-gray-700 font-normal">to</span>
            <h2 className="text-sm text-gray-700 font-normal">Rs. 168</h2>
            <h4 className="text-xs text-gray-500">(986)</h4>
          </div>
        </div>

        <div className="flex gap-2  items-center py-1">
          <input
            type="checkbox"
            name=""
            className="form-checkbox h-4 w-4"
            value="false"
          />

          <div className="flex  items-center ">
            <h2 className="text-sm text-gray-700 font-normal">Rs. 168</h2>
            <span className="px-2 text-sm text-gray-700 font-normal">to</span>
            <h2 className="text-sm text-gray-700 font-normal">Rs. 168</h2>
            <h4 className="text-xs text-gray-500">(986)</h4>
          </div>
        </div>
      </div>

      {/* color */}

      <div className="border-b w-full py-2">
        <h1 className="w-full font-semibold text-gray-700 py-2">COLOR</h1>
        {displayedColors.map((colors, index) => (
          <div key={index} className="flex gap-2 items-center py-1">
            <input
              type="checkbox"
              name=""
              className="form-checkbox h-4 w-4"
              value="false"
            />

            <div className="w-1/2 flex justify-between  items-center ">
              <span className="text-sm text-gray-700 font-normal">
                {colors.color}
              </span>

              <span
                className={`mx-2 ${colors.color_code} w-4 h-4 rounded-full border-gray-800 `}
              ></span>
              <span className="text-xs text-gray-500">
                ({colors.product_qty})
              </span>
            </div>
          </div>
        ))}

        {!showMore && <div
        onClick={handleMoreColors}
        className="cursor-default text-sm flex pl-4 pt-2 text-purple-500">
          +21 more
        </div>}
      </div>

      {/* discount */}

      <div className="border-b w-full py-2">
        <h1 className="w-full font-semibold text-gray-700 py-2">
          DISCOUNT RANGE
        </h1>

        {discountRange.map((discount, index) => (
        <div key={index} className="flex gap-2  items-center py-1">
          <input
            type="radio"
            name=""
            className="form-checkbox h-4 w-4"
            value="false"
          />

          <div className="flex  items-center ">
            <h2 className="text-sm text-gray-700 font-normal">{discount} and above</h2>
          </div>
        </div>
        ))
        }

   

        
      </div>
    </div>
  );
};

export default Sidebar;
