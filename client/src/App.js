import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./views/Home";
import Escapes from "./views/escapes/Escapes";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/escapes" element={<Escapes />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
