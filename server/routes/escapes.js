import express from "express";
import Escape from "../models/Escape.js";
import catchAsync from "../utils/catchAsync.js";
import { escapeSchema } from "../joiSchemas.js";
import ExpressError from "../utils/ExpressError.js";

const router = express.Router();

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

router.get('/', catchAsync(async(req,res) => {
    const escapes = await Escape.find({});
    res.send({escapes});
}))

router.post('/new', validateEscape, catchAsync(async (req, res) => {
    const escape = new Escape(req.body.escape);
    await escape.save();
    res.send(escape._id);
}));

router.get('/:id', catchAsync(async (req,res) => {
    const escape = await Escape.findById(req.params.id).populate("reviews");
    res.send({escape});
}))

router.put('/:id', validateEscape, catchAsync(async (req, res) => {
    const escape = await Escape.findByIdAndUpdate(req.params.id, {...req.body.escape});
    res.send(escape._id);
}))

router.delete('/:id', catchAsync(async (req,res) => {
    const escape = await Escape.findByIdAndDelete(req.params.id);
    if(escape){
        res.status(200).send("Escape Deleted Successfully");
    }
    else{
        res.status(404).send("Escape Not Found")
    }
}))

export default router;