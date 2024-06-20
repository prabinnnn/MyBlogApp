import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogById, createNewBlog } from "../services/blogs";

const initialState = {
  blogs: [],
  blog: {},
  error: null,
  loading: false,
};

// Async thunk action to fetch blog by ID
export const getBlogById = createAsyncThunk(
  "blogs/getBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchBlogById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to create a new blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await createNewBlog(blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a slice for blogs state management
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
        state.blogs.push(action.payload); // Add new blog to the list (optional)
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setCurrentPage, setLimit } = blogSlice.actions; 
export const blogReducer = blogSlice.reducer;
export default blogReducer;
