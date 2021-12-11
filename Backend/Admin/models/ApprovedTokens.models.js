import mongoose from "mongoose";
import validator from "validator";

// User Schema - User is a system user who can be teacher or student
const ApprovedTokenSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
			validate: [validator.isEmail, "Please fill a valid email address"],
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		dateOfBirth: {
			type: Date,
			trim: true,
			required: true,
			validate: [validator.isDate(), "Please fill an valid Date"],
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
				validator.isEthereumAddress(),
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
	},
	{
		timestamps: true,
	}
);

// Exporting the approved tokens model
export default mongoose.model("ApprovedToken", ApprovedTokenSchema);
