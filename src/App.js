import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
// import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import CheckOut from './pages/CheckOut';
import ProductdetialsPage from './pages/Product-detialsPage';
import Protect from './features/auth/components/Protect';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ProtectAdmin from './features/auth/components/ProtectAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetialsPage from './pages/AdminProductDetialsPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrderPage from './pages/AdminOrderPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from './pages/StripCheckout';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protect><Home></Home></Protect>),
  },
  {
    path: "/admin",
    element: (<ProtectAdmin><AdminHome></AdminHome></ProtectAdmin>),
  },
  {
    path: "/login",
    element: (<LoginPage></LoginPage>),
  },
  {
    path: "/signup",
    element: (<SignupPage></SignupPage>),
  },
  {
    path: "/cart",
    element: (<Protect><CartPage></CartPage></Protect>),
  },
  {
    path: "/checkout",
    element: (<Protect><CheckOut></CheckOut></Protect>),
  },
  {
    path: "/product-details/:id",
    element: (<Protect><ProductdetialsPage></ProductdetialsPage></Protect>),
  },
  {
    path: "/admin/product-details/:id",
    element: (<ProtectAdmin><AdminProductDetialsPage></AdminProductDetialsPage></ProtectAdmin>),
  },
  {
    path: "/admin/product-form",
    element: (<ProtectAdmin><AdminProductFormPage></AdminProductFormPage></ProtectAdmin>),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (<ProtectAdmin><AdminProductFormPage></AdminProductFormPage></ProtectAdmin>),
  },
  {
    path: "*",
    element: (<PageNotFound></PageNotFound>),
  },
  {
    path: "/order-success/:id",
    element: (<OrderSuccess></OrderSuccess>),
  },
  {
    path: "/my-orders",
    element: (<UserOrderPage></UserOrderPage>),
  },
  {
    path: "/my-profile",
    element: (<UserProfilePage></UserProfilePage>),
  },
  {
    path: "/logout",
    element: (<Logout></Logout>),
  },
  {
    path: "/forget-password",
    element: (<ForgetPasswordPage></ForgetPasswordPage>),
  },
  {
    path: "/stripe-checkout/",
    element: (<Protect><StripeCheckout></StripeCheckout></Protect>),
  },
  {
    path: "/admin/order",
    element: (<ProtectAdmin><AdminOrderPage></AdminOrderPage></ProtectAdmin>),
  },
]);


function App() {
  const user = useSelector(selectLoggedInUser);
  const disptach = useDispatch();
  const userChecked = useSelector(selectUserChecked)

  useEffect(()=>{
    disptach(checkAuthAsync())
  }, [])

  useEffect(() => {
    
    if (user) {
      disptach(fetchItemsByUserIdAsync())
      disptach(fetchLoggedInUserAsync())
    }
  }, [disptach, user])
  return (
    <div className="App">
       {userChecked && <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>}
    </div>
  );
}

export default App;
