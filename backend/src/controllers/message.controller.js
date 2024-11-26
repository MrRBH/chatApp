import cloudinary from "../lib/cloudinary";
import User from "../models/user.model";

export const getUserFromSidebar  = async(req,res) =>{
    try {
        const loggedUserId = req.user
        const fillterusers = await User.find({_id :{ $ne :{loggedUserId}}}).select("-password")
        console.log(fillterusers);
        
    } catch (error) {
        console.error("message Error : "  + error.message);
        res.status(500).json({message : "Internal Server Error"})
        
    }
}
 export const GetMessages =  async ( req,res) =>{
  try {
    const {id:userToChatId} = req.params
    const myId = req.user.id
    const messages = await User.find({
        $or :[{senderId:myId ,receiverId:userToChatId} , {senderId:userToChatId   ,receiverId:myId }]
    }).select("-password")
    if (!messages) {
        return res.status(404).json({
            message: "messages not found"
        })
    }
    res.status(200).json({message : `${messages}`})
  } catch (error) {
    console.error("message error", error.message);
    res.status(500).json({
        message: "Internal Server Error"
    })
  }
}
export const sendMessage =  async (req, res) => {
    try {
        const {text , image }  =req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user.id;
        if (!text || !image) {
            return res.status(400).json({
                message: "Please provide text or image"
            })
        }
        let imageUrl;
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url;
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()
    
        //  todo realtime functionality here => socket.io
    
        res.status(201).json({
            message: "Message sent successfully", newMessage
        })
    } catch (error) {
        console.error("error sending message", error);
        res.status(500).json({message :"internal server error "})
    }
}
