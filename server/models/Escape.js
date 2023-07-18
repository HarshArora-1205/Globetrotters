import mongoose from "mongoose";
import Review from "./Review.js";
const Schema = mongoose.Schema;

const EscapeSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "Review" 
        }
    ],
});

EscapeSchema.post("findOneAndDelete", async function (escape){
    if(escape){
        await Review.deleteMany({
            _id: {
                $in: escape.reviews
            }
        })
    }
})

export default mongoose.model('Escape', EscapeSchema);