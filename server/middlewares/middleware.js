const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated){
        return res.status(401).json({ error: 'Unauthorized Access' });
    }
    next();
}

export default isLoggedIn;