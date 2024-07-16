import React, { useState, useEffect } from 'react';
import FeaturedPosts from './FeaturedPosts';
import LatestPosts from './LatestPosts';

const Blogs = ({ blogsData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (blogsData && blogsData.data) {
      setData(blogsData.data);
    }
  }, [blogsData]);

  const featuredBlogIds = [1, 2]; // Replace with your featured blog IDs
  const featuredBlogs = data.filter(blog => featuredBlogIds.includes(blog.id));
  const latestPosts = data
    .filter(blog => !featuredBlogIds.includes(blog.id))
    .slice(0, 4); // Adjust the number of latest posts as needed

  return (
    <div className="w-full dark:bg-gray-900 text-white p-6">
      <div className="max-w-[1340px] mx-auto">
        <div className="w-full pt-32 lg:mt-16 lg:pt-16 text-center mb-6">
          <h2 className="lg:text-3xl text-2xl lg:py-4 font-bold text-white mb-4">
            Featured Content
          </h2>
          <div className="grid ss:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredBlogs.map(blog => (
              <FeaturedPosts key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        <div className="w-full text-center my-6 py-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white py-4 mb-4">
            Latest Posts
          </h2>
          <div className="grid ss:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {latestPosts.map(blog => (
              <LatestPosts key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
        <div className="w-full text-center mb-8 py-2">
          <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-full text-sm uppercase">
            Load More
          </button>
        </div>

        <div className="grid ss:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 py-24 lg:px-4 my-2">
          {data
            .filter(blog => !featuredBlogIds.includes(blog.id))
            .map(blog => (
              <div key={blog.id} className="dark:bg-slate-800 overflow-hidden rounded-xl shadow-inner hover:bg-slate-700 drop-shadow-2xl">
                <img
                  className="h-62 w-[100%] object-cover rounded-2xl m-auto p-2"
                  src={`http://localhost:1337${blog.attributes.coverImg.data.attributes.url}`}
                  alt={blog.attributes.blogTitle}
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl my-1">
                    {blog.attributes.blogTitle}
                  </h3>
                  <p className="text-gray-300 text-base py-2">
                    {blog.attributes.blogDesc}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
