import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Boilerplate from "./views/layouts/Boilerplate";
import Home from "./views/Home";
import Escapes from "./views/escapes/Escapes";
import Show from "./views/escapes/Show";
import Edit from "./views/escapes/Edit";
import New from "./views/escapes/New";
import Error from "./views/Error";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import { AuthProvider } from "./context/AuthContext";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route element={<Boilerplate />}>
            <Route path="/escapes" element={<Escapes />}/>
            <Route path="/escapes/:id" element={<Show />}/>
            <Route path="/escapes/:id/edit" element={<Edit />}/>
            <Route path="/auth/login" element={<Login />}/>
            <Route path="/auth/register" element={<Register />}/>
            <Route path="/escapes/new" element={<New />}/>
            <Route path="/error" element={<Error />}/>
          </Route>
        </Routes>
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
