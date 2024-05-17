import React, { useEffect } from "react";
import Signup from "../../components/auth/Signup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
  const isAuthenticated  = useSelector((state) => state?.users?.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (window.scrollY ) {
    window.scroll(0, 0); // reset the scroll position to the top left of the document.
  }
  return (
    <>
      <Signup />
    </>
  );
};

export default SignUp;
