import axios from "axios";

const API_URL = "/api/modelData/";

// create new model data
const createModalData = async (modalData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, modalData, config);
  return response.data;
};

// Get modelDatas
const getModalData = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};
/*
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
*/
const modelService = {
  createModalData,
  getModalData,
};

export default modelService;
