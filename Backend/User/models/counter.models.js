import mongoose from "mongoose";

// User Schema - User is a system user who can be teacher or student
export const CounterSchema = new mongoose.Schema(
	{
		seq: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

// Exporting the Proposed tokens model
export default mongoose.model("Counter", CounterSchema);
