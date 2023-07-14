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
        };
        console.log(escape);
        await axios
                .post("/escapes/new", escape)
                .then((res) => {
                    navigate(`/escapes/${res.data}`);
                })
                .catch((err) => {
                    console.log("Error in posting new Escape: New JSX");
                    console.log(err);
                });
    };
  return (
    <>
        <h1>Add New Escape</h1>

        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="escape[title]" />
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="escape[location]" />
            </div>
            <button>Submit</button>
        </form>
        <a href="/escapes">Back to Escapes!</a>
    </>
  )
}

export default New