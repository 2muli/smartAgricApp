import express from "express";
import { verifyToken } from "../controllers/farmerController.js";
import { addLivestock, deleteLivestock, getLiveStockById, getMyLivestock, getMyLivestockNumber, updateLivestock } from "../controllers/livesctockController.js";

const router = express.Router();
router.post("/addLivestock",verifyToken,addLivestock);
router.put("/updateLivestock/:id",verifyToken,updateLivestock);
router.delete("/deleteLivestock/:id",verifyToken,deleteLivestock);
router.get("/getLivestockNumber",verifyToken,getMyLivestockNumber);
router.get("/getLivestock",verifyToken,getMyLivestock);
router.get('/getliveStockById/:id',getLiveStockById)

export default router;