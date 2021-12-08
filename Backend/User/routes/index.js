import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router({ mergeParams: true });

router.use("/", userRoutes);
router.use("/auth", authRoutes);

export default router;