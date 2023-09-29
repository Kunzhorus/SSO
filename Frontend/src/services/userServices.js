import axios from "../Axios/customizeAxios";

const registerNewUser = (email, username, phone, password) => {
  return axios.post("/api/register", {
    email,
    username,
    phone,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axios.post("/api/login", {
    valueLogin,
    password,
  });
};

const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
};

const createNewUser = (userData) => {
  return axios.post(`/api/user/create`, { ...userData });
};

const updateUser = (userData) => {
  return axios.put(`/api/user/update`, { ...userData });
};

const deleteUser = (id) => {
  return axios.delete(`/api/user/delete`, { data: { id } });
};

const fetchGroups = () => {
  return axios.get("/api/group/read");
};

const getUserAccount = () => {
  return axios.get("/api/account");
};

const logoutUser = () => {
  return axios.get("/api/logout");
};

export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchGroups,
  createNewUser,
  updateUser,
  getUserAccount,
  logoutUser
};
