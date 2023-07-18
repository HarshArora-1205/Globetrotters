import express from "express";
import mongoose from "mongoose";
import Escape from "./models/Escape.js";
import Review from "./models/Review.js";
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
import { reviewSchema } from "./joiSchemas.js";
import escapes from "./routes/escapes.js"

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


app.use("/escapes", escapes);


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
 


app.post('/escapes/:id/reviews', validateReview, async (req,res) => {
    const escape = await Escape.findById(req.params.id);
    const review = new Review(req.body.review);
    escape.reviews.push(review);
    await review.save();
    await escape.save();
    res.send({escape});
})

app.delete('/escapes/:id/reviews/:reviewId', async (req,res) => {
    const {id, reviewId} = req.params;
    await Escape.findByIdAndUpdate(id, {$pull: { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.status(200).send("Review Deleted");
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