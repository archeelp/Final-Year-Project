import db from "../models/index.js";
import cloudinary from "../utils/cloudinary.js";

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
		} = req.body;

		const uploadedImage = await cloudinary.uploader.upload(image, {
			upload_preset: "Final-Year-Project",
		});

		let uploadedCertificates = await certificates.map(async (certificate) => {
			return await cloudinary.uploader.upload(certificate, {
				upload_preset: "Final-Year-Project",
			});
		});

		let uploadedAwardsAndAccolades = await awardsAndAccolades.map(
			async (awardsAndAccolade) => {
				return await cloudinary.uploader.upload(awardsAndAccolade, {
					upload_preset: "Final-Year-Project",
				});
			}
		);

		uploadedCertificates = await Promise.all(uploadedCertificates);
		uploadedAwardsAndAccolades = await Promise.all(uploadedAwardsAndAccolades);

		const certificatesUrls = await uploadedCertificates.map((certificate) => {
			return certificate.url;
		});

		const awardsAndAccoladesUrls = await uploadedAwardsAndAccolades.map(
			(awardsAndAccolade) => {
				return awardsAndAccolade.url;
			}
		);

		const proposedToken = await db.ProposedToken.create({
			email,
			mobile,
			name,
			dateOfBirth,
			image: uploadedImage.url,
			gender,
			collegeInfo,
			degreeOfPlay,
			country,
			ethereumAddress,
			awardsAndAccolades: awardsAndAccoladesUrls,
			certificates: certificatesUrls,
			amount,
			rate,
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

export default {
	proposeToken,
	editToken,
	getToken
};
