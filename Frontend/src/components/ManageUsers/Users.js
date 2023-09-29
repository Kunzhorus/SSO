import React, {  useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../../services/userServices";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalCreateUser from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser";
function Users() {
  
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const currentLimit = 3
  const [totalPages, setTotalPages] = useState(0);

  // Modal
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const handleCloseModal = () => {
    setShowModalDelete(false);
    setShowModalCreate(false);
    setShowModalEdit(false);
  };
  const handleShowModalDelete = (user) => {
    setDataModal({
      id: user.id,
      email: user.email,
    });
    setShowModalDelete(true);
  };

  const handleShowModalCreate = () => {
    setShowModalCreate(true);
  };
  const handleEditModal = (user) => {
    setDataModal(user);
    setShowModalEdit(true);
  };
  
  // Users
  async function fetchData() {
    try {
      let response = await fetchAllUsers(currentPage, currentLimit);
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    let response = await fetchAllUsers(+event.selected + 1, currentLimit);
    setListUsers(response.DT.users);
  };

  const handleDelete = async (id) => {
    try {
      let response = await deleteUser(id);
      if (response.EC === 0) {
        toast.success(response.EM);
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirmDelete = () => {
    handleDelete(dataModal.id);
    setShowModalDelete(false);
  };

  return (
    <>
      <div className="manage-users-container container">
        <div className="user-header">
          <h3>Manage Users</h3>
          <div className="actions">
            <button className="btn btn-primary mb-3" onClick={handleShowModalCreate}>
              Add new User
            </button>
          </div>
        </div>

        <div className="user-body">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Group</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.map((user, index) => {
                return (
                  <tr key={`row - ${index}`}>
                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.Group ? user.Group.name : ""}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-1"
                        onClick={() => handleEditModal(user)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleShowModalDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {totalPages > 0 && (
          <div className="user-footer">
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}

        {/* Modal */}
        <ModalDeleteUser
          show={showModalDelete}
          handleClose={handleCloseModal}
          dataModal={dataModal}
          handleConfirmDelete={handleConfirmDelete}
        />

        <ModalCreateUser
          show={showModalCreate}
          handleClose={handleCloseModal}
          fetchData={fetchData}
        />

        <ModalEditUser
          show={showModalEdit}
          handleClose={handleCloseModal}
          fetchData={fetchData}
          dataModal={dataModal}
        />
      </div>
    </>
  );
}

export default Users;
