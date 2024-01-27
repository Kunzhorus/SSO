import { getGroup } from "../services/groupService";

const readGroupController = async (req, res) => {
  try {
    let data = await getGroup();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (e) {
    console.log(e);
    return {
      EM: "Some thing wrong ",
      EC: 1,
      DT: "data",
    };
  }
};

export { readGroupController }
