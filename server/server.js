import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
import escapeRoutes from "./routes/escapes.js";
import reviewRoutes from "./routes/reviews.js";
import userRoutes from "./routes/users.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/User.js";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database-connected");
});

const app = express();

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://globetrotters-six.vercel.app/"
    ],
    credentials: true,
}

const sessionConfig = {
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(cors(corsOptions));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/escapes", escapeRoutes);
app.use("/escapes/:id/reviews", reviewRoutes);
app.use("/auth", userRoutes);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req,res) => {
    res.send("Hello From Globetrotters!");
})

app.all("*", (req, res, next) => {
    next(new ExpressError('Page Not Found!', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})