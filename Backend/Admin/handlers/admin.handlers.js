import db from "../models/index.js";

const getTokenRequests = async (req, res) => {
	try {
		// get token requests
		const tokenRequests = await db.ProposedToken.find({});

		res
			.status(200)
			.json({ tokenRequests, message: "Proposed Tokens retrieved" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const approveToken = async (req, res) => {
	try {
		// get proposed Token details
		const proposedToken = await db.ProposedToken.findById({
			id: req.params.id,
		});

		// change status to approved
		proposedToken.approved = true;
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
};
