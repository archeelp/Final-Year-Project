import express from "express";
import adminRoutes from "./admin.routes.js";

const router = express.Router({ mergeParams: true });

router.use("/admin", adminRoutes);

export default router;
