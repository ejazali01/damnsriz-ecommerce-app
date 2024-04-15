import React from 'react';
import { IoIosSearch } from "react-icons/io";


const SearchBar = ({ placeholder }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        id='search'
        placeholder={placeholder || 'Search for products, brands and more'}
        className="w-full relative  px-12 py-1 border bg-gray-100 border-gray-300  focus:outline-none focus:border-purple-500"
      />
      <span className='absolute top-0 left-0 p-2'>
      <IoIosSearch className='text-lg bg-gray-100 cursor-pointer focus:border-r-[1px] hover:text-black font-semibold hover:scale-110' />
      </span>
    </div>
  );
};

export default SearchBar;
