import User from "../models/User.js";
import passport from "passport";

const registerUser = async(req,res) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
    
        res.status(200).json({ message: "User Account Created" });

    }
    catch(err){
        res.status(400).json({ error: err.message || "Server Error"});
    }
};

const loginUser = (req, res, next) => {
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
        });

        
        return res.status(200).json({ message: 'Login successful', isAuthenticated: true, user});

    })(req, res, next);
}

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error('Error during logout:', err);
          return res.status(500).json({ success: false, message: 'Failed to logout!' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out successfully!' });
    });
}


export default {registerUser, loginUser, logoutUser};