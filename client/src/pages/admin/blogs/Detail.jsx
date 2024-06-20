import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminById, updateAdmin } from "../../../slices/adminSlice";

const AdminDetail = () => {
  const { id } = useParams(); // Extracts ID from URL params
  const navigate = useNavigate(); // Navigation hook from React Router
  const dispatch = useDispatch(); // Access Redux dispatch function
  const { error, admin } = useSelector((state) => state.admins); // Select admin state from Redux store
  const [formData, setFormData] = useState({}); // State to manage form data

  // Fetch admin data by ID
  const fetchAdmin = useCallback(() => {
    dispatch(getAdminById(id)); // Dispatches action to get admin by ID
  }, [dispatch, id]);

  // Effect to fetch admin data on component mount
  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  // Update form data when admin data changes
  useEffect(() => {
    setFormData(admin);
  }, [admin]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission
    dispatch(updateAdmin(formData)) // Dispatches action to update admin
      .then(() => {
        navigate("/admin/admins"); // Navigates back to admin list page on success
      })
      .catch((err) => {
        console.error("Failed to update admin:", err);
        // Handle error (optional): You can set an error state here
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Edit Admin</h2>
      </div>
      {error && <div className="alert alert-danger">{JSON.stringify(error)}</div>}
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roles" className="form-label">Roles</label>
              <select
                className="form-control"
                id="roles"
                value={formData.roles || ""}
                onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/admin/admins" className="btn btn-danger ms-2">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDetail;
