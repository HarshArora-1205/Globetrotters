import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const New = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [escape, setEscape] = useState(undefined);

    useEffect(() => {
        axios
            .get(`/escapes/${id}`)
            .then((res) => {
                setEscape(res.data.escape);
            })
    }, [id]);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const escape = {
            title: e.target[0].value,
            location: e.target[1].value,
        };
        console.log(escape);
        await axios
                .put(`/escapes/${id}`, escape)
                .then((res) => {
                    navigate(`/escapes/${res.data}`)
                })
                .catch((err) => {
                    console.log("Error in editing Escape: Edit JSX");
                    console.log(err);
                });
    };
  return (
    <>
        <h1>Edit Escape</h1>

        <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="escape[title]" defaultValue={escape?.title || ""}/>
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="escape[location]" defaultValue={escape?.location || ""}/>
            </div>
            <button>Submit</button>
        </form>
        <a href="/escapes">Back to Escapes!</a>
    </>
  )
}

export default New