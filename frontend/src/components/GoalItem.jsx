import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { getModalData } from "../features/model/modelSlice";
import StateModal from "./StateModal";
import GoalForm from "./GoalForm";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
//import StatusModel from "./StatusModel";
import { useNavigate } from "react-router-dom";
import EditTaskModel from "./EditTaskModel";

const GoalItem = ({ goal }) => {
  const [show, setShow] = useState(false);
  
  const [modData, setModData] = useState("");
  const [edit, setEdit] = useState({ id: null, text: "", name: "" });
  //console.log(modData, "modData")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { modalData } = useSelector((state) => state.modalData);

  useEffect(() => {
    dispatch(getModalData());
  }, [dispatch]);

  

  const openModel = (goal) => {
    setShow(true);
    setModData(goal);
  };

 

  const handleClose = () => {
    setShow(false);
  };

 /* if(modData) {
    return (
      <StatusModel
        show={show}
        handleClose={handleClose}
        modData={modData}
      />
    );
  }*/

  if (edit.id) {
    return <GoalForm edit={edit} />;
    
  }

  const checkComments = (comment) => {
    alert(comment);
  };

  return (
    <>
   
        
       {/* <StatusModel show={show} handleClose={handleClose} modData={modData.text} />*/}
   

      <td>{new Date(goal?.createdAt).toLocaleString("en-US")}</td>
      <td onClick={() => openModel(goal)} style={goal.status === "true" ? {backgroundColor: "green"} : {color: "black"}}>{goal?.text}</td>
      {user?.name === "Tahir" && (
        <>
          <td>{goal?.name}</td>
          <td
            onClick={() => dispatch(deleteGoal(goal?._id))}
            data-toggle="tooltip"
            data-placement="top"
            title="delete goal"
          >
            <AiOutlineClose />
          </td>
          <td>
            <span
              onClick={() =>
                setEdit({ id: goal._id, text: goal.text, name: goal.name })
              }
              data-toggle="tooltip"
              data-placement="top"
              title="edit goal"
            >
              <AiFillEdit />
            </span>
          </td>
          <td
            onClick={() => checkComments(goal.comments)}
            data-toggle="tooltip"
            data-placement="top"
            title="comments"
            style={goal.comments ? {color: "red"}: {color: "green"}}
          >
            <BiMessageRoundedDetail />
          </td>
        </>
      )}
    </>
  );
};

export default GoalItem;
