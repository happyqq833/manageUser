// import { Modal } from "bootstrap";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { postCreateUser } from "../services/userServices";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {

    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser =  async() => {
        let res = await postCreateUser(name, job);
        
        if(res && res.id){
            handleClose();
            setName("");
            setJob("");
            toast.success("A User is created succeed!");
            handleUpdateTable({first_name: name, id: res.id})
        } else{

        }

    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;