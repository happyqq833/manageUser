// import { Modal } from "bootstrap";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateUser } from "../services/userServices";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {

    const { show, handleClose, dataUserEdit, handleEditUserFormModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name);
        }
    },[dataUserEdit])

    const handleEditUser = async () => {
        let res = await updateUser(name, job);
        
        if(res){
            handleEditUserFormModal({
                first_name: name,
                id: dataUserEdit.id
            })
        }
        handleClose();
        toast.success("Update user secceed!")
    };
   
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event) => setName(event.target.value)} 
                                placeholder="Enter Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Job</label>
                                <input type="text" 
                                className="form-control" 
                                value={job} 
                                onChange={(event) => setJob(event.target.value)} 
                                placeholder="Job" />
                            </div>
                            {/* <button type="submit" class="btn btn-primary">Submit</button> */}
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;