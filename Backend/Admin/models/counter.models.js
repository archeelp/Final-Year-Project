import mongoose from "mongoose";
import validator from "validator";

// User Schema - User is a system user who can be teacher or student
export const CounterSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
		},
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
