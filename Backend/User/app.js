import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./handlers/error.handlers.js";
import { buyProduct } from "./handlers/order.handlers.js";
import myTokenContract from './connect.js';

myTokenContract.events.BuyProduct().on("data", buyProduct).on("error", console.log);

console.log(process.env.MONGODB_URI);

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/", routes);
app.use(errorHandler.internalError);
app.use(errorHandler.routeNotFound);

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});
