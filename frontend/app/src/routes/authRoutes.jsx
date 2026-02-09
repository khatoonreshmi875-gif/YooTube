import { Suspense } from "react";
import { lazy } from "react";

const Register = lazy(
  () => import("../component/User/userAuth/component/auth/Register"),
);
const Login = lazy(
  () => import("../component/User/userAuth/component/auth/Login"),
);
const ChangePassword = lazy(
  () => import("../component/User/userAuth/component/password/ChangePassword"),
);
const ResetPassword = lazy(
  () => import("../component/User/userAuth/component/password/ResetPassword"),
);
const ForgetPassword = lazy(
  () => import("../component/User/userAuth/component/password/ForgetPassword"),
);

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
