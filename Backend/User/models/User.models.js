import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// User Schema - User is a system user who can be teacher or student
const UserSchema = new mongoose.Schema(
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
		token: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProposedToken",
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		],
	},
	{
		timestamps: true,
	}
);

// Encrypting the password before saving to database
UserSchema.pre("save", async function (next) {
	const user = this;
	try {
		if (!user.isModified("password")) {
			return next();
		}
		// Update the password to hashed password
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

// For comparing the encrypted password
const comparePassword = async function (candidatePassword, next) {
	try {
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		next(err);
		return false;
	}
};

UserSchema.methods.comparePassword = comparePassword;

// Exporting the user model
export default mongoose.model("User", UserSchema);
