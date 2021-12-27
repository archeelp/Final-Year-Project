import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import athleteRoutes from "./athlete.routes.js";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.status(200).send("API is up and running!");
});
router.use("/auth", authRoutes);
router.use("/athlete", athleteRoutes);
router.use("/", userRoutes);

export default router;
