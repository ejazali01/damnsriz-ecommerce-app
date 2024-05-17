import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../helper/auth/validation";
import { useMutation } from "react-query";
import { forgetPasswordOtp } from "../../api/auth/user";
import toast from 'react-hot-toast';
import * as Yup from "yup";

const initialstate = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

const ForgetPasswordForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    // queryKey:["forgetPassword"],
    mutationFn: forgetPasswordOtp,
    onSuccess: () => {
      toast.success("Otp send to you email");
      navigate("verify");
    },
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const email = validateEmail(values.email);
    // if (email) {
    mutation.mutate(values);
    // }
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col  items-center p-4 md:pt-4">
      <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/6 xl:w-3/12 p-4 border shadow-lg rounded-lg ">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl py-2  text-center font-semibold">
              Password assistance
            </h1>
            <h2 className="text-gray-600"> 
              Enter the email address associated with your Damsnsruz account.
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
                  <div className="py-4">
                    <label htmlFor="email" className="text-gray-600 p-1 font-semibold">
                    Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      placeholder="Please enter your email "
                      name="email"
                      autoComplete="off"
                      required
                      className="appearance-none  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500"
                    />
                    {ErrorMessage && <div className="py-2 text-sm px-1 text-gray-500">Try after 1 mins</div>}

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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress
                          sx={{
                            color: "white",
                          }}
                        />
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="py-4 pt-6">
          <h1 className="text-semibold ">Has your email address changed?</h1>
          <div>
            <h3 className="text-sm lg:text-xs py-2 text-gray-600 ">
              If you no longer use the e-mail address associated with your
              Damnsruz account, you may contact
              <Link
                className="text-purple-500 font-semibold px-2 underline underline-offset-4 hover:text-purple-700 hover:underline"
                to="/help/customers"
              >
                
                Customer Service
              </Link>
              for help restoring access to your account.
            </h3>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
