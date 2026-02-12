import Register from "../component/User/userAuth/component/auth/Register";
import Login from "../component/User/userAuth/component/auth/Login";
import ChangePassword from "../component/User/userAuth/component/password/ChangePassword";
import ResetPassword from "../component/User/userAuth/component/password/ResetPassword";
import ForgetPassword from "../component/User/userAuth/component/password/ForgetPassword";

export const authRoutes = [
  {
    path: "register",

    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "change-password",
    element: <ChangePassword />,
  },
  {
    path: "reset/:token",
    element: <ResetPassword />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
];
