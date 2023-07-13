import mongoose from "mongoose";
import escapes from "./escapes.js";
import Escape from "../models/Escape.js";


mongoose.connect('mongodb://0.0.0.0:27017/globetrotters');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database-connected");
}); 

const seedDB = async() => {
    await Escape.deleteMany({});
    for(let i = 0; i < 60; i++){
        const price = Math.floor((Math.random() * 100)) + 10;
        const escape = new Escape({
            location: `${escapes[i].city}, ${escapes[i].state}`,
            title: `${escapes[i].title}`,
            description: `${escapes[i].description}`,
            price,
        });
        await escape.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});