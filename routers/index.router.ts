import { Router, Request, Response } from "express";
import customerRouter from "./customer.router"
import orderRouter from "./order.router";
import userRouter from "./user.router";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to My Laundry" });
});

router.use(userRouter);
router.use(customerRouter);
router.use(orderRouter);

export default router;
