import express from "express";
import users from "../controllers/users.js";

const router = express.Router();

router.post('/register', users.registerUser);

router.post('/login', users.loginUser);

router.get('/logout', users.logoutUser);

export default router;