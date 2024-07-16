import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function Card(props) {
  return (
    <div className="card mx-auto" style={{ width: '18rem', margin: '15px' }}>
      <img
        src={props.image}
        className="card-img-top"
        alt={`Image ${props.id}`}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{props.name}</h5>
        <Link
          className="btn btn-primary text-white font-weight-bold"
          to={`/Profile/${props.id}`}
          id={props.id}
        >
          Click to view Profile
        </Link>
      </div>
    </div>
  );
}

export default memo(Card);

