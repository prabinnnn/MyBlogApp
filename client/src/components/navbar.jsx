import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);

    const handleClick = () => setToggle(!toggle);

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/about">Prabin</Link>
                <button className="navbar-toggler" type="button" onClick={handleClick}>
                    <FontAwesomeIcon icon={toggle ? faTimes : faBars} />
                </button>
                <div className={`collapse navbar-collapse ${toggle ? 'show' : ''}`}>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts">Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

