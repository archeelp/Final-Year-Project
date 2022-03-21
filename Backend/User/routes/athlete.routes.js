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
		middlewares.cloudinaryUpload,
		athleteHandler.proposeToken
	)
	.put(
		middlewares.loginRequired,
		middlewares.cloudinaryUpload,
		athleteHandler.editToken
	);

router
	.route("/Product")
	.get(
		middlewares.loginRequired,
		middlewares.cloudinaryUpload,
		athleteHandler.createProduct
	)
	.put(
		middlewares.loginRequired,
		middlewares.cloudinaryUpload,
		athleteHandler.editProduct
	);

router
	.route("/products/:productId")
	.get(middlewares.loginRequired, athleteHandler.getProduct);

export default router;
