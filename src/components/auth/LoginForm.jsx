import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../api/auth/user";

const initialstate = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formData, setFormData] = useState(initialstate);

  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: async () => {
      toast("logedin Sucessfully", {
        position: "top-center",
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    setFormData(initialstate);
    redirect("/");
  };

  return (
    <div className="relative w-full min-h-screen  md:bg-sky-100">
      <div className=" hidden md:block ">
        <div className="absolute   w-3/5 bg-purple-400   h-[600px] left-0 bottom-0 rounded-tr-full  ">
          <h1 className="font-playFlair text-8xl font-semibold pl-60 mt-20">
            Damnsruz .
          </h1>
        </div>
        <div className="absolute  w-[38%] bg-white h-[340px] left-0 bottom-0 rounded-tr-full rounded-bl-full "></div>
      </div>

      <div className="absolute md:right-40 md:max-w-lg bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full  flex justify-center items-center">
          <div className="sm:w-3/5  md:w-3/4 space-t-8">
            <img
              src="../../../login/woman-with-shopping-bags-looking-camera.jpg"
              alt="woman-with-shopping-bags-looking-camera"
              className="object-fill"
            />
            <div>
              <h2 className=" font-playFlair text-center text-3xl font-extrabold text-gray-900">
                Login to Your Account
              </h2>
            </div>
            <div className="flex justify-center items-center gap-2  pt-4">
              <span>Don't have an Account? </span>
            <Link to="/signup" className="text-md font-semibold px-4  text-indigo-500 hover:text-indigo-700 hover:underline" >Sign Up</Link>
          </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md flex flex-col gap-2 shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
