import appRouter from "../../site/appRouter.js";
import {
  login,
  getUser,
  verifyToken,
  resetPassword,
  resetPasswordWithEmail,
  resetPasswordEmailSubmit,
  resetPasswordtokenDecode,
  RegisterUserWithCaptcha
} from "./auth.controller";

//genric to fetch user details
appRouter.addGetController("/getUserWithToken", getUser);


// used in login
appRouter.addPostController("/login", login);

// //  used in forget password

// user submits email for password reset
appRouter.addPostController(
  "/reset-password-email-submit",
  resetPasswordEmailSubmit
);



//used user detail from token in url
appRouter.addPostController(
  "/reset-password-token-content",
  resetPasswordtokenDecode
);

// updating new passwordin DB after login
appRouter.addPostController("/reset-password", verifyToken, resetPassword);


// updating user password from outside without login - in use
appRouter.addPostController("/reset-password-by-email", resetPasswordWithEmail);


//user register
appRouter.addPostController('/registeruserwithcaptcha',RegisterUserWithCaptcha)






