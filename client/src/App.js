import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import Home from "./views/Home";
import Escapes from "./views/escapes/Escapes";
import Show from "./views/escapes/Show";
import Edit from "./views/escapes/Edit";
import New from "./views/escapes/New";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/escapes" element={<Escapes />}/>
        <Route path="/escapes/:id" element={<Show />}/>
        <Route path="/escapes/:id/edit" element={<Edit />}/>
        <Route path="/escapes/new" element={<New />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
