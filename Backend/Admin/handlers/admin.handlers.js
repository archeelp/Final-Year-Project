import mongoose from "mongoose";
import db from "../models/index.js";
import autoIncrement from "mongoose-auto-increment";
import ProposedTokenModel from "../models/ProposedTokens.models.js";

var connection = mongoose.createConnection(process.env.MONGODB_URI);

autoIncrement.initialize(connection);

const getTokenRequests = async (req, res) => {
	try {
		// get token requests
		const tokenRequests = await db.ProposedToken.find({ approved: false });

		res
			.status(200)
			.json({ tokenRequests, message: "Proposed Tokens retrieved" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getApprovedTokens = async (req, res) => {
	try {
		// get token requests
		const approvedTokens = await db.ProposedToken.find({ approved: true });

		res
			.status(200)
			.json({ approvedTokens, approvedMessage: "Approved Tokens retrieved" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const approveToken = async (req, res) => {
	try {
		// get proposed Token details
		const proposedToken = await db.ProposedToken.findById(req.params.id);

		// change status to approved
		proposedToken.approved = true;

		// ProposedTokenModel.plugin(autoIncrement.plugin, {
		// 	model: "ProposedToken",
		// 	field: "tokenIndex",
		// });

		proposedToken.save();

		res.status(200).json({ proposedToken, message: "Proposed Token approved" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export default {
	getTokenRequests,
	approveToken,
	getApprovedTokens,
};
