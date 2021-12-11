import db from "../models/index.js";

const proposeToken = async (req, res, next) => {
	try {
		const {
			email,
			mobile,
			name,
			dateOfBirth,
			image,
			gender,
			collegeInfo,
			degreeOfPlay,
			country,
			ethereumAddress,
			awardsAndAccolades,
			certificates,
		} = req.body;

		const proposedToken = await db.ProposedToken.create({
			email,
			mobile,
			name,
			dateOfBirth,
			image,
			gender,
			collegeInfo,
			degreeOfPlay,
			country,
			ethereumAddress,
			awardsAndAccolades,
			certificates,
		});

		await db.User.findOneAndUpdate(
			{ id: req.params.id },
			{ $push: { tokens: proposedToken._id } }
		);
		res
			.status(201)
			.json({ proposedToken, message: "Token created and Proposed" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getTokenDetails = async (req, res, next) => {};

const editTokenDetails = async (req, res, next) => {};

export default {
	proposeToken,
	getTokenDetails,
	editTokenDetails,
};
