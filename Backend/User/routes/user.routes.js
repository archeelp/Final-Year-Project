import express from "express";
import userHandler from "../handlers/user.handlers.js";

const router = express.Router({ mergeParams: true });

router.route("/tokens").get(userHandler.getTokens);
router.route("/tokens/:id").get(userHandler.getToken);

export default router;
