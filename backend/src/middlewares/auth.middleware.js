import jwt from "jsonwebtoken";
import User from "../models/user.model";
export const protectRoute = async(req, res) =>{
    try {
        const token  = req.cookie.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: "you are trying with wroung Token" });
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
}