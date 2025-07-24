import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
} from "./../controllers/user.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", registerUser);  

router.post("/login", loginUser);   

router.post("/logout", logoutUser); 

router.route('/refresh-token').post(refreshAccessToken)

router.get("/me", verifyJWT, getCurrentUser); 

router.get("/update-password", verifyJWT, changeCurrentPassword)

router.route('/update-account').patch(verifyJWT, updateAccountDetails)

export default router 