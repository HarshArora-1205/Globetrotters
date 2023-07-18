import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
import escapes from "./routes/escapes.js";
import reviews from "./routes/reviews.js";

mongoose.connect('mongodb://0.0.0.0:27017/globetrotters');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database-connected");
});

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}

const sessionConfig = {
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/escapes", escapes);
app.use("/escapes/:id/reviews", reviews);


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


app.listen(3001, () => {
    console.log("Serving on port 3001");
})