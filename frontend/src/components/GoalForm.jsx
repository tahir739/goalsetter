import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal, updateGoal } from "../features/goals/goalSlice";
import axios from "axios";

const GoalForm = (props) => {
 // const [val, setVal] = useState({text: "", name: ""});
  const [val, setVal] = useState(
    props.edit
      ? {id: props.edit.id, text: props.edit.text, name: props.edit.name }
      : { text: "", name: "", status: false, comments: "" }
  );

  const { text, name, status, comments, id } = val;


  const dispatch = useDispatch();

  const onChange = (e) => {
    setVal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newGoal = {
      text,
      name,
      status,
      comments,
    };

    const updatedData = {
      id: id,
      text: text,
      name: name,
    };
    /*const useObj = JSON.parse(localStorage.getItem("user"));
    const config = {
    headers: {
      authorization: `Bearer ${useObj?.token}`,
    },
  };
  const response = await axios.put(
    "http://localhost:5000/api/goals/" + id,
    updatedData,
    config
  );
  console.log("res=>>", response) */
    props.edit
      ? dispatch(updateGoal(updatedData))
      : dispatch(createGoal(newGoal));
    setVal("");
  };
  return (
    <section>
      {props.edit ? (
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <textarea
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit Changes
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="form">
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <textarea
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default GoalForm;
