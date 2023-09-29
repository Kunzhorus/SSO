import db from "../models/index";
import { checkPhoneExist, checkEmailExist, hashPassword} from "./loginRegisterService"

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "email", "username", "phone"],
      include: { model: db.Group, attributes: ["id","name", "description"] },
      offset: offset,
      limit: limit,
    });
    let totalPages = Math.ceil(count/limit);
    let data = {
        totalRows: count,
        totalPages: totalPages,
        users: rows
    };

    return {
      EM: "Get data success ",
      EC: 0,
      DT: data
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong ",
      EC: 1,
      DT: "data",
    };
  }
};

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "email", "username", "phone"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong ",
      EC: 1,
      DT: "data",
    };
  }
};

const createUser = async (data) => {
  try {
    data.password = hashPassword(data.password)
    let isCheckEmail = await checkEmailExist(data.email)
    let isCheckPhone = await checkPhoneExist(data.phone)
    if(isCheckEmail) {
      return {
        EM: "Email is already exist",
        EC: 1,
        DT: ''
      };
    }

    if(isCheckPhone) {
      return {
        EM: "Phone is already exist",
        EC: 1,
        DT: ''
      };
    }
    
    await db.User.create(data);
      return {
        EM: "create user success",
        EC: 0,
        DT: [],
      };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong ",
      EC: 1,
      DT: "data",
    };
  }
};

const updateUser = async (data) => {
  await db.User.update({ email: data.email, username: data.username, phone: data.phone, groupId: data.groupId}, {
    where: {
      id: data.id
    }
  });
  return {
    EM: "Update user success",
    EC: 0,
    DT: [],
  };
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where : {
          id: id
      }
    })

    return {
      EM: "Delete user success",
      EC: 0,
      DT: '',
    };


  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong ",
      EC: 1,
      DT: "data",
    };
  }
};

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
