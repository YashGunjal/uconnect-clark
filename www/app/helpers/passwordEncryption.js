import CryptoJS from "crypto-js";
export const encryptPassword = (password) => {
  return CryptoJS.MD5(password).toString();
  //   return md5.createHash().update(password).digest("hex");
};
