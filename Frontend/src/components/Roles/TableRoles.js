import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { fetchAllRoles , deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";

const TableRoles= forwardRef((props, ref) => {
    const [listRoles, setListRoles] = useState([])

    const getAllRoles = async() => {
        try{
            let data  = await fetchAllRoles()
            setListRoles(data.DT)
            
        }catch(e){
            console.log(e);
        }   
    }

    const handleDeleteRole = async(id) => {
        try{ 
            let response  = await deleteRole(id)
            if(response && response.EC === 0){
                toast.success(response.EM)
                getAllRoles()
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect( () => {
        getAllRoles()
    },[])

    useImperativeHandle(ref, () => ({
        getAllRoles
    }));
    
    return ( 
        <>
        <h3>All Roles</h3>
        <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">URL</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listRoles.map((role, index) => {
                return (
                  <tr key={`role - ${index}`}>
                    <td>{role.id}</td>
                    <td>{role.url}</td>
                    <td>{role.description}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
     );
})

export default TableRoles;