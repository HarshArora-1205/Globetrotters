import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {isLoggedIn, validateEscape, isAuthor} from "../middlewares/middleware.js";
import escapes from "../controllers/escapes.js";

const router = express.Router();


router.get('/', catchAsync(escapes.allEscapes));

router.post('/new',  isLoggedIn, validateEscape, catchAsync(escapes.newEscape));

router.get('/:id', catchAsync(escapes.sendEscape));

router.put('/:id', isLoggedIn, isAuthor, validateEscape, catchAsync(escapes.editEscape));

router.delete('/:id', catchAsync(escapes.deleteEscape));

export default router;