import express from "express";
import adminHandler from "../handlers/admin.handlers.js";
const router = express.Router({ mergeParams: true });

router.get("/test", (req, res) => {
	res.send("Hello World!");
});

router.route("/getTokenRequests").get(adminHandler.getTokenRequests);

router.route("/approveToken/:id").post(adminHandler.approveToken);

router.route("/getApprovedTokens").get(adminHandler.getApprovedTokens);

router.route("/getTokenDetails/:id").get(adminHandler.getTokenDetails);

export default router;
