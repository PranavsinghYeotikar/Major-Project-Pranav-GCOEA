import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

/* ================= LOGIN ================= */

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(res.data.message);
    return res.data.user;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/password/forgot", { email });

      toast.success(res.data.message);
      return null;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset email";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* ================= RESET PASSWORD ================= */

export const resetPassword = createAsyncThunk(
  "auth/password/reset",
  async ({ token, password, confirmPassword }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `/auth/password/reset/${token}`,
        { password, confirmPassword }
      );

      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to reset password";

      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/* ================= GET USER ================= */

export const getUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to get user";

    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.get("/auth/logout");
    return null;
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to logout";

    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* LOGIN */

      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      /* GET USER */

      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
        state.authUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })

      /* LOGOUT */

      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, () => {
        //state.authUser = state.authUser;
      })

      /* FORGOT PASSWORD */

      .addCase(forgotPassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isRequestingForToken = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isRequestingForToken = false;
      })

      /* RESET PASSWORD */

      .addCase(resetPassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isUpdatingPassword = false;
        state.authUser = action.payload;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      });
  },
});

export default authSlice.reducer;