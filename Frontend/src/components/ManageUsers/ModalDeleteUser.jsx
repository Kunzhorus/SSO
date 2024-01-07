import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeleteUser(props) {
  return ( 
    <>
     <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete {props.dataModal.email} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
   );
}

export default ModalDeleteUser;