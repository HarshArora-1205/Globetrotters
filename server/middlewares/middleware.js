import { escapeSchema } from "../joiSchemas.js";
import ExpressError from "../utils/ExpressError.js";
import Escape from "../models/Escape.js";
import { reviewSchema } from "../joiSchemas.js";

const isLoggedIn = (req, res, next) => {
    if(!req.body.isAuthenticated){
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    next();
}

const validateEscape = (req, res, next) => {
    const {error} = escapeSchema.validate(req.escape);
    if(error){
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

const isAuthor = async(req, res, next) => {
    const escape = await Escape.findById(req.params.id);
    if(!escape.author.equals(req.body.user._id)){
        res.status(400).json({ error: "You are not authorized!" });
    }
    else{
        next();
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.review);
    if(error){
        const msg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

export { isLoggedIn, validateEscape, isAuthor, validateReview};