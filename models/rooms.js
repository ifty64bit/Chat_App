import mongoose from "mongoose";
import Users from "./users";

/* PetSchema will correspond to a collection in your MongoDB database. */
const rooms = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
  },
});

export default mongoose.models["Rooms"] || mongoose.model("Rooms", rooms);
