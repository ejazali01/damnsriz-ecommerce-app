import React, { useState } from "react";
import { isValidUsernameOrEmail } from "../../helper/auth/validation.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../api/auth/user";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setCurrentUserdetails } from "../../redux/reducers/user/userSlice.js";

const initialstate = {
  usernameOrEmail: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("Username or Email is required"),
  password: Yup.string().min(5, "Too Short!").required("Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogin,
    onSuccess: async (data) => {
      if (data?.data?.data?.user?.role == "admin") {
        dispatch(setCurrentUserdetails(data?.data?.data?.user));
        navigate("/admin-dashboard/dashboard");
      } else {
        dispatch(setCurrentUserdetails(data?.data?.data?.user));
        navigate("/");
      }
      toast.success(data?.data?.message);
    },

    onError: async (error) => {
      toast.error(error?.response?.statusText);
    },
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const validUsernameOrEmail = isValidUsernameOrEmail(values.usernameOrEmail);
    if (validUsernameOrEmail) {
      mutation.mutate(values);
    }
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="relative w-full max-w-full min-h-screen  md:bg-sky-100">
      <div className=" hidden md:block ">
        <div className="absolute   w-3/5 bg-purple-400   h-[600px] left-0 bottom-0 rounded-tr-full  ">
          <h1 className="font-playFlair text-8xl font-semibold pl-60 mt-20">
            Damnsruz .
          </h1>
        </div>
        <div className="absolute  w-[38%] bg-white h-[340px] left-0 bottom-0 rounded-tr-full rounded-bl-full "></div>
      </div>

      <div className="absolute md:right-40 md:max-w-lg bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-full  flex justify-center items-center">
          <div className="w-full sm:max-w-3/5  md:w-3/4 space-t-8">
            <img
              src="../../../login/woman-with-shopping-bags-looking-camera.jpg"
              alt="woman-with-shopping-bags-looking-camera"
              className="object-fill"
            />

            <div className="py-2">
              <h2 className=" font-playFlair text-center text-3xl font-extrabold text-gray-900">
                Login to Your Account
              </h2>
            </div>
            <div className="flex justify-center items-center gap-2  py-4">
              <span>Don't have an Account? </span>
              <Link
                to="/user/signup"
                className="text-md font-semibold px-4  text-purple-500 hover:text-purple-700 hover:underline"
              >
                Sign Up
              </Link>
            </div>
            <Formik
              initialValues={initialstate}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="rounded-md flex flex-col gap-2 -space-y-px py-4">
                    <div>
                      <Field
                        type="text"
                        id="usernameOrEmail"
                        name="usernameOrEmail"
                        placeholder="Username or email"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                      />
                      <ErrorMessage
                        name="usernameOrEmail"
                        placeholder="usernameOrEmail"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                      />

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="py-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <Field
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded  bg-purple-100   dark:focus:ring-purple-600 dark:ring-offset-purple-800 focus:ring-2 dark:bg-purple-700 dark:border-purple-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        to="/user/forget-password"
                        className="font-medium text-purple-600 hover:text-purple-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div>
                    <Button
                      sx={{
                        backgroundColor: "#9f7aea",
                        color: "white",
                        fontSize: "medium",
                        fontWeight: "semibold",
                        "&:hover": {
                          backgroundColor: "#6b46c1",
                        },
                      }}
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending && (
                        <CircularProgress
                          sx={{
                            color: "white",
                          }}
                        />
                      )}
                      Sign In
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
