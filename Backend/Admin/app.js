import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./handlers/error.handlers.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);
app.use(errorHandler.internalError);
app.use(errorHandler.routeNotFound);

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});
