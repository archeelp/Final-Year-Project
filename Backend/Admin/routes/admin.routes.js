import express from "express";
import adminHandler from "../handlers/admin.handlers.js";
const router = express.Router({ mergeParams: true });

router.get("/test", (req, res) => {
	res.send("Hello World!");
});

router.route("/getTokenRequests").get(adminHandler.getTokenRequests);

router.route("/approveToken/:id").post(adminHandler.approveToken);

export default router;
