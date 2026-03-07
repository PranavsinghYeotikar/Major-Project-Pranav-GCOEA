import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

/* GET PROJECT */
export const getProject = createAsyncThunk(
  "project/getProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/projects/${projectId}`);
      return data.project;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

/* UPDATE PROJECT */
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/projects/${id}`, formData);
      toast.success("Project updated");
      return data.project;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

/* DOWNLOAD PROJECT FILE */
export const downloadProjectFile = createAsyncThunk(
  "project/downloadFile",
  async (fileId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/file/${fileId}`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    selected: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.selected = action.payload;
    });
  },
});

export default projectSlice.reducer;