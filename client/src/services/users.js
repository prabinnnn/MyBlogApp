import instance from "../utils/axios";
import { APIs } from "../constants";

export const login = (payload) => {
  return instance.post(APIs.USERS + "/login", payload);
};

export const register = (payload) => {
  return instance.post(APIs.USERS + "/register", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const generateFPToken = (payload) => {
  return instance.post(APIs.USERS + "/generate-fp-token", payload);
};

export const verifyFPToken = (payload) => {
  return instance.post(APIs.USERS + "/verify-fp-token", payload);
};

export const getAllUsers = ({ limit, page, name }) => {
  return instance.get(
    `${APIs.USERS}?page=${page}&limit=${limit}&name=${name}`,
    {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    }
  );
};

export const getOneUser = (id) => {
  return instance.get(`${APIs.USERS}/${id}`, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

export const addUser = (payload) => {
  return instance.post(APIs.USERS, payload, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};

export const getProfile = () => {
  return instance.get(`${APIs.USERS}/get-profile`, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};
export const updateUserProfile = async (updatedUserData) => {
  const { id, ...rest } = updatedUserData; // Assuming updatedUserData contains user id and updated fields
  const response = await instance.put(`${APIs.USERS}/${id}`, rest, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
  return response.data;
};

export const blockUser = (email) => {
  return instance.patch(
    `${APIs.USERS}/block-user`,
    {
      email,
    },
    {
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    }
  );
};
export const changePassword = (payload) => {
  return instance.put(APIs.USERS + "/change-password", payload, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};
export const resetPassword = (payload) => {
  return instance.put(APIs.USERS + "/reset-password", payload);
};
export const deleteUser = (userId) => {
  return instance.delete(`${APIs.USERS}/${userId}`, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
};
