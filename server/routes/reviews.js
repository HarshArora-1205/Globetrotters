import express from "express";
import Review from "../models/Review.js";
import catchAsync from "../utils/catchAsync.js";
import Escape from "../models/Escape.js";
import { validateReview } from "../middlewares/middleware.js";

const router = express.Router({ mergeParams: true });

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