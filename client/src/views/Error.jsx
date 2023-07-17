import React from 'react';
import { useNavigate } from 'react-router';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className='row'>
      <div className="col-6 offset-3">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Sorry, Something Went Wrong</h4> 
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  )
}

export default Error