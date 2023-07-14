import React, {useEffect, useState} from 'react';
import axios from "axios";

const Escapes = () => {
  const [escapes, setEscapes] = useState([]);
  
  useEffect(() => {
    axios
      .get("/escapes")
      .then((res) => {
        setEscapes(res.data.escapes);
      })
      .catch((err) => {
        console.log("Error in fetching Escapes: Escapes JSX");
        console.log(err);
    });
  }, []);

  return (
    <>
      <h1>All Escapes</h1>
      <a href="/escapes/new">New!</a>
      <ul>
        {escapes?.length ? (
          escapes.map((escape, index) => <li key={index}><a href={`/escapes/${escape._id}`}>{escape.title}</a></li>)
        ) : (
          <h2>No Escape found!</h2>
        )}
      </ul>
    </>
  )
}

export default Escapes