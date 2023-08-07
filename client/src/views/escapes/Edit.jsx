import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import { useNavigate, useParams } from 'react-router';
import * as Validators from "../utils/validators";
import ValidationDiv from '../components/ValidationDiv';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const New = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [escape, setEscape] = useState(undefined);

    useEffect(() => {
        axios
            .get(`/escapes/${id}`)
            .then((res) => {
                setEscape(res.data.escape);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const onFormSubmit = async (values) => {
        const escape = {...values};
        await axios
                .put(`/escapes/${id}`, {escape, isAuthenticated, user})
                .then((res) => {
                    if(res.status === 200){
                    toast.success("Edited Escape Successfully!");
                        navigate(`/escapes/${res.data}`)
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data.error || "Error in Editing Escape");
                    navigate('/error');
                });
    };

    const EditForm = () => (
        <Form
          onSubmit={onFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <form onSubmit={handleSubmit}>
                <Field name="title" validate={Validators.required} initialValue={escape?.title || ""}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="title" 
                                className="form-label"
                            >
                                Title
                            </label>
                            <input 
                                {...input}
                                type="text"
                                id="title" 
                                name="escape[title]" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>

                <Field name="location" validate={Validators.required} initialValue={escape?.location || ""}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="location" 
                                className="form-label"
                            >
                                Location
                            </label>
                            <input 
                                {...input}
                                type="text"
                                id="location" 
                                name="escape[location]" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>

                <Field name="image" validate={Validators.required} initialValue={escape?.image || ""}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="image" 
                                className="form-label"
                            >
                                Image Url
                            </label>
                            <input 
                                {...input}
                                type="text"
                                id="image" 
                                name="escape[image]" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>

                <Field name="price" 
                    validate={Validators.chainValidators(
                        Validators.required,
                        Validators.isNum,
                        Validators.isGreater(10)
                    )}
                    initialValue={escape?.price || ""}
                >
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="price" 
                                className="form-label"
                            >
                                Escape Price
                            </label>
                            <div className="input-group">
                                <span 
                                    className="input-group-text" 
                                    id="price-label"
                                >
                                    ₹
                                </span>
                                <input 
                                    {...input}
                                    type="text" 
                                    className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`} 
                                    id="price" 
                                    placeholder="0.00" 
                                    aria-label="price"
                                    aria-describedby="price-label" 
                                    name="escape[price]"
                                />
                                <ValidationDiv meta={meta}/>
                            </div>
                        </div>
                    )}
                </Field>

                <Field name="description" validate={Validators.required}  initialValue={escape?.description || ""}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="description" 
                                className="form-label"
                            >
                                Description
                            </label>
                            <textarea 
                                {...input}
                                type="text"
                                id="description" 
                                name="escape[description]" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>

                <div className="mb-3">
                    <button type="submit" className='btn btn-success' disabled={invalid || pristine}>Submit</button>
                </div>      
            </form>
          )}
        />
    );

  return (
    <>
        {/* { */}
            {/* isAuthenticated ? ( */}
                <div className="row">
                    <h1 className="text-center">
                        Edit Escape!
                    </h1>
                    <div className="col-6 offset-3">
                        <EditForm />
                        <Link className="card-link btn btn-info" to={'/escapes'}>Back to Escapes</Link>
                        <Link className="mx-3 card-link btn btn-warning" to={`/escapes/${id}`}>Back to Escape {escape?.title}</Link>
                    </div>
                </div>
            {/* ) : ( */}
                {/* navigate(-1) */}
            {/* ) */}
        {/* } */}
    </>
  )
}

export default New