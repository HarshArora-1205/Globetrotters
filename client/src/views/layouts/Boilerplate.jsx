import React from "react";
import { Outlet } from "react-router";
import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";

const Boilerplate = () => {
    return (
        <div className="d-flex flex-column vh-100">
            <Navbar />
            <main className="container mt-5">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Boilerplate;