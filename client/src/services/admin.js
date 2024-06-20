// admin.js

import instance from "../utils/axios"; // Adjust the import path as per your file structure

// Function to fetch admin by ID
export const getAdminById = async (id) => {
  try {
    const response = await instance.get(`/admins/${id}`);
    return response.data; // Assuming the API returns JSON data
  } catch (error) {
    console.error("Error fetching admin by id:", error);
    throw error; // Propagate the error to the calling function
  }
};

// Function to update admin data
export const updateAdmin = async (adminData) => {
  const { id, ...data } = adminData; // Destructure adminData to separate `id` and other data
  try {
    const response = await instance.put(`/admins/${id}`, data);
    return response.data; // Assuming the API returns updated admin data
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error; // Propagate the error to the calling function
  }
};
