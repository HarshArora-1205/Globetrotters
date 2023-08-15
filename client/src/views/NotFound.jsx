import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1 className="display-4 text-danger">404 - Page Not Found</h1>
            <p className="lead">Oops! The page you're looking for doesn't exist.</p>
            <img
              src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=826&t=st=1691927692~exp=1691928292~hmac=7c21d95000997d63c5691349375feaec817fce2931e0750baa83d5e51f533a33"
              alt="404 Error"
              className="img-fluid mt-4"
            />
            <p className="mt-4">
                <Link className="card-link btn btn-success" to={'/'}>Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default NotFound;