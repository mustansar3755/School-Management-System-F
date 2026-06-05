import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/superadmin";

const getAuthConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// 1. Fetch All Schools Thunk (Updated for structural safety)
export const fetchSchools = createAsyncThunk(
  "schools/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/all-schools`,
        getAuthConfig(),
      );

      console.log("Frontend API Raw Response Data:", response.data); // Pure data ko inspect karne ke liye

      // 🔥 SAFE CHECK:
      // 1. Agar data direct array hai: response.data
      // 2. Agar data wrapper object ke andar hai: response.data.schools
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && Array.isArray(response.data.schools)) {
        return response.data.schools;
      }

      // Fallback agar format bilkul match na kare to object keys check karein
      return response.data?.schools || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch schools",
      );
    }
  },
);

// 2. Add New School Thunk (Mapped to: /add-school)
export const addSchool = createAsyncThunk(
  "schools/add",
  async (schoolData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/add-school`,
        schoolData,
        getAuthConfig(),
      );
      return response.data.school;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add school",
      );
    }
  },
);

const schoolSlice = createSlice({
  name: "schools",
  initialState: { schoolsList: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cases
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        // Agar action.payload array hai to assign karein, warna empty array
        state.schoolsList = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Cases
      .addCase(addSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.schoolsList.unshift(action.payload);
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default schoolSlice.reducer;
