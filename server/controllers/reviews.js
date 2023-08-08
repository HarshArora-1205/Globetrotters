import Escape from "../models/Escape.js";
import Review from "../models/Review.js";

const newReview = async (req,res) => {
    const escape = await Escape.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.body.user._id;
    escape.reviews.push(review);
    await review.save();
    await escape.save();
    res.send({escape});
};

const deleteReview = async (req,res) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!req.query.isAuthenticated){
        res.status(400).json({ error: "You are not authorized!" });
    }
    else{
        if(!review.author.equals(req.query.user._id)){
            res.status(400).json({ error: "You are not authorized!" });
        }
        else{
            await Escape.findByIdAndUpdate(id, {$pull: { reviews: reviewId}});
            await Review.findByIdAndDelete(reviewId);
            res.status(200).send("Review Deleted");
        }
    }
    
};

export default { newReview, deleteReview };