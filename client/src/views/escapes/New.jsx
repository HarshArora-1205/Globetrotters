import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

const New = () => {
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const escape = {
            title: e.target[0].value,
            location: e.target[1].value,
            image: e.target[2].value,
            price: e.target[3].value,
            description: e.target[4].value,
        };
        console.log(escape);
        await axios
                .post("/escapes/new", escape)
                .then((res) => {
                    if(res.status === 200){
                        navigate(`/escapes/${res.data}`);
                    }
                })
                .catch((err) => {
                    console.log("Error in posting new Escape: New JSX");
                    console.log(err);
                });
    };
  return (
    <>
        <div className="row">
            <h1 className="text-center">
                Add New Escape!
            </h1>
            <div className="col-6 offset-3">
                <form onSubmit={onFormSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" id="title" name="escape[title]" className="form-control"/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" id="location" name="escape[location]" className="form-control" />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="image" className="form-label">Image Url</label>
                        <input type="text" id="image" name="escape[image]" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="price">Escape Price</label>
                        <div className="input-group">
                            <span className="input-group-text" id="price-label">₹</span>
                            <input type="text" className="form-control" id="price" placeholder="0.00" aria-label="price"
                                aria-describedby="price-label" name="escape[price]" required />
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" id="description" name="escape[description]" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </form>
                <a href="/escapes">Back to Escapes!</a>
            </div>
        </div>

    </>
  )
}

export default New