import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getById, updateUser } from "../../../slices/userSlice";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    name: "",
    roles: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, ...payload }))
      .then(() => {
        navigate("/admin/users");
      })
      .catch((err) => {
        console.error("Failed to update user:", err);
      });
  };

  const initFetch = useCallback(() => {
    dispatch(getById(id));
  }, [dispatch, id]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    if (user) {
      setPayload(user);
    }
  }, [user]);

  return (
    <div className="container mt-5 d-grid gap-4">
      <div className="d-flex justify-content-between">
        <h2>Edit User</h2>
      </div>
      {error && <div className="alert alert-danger">{JSON.stringify(error)}</div>}
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
                    setPayload((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
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
                    setPayload((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Roles</label>
                <select
                  className="form-control"
                  value={payload?.roles[0] || ""}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      roles: [e.target.value],
                    }))
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
