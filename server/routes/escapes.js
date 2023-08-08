import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {isLoggedIn, validateEscape, isAuthor} from "../middlewares/middleware.js";
import escapes from "../controllers/escapes.js";

const router = express.Router();


router.get('/', catchAsync(escapes.allEscapes));

router.post('/new', isLoggedIn, validateEscape, catchAsync(escapes.newEscape));

router.route('/:id')
    .get(catchAsync(escapes.sendEscape))
    .put(isLoggedIn, isAuthor, validateEscape, catchAsync(escapes.editEscape))
    .delete(catchAsync(escapes.deleteEscape));

export default router;