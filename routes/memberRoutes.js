import express from "express";
import MemberController from '../controllers/memberController.js';

const router = express.Router();

router.get("/getAll/:offset", MemberController.getAllMembers);
router.get("/present/:offset", MemberController.getPresentMembers);
router.get("/member/:id", MemberController.getMemberById);
router.get("/memship/:id", MemberController.getMemberByMembership);
router.get('/byFullName/:firstName/:lastName', MemberController.getByFullName);
router.post("/addmember", MemberController.addMember);
router.put("/updatemember/:id", MemberController.updateMember);
router.delete("/delmember/:id", MemberController.deleteMember);
export default router;
