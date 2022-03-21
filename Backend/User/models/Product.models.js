import mongoose from "mongoose";

// User Schema - User is a system user who can be teacher or student
export const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		cost: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		token: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProposedToken",
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

// Exporting the Proposed tokens model
export default mongoose.model("Product", ProductSchema);
