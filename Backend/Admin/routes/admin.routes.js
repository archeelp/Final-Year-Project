import express from "express";
import adminHandler from "../handlers/admin.handlers.js";
const router = express.Router({ mergeParams: true });

router.get("/test", (req, res) => {
	res.send("Hello World!");
});

router.route("/approveToken").post(adminHandler.approveToken);

export default router;
