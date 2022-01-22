import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const rooms = new mongoose.Schema({
    participants: [String],
    createdBy: String
})

export default mongoose.model('Rooms', rooms);