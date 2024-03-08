import express from "express";
import EmployeeController from '../controllers/employeeController.js';

const router = express.Router();

router.get("/", EmployeeController.getAllEmployees);
router.get("/employee/:id", EmployeeController.getEmployeeById);
router.post("/addemployee", EmployeeController.addEmployee);
router.put("/updateemployee/:id", EmployeeController.updateEmployee);
router.delete("/delemployee/:id", EmployeeController.deleteEmployee);
router.post("/login", EmployeeController.login);

export default router;