import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { GetMessages, getUserFromSidebar, sendMessage } from "../controllers/message.controller";

 const router =  Router()
 router.get("/users" , protectRoute , getUserFromSidebar);
 router.get("/:id:userToChatId", protectRoute , GetMessages)
 router.get("/send/:id", protectRoute , sendMessage)
