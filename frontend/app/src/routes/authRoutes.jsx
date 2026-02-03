import Register from "../component/User/userAuth/Register";
import Login from "../component/User/userAuth/Login";
import ChangePassword from "../component/User/userAuth/ChangePassword";
import ResetPassword from "../component/User/userAuth/ResetPassword";
import ForgetPassword from "../component/User/userAuth/ForgetPassword";


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
