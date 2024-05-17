import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth/user";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import * as Yup from "yup";

const initialstate = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
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
    // const {password} = values
    console.log(values);
    mutation.mutate(values);
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      <div className="p-4 md:pt-4 min-h-screen flex flex-col items-center">
        <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/6 xl:w-3/12 ">
          <div className="p-4 border shadow-lg rounded-lg ">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl py-2 text-center font-semibold">
                  Create new password
                </h1>
                <h2 className="text-sm tetx-gray-600 ">
                  We'll ask for this password whenever you sign in.
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
                        <label
                          htmlFor="password"
                          className="text-gray-600 p-1 font-semibold"
                        >
                          New Password
                        </label>
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
                        <label
                          htmlFor="confirmPassword"
                          className="text-gray-600 p-1 font-semibold"
                        >
                          Confirm Password
                        </label>
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

          <div className="flex flex-col">
            <h1 className=" py-6 text-xl">Secure password tips:</h1>
            <div className="flex flex-col gap-2 text-gray-600 text-sm lg:text-xs ">
              <li>
                Use at least 8 characters, a combination of numbers and letters
                is best.
              </li>
              <li>
                Do not use the same password you have used with us previously.
              </li>
              <li>
                Do not use dictionary words, your name, e-mail address, mobile
                phone number or other personal information that can be easily
                obtained.
              </li>
              <li>
                Do not use the same password for multiple online accounts.
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
