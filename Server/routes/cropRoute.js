import express from "express";
import { addCrop, deleteCrop, getCropByid, getMyCropNumber, getMyCrops, updateCrop } from "../controllers/cropController.js";
import { verifyToken } from "../controllers/farmerController.js";

const router = express.Router();
router.post("/addCrop",verifyToken,addCrop);
router.put("/updateCrop/:id",verifyToken,updateCrop);
router.delete("/deleteCrop/:id",verifyToken,deleteCrop);
router.get("/getCropNumber",verifyToken,getMyCropNumber);
router.get("/getCrop",verifyToken,getMyCrops);
router.get("/getCropById/:id",getCropByid)

export default router;