import Form from "react-bootstrap/Form";
import { fetchGroups } from "../../services/userServices";
import { fetchAllRoles } from "../../services/roleService";
import { useEffect, useState } from "react";
import { fetchRolesByGroup , assignRoleToGroup} from "../../services/roleService";
import _ from "lodash";
import { toast } from "react-toastify";
function GroupRole() {
  const [groups, setGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState();

  const getGroups = async () => {
    let response = await fetchGroups();
    setGroups(response.DT);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const getAllRoles = async () => {
    try {
      let data = await fetchAllRoles();
      return data.DT;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectGroup = async (value) => {
    try {
      setSelectGroup(value);
      if (value) {
        let data = await fetchRolesByGroup(value);
        let roles = data.DT.Roles;
        let allRoles = await getAllRoles();
        let result = builDataRolesByGroup(roles, allRoles);
        setListRoles(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const builDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };

  const handleChangeAssigned = (value) => {
    const _listRoles = _.cloneDeep(listRoles);
    let foundIndex = _listRoles.findIndex((item) => +item.id === +value);
    if (foundIndex >= 0) {
      _listRoles[foundIndex].isAssigned = !_listRoles[foundIndex].isAssigned;
    }
    setListRoles(_listRoles);
  };

  const buildDataToSave = () => {
    let result = {};
    result.groupId = selectGroup;
    const _listRoles = _.cloneDeep(listRoles);
    let assignedRoles = _listRoles.filter(role => role.isAssigned === true)
    let GroupRoles = assignedRoles.map( role => {
      let data = { groupId: selectGroup, roleId: role.id}
      return data;
    })
    result.groupRoles = GroupRoles
    return result
  };

  const handleSaveAssign = async () => {
    let data = buildDataToSave();
    let response = await assignRoleToGroup(data);
    if(response && response.EC === 0){
      toast.success(response.EM)
    }
  };


  return (
    <div className="group-role-cotainer container">
      <div className="assign-group-role">
        <h4 className="mt-3">Group Role</h4>
        <Form.Group className="mb-3 col-7 col-md-4">
          <Form.Label>Select Group:</Form.Label>
          <Form.Select
            onChange={(event) => handleSelectGroup(event.target.value)}
          >
            <option value="">Please select a group</option>
            {groups.map((group, index) => {
              return (
                <option key={`group-${index}`} value={group.id}>
                  {group.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </div>

      <hr />

      {selectGroup && (
        <div className="roles">
          <h4>Assign Role:</h4>
          {listRoles &&
            listRoles.length > 0 &&
            listRoles.map((role, index) => {
              return (
                <div className="form-check" key={`role-${index}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={role.id}
                    id={`role-${index}`}
                    checked={role.isAssigned}
                    onChange={(event) =>
                      handleChangeAssigned(event.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor={`role-${index}`}>
                    {role.url}
                  </label>
                </div>
              );
            })}
          <button
            className="btn btn-warning mt-3"
            onClick={() => handleSaveAssign()}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default GroupRole;
