import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth/user";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialstate = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    // queryKey:["forgetPassword"],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(
        "Password reset successfully. Please login with your new password."
      );
      navigate("/login");
    },
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    const { email, password } = values;
    mutation.mutate({ email, password });
    resetForm();
    setSubmitting(false);
  };

  return (
    <div className="p-4 border shadow-md rounded-lg m-4">
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl py-2 text-center font-semibold">
            Reset Password
          </h1>
          <h2 className="text-sm tetx-gray-600 ">
            Enter your email address and new password.
          </h2>
        </div>

        <div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialstate}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="py-2">
                  <Field
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="py-2">
                  <Field
                    type="password"
                    id="password"
                    placeholder="New Password"
                    name="password"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="py-2">
                  <Field
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    autoComplete="off"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="py-4">
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        sx={{
                          color: "white",
                        }}
                      />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
