import axios from "axios";

const API_URL = "/api/goals/";

// create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

//update goal
const updateGoal = async (goalData, token) => {
  console.log("=>>>rt", goalData);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + goalData.id, goalData, config);
  //console.log(response.data);
  return response.data;
};

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);

  return response.data;
};

const goalService = {
  createGoal,
  updateGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
