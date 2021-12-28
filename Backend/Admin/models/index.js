import mongoose from "mongoose";
import ProposedToken from "./ProposedTokens.models.js";
import User from "./User.models.js";
import Counter from "./counter.models.js";
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || "mongodb://localhost/FYP";

// Connect to MongoDB
mongoose
	.connect(databaseUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		keepAlive: true,
	})
	.then(async () => {
		console.log(`Database connected to ${databaseUri}`);
		const counter = await Counter.findOne({});
		if (!counter) {
			console.log("idhar");
			const c = await Counter.create({ seq: 0 });
		}
	})
	.catch((err) => console.log(`Database connection error: ${err.message}`));

// Export all the models
export default {
	ProposedToken,
	User,
	Counter,
};
