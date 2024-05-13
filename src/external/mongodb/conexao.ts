
import mongoose from "mongoose"

export default () => {
    mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    return db
}