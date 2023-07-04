import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { createModalData } from "../features/model/modelSlice";
import { getModalData } from "../features/model/modelSlice";

const StateModal = ({ show, handleClose, modData }) => {
 
  const [val, setVal] = useState({ status: "" });

 let objId;
 objId = modData._id;

 let objText;
 objText = modData.text;

 let name;
 name = modData.name;

  const defaultValues = {
    isSubmitted: false,
    date: null,
  };
  

  const [defVal, setDefVal] = useState(defaultValues);
 
  const { status } = val;
  const { isSubmitted, date } = defVal;

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { modalData } = useSelector((state) => state.modalData);

  useEffect(() => {
    dispatch(getModalData());
  }, [dispatch]);

  const onChange = (e) => {
    setVal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newObj = {
      status,
      isSubmitted,
      date,
      objId,
      objText,
      name,
    };
    dispatch(createModalData(newObj));
    setVal({ status: "" });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{}</Modal.Title>
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <Modal.Body>
          <label htmlFor="status">Update</label>
          <input
            type="text"
            name="status"
            id="status"
            value={status}
            onChange={onChange}
          />
          <label htmlFor="status">edit</label>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
export default StateModal;
