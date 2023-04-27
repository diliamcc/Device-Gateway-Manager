const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const helmet = require("helmet");

const httpConfig = require("./config").HTTP;

require("./db");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).send("Something broke!");
});
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.set("PORT", httpConfig.port);

const Router = require("./modules");
Router.routes(app);

process.on("uncaughtException", (err) => {
	// Exit the app with error status.
	try {
		console.log("*** uncaughtException:", err);
	} catch (e) {}
});

module.exports = app;
