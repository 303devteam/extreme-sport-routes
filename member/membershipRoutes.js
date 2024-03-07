import express from "express";
import MembershipController from '../controllers/membershipController.js';

const router = express.Router();

router.get("/", MembershipController.getAllMemberships);
router.get("/memship/:id", MembershipController.getMembershipById);
router.post("/addmemship", MembershipController.addMembership);
router.put("/updatememship/:id", MembershipController.updateMembership);
router.delete("/delmemship/:id", MembershipController.deleteMembership);
router.get("/checkmemship/:id", MembershipController.checkMembershipValidity);
router.put("/extendmemship/:id", MembershipController.extendMembership);

export default router;