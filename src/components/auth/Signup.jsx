import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { registerUser } from "../../api/auth/user";
import { Link } from "react-router-dom";

const initialstate = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .lowercase()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(5, "Too Short!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Signup = () => {
  const [formData, setFormData] = useState(initialstate);
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("created sucessfully");
    },
    onMutate: () => {
      return <CircularProgress />;
    },
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { fullName, username, email, password } = values;
    mutation.mutate({ fullName, username, email, password });
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full ">
        <img
          src="../../../login/laughter-in-the-sun.jpg"
          alt="laughter-in-the-sun"
          className="object-fill"
        />
        <div>
          <h2 className="pt-3 text-center text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          {/* className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" */}
        </div>

        <div className="flex justify-center items-center gap-1 py-2 pb-8">
          <span>Already have an Account? </span>
          <Link
            to="/login"
            className="text-md  font-semibold px-4 text-indigo-500 hover:text-indigo-700 hover:underline"
          >
            Login
          </Link>
        </div>

        <Formik
          initialValues={initialstate}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Full Name */}
              <div className="mb-4">
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
               
                `}
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Username */}
              <div className="mb-4">
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
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
                variant="contained"
                className="w-full bg-purple-500 text-white rounded-md py-2 hover:bg-purple-700 transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                  />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
