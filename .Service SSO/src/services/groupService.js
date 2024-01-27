import db from "../models/index";

const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });

    return {
      EM: "get group success",
      EC: 0,
      DT: data,
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

const getGroupWithRoles = async (user) => {
  let role = await db.Group.findOne({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: { attributes: [] }
    }
  });
  role = role.get({ plain: true });
  return role ? role : {};
};
export { getGroup, getGroupWithRoles };
