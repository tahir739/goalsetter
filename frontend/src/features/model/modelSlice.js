import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import goalService from "./goalService";
import modelService from "./modelService";

const initialState = {
  modalData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createModalData = createAsyncThunk(
  "modalData/create",
  async (modalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await modelService.createModalData(modalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get modal data
export const getModalData = createAsyncThunk(
  "modalData/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await modelService.getModalData(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
/*
// delete user goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
*/
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createModalData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createModalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modalData.push(action.payload);
      })
      .addCase(createModalData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getModalData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modalData = action.payload;
      })
      .addCase(getModalData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    /*
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
      */
  },
});

export const { reset } = modalSlice.actions;
export default modalSlice.reducer;
