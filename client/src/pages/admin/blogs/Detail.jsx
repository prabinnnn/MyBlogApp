import  { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getBlogById, updateBlog } from "../../../slices/blogSlice";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { error, blog } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});

  // Fetch blog data by ID on component mount
  const initFetch = useCallback(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

  // Initialize fetch on component mount
  useEffect(() => {
    initFetch();
  }, [initFetch]);

  // Update local state when blog data changes
  useEffect(() => {
    setPayload(blog);
  }, [blog]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog(payload))
      .then(() => {
        navigate("/blogs"); // Navigate to blog list page on successful update
      })
      .catch((err) => {
        console.error("Failed to update blog:", err);
        // Handle error (optional): You can set an error state here
      });
  };

  return (
    <div className="container mt-5 d-grid gap-4">
      <div className="d-flex justify-content-between">
        <h2>Edit Blog Post</h2>
      </div>
      {error ? <>{JSON.stringify(error)}</> : <></>}
      <div className="d-flex">
        <div className="card w-100 shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={payload?.title || ""}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, title: e.target.value };
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control"
                  value={payload?.content || ""}
                  onChange={(e) =>
                    setPayload((prev) => {
                      return { ...prev, content: e.target.value };
                    })
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

export default BlogDetail;
