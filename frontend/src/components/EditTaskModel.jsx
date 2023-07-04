import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

const EditTaskModel = (props) => {
  
 
  //console.log("data", props.edit);
  
  const dispatch = useDispatch();
  const [val, setVal] = useState(props.edit.id ? {status: props.edit.text, comments: props.edit.name} : { status: "", comments: "" });
   // console.log("val", val);
   
 
  
  const { status, comments } = val;

  const onChange = (e) => {
    setVal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal show={props.showModel} onHide={props.handleCloseModel}>
      <Modal.Header closeButton>
        <Modal.Title>{}</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <div>
            <label htmlFor="status">Update</label>
            <input
              type="text"
              name="status"
              id="status"
              value={status}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="comments">com</label>
            <textarea
              type="text"
              name="comments"
              id="comments"
              value={comments}
              onChange={onChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModel}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default EditTaskModel;
