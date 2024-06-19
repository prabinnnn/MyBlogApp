// src/slices/userSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getOneUser,
  addUser,
  getProfile,
  blockUser,
  updateUserService,
  changePasswordService,
  resetPasswordService,
  deleteUserService,
  deleteProfile // Assuming deleteProfile function is imported from services
} from "../services/users";

const initialState = {
  users: [],
  user: {},
  profile: {},
  total: 0,
  currentPage: 1,
  limit: 100,
  error: null,
  loading: false,
  msg: "", // Optional message for success or additional information
};

// Async thunks for API calls
export const listUsers = createAsyncThunk(
  "users/listUsers",
  async ({ limit, page, name }, { rejectWithValue }) => {
    try {
      const res = await getAllUsers({ limit, page, name });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addUser(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getById = createAsyncThunk(
  "users/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getOneUser(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const userProfile = createAsyncThunk(
  "users/userProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfile();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  async (email, { rejectWithValue }) => {
    try {
      const res = await blockUser(email);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateUserService(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await changePasswordService(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await resetPasswordService(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await deleteUserService(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  "users/deleteUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await deleteProfile(userId); // Assuming deleteProfile is defined somewhere
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.total = 0;
        state.error = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.users = action.payload.data;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to fetch users";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.user = {};
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to create user";
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.user = {};
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to fetch user";
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.profile = {};
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to fetch profile";
      })
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.email === action.payload.data.email
        );
        if (index !== -1) {
          state.users[index].isActive = action.payload.data.isActive;
        }
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to change status";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.data.id
        );
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to update user";
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.message;
        // Handle success if needed
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to change password";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.message;
        // Handle success if needed
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to reset password";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from state.users array
        state.users = state.users.filter((user) => user.id !== action.payload.id);
        state.msg = action.payload.message;
        // Handle success if needed
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to delete user";
      })
      .addCase(deleteUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.message;
        // Handle success if needed
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Failed to delete user profile";
      })
      .addCase(setCurrentPage, (state, action) => {
        state.currentPage = action.payload;
      })
      .addCase(setLimit, (state, action) => {
        state.currentPage = 1;
        state.limit = action.payload;
      });
  },
});

export const { setCurrentPage, setLimit } = userSlice.actions;

export default userSlice.reducer;