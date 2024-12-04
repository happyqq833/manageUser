import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser, updateUser } from "../services/userServices";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    
    const handleDeleteUser = async() => {
        let res = await deleteUser(dataUserDelete.id);

        if(res && +res.statusCode === 204){
            handleClose();
            toast.success("Delete user secceed!");
            handleDeleteUserFormModal(dataUserDelete);
        } else{
            toast.success("Delete user error!")
        }
       
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} 
            backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                       This action can't be undone!
                       Do want to delete this user? 
                       <br/>
                       <b>name: {dataUserDelete.first_name} {dataUserDelete.last_name}</b>
                       <br/>
                       <b>email: {dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser;

