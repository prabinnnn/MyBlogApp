// src/contexts/BlogContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Create a context
const BlogContext = createContext();

// Create a provider component
export const BlogContextProvider = ({ children }) => {
  // Define your state and logic here
  const [blogs, setBlogs] = useState([]);

  // Example function to add a blog
  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  // Example context value
  const contextValue = {
    blogs,
    addBlog,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to use the BlogContext
export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogContextProvider');
  }
  return context;
};
