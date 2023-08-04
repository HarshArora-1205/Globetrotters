import React, {useEffect, useState} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Escapes = () => {
  const [escapes, setEscapes] = useState([]);
  
  useEffect(() => {
    axios
      .get("/escapes")
      .then((res) => {
        // toast.success("Fetched all Escapes");
        setEscapes(res.data.escapes);
      })
      .catch((err) => {
        toast.error("Error in fetching Escapes");
    });
  }, []);

  return (
    <>
      <h1>All Escapes</h1>
      <ul>
        {escapes?.length ? (
          escapes.map((escape, index) => (
            <div key={index} className="card mb-3">
              <div className="row">
                <div className="col-md-4">
                  <img src={escape.image} alt={escape.title} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {escape.title}
                    </h5>
                    <p className="card-text">
                      {escape.description}
                    </p>
                    <p className="card-text">
                      <small className='text-muted'>
                        {escape.location}
                      </small>
                    </p>
                    <Link to={`/escapes/${escape._id}`} className="btn btn-primary">
                      View {escape.title}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>No Escape found!</h2>
        )}
      </ul>
    </>
  )
}

export default Escapes