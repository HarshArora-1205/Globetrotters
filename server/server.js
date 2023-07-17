import express from "express";
import mongoose from "mongoose";
import Escape from "./models/Escape.js";
import Review from "./models/Review.js";
import cors from "cors";
import catchAsync from "./utils/catchAsync.js";
import ExpressError from "./utils/ExpressError.js";
import { escapeSchema, reviewSchema } from "./joiSchemas.js";

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



const validateEscape = (req, res, next) => {
    const {error} = escapeSchema.validate(req.body)
    if(error){
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}
 
app.get('/escapes', catchAsync(async(req,res) => {
    const escapes = await Escape.find({});
    res.send({escapes});
}))

app.post('/escapes/new', validateEscape, catchAsync(async (req, res) => {
    const escape = new Escape(req.body.escape);
    await escape.save();
    res.send(escape._id);
}));

app.get('/escapes/:id', catchAsync(async (req,res) => {
    const escape = await Escape.findById(req.params.id).populate("reviews");
    res.send({escape});
}))

app.put('/escapes/:id', validateEscape, catchAsync(async (req, res) => {
    const escape = await Escape.findByIdAndUpdate(req.params.id, {...req.body.escape});
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

app.post('/escapes/:id/reviews', validateReview, async (req,res) => {
    const escape = await Escape.findById(req.params.id);
    const review = new Review(req.body.review);
    escape.reviews.push(review);
    await review.save();
    await escape.save();
    res.send({escape});
})

app.get('/', (req,res) => {
    res.send("Hello From Globetrotters!");
})

app.all("*", (req, res, next) => {
    next(new ExpressError('Page Not Found!', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
})


app.listen(3001, () => {
    console.log("Serving on port 3001");
})