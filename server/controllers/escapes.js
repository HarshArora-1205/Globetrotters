import Escape from "../models/Escape.js";

const allEscapes = async(req,res) => {
    const escapes = await Escape.find({});
    res.send({escapes});
};

const newEscape = async (req, res) => {
    const escape = new Escape(req.body.escape);
    escape.author = req.body.user._id;
    await escape.save();
    res.send(escape._id);
};

const sendEscape = async (req,res) => {
    const escape = await Escape.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    }).populate("author");
    res.send({escape});
};

const editEscape = async (req, res) => {
    const escape = await Escape.findByIdAndUpdate(req.params.id, {...req.body.escape});
    res.send(escape._id);
};

const deleteEscape = async (req,res) => {
    if(req.query){
        if(!req.query.isAuthenticated){
            return res.status(401).json({ error: 'Unauthorized Access' });
        }
    }

    const escape = await Escape.findByIdAndDelete(req.params.id);

    if(escape){
        res.status(200).send("Escape Deleted Successfully");
    }
    else{
        res.status(404).send("Escape Not Found")
    }
};

export default { newEscape, allEscapes, sendEscape, editEscape, deleteEscape };