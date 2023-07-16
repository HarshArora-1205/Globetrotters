import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from 'axios';
import Boilerplate from "./views/layouts/Boilerplate";
import Home from "./views/Home";
import Escapes from "./views/escapes/Escapes";
import Show from "./views/escapes/Show";
import Edit from "./views/escapes/Edit";
import New from "./views/escapes/New";
import Error from "./views/Error";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route element={<Boilerplate />}>
          <Route path="/escapes" element={<Escapes />}/>
          <Route path="/escapes/:id" element={<Show />}/>
          <Route path="/escapes/:id/edit" element={<Edit />}/>
          <Route path="/escapes/new" element={<New />}/>
          <Route path="/error" element={<Error />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
