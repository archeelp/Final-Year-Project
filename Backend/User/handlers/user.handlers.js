import db from "../models/index.js";

const proposeToken = async (req, res) => {
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

		const user = await db.User.findById(req.decodedToken.id);
		user.token = await proposedToken._id;
		await user.save();
		res
			.status(201)
			.json({ proposedToken, message: "Token created and Proposed" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getTokenDetails = async (req, res) => {
	try {
		// get token requests
		const tokenDetails = await db.ProposedToken.findById(req.params.id);

		res
			.status(200)
			.json({ tokenDetails, message: "Requested Token details retrieved" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const editTokenDetails = async (req, res) => {
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

		const user = await db.User.findById(req.decodedToken.id).populate("token");
		const updatedToken = await db.ProposedToken.findByIdAndUpdate(
			user.token._id,
			{
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
			},
			{
				new: true,
			}
		);

		res
			.status(200)
			.json({ message: "Token updated with changes", updatedToken });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getAllTokens = async (req, res) => {
	try {
		// get token requests
		const allTokens = await db.ProposedToken.find({ approved: true });

		res
			.status(200)
			.json({ allTokens, message: "All Token from database retrieved" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getCreatedToken = async (req, res) => {
	try {
		// get created token
		const user = await User.findById(req.decodedToken.id).populate("token");

		res.status(200).json({
			token: user.token,
			message: "Created Token from database retrieved",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export default {
	proposeToken,
	getTokenDetails,
	editTokenDetails,
	getAllTokens,
	getCreatedToken,
};
