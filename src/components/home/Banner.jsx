import React from 'react'

const Banner = () => {
  return (
   <>
     {/* <!-- Hero Section with Image --> */}
    <div className="relative h-screen flex items-center justify-center">
        {/* <!-- Image --> */}
        <img src="https://source.unsplash.com/1600x900/?fashion" alt="Fashion Banner" className="absolute inset-0 object-cover w-full h-full" />
        
        {/* <!-- Overlay --> */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
                <p className="text-lg mb-6">Discover the latest trends in fashion</p>
                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">Shop Now</a>
            </div>
        </div>
    </div>
   </>
  )
}

export default Banner