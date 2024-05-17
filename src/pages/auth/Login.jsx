import React, { useEffect } from "react";
import LoginForm from "../../components/auth/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isAuthenticated  = useSelector((state) => state?.users?.currentUser?.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

if (window.scrollY ) {
  window.scroll(0, 0); // reset the scroll position to the top left of the document.
}

// window.scrollByPages(1);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
