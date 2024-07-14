import { useEffect, useState } from "react";
import instance from "../utils/axios"; // Adjust path as needed
import { APIs } from "../constants"; // Adjust path as needed

const useBlog = ({ title = "", sort = "" }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20); // Default limit
  const [currentPage, setCurrentPage] = useState(1); // Default current page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          APIs.BLOGS +
            `/published-only?title=${title}&sortBy=${sort}&limit=${limit}&page=${currentPage}`
        );
        setData(response.data);
        setTotal(response.data.total); // Assuming total is returned in response
        setMsg(""); // Clear any previous error messages
      } catch (error) {
        setError(error);
        setMsg("Error fetching blogs"); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title, sort, limit, currentPage]);

  return {
    data,
    error,
    loading,
    msg,
    total,
    limit,
    currentPage,
    setLimit,
    setTotal,
    setCurrentPage,
  };
};

export default useBlog;
