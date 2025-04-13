import express from "express";
import { LoggedUserDetails, login, logout, register } from "../controllers/farmerController.js";

const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/loggedFarmer",LoggedUserDetails);

export default router;