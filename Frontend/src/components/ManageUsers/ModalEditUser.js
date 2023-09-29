import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  fetchGroups,
  createNewUser,
  updateUser,
} from "../../services/userServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function ModalEditUser(props) {
  // Group
  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    let response = await fetchGroups();
    setGroups(response.DT);
  };
  useEffect(() => {
    getGroups();
  }, []);

  //  User

  const defaultUserData = {
    email: "",
    username: "",
    phone: "",
    groupId: 1,
  };

  const [userData, setUserData] = useState(defaultUserData);

  useEffect(() => {
    setUserData({
      id: props.dataModal.id,
      email: props.dataModal.email,
      username: props.dataModal.username,
      phone: props.dataModal.phone,
      groupId: props.dataModal.Group ? props.dataModal.Group.id : "",
    });
  }, [props.dataModal]);

  const handleConfirmUser = async () => {
    try {
      let res = await updateUser(userData);
      if (res.EC === 0) {
        toast.success(res.EM);
        props.handleClose();
        props.fetchData();
      }
      if (res.EC === 1) {
        toast.error(res.EM);
      }
    } catch (e) {
      props.handleClose();
      console.log(e);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Group</Form.Label>
              <Form.Select
                value={userData.groupId}
                onChange={(e) =>
                  setUserData({ ...userData, groupId: e.target.value })
                }
              >
                {groups.map((group, index) => {
                  return (
                    <option key={`group-${index}`} value={group.id}>
                      {group.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmUser}>
            {props.action === "CREATE" ? "Save New User" : "Update User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;
