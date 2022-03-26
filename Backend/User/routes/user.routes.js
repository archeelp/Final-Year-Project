import express from "express";
import userHandler from "../handlers/user.handlers.js";

const router = express.Router({ mergeParams: true });

router.route("/tokens").get(userHandler.getTokens);
router.route("/tokens/:id").get(userHandler.getToken);

router.route("/products").get(userHandler.getProducts);
router.route("/products/:productId").get(userHandler.getProduct);
router.route("/productsOf/:tokenId").get(userHandler.getProductsOf);

export default router;
