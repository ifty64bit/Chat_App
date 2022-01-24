import mongoose from "mongoose";
import Users from "./users";
import Rooms from "./rooms";

const messages = new mongoose.Schema({
    text: String,
    img: {
        type: String,
        default: null
    },
    roomID: {
        type: mongoose.Types.ObjectId,
        ref: 'Rooms'
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.models["Messages"] || mongoose.model("Messages", messages);