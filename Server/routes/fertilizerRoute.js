import express from "express";
import { verifyToken } from "../controllers/farmerController.js";
import { addFertilizer, deleteFertilizer, getMyFertilizerNumber, getMyFertilizers, updateFertilizer } from "../controllers/fertilizerController.js";

const router= express.Router();
router.post("/addFertilizer",verifyToken,addFertilizer);
router.put("/updateFertilizer/:id",verifyToken,updateFertilizer);
router.delete("/deleteFertilizer/:id",verifyToken,deleteFertilizer);
router.get("/getFertilizerNum",verifyToken,getMyFertilizerNumber);
router.get("/getFertilizer",verifyToken,getMyFertilizers);

export default router;