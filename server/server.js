import express from "express";
import mongoose from "mongoose";
import Escape from "./models/Escape.js";
import cors from "cors";


mongoose.connect('mongodb://0.0.0.0:27017/globetrotters');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database-connected");
});



const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
}
app.use(cors(corsOptions));


app.get('/escapes', async(req,res) => {
    const escapes = await Escape.find({});
    res.send({escapes});
})

app.get('/', (req,res) => {
    res.send("Hello From Globetrotters!");
})

app.listen(3001, () => {
    console.log("Serving on port 3001");
})