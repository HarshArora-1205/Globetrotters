import express from "express";
import mongoose from "mongoose";
import Escape from "./models/Escape.js";
import cors from "cors";
import catchAsync from "./utils/catchAsync.js";


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/escapes', catchAsync(async(req,res) => {
    const escapes = await Escape.find({});
    res.send({escapes});
}))

app.post('/escapes/new', catchAsync(async (req, res) => {
    const escape = new Escape(req.body);
    await escape.save();
    res.send(escape._id);
}));

app.get('/escapes/:id', catchAsync(async (req,res) => {
    const escape = await Escape.findById(req.params.id);
    res.send({escape});
}))

app.put('/escapes/:id', catchAsync(async (req, res) => {
    const escape = await Escape.findByIdAndUpdate(req.params.id, {...req.body});
    res.send(escape._id);
}))

app.delete('/escapes/:id', catchAsync(async (req,res) => {
    const escape = await Escape.findByIdAndDelete(req.params.id);
    if(escape){
        res.status(200).send("Escape Deleted Successfully");
    }
    else{
        res.status(404).send("Escape Not Found")
    }
}))

app.get('/', (req,res) => {
    res.send("Hello From Globetrotters!");
})

app.use((err, req, res, next) => {
    res.status(500).send(err);
})


app.listen(3001, () => {
    console.log("Serving on port 3001");
})