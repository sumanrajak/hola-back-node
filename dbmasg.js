import mongoose from "mongoose";

const holaschema=mongoose.Schema(

    {
        message: String,
        name:String,
        timestamp:String,
        received: Boolean,
    }
)
export default mongoose.model('message',holaschema)