import express from "express";
import User from "../models/User.js";
import passport from "passport";
import catchAsync from "../utils/catchAsync.js";
// import ExpressError from "../utils/ExpressError.js";

const router = express.Router();

router.post('/register', async(req,res) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
    
        res.status(200).json({ message: "User Account Created" });

    }
    catch(err){
        res.status(400).json({ error: err.message || "Server Error"});
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        req.login(user, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        // return res.status(200).json({ message: 'Login successful' });
        });

        const isAuthenticated = true;
        return res.status(200).json({ message: 'Login successful', isAuthenticated});
    })(req, res, next);
});

export default router;