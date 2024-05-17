import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Button, CircularProgress } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../helper/auth/validation";
import { useMutation } from "react-query";
import toast from 'react-hot-toast';
import { forgetPasswordOtp, verifyOtp } from "../../api/auth/user";
import { BsInfo } from "react-icons/bs";
import * as Yup from "yup";

const initialstate = {
  otp: "",
};

const validationSchema = Yup.object().shape({
  otp: Yup.number("OTP should be a number")
    .required("OTP is required")
    .min(6, "OTP must be at least 6 characters"),
});

const VerifyOtp = () => {
  const [open, setOpen] = useState(null);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleDropdown = (help) => {
    setOpen((prev) => (prev === help ? null : help));
  };

  const navigate = useNavigate();
  const mutation = useMutation({
    // queryKey:["forgetPassword"],
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("OTP Verified")
      navigate("reset-password");
    },
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const otp = validateEmail(values.otp);
    // if (email) {
    mutation.mutate(values);
    // }
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <div className="min-h-screen p-4 md:pt-4 flex flex-col items-center">
        <div className="w-full sm:w-3/5 md:w-1/2 lg:w-2/6 xl:w-3/12 ">
          <div className="p-4 border shadow-lg rounded-lg ">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-3xl py-2 text-center font-semibold">
                  Verification required
                </h1>
                <h2 className="text-sm text-left text-gray-600">
                  To continue, complete this verification step. We've sent an
                  OTP to the email{" "}
                  <span className="px-2">ejaz84916@gmail.com.</span>
                  Please enter it below to complete verification.
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
                        <label
                          htmlFor="otp"
                          className="text-gray-600 p-1 font-semibold"
                        >
                          Enter OTP
                        </label>
                        <Field
                          type="number"
                          id="otp"
                          placeholder="Please enter your OTP "
                          name="otp"
                          autoComplete="off"
                          required
                          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                        />

                        {ErrorMessage ? (
                          <div className="flex text-xs gap-1 pt-2 items-center">
                            <BsInfo className="text-xl text-indigo-500" />
                            <h3 className="text-gray-600">
                              OTP must be at least 6 characters
                            </h3>
                          </div>
                        ) : (
                          <ErrorMessage
                            name="otp"
                            component="div"
                            className="text-red-500"
                          />
                        )}
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

            <div className="py-4 pt-6 ">
              <div className="flex justify-center items-center ">
                <button
                  type="button"
                  className="w-3/5 text-semibold hover:underline underline-offset-4  "
                >
                  Resend OTP
                </button>
                <div className="flex items-center gap-2">
                  <h2 className="text-gray-500">Try after </h2>
                  <span>{formatTime(seconds)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full  pt-10 ">
            <li
              onClick={() => handleDropdown("help")}
              className="w-2/5  list-none flex items-center hover:text-purple-700 hover:underline underline-offset-4"
            >
              <Link href="#" className="w-full ">
                I need more help
              </Link>
              <RiArrowDropDownLine
                className={` ${
                  open === "help" ? "hidden" : "text-2xl"
                }  cursor-pointer`}
              />
              <RiArrowDropUpLine
                className={` ${
                  open === "help" ? "text-2xl" : "hidden"
                } cursor-pointer`}
              />
            </li>
            {open === "help" && (
              <div className="text-sm lg:text-xs flex flex-col gap-3 py-6 text-gray-600">
                <h2 className="w-full  ">
                  If you've already tried to reset your password, but haven't
                  received an email from Damnsruz, check your Junk or Spam
                  folder.
                </h2>

                <h2 className="w-full  ">
                  If you can't access your email, try resetting that first
                  through your email provider.
                </h2>
                <h2 className="w-full  ">
                  If you've recently updated your password, your old password
                  could still be saved in your browser. Try clearing your
                  browser history and re-typing your password.
                </h2>

                <h2 className="w-full  ">
                  If that does not work, please try calling us at
                  <span className="font-semibold text-md text-black px-2">
                    +91 1234567890
                  </span>
                  so that we can help you out.
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
