import DataService from "./DataService";

var AuthService = {
  login: async (loginFields) => {
    let response = await DataService.post("api/login", loginFields);
    console.log(response);
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  getCurrentUser: async () => {
    let response = await DataService.get("api/getUserWithToken");
    return response;
  },
  resetPassword: async (data) => {
    let response = await DataService.post("api/reset-password", data);
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  resetPasswordWithEmail: async (data) => {
    let response = await DataService.post("api/reset-password-by-email", data);
    return response;
  },
  resetPasswordSubmitEmail: async (data) => {
    let response = await DataService.post(
      "api/reset-password-email-submit",
      data
    );
    return response;
  },
  getresetTokencontent: async (data) => {
    var response;
    try {
      let response = await DataService.post(
        "api/reset-password-token-content",
        data
      );
      console.log(response," from call")
      return response;
    } catch (e) {
      return response;
    }
    
  },

  verifyLoginToken: async (data) => {
    var response;
    try {
      response = await DataService.post("api/verify-login-token", data);
      if (response?.status === 200 && data.token) {
        localStorage.setItem("token", data.token);
      }
      return response;
    } catch (e) {
      return response;
    }
  },
  verifyRegistrationCode: async (data) => {
    let response = await DataService.post("api/verfiy-code", data);
    return response;
  },
  getVerificationCodeandVerifyEmail: async (data) => {
    let response = await DataService.post("api/get-code", data);
    return response;

  },
  registerWithCaptcha:async (data) => {
    var response;
    try {
      response = await DataService.post("api/registeruserwithcaptcha", data);
      console.log("register resp", response)
      if (response?.status === 200) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    } catch (e) {
      return response;
    }
  },

  // }
};
export default AuthService;
