import mongoose from "mongoose";
import validator from "validator";

// User Schema - User is a system user who can be teacher or student
export const ProposedTokenSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
			validate: [validator.isEmail, "Please fill a valid email address"],
		},
		mobile: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
			validate: [
				(mobile) => validator.isMobilePhone(`+91${mobile}`),
				"Please fill a valid mobile number",
			],
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		dateOfBirth: {
			type: Date,
			trim: true,
			required: true,
			validate: [validator.isDate, "Please fill an valid Date"],
		},
		image: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			trim: true,
			required: true,
		},
		collegeInfo: [
			{
				type: String,
				trim: true,
				required: true,
			},
		],
		degreeOfPlay: {
			type: String,
			trim: true,
			required: true,
		},
		country: {
			type: String,
			trim: true,
			required: true,
		},
		ethereumAddress: {
			type: String,
			required: true,
			unique: true,
			validate: [
				(ethereumAddress) => validator.isEthereumAddress(ethereumAddress),
				"Please enter an valid Ethereum Address",
			],
		},
		certificates: [
			{
				type: String,
				trim: true,
			},
		],
		awardsAndAccolades: [
			{
				type: String,
				trim: true,
			},
		],
		approved: {
			type: Boolean,
			default: false,
		},
		amount: {
			type: String,
			required: true,
		},
		rate: {
			type: String,
			required: true,
		},
		sport: {
			type: String,
			required: true,
		},
		keynotes: {
			type: String,
		},
		instagramLink: {
			type: String,
		},
		facebookLink: {
			type: String,
		},
		youtubeLink: {
			type: String,
		},
		twitterLink: {
			type: String,
		},
		tokenIndex: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

// Exporting the Proposed tokens model
export default mongoose.model("ProposedToken", ProposedTokenSchema);
