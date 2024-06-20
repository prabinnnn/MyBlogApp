import instance from "./axios"; // Your Axios instance

export const fetchAdminById = async (id) => {
  return await instance.get(`/admins/${id}`);
};

export const updateAdmin = async (adminData) => {
  const { id, ...data } = adminData; // Assuming adminData includes an `id` property
  return await instance.put(`/admins/${id}`, data);
};
