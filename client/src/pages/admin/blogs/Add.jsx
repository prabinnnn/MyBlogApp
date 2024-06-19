import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createUser } from "../../../slices/userSlice";

const UserAdd = () => {
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    name: "",
    password: "",
    roles: ["admin"],  // Default to admin role
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(payload));
    navigate("/admin/users");
  };

  return (
    <div className="container mt-5 d-grid gap-4">
      <div className="d-flex justify-content-between">
        <h2>Add New Admin</h2>
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
                  value={payload?.name}
                  onChange={(e) =>
                    setPayload((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={payload?.email}
                  onChange={(e) =>
                    setPayload((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={payload?.password}
                  onChange={(e) =>
                    setPayload((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              {/* Role is fixed to admin and hidden */}
              <input type="hidden" value="admin" />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdd;
