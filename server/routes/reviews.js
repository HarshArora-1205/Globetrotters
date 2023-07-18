import express from "express";
import Review from "../models/Review.js";
import catchAsync from "../utils/catchAsync.js";
import { reviewSchema } from "../joiSchemas.js";
import ExpressError from "../utils/ExpressError.js";
import Escape from "../models/Escape.js";

const router = express.Router({ mergeParams: true });

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

router.post('/', validateReview, catchAsync(async (req,res) => {
    const escape = await Escape.findById(req.params.id);
    const review = new Review(req.body.review);
    escape.reviews.push(review);
    await review.save();
    await escape.save();
    res.send({escape});
}))

router.delete('/:reviewId', catchAsync(async (req,res) => {
    const {id, reviewId} = req.params;
    await Escape.findByIdAndUpdate(id, {$pull: { reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.status(200).send("Review Deleted");
}))

export default router;