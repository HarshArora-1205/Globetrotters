import mongoose from "mongoose";
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

export default mongoose.model('Escape', EscapeSchema);