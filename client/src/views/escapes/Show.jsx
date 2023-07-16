import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const Show = () => {
    const navigate = useNavigate();
    const [escape, setEscape] = useState({});
    const { id } = useParams();

    const onDelete = () => {
        axios
            .delete(`/escapes/${id}`)
            .then((res) => {
                if(res.status === 200){
                    navigate(`/escapes`);
                }
            })
            .catch((err) => {
                console.log("Error Deleting Escape: Show JSX");
                console.log(err);
            })
    }

    useEffect(() => {
        axios
            .get(`/escapes/${id}`)
            .then((res) => {
                setEscape(res.data.escape);
            })
            .catch((err) => {
                console.log("Error in displaying Escape: Show JSX");
                console.log(err);
            });
    }, [id]);

    return (
        <>
            {
                escape ? (
                    <>
                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="card mb-3">
                                    <img src={escape.image} className="card-img-top" alt={escape.title}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{escape.title}</h5>
                                        <p className="card-text">{escape.description}</p>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item text-muted">{escape.location}</li>
                                        <li className="list-group-item">₹{escape.price} per person / day</li>
                                    </ul>
                                    <div className="card-body">
                                        <a href={`/escapes/${id}/edit`} className="card-link btn btn-info">Edit</a>
                                        <button onClick={onDelete} className='btn btn-danger ms-2'>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>
                ) : (
                    <h2>No Escape found!</h2>
                )
            }
            <a href="/escapes">Back to Escapes!</a>
        </>
    )
}

export default Show