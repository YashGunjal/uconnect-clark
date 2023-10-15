import Login from "../sections/auth/login/Login";
import ResetPassword from "../sections/auth/resetPasswordwithoutlogin/ResetPassword";
import ResetPasswordEmailSubmit from "../sections/auth/resetPasswordwithoutlogin/ResetPasswordEmailSubmit";
import Register from "../sections/auth/register/Register";
const routes = [
  {
    path: "/login",
    name: "Login",
    miniName: "L",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    miniName: "R",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/reset-password",
    name: "Login",
    miniName: "S",
    component: ResetPasswordEmailSubmit,
    layout: "/auth",
  },
  {
    path: "/reset-password-confirm/:token",
    name: "Login",
    miniName: "T",
    component: ResetPassword,
    layout: "/auth",
  },
];

export default routes;
