import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

/* GET ALL PROJECTS */
export const getAllProjects = createAsyncThunk(
  "admin/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/admin/projects");
      return data.projects;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

/* APPROVE PROJECT */
export const approveProject = createAsyncThunk(
  "admin/approveProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/admin/projects/${projectId}/approve`);
      toast.success("Project Approved");
      return data.project;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

/* REJECT PROJECT */
export const rejectProject = createAsyncThunk(
  "admin/rejectProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/admin/projects/${projectId}/reject`);
      toast.success("Project Rejected");
      return data.project;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    students: [],
    teachers: [],
    projects: [],
    users: [],
    stats: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* GET PROJECTS */
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;