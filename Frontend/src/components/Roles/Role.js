import {useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRoles from "./TableRoles";

function Role() {
  const [listChilds, setListChilds] = useState({
    child1: { url: "", description: "" },
  });

  const handleOnchangeInput = (field, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][field] = value;
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds)
    delete _listChilds[key];
    setListChilds(_listChilds)
  }

  const childRef = useRef();
  const handleSaveRole = async() => {
    let check = true
    let result = []
    Object.entries(listChilds).map(([key, child], index) => {
      if(child.url === ''){
        check = false
        return 
      } else {
        result.push({
          url: child.url,
          description: child.description
        })
      }
    })

    if(check){
     let response = await createRoles(result)
     if(response && response.EC === 0){
       toast.success(response.EM)
       setListChilds({ child1: { url: "", description: "" }})
       childRef.current.getAllRoles()
     }
    } else{
      toast.error("Please fill all URL fied")
    }
    
  }


  return (
    <div className="role-container">
      <div className="container">
        <div className="adding-roles mt-3">
          <h3 className="">Add new role</h3>
          <div className="col-12 ">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="d-flex" key={`child-${key}`}>
                  <div className="form-group col-4">
                    <label htmlFor="exampleInputEmail1">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.url}
                      onChange={(event) =>
                        handleOnchangeInput("url", event.target.value, key)
                      }
                    />
                  </div>

                  <div
                    className="form-group col-4"
                    style={{ marginLeft: "20px" }}
                  >
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.description}
                      onChange={(event) =>
                        handleOnchangeInput("description", event.target.value, key) }
                    />
                  </div>

                  <div className="col-2" style={{ cursor: "pointer" }}>
                    <i
                      className="fa fa-plus-circle"
                      style={{
                        marginTop: "28px",
                        marginLeft: "20px",
                        fontSize: "25px",
                        color: "green",
                      }}
                      onClick={() => handleAddNewInput()}
                    ></i>
                    {index >= 1 && (
                      <i
                        className="fa fa-trash-o"
                        style={{
                          marginTop: "28px",
                          marginLeft: "20px",
                          fontSize: "25px",
                          color: "red",
                        }}
                        onClick={() => handleDeleteInput(key)}
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}

            <button type="submit" className="btn btn-primary mt-3" onClick={() => handleSaveRole()}>
              Save Roles
            </button>
          </div>
        </div>

        <hr/>
        <div className="table-roles">
           <TableRoles ref={childRef}/>
        </div>
        
      </div>
    </div>
  );
}

export default Role;
