import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Form, Field } from 'react-final-form'
import * as Validators from "../utils/validators";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../stylesheets/starability-slot.css';

const Show = () => {
    const navigate = useNavigate();
    const [escape, setEscape] = useState({});
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    

    const onDelete = () => {
        axios
            .delete(`/escapes/${id}`, { 
                params: { 
                    user, 
                    isAuthenticated 
                }
            })
            .then((res) => {
                if(res.status === 200){
                    toast.success("Deleted Escape Successfully!");
                    navigate(`/escapes`);
                }
            })
            .catch((err) => {
                toast.error("Error in deleting Escape!");
            })
    }

    useEffect(() => {
        getEscape(id);
    }, [id]);

    function getEscape(id) {
        axios
            .get(`/escapes/${id}`)
            .then((res) => {
                setEscape(res.data.escape);
                // toast.success(`Escape fetched!`);
            })
            .catch((err) => {
                toast.error("Error in fetching Escape!");
            });
    }

    const onReviewSubmit = (values) => {
        const payload = {review: {...values}, isAuthenticated, user};
        axios
            .post(`/escapes/${id}/reviews`, payload)
            .then((res) => {
                if(res.status === 200){
                    toast.success("Review Created Successfully!");
                    getEscape(id);
                }
            })
            .catch((err) => {
                toast.error("Error in Creating Review!");
            }); 
    }

    const onReviewDelete = (reviewId) => {
        axios
        .delete(`/escapes/${id}/reviews/${reviewId}`, { 
            params: { 
                user, 
                isAuthenticated 
            }
        })
        .then((res) => {
            if(res.status === 200){
                toast.success("Review Deleted Successfully!");
                getEscape(id);
            }
        })
        .catch((err) => {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } 
            else {
                toast.error("Error in Editing Review");
            }
        })
    }

    const ReviewForm = () => {
        return (
            <>
                <h2 className='mt-3'>Leave a Review</h2>
                <Form
                  onSubmit={onReviewSubmit}
                  render={({ handleSubmit, invalid }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="rating" defaultValue={4}>
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

    const ReviewList = () => 
        escape.reviews?.map((review, index) => {
            return (
                <div className="my-3 card" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">
                        <strong>{review.author?.username.charAt(0).toUpperCase() + review.author?.username.slice(1)}</strong>
                        </h5>
                        <p className="starability-result" data-rating={review.rating}>
                            Rated: {review.rating} stars
                        </p>
                        <p className="card-text">
                            {review.body}
                        </p>
                        {
                            user && review.author?._id === user._id && (
                                <button onClick={() => onReviewDelete(review._id)} className='btn btn-danger'>
                                    Delete
                                </button>
                            )
                        }
                    </div>
                </div>
            )
        });
    
        if(!escape){
            return <h2>No Escape Found!</h2>
        }

    return (
        <>
            {/* <div className="d-flex"> */}
                <div className="row">
                    <div className="col-12 col-lg-6 ">
                        <div className="card mb-3">
                            <img src={escape.image} className="card-img-top" alt={escape.title}/>
                            <div className="card-body">
                                <h5 className="card-title">{escape.title}</h5>
                                <p className="card-text">{escape.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-muted">{escape.location}</li>
                                <li className="list-group-item">Submitted by {escape.author?.username}</li>
                                <li className="list-group-item">₹{escape.price} per person / day</li>
                            </ul>
                            {
                                user && escape.author?._id === user._id && (
                                    <div className="card-body">
                                        <Link to={`/escapes/${id}/edit`} className="card-link btn btn-info">Edit</Link>
                                        <button onClick={onDelete} className='btn btn-danger ms-2'>Delete</button>
                                    </div>
                                )
                            }
                        </div>
                        <Link className="card-link btn btn-success" to={'/escapes'}>Back to Escapes</Link>
                    </div>
                    
                    {/* {console.log(escape.reviews)} */}
                    
                    {
                        <div className="col-12 col-lg-6">
                            {isAuthenticated ? (<ReviewForm />) : (null)}
                            {escape.reviews?.length  ? (<ReviewList />) : (<h3>No reviews yet.</h3>)}
                        </div>
                    }

                </div>
            {/* </div> */}
            
        </>
    )
}

export default Show