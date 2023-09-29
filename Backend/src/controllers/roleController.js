import {
  createNewRoles,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignToGroup
} from "../services/roleService";

const readRoleController = async (req, res) => {
  try {
    let data = await getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const createRoleController = async (req, res) => {
  try {
    let data = await createNewRoles(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const updateRoleController = async (req, res) => {
  try {
    let data = await updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const deleteRoleController = async (req, res) => {
  try {
    let data = await deleteRole(req.body.id);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};

const getRoleByGroupController = async (req, res) => {
  try {
    let data = await getRoleByGroup(req.body.id);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
};

const assignToGroupController = async (req,res )=>{
  try {
    let data = await assignToGroup(req.body.data);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "", //date
    });
  }
}


export {
  readRoleController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
  getRoleByGroupController,
  assignToGroupController
};
