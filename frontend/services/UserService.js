import DataService from "./DataService";

var UserService = {
  updateUser:async (data) => {
    var response;
    try {
      response = await DataService.post("api/user/updateUser", data);
      console.log(response);
      if (response?.status === 200) {
        localStorage.setItem("token", response.data.token);
      }
      return response;
    } catch (e) {
      return response;
    }
  },

};
export default UserService;
