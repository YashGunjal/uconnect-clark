import jsonwebtoken from "jsonwebtoken";
import { getConnection } from "typeorm";
import dotenv from "dotenv";
import { SendBulkMail } from "../../helpers/sendbulkmail";
import { encryptPassword } from "../../helpers/passwordEncryption";
import userRoles from "../../constants/userRoles";
import { getTokenObject } from "../../helpers/generateTokenObject"

dotenv.config();
const secretkey = process.env.TOKEN_SECRET;

export function verifyToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader && authHeader.split(" ")[1].replace(/\"/g, "");
    if (token === null) return res.sendStatus(401); // if there isn't any token
    jsonwebtoken.verify(token, secretkey, (err, user) => {
      console.log("user after verify ", user, err);

      if (err)
        return res.status(403).send({
          message: `Token expired.`,
          data: null,
        });
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    });
  }
}

export async function login(req, res) {
  // function to login user
  // after verifiing the credentials we assign user a token
  let loginData = req.body;
  let connection = getConnection();

  var reqRepository = connection.getRepository("User");
  const hashedPassword = encryptPassword(loginData.password);
  console.log("enceypted pass");
  console.log(hashedPassword)
  const response = await reqRepository.findOne({
    email: loginData.email.toLowerCase(),
    password: hashedPassword,
    status: true,
  });

  if (response === undefined) {
    res
      .status(204)
      .json({ data: "Email/Password mismatch.", message: "false" });
  } else {

    delete response.password
    delete response.authToken
    var token = jsonwebtoken.sign(response, secretkey, {
      expiresIn: 864000,
    });
    res.status(200).json({ data: response, message: "success", token: token });
  }
}

export async function getUser(req, res) {
  //function to get user detail from the token
  console.log(req?.headers["authorization"]);

  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader && authHeader.split(" ")[1].replace(/\"/g, "");
    if (token === null) return res.sendStatus(401); // if there isn't any token
    jsonwebtoken.verify(token, secretkey, (err, user) => {
      if (err)
        res.status(403).send({
          message: `Token expired.`,
          data: null,
        });
      res.status(200).json(user);
    });
  } else {
    res.status(403).send({
      message: `Token  not expired.`,
      data: null,
    });
  }
}

export async function resetPassword(req, res) {
  // function to change password by logged in user
  // aftet he password is change we should assign user a new token ,
  // because the values with which token was made  are now different
  let data = req.body;
  try {
    var connection = getConnection();
    var userRepository = connection.getRepository("User");
    const hashedPassword = encryptPassword(data.newPassword);
    var rawData = await userRepository.update(req.user.id, {
      password: hashedPassword,
    });
    const response = await userRepository.findOne({
      id: req.user.id,
      status: true,
    });
    

    let retVal = getTokenObject( response, {}) 

    var token = jsonwebtoken.sign(retVal, secretkey, {
      expiresIn: 864000,
    });
    res.status(200).json({ data: retVal, message: "success", token: token });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "couldn't update password" });
  }
}

export async function resetPasswordWithEmail(req, res) {
  // function to change password by logged out user
  let data = req.body;
  try {
    var connection = getConnection();
    const hashedPassword = encryptPassword(data.newPassword);
    var userRepository = connection.getRepository("User");
    userRepository
      .createQueryBuilder()
      .update(userRepository)
      .set({
        password: hashedPassword,
      })
      .where("email = :email", { email: data.email })
      .execute()
      .then(function (savedUser) {
        res.status(200).json({ message: "success" });
      });
  } catch (err) {
    console.log(err);
    res.status(403).res({ message: "couldn't update password" });
  }
}

export async function resetPasswordEmailSubmit(req, res) {
  let data = req.body;
  let connection = getConnection();

  var reqRepository = connection.getRepository("User");
  const response = await reqRepository.findOne({
    email: data.email,
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

  let retVal = {
    id: response.id,
    orgId: response.org_id,
    name: response.first_name + " " + response.last_name,
    email: response.email,
    isPasswordChangeRequired: response.password_change_required,
    tokenType: "password-reset",
    profile_status: developer_profile_status,
  };

  var token = jsonwebtoken.sign(retVal, secretkey, {
    expiresIn: 900,
  });

  const senderDetail = [{ email: data.email }];

  const params = {
    title: "Uconnect Password Reset",
    description:
      "Please click on below link to reset the password, the link will expire in 30 minutes",
    content: [
      {
        text: `${process.env.ALLOWED_ORIGIN}/#/auth/reset-password-confirm/${token}`,
      },
    ],
    resetLink: `${process.env.ALLOWED_ORIGIN}/#/auth/reset-password-confirm/${token}`,
  };

  let Subject = "UConnect Account Info";

  const mailInputs = {
    params: params,
    subject: Subject,
    mailList: senderDetail,
    templateId: 1,
  };
  SendBulkMail(mailInputs, res);
}

export async function resetPasswordtokenDecode(req, res) {
  let token = req.body.token;
  console.log(" token recieved", token);
  if (token === null) {
    return res.status(403).send({
      message: `Token  not expired.`,
      data: null,
    }); // if there isn't any token
  }
  jsonwebtoken.verify(token, secretkey, (err, user) => {
    if (err)
      res.status(403).send({
        message: `Token expired.`,
        data: null,
      });
    res.status(200).json(user);
  });
}






export async function RegisterUserWithCaptcha(req,res){
  let data = req.body;
  let connection = getConnection();
  var UserRepository = connection.getRepository("User");
  var newuser;
   
  // verify email
  const response = await UserRepository.findOne({
    email: data.email,
  });

  if (response) {
    res.status(204).json({ data: "Email already exist", message: "false" });
  } else {
    try {
      // register if all good 
      let userData = req.body;
      const hashedPassword = encryptPassword(userData.password);
      let newUser = {
        email: userData.email.toLowerCase(),
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: hashedPassword,
      };
          UserRepository.save(newUser).then(function (newregisteruser) {

            console.log("newuser",newregisteruser, newuser);
            return newregisteruser
          }).then(async function (response) {
            newuser = response
            let retVal = getTokenObject( newuser, {}) 
            var token = jsonwebtoken.sign(retVal, secretkey, {
              expiresIn: 86900,
            });
            res.status(200).json({ data: retVal, message: "success", token: token });
          });
          return newuser
        
      } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Couldn't register user!" });
      }
  }


}

