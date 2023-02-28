module.exports = (app) => {
	const sites = require("../controllers/site.controller.js");

	var router = require("express").Router();

	// Create a new Site
	router.post("/", sites.create);

	app.use("/api/sites", router);
};
