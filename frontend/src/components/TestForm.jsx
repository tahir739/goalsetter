import React, { useState } from "react";
import { updateGoal } from "../features/goals/goalSlice";
import { useDispatch } from "react-redux";

const TestForm = ({ goal, index, setEdit}) => {
    const [editVal, setEditVal] = useState(goal ? {text: goal.text, name: goal.name } : {text: "", name: ""})
       
    const {text, name} = editVal

    const dispatch = useDispatch();

    const handleChange = (e) => {
      setEditVal((prev) =>({
        ...prev,
        [e.target.name] : e.target.value
      }))
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      //console.log("button clicked")

      const editedText = {
        id: goal._id,
        text: editVal.text,
        name: editVal.name,
      }
      console.log(editedText)

      dispatch(updateGoal(editedText)) 
      setEdit(null)
    }

  return (
    <tr key={index} style={{ backgroundColor: "", outline: "none" }}>
      <td>{new Date(goal?.createdAt).toLocaleString("en-US")}</td>
      <td>
        <textarea
          style={{ width: "100%", height: "100%", padding: "3px" }}
          type="text"
          name="text"
          value={editVal.text}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="name"
          value={editVal.name}
          onChange={handleChange}
        />
      </td>

      <td onClick={handleSubmit}>save</td>
    </tr>
  );
};

export default TestForm;
