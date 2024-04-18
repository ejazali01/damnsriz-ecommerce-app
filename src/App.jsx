import "./App.css";
import HomeLayout from "./HomeLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Layout from "./components/products/Layout";
import NotFound from "./NotFound";
import Login from "./pages/auth/Login";
import Signup from "./components/auth/Signup";
import ForgetPassword from "./components/auth/ForgetPasswordForm";
import AuthLayout from "./pages/auth/AuthLayout";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomeLayout />}>
        <Route path="/user" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="forget-password/verify" element={<VerifyOtp />} />
          <Route path="forget-password/verify/reset-password" element={<ResetPassword />} />

        </Route>
        <Route path="" element={<Home />} />
        <Route path="products" element={<Layout />}>
          <Route path="" element={<Products />} />
        </Route>
        <Route path="/products/:productId" element={<ProductDetails />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
