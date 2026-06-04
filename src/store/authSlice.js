import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Aapka backend URL

// ─── ASYNC THUNK FOR LOGIN ──────────────────────────────────────────────────
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Backend controller (/login) par hit marega
      const response = await axios.post(`${API_URL}/login`, userData);
      
      // Response mein token, user core data, aur profile aayegi
      return response.data; 
    } catch (error) {
      // Backend se aane wala custom error message catch karein
      const message = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  profile: localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null,
  token: localStorage.getItem("token") || null,
  loading: false, // Component ka loading spinner is se chalega
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout simple reducer rahega
    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  // ExtraReducers async actions ki standard lifecycle states handle karte hain
  extraReducers: (builder) => {
    builder
      // 1. Jab request bheinji jaye (Pending)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 2. Jab API data successfully le aaye (Fulfilled)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile; // Extension profile (Admin/Teacher/Student)
        state.token = action.payload.token;
        state.error = null;

        // LocalStorage mein persistent state backup
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("profile", JSON.stringify(action.payload.profile));
        localStorage.setItem("token", action.payload.token);
      })
      // 3. Jab backend request fail ho jaye (Rejected)
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // rejectWithValue wala message yahan aayega
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;