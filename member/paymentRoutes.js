import express from "express";
import PaymentController from '../controllers/paymentController.js';

const router = express.Router();

router.get("/", PaymentController.getAllPayments); 
router.get("/payment/:id", PaymentController.getPaymentById); 
router.post("/addpayment", PaymentController.addPayment); 
router.put("/payment/:id", PaymentController.updatePayment); 
router.delete("/payment/:id", PaymentController.deletePayment); 

export default router;
