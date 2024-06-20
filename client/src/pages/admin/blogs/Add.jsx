
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBlog } from "../../../slices/blogSlice";

const BlogAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    title: "",
    content: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog(payload))
      .then(() => {
        navigate("/blogs"); // Navigate to blog list page on successful creation
      })
      .catch((err) => {
        console.error("Failed to create blog:", err);
        // Handle error (optional): You can set an error state here
      });
  };

  return (
    <div className="container mt-5 d-grid gap-4">
      <div className="d-flex justify-content-between">
        <h2>Add New Blog Post</h2>
      </div>
      <div className="d-flex">
        <div className="card w-100 shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={payload.title}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control"
                  value={payload.content}
                  onChange={(e) =>
                    setPayload((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              &nbsp;
              <Link to="/blogs" className="btn btn-danger">
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdd;
