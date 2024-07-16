import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeaturedPosts = ({ blog }) => {
    return (
        <div className="col-md-6">
            <Link to={`/blog/${blog.id}`}>
                <div className="card mb-4 shadow-sm">
                    <img src={`http://localhost:1337${blog.attributes.coverImg.data.attributes.url}`} className="card-img-top" alt={blog.attributes.blogTitle} />
                    <div className="card-body">
                        <h5 className="card-title">{blog.attributes.blogTitle}</h5>
                        <p className="card-text">{blog.attributes.blogDesc}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default FeaturedPosts;

