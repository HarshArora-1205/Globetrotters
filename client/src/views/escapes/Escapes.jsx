import React, {useEffect, useState} from 'react';
import axios from "axios";

const Escapes = () => {
  const [escapes, setEscapes] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3001/escapes").then((res) => {
      setEscapes(res.data.escapes);
    });
  }, []);

  return (
    <>
      <h1>All Escapes</h1>
      <ul>
        {escapes?.length ? (
          escapes.map((escape, index) => <li key={index}>{escape.title}</li>)
        ) : (
          <h2>No Escapes found!</h2>
        )}
      </ul>
    </>
  )
}

export default Escapes