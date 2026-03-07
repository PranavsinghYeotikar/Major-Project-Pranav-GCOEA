import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

/* SUBMIT PROPOSAL */
export const submitProposal = createAsyncThunk(
  "student/submitProposal",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/student/proposal", formData);
      toast.success("Proposal submitted successfully");
      return data.project;
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* GET STUDENT PROJECT */
export const getStudentProject = createAsyncThunk(
  "student/getStudentProject",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/student/project");
      return data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* GET SUPERVISORS */
export const getSupervisors = createAsyncThunk(
  "student/getSupervisors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/teachers");
      return data.teachers;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    project: null,
    files: [],
    supervisors: [],
    dashboardStats: [],
    supervisor: null,
    deadlines: [],
    feedback: [],
    status: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* SUBMIT PROPOSAL */
      .addCase(submitProposal.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(submitProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* GET STUDENT PROJECT */
      .addCase(getStudentProject.fulfilled, (state, action) => {
        state.project = action.payload;
      })

      /* GET SUPERVISORS */
      .addCase(getSupervisors.fulfilled, (state, action) => {
        state.supervisors = action.payload;
      });
  },
});

export default studentSlice.reducer;