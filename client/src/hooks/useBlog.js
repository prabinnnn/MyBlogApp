import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { APIs } from "../constants";

const useBlog = ({ title = "", sort = "" }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          APIs.BLOGS +
            `/published-only?title=${title}&sortBy=${sort}&limit=${limit}&page=${currentPage}`
        );
        setData(response.data);
        setTotal(response.data.total);
        setMsg("");
        setError(null);
      } catch (error) {
        setError(error);
        setMsg("Error fetching blogs");
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
