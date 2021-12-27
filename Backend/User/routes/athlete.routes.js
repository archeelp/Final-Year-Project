import express from "express";
import athleteHandler from "../handlers/athlete.handlers.js";
import middlewares from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router
	.route("/token")
	.get(middlewares.loginRequired, athleteHandler.getToken)
	.post(
		middlewares.loginRequired,
		middlewares.canProposeToken,
		athleteHandler.proposeToken
	)
	.put(middlewares.loginRequired, athleteHandler.editToken);

export default router;
