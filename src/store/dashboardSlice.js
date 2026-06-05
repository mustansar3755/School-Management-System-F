import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ─── ASYNC THUNK FOR STATS FETCHING ─────────────────────────────────────────
export const fetchSuperAdminStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      // Apne exact backend API route ke mutabiq url change kar lein
      const response = await axios.get("http://localhost:5000/api/superadmin/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT secure route verification
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Data fetch failed");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      totalSchools: 0,
      totalAdmins: 0,
      activeStudents: 0,
      pendingRequests: 0,
      recentSchools: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSuperAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;