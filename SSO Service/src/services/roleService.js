import db from "../models/index";
const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url"],
      raw: true,
    });
    const roleAdded = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    if (roleAdded.length === 0) {
      return {
        EM: "All that roles already exist, nothing created",
        EC: 0,
        DT: [],
      };
    }

    await db.Role.bulkCreate(roleAdded);
    return {
      EM: `Created ${roleAdded.length} roles successfully`,
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll();
    return {
      EM: `Get all roles successfully`,
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong with services",
      EC: 1,
      DT: [],
    };
  }
};

const deleteRole = async (id) => {
  try {
    await db.Role.destroy({
      where: { id: id },
    });

    return {
      EM: `Delete Roles succeeds`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
};

const getRoleByGroup = async (id) => {
  try {
    let roles = await db.Group.findOne({
      where: { id: id },
      attributes: ["id", "name", "description"],
      include: {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    return {
      EM: `Get Roles of Group succeeds`,
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
};


const assignToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({
      where: {groupId: +data.groupId}
    })
    await db.Group_Role.bulkCreate(data.groupRoles)
    return {
      EM: `Assgin Roles to Group succeeds`,
      EC: 0,
      DT: []
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with servies",
      EC: 1,
      DT: [],
    };
  }
}


export {
  createNewRoles,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignToGroup,
};
