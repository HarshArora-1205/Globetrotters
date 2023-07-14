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
                        <h1>{ escape.title }</h1>
                        <h4>{ escape.location }</h4>
                    </>
                ) : (
                    <h2>No Escape found!</h2>
                )
            }
            <button onClick={onDelete}>Delete Escape!</button>
            <a href={`/escapes/${id}/edit`}>Edit Escape!</a>
            <a href="/escapes">Back to Escapes!</a>
        </>
    )
}

export default Show