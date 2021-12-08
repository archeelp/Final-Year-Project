import mongoose from "mongoose";
import ApprovedTokensModel from "./ApprovedTokens.models.js";
import ProposedTokensModel from "./ProposedTokens.models.js";
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || "mongodb://localhost/FYP";

// Connect to MongoDB
mongoose
	.connect(databaseUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		keepAlive: true,
	})
	.then(() => console.log(`Database connected to ${databaseUri}`))
	.catch((err) => console.log(`Database connection error: ${err.message}`));

// Export all the models
export default {
	ApprovedTokensModel,
	ProposedTokensModel,
};
