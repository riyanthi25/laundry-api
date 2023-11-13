import { Router } from "express";
import CustomerController from "../controllers/customer.controller";
import { auth, authorizeAdmin } from "../middlewares/auth";

const router = Router();

router.get("/customers", auth, authorizeAdmin, CustomerController.getCustomer);
router.get("/customers/:id", auth, authorizeAdmin, CustomerController.getCustomerById);
router.post("/customers/add", auth, authorizeAdmin,CustomerController.addCustomer);
router.put("/customers/:id/update", auth, CustomerController.updateCustomer);
router.delete("/customers/:id/delete", auth, CustomerController.deleteCustomer);


export default router;
