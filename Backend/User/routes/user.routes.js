import express from "express";
import userHandler from "../handlers/user.handlers.js";
const router = express.Router({ mergeParams: true });

router.get("/test", (req, res) => {
	res.send("Hello World!");
});

router.route("/proposeToken").post(userHandler.proposeToken);
router.route("/getTokenDetails").get(userHandler.getTokenDetails);
router.route("/editTokenDetails").put(userHandler.editTokenDetails);

export default router;
