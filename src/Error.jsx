import React from "react";

const Error = ({error}) => {
  return (
    <div className="w-full  flex justify-center items-center h-80">
      <h2 className=" text-center bg-gray-900 backdrop-blur-md border rounded-md text-purple-600 font-mono font-semibold p-5 text-4xl">
        {error.response.statusText}
      </h2>
    </div>
  );
};

export default Error;
