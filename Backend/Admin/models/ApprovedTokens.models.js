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
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Exporting the approved tokens model
export default mongoose.model("ApprovedToken", ApprovedTokenSchema);
