import React from 'react';
import axios from "axios";
import { Form, Field } from 'react-final-form'
import { useNavigate } from 'react-router';
import * as Validators from "../utils/validators";
import ValidationDiv from '../components/ValidationDiv';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const onFormSubmit = async (values) => {
        await axios
            .post("/auth/register", {...values})
            .then((res) => {
                if(res.status === 200){
                    toast.success(res.data.message);
                    navigate(`/escapes/`);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            });
    };

    const RegisterForm = () => (
        <Form
          onSubmit={onFormSubmit}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit}>
                <Field name="username" validate={Validators.required}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="username" 
                                className="form-label"
                            >
                                Username
                            </label>
                            <input 
                                {...input}
                                type="text"
                                id="username" 
                                name="username" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>

                <Field name="email" validate={Validators.chainValidators(
                    Validators.required,
                    Validators.isEmail
                )}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="email" 
                                className="form-label"
                            >
                                Email
                            </label>
                            <input 
                                {...input}
                                type="email"
                                id="email" 
                                name="email" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>

                <Field name="password" validate={Validators.required}>
                    {({ input, meta }) => (
                        <div className='mb-3'>
                            <label 
                                htmlFor="password" 
                                className="form-label"
                            >
                                Password
                            </label>
                            <input 
                                {...input}
                                type="password"
                                id="password" 
                                name="password" 
                                className={`form-control ${meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""}`}
                            />
                            <ValidationDiv meta={meta}/>
                        </div>
                    )}
                </Field>


                <div className="mb-3">
                    <button type="submit" className='btn btn-success' disabled={invalid}>Register</button>
                </div>      
            </form>
          )}
        />
    );

    return (
        <div className="row">
            <h1 className="text-center">
                Register!
            </h1>
            <div className="col-6 offset-3">
                <RegisterForm />
                <Link className="card-link btn btn-warning" to={'/escapes'}>Back to Escapes</Link>
            </div>
        </div>

    )
}

export default Register;