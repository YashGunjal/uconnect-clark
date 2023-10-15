import jsonwebtoken from "jsonwebtoken";
import { getConnection } from "typeorm";
import dotenv from "dotenv";


dotenv.config();
const secretkey = process.env.TOKEN_SECRET;

export function getTokenObject(response, userRoleResponse, extraVariables ={}) {

    return {
        id: response.id,
        fullName: response.first_name + " " + response.last_name,
        firstName: response.first_name + " " + response.last_name,
        email: response.email,
        isAdmin: response.role_id == 21,
        role_id: response.role_id,
        ...extraVariables
      };
}

export async function getAuthToken(email, res) {
    let connection = getConnection();

    var reqRepository = connection.getRepository("User");
  const response = await reqRepository.findOne({
    email: email,
    status: true,
  });
  let developer_profile_status = "";
  if (response.user_role == 7 || response.user_role == 6) {
    var devRepository = connection.getRepository("Developer");
    const resp = await devRepository.findOne({
      user_id: response.id,
    });
    developer_profile_status = resp?.profile_status;
  }

  if (response === undefined) {
    res
      .status(204)
      .json({ data: "Email/Password mismatch.", message: "false" });
  } else {
    var reqRepository = connection.getRepository("UserRoles");
    const userRoleResponse = await reqRepository.findOne({
      id: response.user_role,
    });

    let retVal = getTokenObject( response, userRoleResponse , {profile_status: developer_profile_status })  

    var token = jsonwebtoken.sign(retVal, secretkey, {
      expiresIn: 86900,
    });
    console.log("generated token", token, retVal)
    return [token, retVal];
  }
}