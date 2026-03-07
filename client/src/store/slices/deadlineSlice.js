import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

/* CREATE DEADLINE */
export const createDeadline = createAsyncThunk(
  "deadline/createDeadline",
  async (deadlineData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/admin/deadlines", deadlineData);
      toast.success("Deadline created successfully");
      return data.deadline;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create deadline");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* GET DEADLINES */
export const getDeadlines = createAsyncThunk(
  "deadline/getDeadlines",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/deadlines");
      return data.deadlines;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const deadlineSlice = createSlice({
  name: "deadline",

  initialState: {
    deadlines: [],
    nearby: [],
    selected: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* CREATE DEADLINE */
      .addCase(createDeadline.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDeadline.fulfilled, (state, action) => {
        state.loading = false;
        state.deadlines.push(action.payload);
      })
      .addCase(createDeadline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET DEADLINES */
      .addCase(getDeadlines.fulfilled, (state, action) => {
        state.deadlines = action.payload;
      });
  },
});

export default deadlineSlice.reducer;