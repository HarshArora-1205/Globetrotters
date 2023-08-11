import mongoose from "mongoose";
import escapes from "./escapes.js";
import Escape from "../models/Escape.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database-connected");
}); 

const seedDB = async() => {
    await Escape.deleteMany({});
    console.log("Deleted Seeds!");

    for(let i = 0; i < 60; i++){
        const min = 50000;
        const max = 80000;
        const randomPrice = Math.floor(Math.random() * (max - min + 1)) + min;
        const lastDigits = randomPrice % 1000;
        const price = randomPrice - lastDigits + 999;
        
        const escape = new Escape({
            author: '64d6766795d6694b92219f69',
            location: `${escapes[i].city}, ${escapes[i].state}`,
            title: `${escapes[i].title}`,
            description: `${escapes[i].description}`,
            image: `${escapes[i].image}`,
            price,
        });
        await escape.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});