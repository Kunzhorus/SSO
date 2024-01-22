import db from "../models/index";
import { getGroupWithRoles } from "./JWTservice";
import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { Op } = require("sequelize");
import { v4 as uuidv4 } from "uuid";

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const registerNewUser = async (rawUserData) => {
  try {
    let isCheckEmail = await checkEmailExist(rawUserData.email);
    let isCheckPhone = await checkPhoneExist(rawUserData.phone);

    if (isCheckEmail) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }

    if (isCheckPhone) {
      return {
        EM: "The phone is already exist",
        EC: 1,
      };
    }

    let password = hashPassword(rawUserData.password);
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: password,
      phone: rawUserData.phone,
      groupId: rawUserData.groupId ? rawUserData.groupId : 4,
      // groupId : 4
    });

    return {
      EM: "User is created successfully",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong in service",
      EC: -2,
    };
  }
};

const loginUser = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        const code = uuidv4();
        let roles = await getGroupWithRoles(user);
        // let payload = {
        //   email : user.email,
        //   username: user.username,
        //   roles
        // }
        // let token = createJWT(payload)
        return {
          EM: "Login successfully",
          EC: 0,
          DT: {
            code: code,
            email: user.email,
            roles,
            username: user.username,
          },
        };
      }
    }

    return {
      EM: "The email/phone or password is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong in service",
      EC: -2,
    };
  }
};

const updateUserRefreshToken = async (email, token) => {
  try {
    await db.User.update({ refreshToken: token }, { where: { email: email } });
  } catch (error) {
    console.log(error);
  }
};

const upsertUserSocialMedia = async (typeAcc, dataRaw) => {
  try {
    let user = null;
    if (typeAcc === "GOOGLE") {
      user = await db.User.findOne({
        where: {
          email: dataRaw.email,
          type: typeAcc,
        },
        raw: true,
      });

      if (!user) {
        user = await db.User.create({
          email: dataRaw.email,
          username: dataRaw.username,
          type: typeAcc,
        });
        user = user.get({ plain: true });
      }
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

export {
  registerNewUser,
  loginUser,
  hashPassword,
  checkEmailExist,
  checkPhoneExist,
  updateUserRefreshToken,
  upsertUserSocialMedia,
};
