import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./handlers/error.handlers.js";
import { buyProduct } from "./handlers/order.handlers.js";
import web3Connection from './connect.js';
const myTokenContract = web3Connection.at(process.env.LOGIN_CONTRACT_ADDRESS || '0xFDAE5964958FaFe22E9F300C3582B818AaCDd4c0');

myTokenContract.BuyProduct().watch(buyProduct);

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
