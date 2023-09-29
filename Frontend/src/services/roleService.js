import axios from "../Axios/customizeAxios";

const createRoles = (roles) => {
    return axios.post('/api/role/create', [...roles])
}

const fetchAllRoles = () => {
    return axios.get('/api/role/read')
}

const deleteRole = (id) => {
    return axios.delete('/api/role/delete', { data: { id } });
};

const fetchRolesByGroup = (id) => {
    return axios.post('/api/role/by-group',{ id })
}

const assignRoleToGroup = (data) => {
    return axios.post('/api/role/assigned-to-group', {data})
}
export {
    createRoles,
    fetchAllRoles,
    deleteRole,
    fetchRolesByGroup,
    assignRoleToGroup
}