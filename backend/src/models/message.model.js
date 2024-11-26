import mongoose from "mongoose";

 const messageSchema  =  mongoose.Schema({
    senderId :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reciverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text : {
        type: String,
    
    },
    image : {
        type: String
    }
},{
    timestamps: true,  // this will add createdAt and updatedAt fields to your schema.
})
const Message  = mongoose.model('Message',messageSchema)
export default Message