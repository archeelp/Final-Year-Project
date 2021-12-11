import express from "express";
import userHandler from "../handlers/user.handlers.js";
import middlewares from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.get("/test", (req, res) => {
	res.send("Hello World!");
});

router
	.route("/proposeToken")
	.post(middlewares.loginRequired, userHandler.proposeToken);

router.route("/getTokenDetails/:id").get(userHandler.getTokenDetails);

router.route("/getAllTokens").get(userHandler.getAllTokens);

router
	.route("/editTokenDetails/:id")
	.put(middlewares.loginRequired, userHandler.editTokenDetails);

export default router;
