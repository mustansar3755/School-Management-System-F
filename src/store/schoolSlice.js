import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/superadmin/schools";

// 1. Fetch All Schools Thunk
export const fetchSchools = createAsyncThunk("schools/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch schools");
  }
});

// 2. Add New School Thunk
export const addSchool = createAsyncThunk("schools/add", async (schoolData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, schoolData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data.school; // Assuming backend returns { message, school }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to add school");
  }
});

const schoolSlice = createSlice({
  name: "schools",
  initialState: { schoolsList: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cases
      .addCase(fetchSchools.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSchools.fulfilled, (state, action) => { state.loading = false; state.schoolsList = action.payload; })
      .addCase(fetchSchools.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add Cases
      .addCase(addSchool.pending, (state) => { state.loading = true; })
      .addCase(addSchool.fulfilled, (state, action) => { state.loading = false; state.schoolsList.unshift(action.payload); })
      .addCase(addSchool.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default schoolSlice.reducer;