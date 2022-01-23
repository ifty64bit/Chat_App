import mongoose from 'mongoose'

const users = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    emailVerified: Date
})

export default mongoose.models['Users'] || mongoose.model('Users', users);