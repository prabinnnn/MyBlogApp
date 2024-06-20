import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminById as fetchAdminById, updateAdmin as updateAdminProfile } from "../services/admin"
const initialState = {
  admins: [],
  admin: {},
  error: null,
  loading: false,
};

export const getAdminById = createAsyncThunk(
  "admins/getAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchAdminById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await updateAdminProfile(adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminById.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getAdminById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
