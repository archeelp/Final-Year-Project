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
			amount,
			rate,
			sport,
			keynotes,
			instagramLink,
			facebookLink,
			youtubeLink,
			twitterLink,
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
			amount,
			rate,
			sport,
			keynotes,
			instagramLink,
			facebookLink,
			youtubeLink,
			twitterLink,
		});

		const user = await db.User.findById(req.decodedToken.id);
		user.token = await proposedToken._id;
		await user.save();
		res
			.status(201)
			.json({ token: proposedToken, message: "Token created and Proposed" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const editToken = async (req, res) => {
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
			amount,
			rate,
			sport,
			keynotes,
			instagramLink,
			facebookLink,
			youtubeLink,
			twitterLink,
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
				amount,
				rate,
				sport,
				keynotes,
				instagramLink,
				facebookLink,
				youtubeLink,
				twitterLink,
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

const getToken = async (req, res) => {
	try {
		// get created token
		const user = await db.User.findById(req.decodedToken.id).populate("token");

		res.status(200).json({
			token: user.token,
			message: "Created Token from database retrieved",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const createProduct = async (req, res) => {
	try {
		const { name, image, description, cost, quantity } = req.body;
		const user = await db.User.findById(req.decodedToken.id);

		const createdProduct = await db.ProposedToken.create({
			name,
			image,
			description,
			cost,
			quantity,
			token: user.token,
			owner: user._id,
		});

		user.products = await user.products.push(createdProduct);
		await user.save();
		res.status(201).json({
			createdProduct,
			message: "Product created and added to the DB",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const editProduct = async (req, res) => {
	try {
		const { name, image, description, cost, quantity } = req.body;

		const updatedProduct = await db.Product.findByIdAndUpdate(
			req.params.productId,
			{
				name,
				image,
				description,
				cost,
				quantity,
			},
			{
				new: true,
			}
		);

		res
			.status(200)
			.json({ message: "Token updated with changes", updatedProduct });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getProduct = async (req, res) => {
	try {
		// get created token
		const product = await db.User.findById(req.params.productId);

		res.status(200).json({
			product,
			message: "Product retrieved from database",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

export default {
	proposeToken,
	editToken,
	getToken,
	createProduct,
	editProduct,
	getProduct,
};
