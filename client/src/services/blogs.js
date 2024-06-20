import instance from "../utils/axios";
import { APIs } from "../constants";

// Function to fetch published blogs with optional parameters
export const publishedBlogs = async ({
  title = "",
  sort = "",
  limit = 20,
  page = 1,
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance.get(
      APIs.BLOGS +
        `/published-only?title=${title}&sortBy=${sort}&limit=${limit}&page=${page}`
    );
    return response.data; // Return fetched blogs data
  } catch (error) {
    throw error; // Handle errors in your component or slice
  }
};

// Function to fetch a blog by its slug
export const getBlogBySlug = async (slug) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance.get(APIs.BLOGS + `/${slug}`);
    return response.data; // Return fetched blog data
  } catch (error) {
    throw error; // Handle errors in your component or slice
  }
};

// Function to fetch a blog by its ID
export const getBlogById = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance.get(APIs.BLOGS + `/id/${id}`);
    return response.data; // Return fetched blog data
  } catch (error) {
    throw error; // Handle errors in your component or slice
  }
};

// Function to create a new blog
export const createBlog = async (blogData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance.post(APIs.BLOGS, blogData);
    return response.data; // Return created blog data
  } catch (error) {
    throw error; // Handle errors in your component or slice
  }
};
