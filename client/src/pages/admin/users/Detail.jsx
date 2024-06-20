import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getById, updateUser } from "../../../slices/userSlice";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});

  // Fetch user data by ID on component mount
  const initFetch = useCallback(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  // Initialize fetch on component mount
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  // Update local state when user data changes
  useEffect(() => {
    setPayload(user);
  }, [user]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(payload)) // Dispatch updateUser action with updated user data
      .then(() => {
        navigate("/admin/users"); // Navigate to user list page on successful update
      })
      .catch((err) => {
        console.error("Failed to update user:", err);
        // Handle error (optional): You can set an error state here
      });
  };

  return (
    <div className="container mt-5 d-grid gap-4">
      <div className="d-flex justify-content-between">
        <h2>Edit Users</h2>
      </div>
      {error ? <>{JSON.stringify(error)}</> : <></>}
      <div className="d-flex">
        <div className="card w-100 shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={payload?.name || ""}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={payload?.email || ""}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Roles</label>
                <select
                  className="form-control"
                  value={payload?.roles || ""}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, roles: [e.target.value] };
                    })
                  }
                >
                  <option value="">Select one Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              &nbsp;
              <Link to="/admin/users" className="btn btn-danger">
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

