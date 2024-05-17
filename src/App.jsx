import "./App.css";
import "animate.css";

//------ ---- *************************************************************************-------------------//
//------- all pages routes which is comming from routes folder of frontend part ---------------//
//------ ---- *************************************************************************-------------------//

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./HomeLayout";
import Home from "./pages/Home";
import {
  AuthLayout,
  ForgetPassword,
  Login,
  ResetPassword,
  Signup,
  VerifyOtp,
} from "./routes/Auth.routes";
import { Layout, ProductDetails, Products } from "./routes/Products.routes";
import {
  AdminLayout,
  Dashboard,
  AllOrders,
  AllProducts,
  CreateProduct,
  AllEvents,
  CreateEvent,
  DiscountCodes,
  WithdrawMoney,
  Refunds,
  Settings,
  AllUsers,
  AllCategories,
  UpdateCategory,
} from "./routes/Dashboard.routes";
import NotFound from "./NotFound";

//------ ---- *************************************************************************-------------------//
// ------------ methods and functions -----------------------//
//------ ---- *************************************************************************-------------------//

import { CheckoutLayout, UserCart } from "./routes/Checkout.routes";
import MyDashboard from "./components/my/MyDashboard";
import MyProfile from "./components/my/MyProfile";

const App = () => {
  //------ ---- *************************************************************************-------------------//
  // ------------ Proetected routes for admin user  -----------------------//
  //------ ---- *************************************************************************-------------------//

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
          {/* user routes */}
          <Route path="/user" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="forget-password/verify" element={<VerifyOtp />} />
            <Route
              path="forget-password/verify/reset-password"
              element={<ResetPassword />}
            />
          </Route>

          {/* product routes */}
          <Route path="/products" element={<Layout />}>
            <Route path="" element={<Products />} />
          </Route>
          <Route path="/products/:productId" element={<ProductDetails />} />

          {/* checkout */}

          <Route path="/checkout" element={<CheckoutLayout />}>
            <Route path="cart" element={<UserCart />} />
          </Route>

          {/* my */}

          <Route path="/my" element={<CheckoutLayout />}>
            <Route path="dashboard" element={<MyDashboard />} />
            <Route path="profile" element={<MyProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* admin routes */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-orders" element={<AllOrders />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="all-categories" element={<AllCategories />} />
          <Route
            path="/admin-dashboard/all-categories/:id"
            element={<UpdateCategory />}
          />
          <Route path="all-events" element={<AllEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="discount-codes" element={<DiscountCodes />} />
          <Route path="withdraw-money" element={<WithdrawMoney />} />
          <Route path="refunds" element={<Refunds />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
