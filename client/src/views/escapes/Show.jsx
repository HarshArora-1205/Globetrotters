import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Form, Field } from 'react-final-form'
import * as Validators from "../utils/validators";


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

    const onReviewSubmit = (values) => {
        const payload = {review: {...values}} 
    }

    const ReviewForm = () => {
        return (
            <>
                <h2>Leave a Review</h2>
                <Form
                  onSubmit={onReviewSubmit}
                  render={({ handleSubmit, invalid }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="rating">
                            {({ input, meta }) => (
                                <div className='mb-3'>
                                    <label 
                                        htmlFor="rating" 
                                        className="form-label"
                                    >
                                        Rating
                                    </label>
                                    <input 
                                        {...input}
                                        type="range"
                                        id="rating" 
                                        name="review[rating]" 
                                        className="form-range"
                                        min="1"
                                        max="5"
                                    />
                                </div>
                            )}
                        </Field>
                        <Field name="body" validate={Validators.required}>
                            {({ input, meta }) => (
                                <div className='mb-3'>
                                    <label 
                                        htmlFor="body" 
                                        className="form-label"
                                    >
                                        Review
                                    </label>
                                    <textarea 
                                        {...input}
                                        type="text"
                                        id="body" 
                                        name="review[body]" 
                                        className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                                        cols="30"
                                        rows="5"
                                    />
                                </div>
                            )}
                        </Field>


                        <div className="mb-3">
                            <button type="submit" className='btn btn-success' disabled={invalid}>Add Review</button>
                        </div>      
                    </form>
                )}
                />
            </>
        )
    }

    return (
        <>
            {
                escape ? (
                    <>
                        <div className="row">
                            <div className="col-6">
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
                            <div className="col-6">
                                <ReviewForm />
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