// import passport from "passport";

const isLoggedIn = (req, res, next) => {
    // console.log(req);
    if(!req.isAuthenticated){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

export default isLoggedIn;