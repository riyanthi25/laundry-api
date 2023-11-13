import { Router } from "express";
import OrderController from "../controllers/order.controller";
import { auth, authorizeAdmin } from "../middlewares/auth";

const router = Router();

router.get("/orders", auth, OrderController.getOrder);
router.get("/orders/:id", auth, OrderController.getOrderById);
router.post("/orders/add", auth, OrderController.addOrder);
router.put("/orders/:id/update", auth, OrderController.updateOrder);
router.delete("/orders/:id/delete", auth, OrderController.deleteOrder);


export default router;
