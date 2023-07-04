import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
//import { getGoals } from "../features/goals/goalSlice";
//import { reset } from "nodemon";
import { getGoals, reset } from "../features/goals/goalSlice";
import { getModalData } from "../features/model/modelSlice";
import { deleteGoal } from "../features/goals/goalSlice";
//import GoalItem from "../components/GoalItem";
import StatusModel from "../components/StatusModel";
import TestForm from "../components/TestForm";
import Table from "react-bootstrap/Table";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
  const [edit, setEdit] = useState(null);
  const [show, setShow] = useState(false)
  const [modData, setModData] = useState("")

  //console.log("id", edit);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  //const { modalData } = useSelector((state) => state.modalData);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getGoals());
    }

    dispatch(getModalData());


    return () => {
      dispatch(reset());
    };

   
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
   
  const editValues = (id) => {
    setEdit(id)
  }

  const checkComments = (comment) => {
    if(comment) {
    alert(comment)
    } else {
      alert("no comment yet")
    }
  }

  const handleClose = () => {
    setShow(false)
    setModData("")
    
  }
  const openModel = (goal) => {
    setShow(true)
    setModData(goal)
  }
    
  
  /*if(modData) {
     return (
       <StatusModel show={show} handleClose={handleClose} modData={modData} />
     );
  }*/

  return (
    <>
      {modData ? (
        <StatusModel show={show} handleClose={handleClose} modData={modData} />
      ) : null}
      <section className="heading">
        <h1>Welcome {user && user?.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <section>{user?.email === "tahir@gmail.com" ? <GoalForm /> : ""}</section>
      <section>
        {goals?.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Tasks</th>
                {user?.name === "Tahir" && (
                  <>
                    <th>Responsible</th>
                    <th>Delete</th>
                    <th>Update</th>
                    <th>Comment</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {goals?.map((goal, index) =>
                edit === goal._id ? (
                  <TestForm
                    key={index}
                    goal={goal}
                    edit={edit}
                    setEdit={setEdit}
                  />
                ) : (
                  <tr key={index} style={{ backgroundColor: "#D7DBDD" }}>
                    <td>{new Date(goal?.createdAt).toLocaleString("en-US")}</td>
                    <td
                      onClick={() => openModel(goal)}
                      style={
                        goal.status === true
                          ? { backgroundColor: "#D4EFDF" }
                          : { backgroundColor: "" }
                      }
                    >
                      {goal?.text}

                      {goal?.comments ? (
                        <span
                          style={{
                            color: "red",
                          }}
                          data-toggle="tooltip"
                          data-placement="top"
                          title="comments"
                        >
                          <BiMessageRoundedDetail />
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{goal?.name}</td>
                    {user?.email === "tahir@gmail.com" && (
                      <>
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
                            onClick={() => editValues(goal?._id)}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="edit goal"
                          >
                            <AiFillEdit />
                          </span>
                        </td>
                      </>
                    )}
                    <td
                      onClick={() => checkComments(goal.comments)}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="comments"
                      style={
                        goal.comments ? { color: "red" } : { color: "green" }
                      }
                    >
                      <BiMessageRoundedDetail />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        ) : (
          <h3>You have not set any goal</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
