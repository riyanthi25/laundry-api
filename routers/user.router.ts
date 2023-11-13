import { Router } from "express";
import UserController from "../controllers/user.controller";
import { auth, authorizeAdmin } from "../middlewares/auth";

const router = Router();

router.post("/user/add", UserController.createUser);
router.post("/login", UserController.login);
router.get("/users", auth, authorizeAdmin, UserController.getUser);
router.get("/user/:id", auth, authorizeAdmin, UserController.getUserById);

export default router;
