import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfile,
  getAllUsers,
  getOneUser,
  addUser,
  blockUser,
  updateUserProfile,
  changePassword as changePasswordAPI, // Import change password API function
  resetPassword as resetPasswordAPI, // Import reset password API function
  deleteUser as deleteUserAPI, // Import delete user API function
} from "../services/users";

const initialState = {
  users: [],
  user: {},
  profile: {},
  total: 0,
  currentPage: 1,
  limit: 10, // Adjust default limit as needed
  error: "",
  loading: false,
};

// Async Thunks
export const listUsers = createAsyncThunk(
  "users/listUsers",
  async ({ limit, page, name }) => {
    const res = await getAllUsers({ limit, page, name });
    return res.data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload) => {
    const res = await addUser(payload);
    return res.data;
  }
);

export const getById = createAsyncThunk("users/getById", async (id) => {
  const res = await getOneUser(id);
  return res.data;
});

export const userProfile = createAsyncThunk("users/userProfile", async () => {
  const res = await getProfile();
  return res.data;
});

export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  async (email) => {
    const res = await blockUser(email);
    return res.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUserData, { rejectWithValue }) => {
    try {
      const response = await updateUserProfile(updatedUserData); // Update as per your backend API
      return response.data; // Assuming the API returns updated user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await changePasswordAPI(currentPassword, newPassword); // Call the change password API function
      return response.data; // Assuming the API returns success message or updated user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ userId, newPassword }, { rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(userId, newPassword); // Call the reset password API function
      return response.data; // Assuming the API returns success message or updated user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUserAPI(userId); // Call the delete user API function
      return response.data; // Assuming the API returns success message or confirmation
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Slice
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
        state.error = "";
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.users = action.payload.data;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (index !== -1) {
          state.users[index].isActive = action.payload.isActive;
        }
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.email === action.payload.email
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.message; // Assuming API returns a success message
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.message; // Assuming API returns a success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload.message; // Assuming API returns a success message
        state.users = state.users.filter((user) => user.id !== action.payload.deletedUserId); // Assuming API returns deleted user's ID
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = userSlice.actions;

export const selectUsers = (state) => state.users;

export default userSlice.reducer;

