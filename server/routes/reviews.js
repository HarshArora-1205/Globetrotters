import express from "express";
import catchAsync from "../utils/catchAsync.js";
import { validateReview, isLoggedIn } from "../middlewares/middleware.js";
import reviews from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

router.post('/', validateReview, isLoggedIn, catchAsync(reviews.newReview));

router.delete('/:reviewId', catchAsync(reviews.deleteReview));

export default router;