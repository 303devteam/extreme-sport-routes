import express from "express";
import PackageController from '../controllers/packageController.js';

const router = express.Router();

router.get("/", PackageController.getAllPackages); 
router.get("/package/:id", PackageController.getPackageById); 
router.post("/addpackage", PackageController.addPackage); 
router.put("/package/:id", PackageController.updatePackage); 
router.delete("/package/:id", PackageController.deletePackage); 

export default router;
