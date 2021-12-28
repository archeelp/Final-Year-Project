import jwt from "jsonwebtoken";
import db from "../models/index.js";
import cloudinary from "../utils/cloudinary.js";

// Middleware to check if the user is authenticated
export const loginRequired = (req, res, next) => {
	try {
		// Get the JWT token from the header
		const token = req.headers.authorization.split(" ")[1];
		// Verify the token
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			if (decoded) {
				req.decodedToken = decoded;
				next();
			} else {
				return next({ status: 401, message: "Please Log In First" });
			}
		});
	} catch (error) {
		console.log(error);
		return next({ status: 401, message: "Please Log In First" });
	}
};

export const canProposeToken = async (req, res, next) => {
	try {
		// Get user from database
		const user = await db.User.findById(req.decodedToken.id);

		// Verify the token
		if (user.token == null) {
			next();
		} else {
			return next({ status: 401, message: "Token can be created only once" });
		}
	} catch (error) {
		console.log(error);
		return next({ status: 401, message: "Token can be created only once" });
	}
};

export const cloudinaryUpload = async (req, res, next) => {
	try {
		const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
			upload_preset: "Final-Year-Project",
		});

		let uploadedCertificates = await req.body.certificates.map(
			async (certificate) => {
				return await cloudinary.uploader.upload(certificate, {
					upload_preset: "Final-Year-Project",
				});
			}
		);

		uploadedCertificates = await Promise.all(uploadedCertificates);

		const certificatesUrls = await uploadedCertificates.map((certificate) => {
			return certificate.url;
		});
		req.body.uploadedImage = uploadedImage;
		req.body.certificatesUrls = certificatesUrls;
		next();
	} catch (error) {
		console.log(error);
		return next({ status: 401, message: "File upload failed" });
	}
};

export default {
	loginRequired,
	canProposeToken,
	cloudinaryUpload,
};
