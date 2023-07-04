import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { updateGoal } from "../features/goals/goalSlice";

const StatusModel = ({ show, handleClose, modData }) => {
  let tex = modData.text;
  let nam = modData.name;
  let id = modData._id;
  let _status = modData.status;
  const comment = modData?.comments;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  
  const [val, setVal] = useState({
    text: modData ? tex : "",
    name: modData ? nam : "",
    comments: modData ? comment : "",
    status: modData ? _status : "",
  });
 
  const { text, name, comments, status } = val;

  const onChange = (e) => {
    /*setVal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));*/
    let submitForm = {...val}
    const {checked, name, value} =e.target;
    submitForm[name] = checked === undefined ? value : checked;
    setVal(submitForm)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const update = {
      text,
      name,
      id,
      comments,
      status,
    };

    dispatch(updateGoal(update));
    handleClose(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{nam}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {user?.email === "tahir@gmail.com" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="status">text</Form.Label>
                <Form.Control
                  as="textarea"
                  name="text"
                  id="text"
                  value={text}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="comments">name</Form.Label>
                <Form.Control
                  as="input"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="comments">comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              id="comments"
              value={comments}
              onChange={onChange}
            />
          </Form.Group>
         
          <Form.Check
           type="checkbox"
           label="update status"
           id="status"
           name="status"
           checked={status}
           onChange={onChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default StatusModel;
