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
function ModalCreateUser(props) {
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
    password: "",
  };

  const [userData, setUserData] = useState(defaultUserData);

  useEffect( () => {
    setUserData(defaultUserData)
  },[props.show])
  
  const handleConfirmUser = async () => {
      if ( !userData.email || !userData.username || !userData.phone || !userData.password ){
        toast.error("Please fill all filed")
        return
      }
      let res = await createNewUser(userData);
      if (res.EC === 0) {
        toast.success(res.EM);
        props.handleClose();
        props.fetchData();
      }
      if (res.EC === 1) {
        toast.error(res.EM);
      }
      
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Create new user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={ userData.email}
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
                value={ userData.username}
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
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
            Create New User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
