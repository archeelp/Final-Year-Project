import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import errorHandler from './handlers/error.handlers.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);
app.use(errorHandler.internalError);
app.use(errorHandler.routeNotFound);

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});
